# 🔧 Correção do Erro 401 (Unauthorized)

## 🔴 Problema Identificado

O erro era:
```
POST https://xlbulinctrpinwagavuv.supabase.co/functions/v1/saveLead 401 (Unauthorized)
{"code":401,"message":"Missing authorization header"}
```

## ✅ Solução

As Edge Functions do Supabase **requerem autenticação** por padrão. Você precisa usar a **Anon Key** (não a Service Role Key!) no header de autorização.

### O Que Foi Corrigido

1. ✅ Adicionado suporte para `VITE_SUPABASE_ANON_KEY` no código
2. ✅ Adicionado header `Authorization: Bearer <anon_key>`
3. ✅ Adicionado header `apikey: <anon_key>` (alguns casos exigem ambos)

## 🔑 Configurar a Anon Key

### 1. Obter a Anon Key

1. Acesse o dashboard do Supabase: https://supabase.com/dashboard/project/xlbulinctrpinwagavuv
2. Vá em **Project Settings** → **API**
3. Copie a **`anon` `public`** key (não a `service_role`!)

### 2. Adicionar ao `.env`

Adicione a Anon Key ao seu arquivo `.env`:

```env
VITE_SUPABASE_FUNCTION_URL=https://xlbulinctrpinwagavuv.supabase.co/functions/v1/saveLead
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

⚠️ **IMPORTANTE**: 
- Use a **Anon Key** (segura para front-end)
- **NUNCA** use a Service Role Key no front-end
- A Anon Key pode ser exposta no front-end (é pública por design)

### 3. Reiniciar o Servidor

Após adicionar a variável, **reinicie o servidor**:

```bash
# Pare o servidor (Ctrl+C) e rode novamente:
npm run dev
```

## 🔐 Diferença Entre as Keys

### Anon Key (Public Key)
- ✅ **Segura para usar no front-end**
- ✅ Pode ser exposta no código
- ✅ Respeita Row Level Security (RLS)
- ✅ Usada para autenticação de usuários

### Service Role Key
- ❌ **NUNCA use no front-end**
- ❌ Bypassa RLS
- ❌ Acesso total ao banco
- ✅ Apenas em Edge Functions (variáveis de ambiente)

## 🧪 Como Testar

1. Adicione `VITE_SUPABASE_ANON_KEY` ao `.env`
2. Reinicie o servidor
3. Teste o formulário novamente
4. Deve funcionar agora! ✅

## 📋 Checklist

- [ ] Anon Key copiada do dashboard do Supabase
- [ ] `VITE_SUPABASE_ANON_KEY` adicionada ao `.env`
- [ ] Servidor reiniciado após adicionar a variável
- [ ] Formulário testado e funcionando

## 🚨 Se Ainda Der Erro

1. Verifique se a Anon Key está correta:
   ```javascript
   console.log(import.meta.env.VITE_SUPABASE_ANON_KEY)
   ```

2. Verifique se não está usando a Service Role Key por engano

3. Verifique os logs da Edge Function:
   ```bash
   supabase functions logs saveLead --project-ref xlbulinctrpinwagavuv
   ```

4. Teste diretamente no console do navegador:
   ```javascript
   fetch('https://xlbulinctrpinwagavuv.supabase.co/functions/v1/saveLead', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
       'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY
     },
     body: JSON.stringify({
       nome: 'Teste',
       email: 'teste@teste.com',
       whatsapp: '(11) 99999-9999',
       empresa: 'Teste',
       setor: 'tecnologia',
       faturamento: '0-50k'
     })
   })
   .then(r => r.json())
   .then(console.log)
   .catch(console.error)
   ```

