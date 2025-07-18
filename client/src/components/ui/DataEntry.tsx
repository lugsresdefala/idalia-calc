import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Thermometer, Droplets, Calendar, Plus } from "lucide-react";

interface DataEntryProps {
  userId?: number;
}

const DataEntry = ({ userId = 1 }: DataEntryProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Estados para formulários
  const [temperatureData, setTemperatureData] = useState({
    measurementDate: new Date().toISOString().split('T')[0],
    temperature: '',
    measurementTime: ''
  });

  const [mucusData, setMucusData] = useState({
    observationDate: new Date().toISOString().split('T')[0],
    consistency: '',
    amount: '',
    notes: ''
  });

  const [cycleData, setCycleData] = useState({
    periodStartDate: '',
    periodEndDate: '',
    cycleLength: 28,
    periodLength: 5,
    notes: ''
  });

  // Mutações para criar dados
  const createTemperatureMutation = useMutation({
    mutationFn: (data: any) => apiRequest('/api/basal-temperatures', 'POST', { ...data, userId }),
    onSuccess: () => {
      toast({ title: "Temperatura registrada com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['/api/basal-temperatures', userId] });
      setTemperatureData({
        measurementDate: new Date().toISOString().split('T')[0],
        temperature: '',
        measurementTime: ''
      });
    },
    onError: () => {
      toast({ title: "Erro ao registrar temperatura", variant: "destructive" });
    }
  });

  const createMucusMutation = useMutation({
    mutationFn: (data: any) => apiRequest('/api/cervical-mucus', 'POST', { ...data, userId }),
    onSuccess: () => {
      toast({ title: "Observação de muco registrada com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['/api/cervical-mucus', userId] });
      setMucusData({
        observationDate: new Date().toISOString().split('T')[0],
        consistency: '',
        amount: '',
        notes: ''
      });
    },
    onError: () => {
      toast({ title: "Erro ao registrar observação", variant: "destructive" });
    }
  });

  const createCycleMutation = useMutation({
    mutationFn: (data: any) => apiRequest('/api/menstrual-cycles', 'POST', { ...data, userId }),
    onSuccess: () => {
      toast({ title: "Ciclo menstrual registrado com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['/api/menstrual-cycles', userId] });
      setCycleData({
        periodStartDate: '',
        periodEndDate: '',
        cycleLength: 28,
        periodLength: 5,
        notes: ''
      });
    },
    onError: () => {
      toast({ title: "Erro ao registrar ciclo", variant: "destructive" });
    }
  });

  const handleTemperatureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!temperatureData.temperature || !temperatureData.measurementDate) {
      toast({ title: "Preencha todos os campos obrigatórios", variant: "destructive" });
      return;
    }
    createTemperatureMutation.mutate({
      ...temperatureData,
      temperature: parseFloat(temperatureData.temperature)
    });
  };

  const handleMucusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mucusData.observationDate) {
      toast({ title: "Data de observação é obrigatória", variant: "destructive" });
      return;
    }
    createMucusMutation.mutate(mucusData);
  };

  const handleCycleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cycleData.periodStartDate || !cycleData.periodEndDate) {
      toast({ title: "Datas de início e fim são obrigatórias", variant: "destructive" });
      return;
    }
    createCycleMutation.mutate(cycleData);
  };

  return (
    <Card className="glass-card border-cyan-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-300">
          <Plus className="h-5 w-5" />
          Registro de Dados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="temperature" className="w-full">
          <TabsList className="grid w-full grid-cols-3 glass-card p-1">
            <TabsTrigger value="temperature" className="text-red-300">Temperatura</TabsTrigger>
            <TabsTrigger value="mucus" className="text-blue-300">Muco Cervical</TabsTrigger>
            <TabsTrigger value="cycle" className="text-purple-300">Ciclo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="temperature" className="space-y-4">
            <form onSubmit={handleTemperatureSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="temp-date" className="text-gray-300">Data da Medição</Label>
                  <Input
                    id="temp-date"
                    type="date"
                    value={temperatureData.measurementDate}
                    onChange={(e) => setTemperatureData(prev => ({ ...prev, measurementDate: e.target.value }))}
                    className="glass-input"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temp-time" className="text-gray-300">Horário (opcional)</Label>
                  <Input
                    id="temp-time"
                    type="time"
                    value={temperatureData.measurementTime}
                    onChange={(e) => setTemperatureData(prev => ({ ...prev, measurementTime: e.target.value }))}
                    className="glass-input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature" className="text-gray-300">Temperatura (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  min="35"
                  max="38"
                  value={temperatureData.temperature}
                  onChange={(e) => setTemperatureData(prev => ({ ...prev, temperature: e.target.value }))}
                  className="glass-input"
                  placeholder="Ex: 36.5"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="tech-button w-full"
                disabled={createTemperatureMutation.isPending}
              >
                <Thermometer className="h-4 w-4 mr-2" />
                {createTemperatureMutation.isPending ? "Salvando..." : "Registrar Temperatura"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="mucus" className="space-y-4">
            <form onSubmit={handleMucusSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mucus-date" className="text-gray-300">Data da Observação</Label>
                <Input
                  id="mucus-date"
                  type="date"
                  value={mucusData.observationDate}
                  onChange={(e) => setMucusData(prev => ({ ...prev, observationDate: e.target.value }))}
                  className="glass-input"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="consistency" className="text-gray-300">Consistência</Label>
                  <Select onValueChange={(value) => setMucusData(prev => ({ ...prev, consistency: value }))}>
                    <SelectTrigger className="glass-input">
                      <SelectValue placeholder="Selecione a consistência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dry">Seco</SelectItem>
                      <SelectItem value="sticky">Grudento</SelectItem>
                      <SelectItem value="creamy">Cremoso</SelectItem>
                      <SelectItem value="watery">Aquoso</SelectItem>
                      <SelectItem value="stretchy">Elástico/Clara de ovo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-gray-300">Quantidade</Label>
                  <Select onValueChange={(value) => setMucusData(prev => ({ ...prev, amount: value }))}>
                    <SelectTrigger className="glass-input">
                      <SelectValue placeholder="Selecione a quantidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhuma</SelectItem>
                      <SelectItem value="light">Pouca</SelectItem>
                      <SelectItem value="moderate">Moderada</SelectItem>
                      <SelectItem value="heavy">Abundante</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mucus-notes" className="text-gray-300">Observações (opcional)</Label>
                <Textarea
                  id="mucus-notes"
                  value={mucusData.notes}
                  onChange={(e) => setMucusData(prev => ({ ...prev, notes: e.target.value }))}
                  className="glass-input"
                  placeholder="Adicione observações adicionais..."
                />
              </div>
              <Button 
                type="submit" 
                className="tech-button w-full"
                disabled={createMucusMutation.isPending}
              >
                <Droplets className="h-4 w-4 mr-2" />
                {createMucusMutation.isPending ? "Salvando..." : "Registrar Observação"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="cycle" className="space-y-4">
            <form onSubmit={handleCycleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="period-start" className="text-gray-300">Início da Menstruação</Label>
                  <Input
                    id="period-start"
                    type="date"
                    value={cycleData.periodStartDate}
                    onChange={(e) => setCycleData(prev => ({ ...prev, periodStartDate: e.target.value }))}
                    className="glass-input"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period-end" className="text-gray-300">Fim da Menstruação</Label>
                  <Input
                    id="period-end"
                    type="date"
                    value={cycleData.periodEndDate}
                    onChange={(e) => setCycleData(prev => ({ ...prev, periodEndDate: e.target.value }))}
                    className="glass-input"
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cycle-length" className="text-gray-300">Duração do Ciclo (dias)</Label>
                  <Input
                    id="cycle-length"
                    type="number"
                    min="21"
                    max="45"
                    value={cycleData.cycleLength}
                    onChange={(e) => setCycleData(prev => ({ ...prev, cycleLength: parseInt(e.target.value) }))}
                    className="glass-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period-length" className="text-gray-300">Duração da Menstruação (dias)</Label>
                  <Input
                    id="period-length"
                    type="number"
                    min="1"
                    max="10"
                    value={cycleData.periodLength}
                    onChange={(e) => setCycleData(prev => ({ ...prev, periodLength: parseInt(e.target.value) }))}
                    className="glass-input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cycle-notes" className="text-gray-300">Observações (opcional)</Label>
                <Textarea
                  id="cycle-notes"
                  value={cycleData.notes}
                  onChange={(e) => setCycleData(prev => ({ ...prev, notes: e.target.value }))}
                  className="glass-input"
                  placeholder="Adicione observações sobre o ciclo..."
                />
              </div>
              <Button 
                type="submit" 
                className="tech-button w-full"
                disabled={createCycleMutation.isPending}
              >
                <Calendar className="h-4 w-4 mr-2" />
                {createCycleMutation.isPending ? "Salvando..." : "Registrar Ciclo"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DataEntry;