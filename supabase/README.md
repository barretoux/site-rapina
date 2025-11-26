# Supabase - Edge Functions e Configuração

## 📁 Estrutura da Pasta

```
supabase/
├── functions/
│   ├── saveLead/
│   │   └── index.ts          # Edge Function para salvar leads
│   └── sendLeadNotification/
│       └── index.ts          # Edge Function para enviar notificações por e-mail
├── client.ts                 # Cliente Supabase (exemplo - opcional)
├── types.ts                  # Tipos TypeScript para leads
└── README.md                 # Este arquivo
```

## 🗄️ Schema da Tabela `leads`

A tabela `leads` deve ter o seguinte schema no Supabase:

```sql
CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  email text NOT NULL,
  whatsapp text NOT NULL,
  empresa text NOT NULL,
  setor text NOT NULL,
  faturamento text NOT NULL,
  origem text,
  pagina text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz DEFAULT now()
);
```

### Campos Obrigatórios:
- `nome` (text)
- `email` (text)    
- `whatsapp` (text) - formato: "(XX) 9XXXX-XXXX"
- `empresa` (text)
- `setor` (text)
- `faturamento` (text)

### Campos Opcionais:

- `origem` (text) - ex: "landing"
- `pagina` (text) - pathname da página
- `utm_source`, `utm_medium`, `utm_campaign` (text) - parâmetros UTM

## ⚡ Edge Function: saveLead

### Descrição
A função `saveLead` recebe um payload JSON com os dados do lead e insere na tabela `leads`.

### Payload Esperado
Todos os campos devem estar em **snake_case** e minúsculos:

```json
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "whatsapp": "(51) 99999-9999",
  "empresa": "Empresa XYZ",
  "setor": "tecnologia",
  "faturamento": "100k-500k",
  "origem": "landing",
  "pagina": "/",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "campanha-2024"
}
```

### Variáveis de Ambiente Necessárias

A Edge Function requer as seguintes variáveis de ambiente configuradas no Supabase:

- `SUPABASE_URL` - URL do seu projeto Supabase
- `SUPABASE_SERVICE_ROLE_KEY` - Service Role Key (NUNCA exponha no front-end)

⚠️ **IMPORTANTE**: A `SUPABASE_SERVICE_ROLE_KEY` deve existir **APENAS** nas variáveis de ambiente da Edge Function no Supabase. **NUNCA** salve no `.env` local ou versionado.

## 🚀 Deploy da Edge Function

### Pré-requisitos
1. Instalar Supabase CLI: `npm install -g supabase`
2. Fazer login: `supabase login`
3. Linkar ao projeto: `supabase link --project-ref <SEU_PROJECT_REF>`

### Comando de Deploy

```bash
supabase functions deploy saveLead --project-ref <SEU_PROJECT_REF>
```

Substitua `<SEU_PROJECT_REF>` pelo ID do seu projeto Supabase (encontrado na URL do dashboard).

### Configurar Variáveis de Ambiente no Supabase

Após o deploy, configure as variáveis de ambiente no dashboard do Supabase:

1. Acesse: **Project Settings** → **Edge Functions** → **Environment Variables**
2. Adicione:
   - `SUPABASE_URL`: `https://<PROJECT_REF>.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY`: Sua Service Role Key (encontrada em **Project Settings** → **API**)

## 📊 Ver Logs da Edge Function

Para ver os logs em tempo real:

```bash
supabase functions logs saveLead --project-ref <SEU_PROJECT_REF>
```

Ou acesse o dashboard do Supabase: **Edge Functions** → **saveLead** → **Logs**

## ✅ Checklist de Testes

Após configurar tudo, teste manualmente:

- [ ] Preencher formulário no site
- [ ] Request deve retornar 200 OK
- [ ] Deve aparecer registro na tabela `leads` no Supabase
- [ ] Deve redirecionar para `/obrigado`
- [ ] Página Obrigado deve carregar sem erros
- [ ] **Teste anti-spam - Email**: Tentar enviar o mesmo email novamente
- [ ] Deve retornar erro 429 com mensagem: "Você já enviou seus dados usando este e-mail..."
- [ ] **Teste anti-spam - WhatsApp**: Tentar enviar o mesmo número de WhatsApp novamente
- [ ] Deve retornar erro 429 com mensagem: "Você já enviou seus dados usando este WhatsApp..."
- [ ] **Teste anti-spam - Empresa**: Tentar enviar o mesmo nome de empresa novamente
- [ ] Deve retornar erro 429 com mensagem: "Você já enviou seus dados usando esta empresa..."
- [ ] Mensagens devem informar há quanto tempo o dado foi enviado

## 🛡️ Sistema Anti-Spam

A Edge Function implementa proteção robusta contra spam:

- ✅ **Verificação tripla de duplicatas**: Verifica **email**, **WhatsApp** e **empresa** nas últimas 24 horas
- ✅ **Normalização inteligente**: 
  - Emails: lowercase e trim
  - WhatsApp: remove formatação, compara apenas dígitos
  - Empresa: compara case-insensitive
- ✅ **Mensagem amigável**: Informa qual campo foi duplicado e há quanto tempo foi enviado
- ✅ **Status HTTP 429**: Retorna "Too Many Requests" quando detecta duplicata
- ✅ **Verificações em paralelo**: As três verificações são feitas simultaneamente para melhor performance

### Como funciona:

1. Antes de inserir, verifica em paralelo se existe lead com:
   - Mesmo **email** (normalizado) nas últimas 24h
   - Mesmo **WhatsApp** (apenas dígitos) nas últimas 24h
   - Mesma **empresa** (case-insensitive) nas últimas 24h
2. Se **qualquer uma** das verificações encontrar duplicata:
   - Retorna erro 429 com mensagem específica do campo duplicado
   - Informa há quanto tempo o dado foi enviado
   - Não insere o registro
3. Se **nenhuma** encontrar duplicata:
   - Prossegue com a inserção normalmente

### Exemplos de bloqueio:

- ❌ Mesmo email: "Você já enviou seus dados usando este e-mail 2 horas atrás..."
- ❌ Mesmo WhatsApp: "Você já enviou seus dados usando este WhatsApp 5 minutos atrás..."
- ❌ Mesma empresa: "Você já enviou seus dados usando esta empresa 1 hora atrás..."

### Otimização Recomendada:

Para melhor performance, crie índices no banco de dados:

```sql
-- Índice para busca rápida de emails nas últimas 24h
CREATE INDEX IF NOT EXISTS idx_leads_email_created_at 
ON leads(email, created_at DESC);

-- Índice para busca rápida de empresas nas últimas 24h
CREATE INDEX IF NOT EXISTS idx_leads_empresa_created_at 
ON leads(LOWER(empresa), created_at DESC);

-- Nota: WhatsApp não precisa de índice separado pois a verificação é feita em memória após buscar por created_at
```

Isso acelera significativamente as verificações de duplicatas, especialmente com muitos leads.

## 🔐 Segurança

- ✅ Service Role Key **NUNCA** no front-end
- ✅ Service Role Key **NUNCA** no `.env` local
- ✅ Service Role Key **APENAS** nas variáveis de ambiente da Edge Function
- ✅ Validações no front-end (LeadCapture.tsx)
- ✅ Validações no backend (Edge Function com anti-spam)
- ✅ Proteção contra spam/duplicatas (24h por email)

## 📝 Notas

- A Edge Function usa Deno runtime
- O cliente Supabase é criado dentro da função com SERVICE_ROLE_KEY para bypass de RLS
- O front-end chama a função via `VITE_SUPABASE_FUNCTION_URL`

