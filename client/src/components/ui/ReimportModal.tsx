import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle2,
  AlertCircle,
  Upload,
  Eye,
  RotateCcw,
  FileJson,
} from "lucide-react";
import {
  type DataType,
  type ReimportResult,
  DATA_TYPE_LABELS,
  DATA_TYPE_EXAMPLES,
  DATA_TYPE_FIELD_DESCRIPTIONS,
  reimportRecords,
  invalidateAllUserData,
} from "@/lib/dataSync";
import { useToast } from "@/hooks/use-toast";

type Step = "input" | "preview" | "result";

interface ReimportModalProps {
  open: boolean;
  onClose: () => void;
  userId: string;
}

export function ReimportModal({ open, onClose, userId }: ReimportModalProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<DataType>("cycles");
  const [jsonInput, setJsonInput] = useState("");
  const [step, setStep] = useState<Step>("input");
  const [parsed, setParsed] = useState<any[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [result, setResult] = useState<ReimportResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reset = useCallback(() => {
    setStep("input");
    setJsonInput("");
    setParsed([]);
    setParseError(null);
    setResult(null);
    setIsSubmitting(false);
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab as DataType);
    reset();
  }, [reset]);

  const handlePreview = useCallback(() => {
    setParseError(null);

    if (!jsonInput.trim()) {
      setParseError("Cole o JSON antes de visualizar.");
      return;
    }

    let data: any;
    try {
      data = JSON.parse(jsonInput.trim());
    } catch {
      setParseError("JSON inválido. Verifique a formatação e tente novamente.");
      return;
    }

    const records = Array.isArray(data) ? data : [data];

    if (records.length === 0) {
      setParseError("O JSON não contém registros.");
      return;
    }

    if (records.length > 500) {
      setParseError("Máximo de 500 registros por importação.");
      return;
    }

    setParsed(records);
    setStep("preview");
  }, [jsonInput]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const importResult = await reimportRecords(activeTab, parsed);
      setResult(importResult);
      setStep("result");

      invalidateAllUserData(queryClient, userId);

      toast({
        title: "Importação concluída",
        description: `${importResult.inserted} inseridos, ${importResult.updated} atualizados`,
      });
    } catch (err: any) {
      toast({
        title: "Erro na importação",
        description: err?.message || "Ocorreu um erro ao importar os dados.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [activeTab, parsed, queryClient, userId, toast]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const exampleJson = JSON.stringify(DATA_TYPE_EXAMPLES[activeTab], null, 2);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-cyan-500/30 text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-xl text-cyan-300 flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Importar Dados
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Importe registros em formato JSON para sincronizar seus dados.
            Registros existentes na mesma data serão atualizados.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-3 bg-slate-800 mb-4">
            <TabsTrigger value="cycles" className="text-xs data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Ciclos
            </TabsTrigger>
            <TabsTrigger value="temperatures" className="text-xs data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Temperaturas
            </TabsTrigger>
            <TabsTrigger value="mucus" className="text-xs data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Muco Cervical
            </TabsTrigger>
          </TabsList>

          {(["cycles", "temperatures", "mucus"] as DataType[]).map((type) => (
            <TabsContent key={type} value={type} className="mt-0">
              {step === "input" && (
                <div className="space-y-4">
                  <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700">
                    <p className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                      <FileJson className="h-3.5 w-3.5" />
                      Campos aceitos:
                    </p>
                    <p className="text-xs text-cyan-300 font-mono">
                      {DATA_TYPE_FIELD_DESCRIPTIONS[type]}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400 mb-2">Exemplo de formato:</p>
                    <pre className="text-xs bg-slate-800 rounded p-3 border border-slate-700 text-green-400 overflow-x-auto">
                      {JSON.stringify(DATA_TYPE_EXAMPLES[type], null, 2)}
                    </pre>
                  </div>

                  <div>
                    <p className="text-sm text-slate-300 mb-2">
                      Cole seu JSON aqui (array de registros):
                    </p>
                    <Textarea
                      className="font-mono text-xs bg-slate-800 border-slate-600 text-slate-100 min-h-[160px] focus:border-cyan-500 resize-y"
                      placeholder={`[\n  ${JSON.stringify(DATA_TYPE_EXAMPLES[type][0])}\n]`}
                      value={jsonInput}
                      onChange={(e) => {
                        setJsonInput(e.target.value);
                        setParseError(null);
                      }}
                    />
                  </div>

                  {parseError && (
                    <Alert className="border-red-500/50 bg-red-900/20">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-300 text-sm">
                        {parseError}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex justify-end gap-3">
                    <Button variant="ghost" onClick={handleClose} className="text-slate-400">
                      Cancelar
                    </Button>
                    <Button
                      onClick={handlePreview}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Button>
                  </div>
                </div>
              )}

              {step === "preview" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-300">
                      <span className="text-cyan-300 font-semibold">{parsed.length}</span> registro(s) prontos para importar
                    </p>
                    <Badge className="bg-slate-700 text-slate-300 border-0">
                      {DATA_TYPE_LABELS[type]}
                    </Badge>
                  </div>

                  <div className="border border-slate-700 rounded-lg overflow-hidden max-h-[240px] overflow-y-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-slate-800 sticky top-0">
                        <tr>
                          {Object.keys(parsed[0] || {}).map((k) => (
                            <th key={k} className="text-left px-3 py-2 text-slate-400 font-medium">
                              {k}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {parsed.map((row, i) => (
                          <tr key={i} className="border-t border-slate-800 hover:bg-slate-800/50">
                            {Object.values(row).map((v: any, j) => (
                              <td key={j} className="px-3 py-1.5 text-slate-300 truncate max-w-[120px]">
                                {String(v ?? "")}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <Alert className="border-amber-500/40 bg-amber-900/10">
                    <AlertCircle className="h-4 w-4 text-amber-400" />
                    <AlertDescription className="text-amber-300 text-sm">
                      Registros com a mesma data existente serao atualizados. Novos registros serao inseridos.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-between gap-3">
                    <Button
                      variant="ghost"
                      onClick={() => setStep("input")}
                      className="text-slate-400"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Voltar
                    </Button>
                    <div className="flex gap-3">
                      <Button variant="ghost" onClick={handleClose} className="text-slate-400">
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-cyan-600 hover:bg-cyan-500 text-white min-w-[120px]"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="animate-spin h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white" />
                            Importando...
                          </span>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Importar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {step === "result" && result && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-400" />
                    <p className="text-lg font-semibold text-slate-100">
                      Importação concluída!
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-green-400">{result.inserted}</p>
                      <p className="text-xs text-green-300 mt-1">Inseridos</p>
                    </div>
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-blue-400">{result.updated}</p>
                      <p className="text-xs text-blue-300 mt-1">Atualizados</p>
                    </div>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-slate-300">{result.skipped}</p>
                      <p className="text-xs text-slate-400 mt-1">Ignorados</p>
                    </div>
                  </div>

                  {result.errors.length > 0 && (
                    <div className="border border-red-500/30 rounded-lg overflow-hidden">
                      <div className="bg-red-900/20 px-3 py-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-400" />
                        <p className="text-sm text-red-300 font-medium">
                          {result.errors.length} erro(s) encontrado(s)
                        </p>
                      </div>
                      <div className="max-h-[120px] overflow-y-auto">
                        {result.errors.map((err, i) => (
                          <div key={i} className="px-3 py-1.5 border-t border-slate-800 text-xs text-red-300">
                            {err.error}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between gap-3">
                    <Button
                      variant="ghost"
                      onClick={reset}
                      className="text-slate-400"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Nova importação
                    </Button>
                    <Button
                      onClick={handleClose}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white"
                    >
                      Fechar
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
