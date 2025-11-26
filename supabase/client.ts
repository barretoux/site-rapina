// supabase/client.ts (exemplo de uso - opcional)
// Este arquivo pode ser usado se você precisar do cliente Supabase no front-end
// Para Edge Functions, use createClient dentro da função com SERVICE_ROLE_KEY

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

// Exemplo de uso no front-end (se necessário):
// export const supabase = createClient(
//   process.env.VITE_SUPABASE_URL!,
//   process.env.VITE_SUPABASE_ANON_KEY!
// );

// NOTA: Para salvar leads, use a Edge Function saveLead via VITE_SUPABASE_FUNCTION_URL
// NÃO use o cliente direto no front-end para operações que requerem SERVICE_ROLE_KEY



