// @ts-nocheck
// Este arquivo roda no ambiente Deno (Edge Functions do Supabase), não no Node.js
// Os erros do TypeScript do editor são esperados e não afetam a execução
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

// Helper para headers CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
  "Access-Control-Max-Age": "86400",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Método não permitido" }), {
      status: 405,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Allow": "POST, OPTIONS",
      },
    });
  }

  try {
    const bodyText = await req.text();
    const body = JSON.parse(bodyText);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Anti-spam: Verificar duplicatas por email, WhatsApp ou empresa nas últimas 24h
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    
    // Normalizar dados para comparação
    const normalizedEmail = body.email.toLowerCase().trim();
    const normalizedWhatsapp = body.whatsapp ? body.whatsapp.replace(/\D/g, "") : null; // Remove formatação, só dígitos
    const normalizedEmpresa = body.empresa.toLowerCase().trim();
    
    // Verificar duplicatas em paralelo (email, whatsapp, empresa)
    const [emailCheck, whatsappCheck, empresaCheck] = await Promise.all([
      supabase
        .from("leads")
        .select("email, created_at")
        .eq("email", normalizedEmail)
        .gte("created_at", twentyFourHoursAgo)
        .limit(1),
      
      normalizedWhatsapp ? supabase
        .from("leads")
        .select("whatsapp, created_at")
        .not("whatsapp", "is", null)
        .gte("created_at", twentyFourHoursAgo)
        .limit(100) // Busca mais para poder filtrar depois
        .then(result => {
          if (result.error) return result;
          // Filtra leads onde o whatsapp normalizado (só dígitos) corresponde
          const filtered = result.data?.filter(lead => {
            if (!lead.whatsapp) return false;
            const leadWhatsappNormalized = lead.whatsapp.replace(/\D/g, "");
            return leadWhatsappNormalized === normalizedWhatsapp;
          });
          return { ...result, data: filtered?.slice(0, 1) || [] };
        }) : Promise.resolve({ data: [], error: null }),
      
      supabase
        .from("leads")
        .select("empresa, created_at")
        .ilike("empresa", normalizedEmpresa) // Case-insensitive
        .gte("created_at", twentyFourHoursAgo)
        .limit(1)
    ]);

    // Verificar se alguma verificação encontrou duplicata
    let duplicateLead = null;
    let checkType = "";

    if (emailCheck.data && emailCheck.data.length > 0) {
      duplicateLead = emailCheck.data[0];
      checkType = "email";
    } else if (whatsappCheck.data && whatsappCheck.data.length > 0) {
      duplicateLead = whatsappCheck.data[0];
      checkType = "whatsapp";
    } else if (empresaCheck.data && empresaCheck.data.length > 0) {
      duplicateLead = empresaCheck.data[0];
      checkType = "empresa";
    }

    if (duplicateLead) {
      const lastSubmission = new Date(duplicateLead.created_at);
      const hoursAgo = Math.floor((Date.now() - lastSubmission.getTime()) / (1000 * 60 * 60));
      const minutesAgo = Math.floor((Date.now() - lastSubmission.getTime()) / (1000 * 60));
      
      let timeMessage = "";
      if (hoursAgo > 0) {
        timeMessage = `${hoursAgo} hora${hoursAgo > 1 ? "s" : ""} atrás`;
      } else {
        timeMessage = `${minutesAgo} minuto${minutesAgo > 1 ? "s" : ""} atrás`;
      }

      const fieldName = checkType === "email" ? "e-mail" : checkType === "whatsapp" ? "WhatsApp" : "empresa";

      return new Response(
        JSON.stringify({ 
          error: `DUPLICATE_${checkType.toUpperCase()}`,
          message: `Você já enviou seus dados usando este ${fieldName} ${timeMessage}. Por favor, aguarde 24 horas antes de enviar novamente.`,
          code: "SPAM_DETECTED"
        }),
        {
          status: 429, // Too Many Requests
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Normalizar dados antes de inserir (email já foi normalizado acima)
    const normalizedEmpresaInsert = body.empresa.trim(); // Mantém case original, mas remove espaços

    const { data, error } = await supabase.from("leads").insert([
      {
        nome: body.nome,
        email: normalizedEmail, // Já normalizado acima
        whatsapp: body.whatsapp,
        empresa: normalizedEmpresaInsert,
        setor: body.setor,
        faturamento: body.faturamento,
        origem: body.origem ?? null,
        pagina: body.pagina ?? null,
        utm_source: body.utm_source ?? null,
        utm_medium: body.utm_medium ?? null,
        utm_campaign: body.utm_campaign ?? null,
      },
    ]);

    if (error) {
      console.error("Erro no insert:", error);
      return new Response(JSON.stringify({ error: error.message || error }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Erro geral:", err);
    return new Response(JSON.stringify({ error: "Invalid Request" }), {
      status: 400,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});
