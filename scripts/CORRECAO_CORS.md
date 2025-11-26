# 🔧 Correção do Erro CORS - "Failed to fetch"

## 🔴 Problema Identificado

O erro era:
```
Access to fetch at 'https://xlbulinctrpinwagavuv.supabase.co/functions/v1/saveLead' 
from origin 'http://localhost:8080' has been blocked by CORS policy: 
Request header field authorization is not allowed by Access-Control-Allow-Headers 
in preflight response.
```

## ✅ Correção Aplicada

A Edge Function foi atualizada para:
1. ✅ Usar headers CORS consistentes em todas as respostas
2. ✅ Incluir "Authorization" e "apikey" nos headers permitidos
3. ✅ Garantir que o preflight OPTIONS retorna os headers corretos

## 🚀 Próximo Passo: Redeploy da Edge Function

**IMPORTANTE:** Você precisa fazer redeploy da função para que as correções tenham efeito!

### Opção 1: Via Supabase CLI (Recomendado)

```bash
# 1. Certifique-se de estar no diretório do projeto
cd "C:\Users\gabri\OneDrive\Área de Trabalho\meus_sites\site-rapina"

# 2. Faça o deploy da função
supabase functions deploy saveLead --project-ref xlbulinctrpinwagavuv
```

### Opção 2: Via Dashboard do Supabase

1. Acesse o dashboard: https://supabase.com/dashboard/project/xlbulinctrpinwagavuv
2. Vá em **Edge Functions** → **saveLead**
3. Clique em **Edit** ou **Deploy**
4. Cole o conteúdo atualizado de `supabase/functions/saveLead/index.ts`

## 🧪 Como Testar Após o Deploy

### 1. Limpar Cache do Navegador
- Pressione `Ctrl + Shift + R` (Windows) ou `Cmd + Shift + R` (Mac) para hard refresh
- Ou abra uma janela anônima/privada

### 2. Testar o Formulário
- Preencha o formulário
- Envie
- Verifique o console (F12) - não deve mais aparecer erro de CORS

### 3. Verificar Logs (Opcional)
```bash
supabase functions logs saveLead --project-ref xlbulinctrpinwagavuv --follow
```

## 📋 O Que Foi Corrigido

### Antes:
- Headers CORS duplicados e inconsistentes
- Possível problema com o formato dos headers no preflight

### Depois:
- Headers CORS centralizados em um objeto `corsHeaders`
- Headers consistentes em todas as respostas
- Inclui "Authorization" e "apikey" nos headers permitidos
- Preflight OPTIONS retorna headers corretos

## ⚠️ Importante

1. **Você DEVE fazer redeploy** - as mudanças no código local não afetam a função em produção
2. **Limpe o cache do navegador** após o deploy
3. **Teste em uma janela anônima** para garantir que não há cache

## 🔍 Se Ainda Der Erro

1. Verifique se o deploy foi bem-sucedido:
   ```bash
   supabase functions list --project-ref xlbulinctrpinwagavuv
   ```

2. Verifique os logs da função:
   ```bash
   supabase functions logs saveLead --project-ref xlbulinctrpinwagavuv
   ```

3. Teste a função diretamente no navegador (console):
   ```javascript
   fetch('https://xlbulinctrpinwagavuv.supabase.co/functions/v1/saveLead', {
     method: 'OPTIONS'
   }).then(r => {
     console.log('Status:', r.status);
     console.log('Headers:', [...r.headers.entries()]);
   });
   ```

4. Se ainda der erro, compartilhe:
   - Mensagem de erro completa do console
   - Resultado do teste acima
   - Status do deploy

