// @ts-nocheck
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface LeadData {
  id: string;
  nome: string;
  email: string;
  whatsapp: string | null;
  empresa: string;
  setor: string | null;
  faturamento: string | null;
  origem: string | null;
  pagina: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
}

async function sendEmailNotification(lead: LeadData) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const notificationEmail = Deno.env.get("NOTIFICATION_EMAIL");
  
  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY não está configurada");
  }
  
  if (!notificationEmail) {
    throw new Error("NOTIFICATION_EMAIL não está configurada");
  }

  const formatSetor = (setor: string | null) => {
    const setores: Record<string, string> = {
      tecnologia: "Tecnologia",
      saude: "Saúde",
      educacao: "Educação",
      varejo: "Varejo",
      servicos: "Serviços",
      industria: "Indústria",
      construcao: "Construção",
      financeiro: "Financeiro",
      outro: "Outro",
    };
    return setor ? setores[setor] || setor : "Não informado";
  };

  const formatFaturamento = (faturamento: string | null) => {
    const faturamentos: Record<string, string> = {
      "0-50k": "Até R$ 50k",
      "51k-70k": "R$ 51k - R$ 70k",
      "71k-100k": "R$ 71k - R$ 100k",
      "101k-200k": "R$ 101k - R$ 200k",
      "201k-500k": "R$ 201k - R$ 500k",
      "501k-1m": "R$ 501k - R$ 1M",
      "1m-5m": "R$ 1M - R$ 5M",
      "5m+": "Acima de R$ 5M",
    };
    return faturamento ? faturamentos[faturamento] || faturamento : "Não informado";
  };

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #F67941 0%, #FF3C00 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #F67941; }
        .value { margin-top: 5px; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">🎯 Novo Lead Recebido!</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Nome:</div>
            <div class="value">${lead.nome}</div>
          </div>
          <div class="field">
            <div class="label">E-mail:</div>
            <div class="value">${lead.email}</div>
          </div>
          <div class="field">
            <div class="label">WhatsApp:</div>
            <div class="value">${lead.whatsapp || "Não informado"}</div>
          </div>
          <div class="field">
            <div class="label">Empresa:</div>
            <div class="value">${lead.empresa}</div>
          </div>
          <div class="field">
            <div class="label">Setor:</div>
            <div class="value">${formatSetor(lead.setor)}</div>
          </div>
          <div class="field">
            <div class="label">Faturamento Mensal:</div>
            <div class="value">${formatFaturamento(lead.faturamento)}</div>
          </div>
          ${lead.origem ? `<div class="field"><div class="label">Origem:</div><div class="value">${lead.origem}</div></div>` : ''}
          ${lead.pagina ? `<div class="field"><div class="label">Página:</div><div class="value">${lead.pagina}</div></div>` : ''}
          ${lead.utm_source || lead.utm_medium || lead.utm_campaign ? `
          <div class="field">
            <div class="label">UTM Parameters:</div>
            <div class="value">
              ${lead.utm_source ? `Source: ${lead.utm_source}<br>` : ''}
              ${lead.utm_medium ? `Medium: ${lead.utm_medium}<br>` : ''}
              ${lead.utm_campaign ? `Campaign: ${lead.utm_campaign}` : ''}
            </div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Data/Hora:</div>
            <div class="value">${new Date(lead.created_at).toLocaleString('pt-BR')}</div>
          </div>
          <div class="footer">
            <p>Este e-mail foi enviado automaticamente pelo sistema de captura de leads.</p>
            <p>Lead ID: ${lead.id}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: "Rapina <onboarding@resend.dev>", // Domínio de teste do Resend (permitido)
      to: [notificationEmail], // Este já está configurado como rapinadigitalmedia@gmail.com
      subject: `🎯 Novo Lead: ${lead.nome} - ${lead.empresa}`,
      html: emailHtml,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Erro ao enviar e-mail: ${error}`);
  }

  return await response.json();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Método não permitido" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    
    // O Supabase Database Webhook envia os dados em body.record
    const leadData: LeadData = body.record || body;
    
    if (!leadData.id || !leadData.nome || !leadData.email) {
      return new Response(
        JSON.stringify({ error: "Dados do lead inválidos" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await sendEmailNotification(leadData);

    return new Response(
      JSON.stringify({ success: true, message: "E-mail enviado com sucesso" }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (err: any) {
    console.error("Erro ao processar notificação:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Erro ao processar notificação" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});