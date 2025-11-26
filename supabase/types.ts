// supabase/types.ts
// Tipos TypeScript para a tabela leads

export interface Lead {
  id?: string;
  nome: string;
  email: string;
  whatsapp: string | null;
  empresa: string;
  setor: string | null;
  faturamento: string | null;
  origem?: string | null;
  pagina?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  created_at?: string;
}

export interface LeadPayload {
  nome: string;
  email: string;
  whatsapp: string | null;
  empresa: string;
  setor: string | null;
  faturamento: string | null;
  origem?: string;
  pagina?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
}



