# 🚀 Guia de Deploy: Vite + Supabase na Vercel

## ✅ Sim, você pode fazer deploy direto!

A Vercel suporta projetos Vite perfeitamente. Você **NÃO precisa** migrar para Next.js.

---

## 📋 Pré-requisitos

1. ✅ Conta na Vercel (gratuita): https://vercel.com
2. ✅ Projeto no GitHub/GitLab/Bitbucket (ou use Vercel CLI)
3. ✅ Edge Functions do Supabase já deployada
4. ✅ Variáveis de ambiente configuradas

---

## 🔧 Passo 1: Preparar o Projeto

### 1.1 Verificar `vercel.json`

Seu `vercel.json` já está configurado corretamente:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### 1.2 Criar `.gitignore` (se não existir)

Certifique-se de que o `.gitignore` inclui:

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Build
dist/
dist-ssr/
*.local

# Environment variables
.env
.env.local
.env.production.local
.env.development.local

# Editor
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*
```

### 1.3 Commit e Push para Git

```bash
git add .
git commit -m "Preparar para deploy na Vercel"
git push origin main
```

---

## 🌐 Passo 2: Deploy na Vercel

### Opção A: Via Dashboard (Recomendado para iniciantes)

1. **Acesse**: https://vercel.com
2. **Faça login** com GitHub/GitLab/Bitbucket
3. **Clique em "Add New Project"**
4. **Importe seu repositório**:
   - Selecione o repositório do projeto
   - A Vercel detecta automaticamente que é um projeto Vite
5. **Configure o projeto**:
   - **Framework Preset**: Vite (deve detectar automaticamente)
   - **Root Directory**: `./` (raiz do projeto)
   - **Build Command**: `npm run build` (já está no vercel.json)
   - **Output Directory**: `dist` (já está no vercel.json)
6. **Configure Variáveis de Ambiente**:
   - Clique em "Environment Variables"
   - Adicione:
     ```
     VITE_SUPABASE_FUNCTION_URL=https://xlbulinctrpinwagavuv.supabase.co/functions/v1/saveLead
     VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
     ```
   - ⚠️ **IMPORTANTE**: Substitua `sua_anon_key_aqui` pela sua Anon Key real
7. **Clique em "Deploy"**

### Opção B: Via Vercel CLI

```bash
# 1. Instalar Vercel CLI globalmente
npm install -g vercel

# 2. Fazer login
vercel login

# 3. No diretório do projeto, fazer deploy
cd "C:\Users\gabri\OneDrive\Área de Trabalho\meus_sites\site-rapina"
vercel

# 4. Seguir as instruções:
# - Link to existing project? N (primeira vez)
# - Project name: site-rapina (ou o nome que preferir)
# - Directory: ./
# - Override settings? N

# 5. Adicionar variáveis de ambiente
vercel env add VITE_SUPABASE_FUNCTION_URL
# Cole: https://xlbulinctrpinwagavuv.supabase.co/functions/v1/saveLead

vercel env add VITE_SUPABASE_ANON_KEY
# Cole: sua_anon_key_aqui

# 6. Fazer deploy de produção
vercel --prod
```

---

## 🔐 Passo 3: Configurar Variáveis de Ambiente

### No Dashboard da Vercel:

1. Vá em **Project Settings** → **Environment Variables**
2. Adicione as seguintes variáveis:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `VITE_SUPABASE_FUNCTION_URL` | `https://xlbulinctrpinwagavuv.supabase.co/functions/v1/saveLead` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | Sua Anon Key do Supabase | Production, Preview, Development |

3. **Marque todos os ambientes** (Production, Preview, Development)
4. **Salve**

### Como obter a Anon Key:

1. Acesse: https://supabase.com/dashboard/project/xlbulinctrpinwagavuv
2. Vá em **Project Settings** → **API**
3. Copie a **`anon` `public`** key (não a `service_role`!)

---

## ✅ Passo 4: Verificar o Deploy

Após o deploy:

1. **Acesse a URL** fornecida pela Vercel (ex: `site-rapina.vercel.app`)
2. **Teste o formulário**:
   - Preencha o formulário
   - Envie
   - Verifique se redireciona para `/obrigado`
   - Verifique se o lead foi salvo no Supabase

3. **Verifique os logs**:
   - No dashboard da Vercel: **Deployments** → Seu deploy → **Logs**
   - Verifique se não há erros

---

## 🔄 Passo 5: Deploy Automático (Opcional)

A Vercel faz deploy automático quando você faz push para o repositório:

1. **Push para `main`** → Deploy em produção
2. **Push para outras branches** → Deploy de preview
3. **Pull Requests** → Deploy de preview automático

---

## 🐛 Troubleshooting

### Erro: "Module not found"

**Solução**: Verifique se todas as dependências estão no `package.json`

```bash
npm install
```

### Erro: "Environment variable not found"

**Solução**: 
1. Verifique se as variáveis estão configuradas na Vercel
2. Reinicie o deploy após adicionar variáveis
3. Variáveis do Vite precisam começar com `VITE_`

### Erro: "Build failed"

**Solução**:
1. Teste o build localmente: `npm run build`
2. Verifique os logs na Vercel
3. Certifique-se de que o Node.js está na versão correta (Vercel usa Node 18+)

### Formulário não funciona em produção

**Solução**:
1. Verifique se `VITE_SUPABASE_FUNCTION_URL` está configurada
2. Verifique se `VITE_SUPABASE_ANON_KEY` está configurada
3. Verifique se a Edge Function está deployada no Supabase
4. Abra o console do navegador (F12) e verifique erros

---

## 📝 Checklist de Deploy

Antes de fazer deploy, verifique:

- [ ] `vercel.json` configurado
- [ ] `.gitignore` configurado (não commitar `.env`)
- [ ] Código commitado e pushado para Git
- [ ] Edge Function `saveLead` deployada no Supabase
- [ ] Variáveis de ambiente da Edge Function configuradas no Supabase
- [ ] Anon Key copiada do dashboard do Supabase
- [ ] Variáveis de ambiente configuradas na Vercel:
  - [ ] `VITE_SUPABASE_FUNCTION_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] Build local funciona: `npm run build`
- [ ] Teste local funciona: `npm run dev`

---

## 🎯 Domínio Customizado (Opcional)

Após o deploy, você pode adicionar um domínio customizado:

1. No dashboard da Vercel: **Project Settings** → **Domains**
2. Adicione seu domínio
3. Configure os DNS conforme instruções da Vercel

---

## 📊 Monitoramento

A Vercel fornece:
- ✅ Analytics de performance
- ✅ Logs de erro
- ✅ Métricas de uso
- ✅ Deploy previews

---

## 💰 Custos

- ✅ **Plano Hobby (Gratuito)**: Perfeito para começar
  - Deploys ilimitados
  - 100GB bandwidth/mês
  - Domínios customizados
  - SSL automático

---

## 🚀 Próximos Passos

1. **Fazer deploy inicial**
2. **Testar todas as funcionalidades**
3. **Configurar domínio customizado** (se necessário)
4. **Monitorar performance**

---

## 📚 Recursos Úteis

- [Documentação Vercel - Vite](https://vercel.com/docs/frameworks/vite)
- [Documentação Supabase - Edge Functions](https://supabase.com/docs/guides/functions)
- [Vercel Dashboard](https://vercel.com/dashboard)

---

**Boa sorte com o deploy! 🎉**

