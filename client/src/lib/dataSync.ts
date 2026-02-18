import { QueryClient } from "@tanstack/react-query";
import { apiRequest } from "./queryClient";

export type DataType = "cycles" | "temperatures" | "mucus";

export type ReimportResult = {
  inserted: number;
  updated: number;
  skipped: number;
  errors: Array<{ record: any; error: string }>;
};

export type DataStatus = {
  cycles: string | null;
  temperatures: string | null;
  mucus: string | null;
  calculations: string | null;
  lastSync: string;
};

export function invalidateAllUserData(queryClient: QueryClient, userId: string): void {
  queryClient.invalidateQueries({ queryKey: [`/api/menstrual-cycles/${userId}`] });
  queryClient.invalidateQueries({ queryKey: [`/api/basal-temperatures/${userId}`] });
  queryClient.invalidateQueries({ queryKey: [`/api/cervical-mucus/${userId}`] });
  queryClient.invalidateQueries({ queryKey: [`/api/calculator-history/${userId}`] });
  queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
  queryClient.invalidateQueries({ queryKey: ["/api/data-status"] });
}

export async function fetchDataStatus(): Promise<DataStatus> {
  const res = await apiRequest("GET", "/api/data-status");
  return res.json();
}

export async function reimportRecords(type: DataType, records: any[]): Promise<ReimportResult> {
  const endpoint = `/api/reimport/${type}`;
  const res = await apiRequest("POST", endpoint, { records });
  return res.json();
}

export const DATA_TYPE_LABELS: Record<DataType, string> = {
  cycles: "Ciclos Menstruais",
  temperatures: "Temperaturas Basais",
  mucus: "Muco Cervical",
};

export const DATA_TYPE_EXAMPLES: Record<DataType, object[]> = {
  cycles: [
    {
      periodStart: "2024-01-15",
      periodEnd: "2024-01-20",
      cycleLength: 28,
      notes: "Ciclo normal",
    },
  ],
  temperatures: [
    {
      date: "2024-01-15",
      temperature: 36.5,
      time: "07:00",
      notes: "Acordou sem alarme",
    },
  ],
  mucus: [
    {
      date: "2024-01-15",
      consistency: "creamy",
      amount: "moderate",
      color: "branco",
      notes: "",
    },
  ],
};

export const DATA_TYPE_FIELD_DESCRIPTIONS: Record<DataType, string> = {
  cycles:
    "periodStart (obrigatório, YYYY-MM-DD), periodEnd (YYYY-MM-DD), cycleLength (15-60), ovulationDate, fertileStart, fertileEnd, notes",
  temperatures:
    "date (obrigatório, YYYY-MM-DD), temperature (obrigatório, 35-42), time (HH:MM), notes",
  mucus:
    'date (obrigatório, YYYY-MM-DD), consistency (dry|sticky|creamy|watery|eggwhite), amount (none|light|moderate|heavy), color, notes',
};

export function formatStatusDate(iso: string | null): string {
  if (!iso) return "Nenhum registro";
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
