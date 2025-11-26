# 🔍 Diagnóstico: "Failed to fetch" no Formulário

## ✅ Correções Aplicadas

1. **Removido uso de Service Role Key no front-end** (ERRO CRÍTICO DE SEGURANÇA)
2. **Removido header Authorization desnecessário**
3. **Melhorado tratamento de erros** com mensagens mais específicas
4. **Adicionado logs de debug** para facilitar diagnóstico

---

## 🔴 Causas Comuns de "Failed to fetch"

### 1. **Variável de Ambiente Não Configurada**

**Sintoma:** Erro imediato ao tentar enviar

**Solução:**
1. Crie um arquivo `.env` na raiz do projeto:
```env
VITE_SUPABASE_FUNCTION_URL=https://<SEU_PROJECT_REF>.supabase.co/functions/v1/saveLead
```

2. Substitua `<SEU_PROJECT_REF>` pelo ID do seu projeto Supabase
   - Encontre no dashboard: URL do projeto ou Settings → API → Project URL

3. **Reinicie o servidor de desenvolvimento** após criar/editar o `.env`:
```bash
# Pare o servidor (Ctrl+C) e rode novamente:
npm run dev
```

⚠️ **IMPORTANTE**: Variáveis de ambiente do Vite só são carregadas na inicialização do servidor!

---

### 2. **Edge Function Não Está Deployada**

**Sintoma:** Erro 404 ou "Failed to fetch"

**Como verificar:**
1. Acesse o dashboard do Supabase
2. Vá em **Edge Functions**
3. Verifique se `saveLead` aparece na lista

**Solução:**
```bash
# 1. Instalar Supabase CLI (se ainda não tiver)
npm install -g supabase

# 2. Fazer login
supabase login

# 3. Linkar ao projeto
supabase link --project-ref <SEU_PROJECT_REF>

# 4. Deploy da função
supabase functions deploy saveLead --project-ref <SEU_PROJECT_REF>
```

---

### 3. **URL da Função Incorreta**

**Sintoma:** Erro 404 ou "Failed to fetch"

**Formato correto:**
```
https://<PROJECT_REF>.supabase.co/functions/v1/saveLead
```

**Como verificar:**
1. No dashboard do Supabase: **Edge Functions** → **saveLead**
2. Copie a URL exata da função
3. Compare com a URL no seu `.env`

**Exemplo correto:**
```env
VITE_SUPABASE_FUNCTION_URL=https://abcdefghijklmnop.supabase.co/functions/v1/saveLead
```

---

### 4. **Problema de CORS**

**Sintoma:** Erro no console do navegador sobre CORS

**Status:** ✅ Já resolvido! A Edge Function já tem CORS configurado.

Se ainda tiver problemas, verifique se a função está retornando os headers corretos.

---

### 5. **Variáveis de Ambiente Não Configuradas na Edge Function**

**Sintoma:** Erro 500 ou erro no insert

**Solução:**
1. No dashboard do Supabase: **Project Settings** → **Edge Functions** → **Environment Variables**
2. Adicione:
   - `SUPABASE_URL`: `https://<PROJECT_REF>.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY`: Sua Service Role Key (encontrada em **Project Settings** → **API**)

⚠️ **NUNCA** adicione a Service Role Key no `.env` do front-end!

---

## 🧪 Como Testar Passo a Passo

### Passo 1: Verificar Variável de Ambiente

No console do navegador (F12), após carregar a página:
```javascript
console.log(import.meta.env.VITE_SUPABASE_FUNCTION_URL)
```

**Esperado:** URL completa da função
**Se for `undefined`:** A variável não está configurada ou o servidor não foi reiniciado

---

### Passo 2: Verificar se a Função Está Acessível

No console do navegador, teste diretamente:
```javascript
fetch('https://<SEU_PROJECT_REF>.supabase.co/functions/v1/saveLead', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nome: 'Teste', email: 'teste@teste.com', whatsapp: '(11) 99999-9999', empresa: 'Teste', setor: 'tecnologia', faturamento: '0-50k' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

**Se der erro:** A função pode não estar deployada ou a URL está incorreta

---

### Passo 3: Verificar Logs da Edge Function

```bash
supabase functions logs saveLead --project-ref <SEU_PROJECT_REF>
```

Ou no dashboard: **Edge Functions** → **saveLead** → **Logs**

---

### Passo 4: Verificar Tabela no Supabase

1. Acesse **Table Editor** no dashboard
2. Verifique se a tabela `leads` existe
3. Verifique se o schema está correto (veja `supabase/README.md`)

---

## 🐳 Docker para Desenvolvimento Local?

**Resposta curta: NÃO é necessário para usar Edge Functions em produção.**

O Docker do Supabase é útil apenas se você quiser:
- Rodar o Supabase localmente (banco, auth, etc.)
- Testar Edge Functions localmente antes de fazer deploy

**Para produção:**
- ✅ Use o Supabase Cloud (dashboard)
- ✅ Faça deploy da Edge Function diretamente
- ✅ Configure variáveis de ambiente no dashboard
- ✅ Não precisa de Docker

---

## 📋 Checklist de Resolução

- [ ] Arquivo `.env` criado na raiz do projeto
- [ ] `VITE_SUPABASE_FUNCTION_URL` configurada corretamente
- [ ] Servidor de desenvolvimento reiniciado após criar `.env`
- [ ] Edge Function `saveLead` está deployada no Supabase
- [ ] Variáveis de ambiente da Edge Function configuradas:
  - [ ] `SUPABASE_URL`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Tabela `leads` criada no Supabase com schema correto
- [ ] Testou a URL da função diretamente no navegador
- [ ] Verificou os logs da Edge Function

---

## 🔧 Comandos Úteis

### Verificar se Supabase CLI está instalado:
```bash
supabase --version
```

### Verificar projetos linkados:
```bash
supabase projects list
```

### Ver logs em tempo real:
```bash
supabase functions logs saveLead --project-ref <PROJECT_REF> --follow
```

### Testar função localmente (opcional, requer Docker):
```bash
supabase functions serve saveLead
```

---

## 🚨 Erros Comuns e Soluções

### "VITE_SUPABASE_FUNCTION_URL não está configurada"
**Solução:** Crie o arquivo `.env` e reinicie o servidor

### "Failed to fetch" ou "Network Error"
**Possíveis causas:**
1. URL incorreta → Verifique o `.env`
2. Função não deployada → Faça deploy
3. CORS bloqueado → Já está resolvido na função
4. Firewall/Antivírus → Desative temporariamente para testar

### "404 Not Found"
**Solução:** A função não está deployada ou a URL está incorreta

### "500 Internal Server Error"
**Solução:** 
1. Verifique os logs da Edge Function
2. Verifique se as variáveis de ambiente estão configuradas
3. Verifique se a tabela `leads` existe

---

## 📞 Próximos Passos

1. **Crie o arquivo `.env`** com a URL correta
2. **Reinicie o servidor** (`npm run dev`)
3. **Verifique no console** se a URL está sendo carregada
4. **Teste o formulário** novamente
5. **Verifique os logs** se ainda der erro

Se ainda tiver problemas, compartilhe:
- Mensagem de erro exata do console
- URL que aparece no console.log
- Status da Edge Function no dashboard

