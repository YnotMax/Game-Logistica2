# 🚀 Deploy no Vercel - Logistics Manager

Este guia mostra como fazer o deploy do jogo no Vercel de forma rápida e fácil.

---

## 📋 Pré-requisitos

1. ✅ Conta no GitHub (para hospedar o código)
2. ✅ Conta no Vercel (gratuita) - [vercel.com](https://vercel.com)
3. ✅ Git instalado no computador

---

## 🎯 Método 1: Deploy via Interface Web (Mais Fácil)

### Passo 1: Preparar o Repositório Git

```bash
# 1. Inicializar repositório (se ainda não fez)
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Fazer commit
git commit -m "Initial commit - Logistics Manager Game"
```

### Passo 2: Fazer Push para o GitHub

```bash
# 1. Criar um novo repositório no GitHub
# Acesse: https://github.com/new
# Nome sugerido: logistics-manager-game

# 2. Vincular ao repositório remoto (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/logistics-manager-game.git

# 3. Fazer push
git branch -M main
git push -u origin main
```

### Passo 3: Deploy no Vercel

1. **Acesse**: [vercel.com/new](https://vercel.com/new)
2. **Faça login** com sua conta GitHub
3. **Importe** o repositório `logistics-manager-game`
4. **Configurações** (Vercel detecta automaticamente):
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. **Clique em "Deploy"**

⏱️ **Aguarde 1-2 minutos** e pronto! Seu jogo estará online!

---

## 🎯 Método 2: Deploy via CLI (Mais Rápido)

### Passo 1: Instalar Vercel CLI

```bash
# Instalar globalmente
npm install -g vercel
```

### Passo 2: Fazer Login

```bash
# Login no Vercel
vercel login
```

### Passo 3: Deploy

```bash
# Deploy de produção
vercel --prod
```

**Responda as perguntas**:
- Set up and deploy? → **Y**
- Which scope? → Escolha sua conta
- Link to existing project? → **N**
- What's your project's name? → `logistics-manager` (ou deixe padrão)
- In which directory is your code located? → `./` (padrão)
- Want to override settings? → **N**

✅ **Pronto!** Em 1-2 minutos seu jogo estará online!

---

## ⚙️ Configurações do Vercel (Automáticas)

O Vercel detecta automaticamente:

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "outputDirectory": "dist"
}
```

---

## 🔍 Verificar Build Local (Antes de Fazer Deploy)

É sempre bom testar o build antes de fazer deploy:

```bash
# 1. Fazer build de produção
npm run build

# 2. Testar o build localmente
npm run preview
```

Se abrir sem erros em `http://localhost:4173`, está pronto para deploy!

---

## 🚨 Solução de Problemas

### Erro: "Build failed"

**Causa**: Erros de TypeScript ou faltando dependências

**Solução**:
```bash
# 1. Verificar erros localmente
npm run build

# 2. Se houver erros, corrija e faça commit
git add .
git commit -m "Fix build errors"
git push
```

### Erro: "Tela branca após deploy"

**Causa**: Paths incorretos ou faltando assets

**Solução**: Verifique no console do navegador (F12) se há erros

---

## 📱 Acessar seu Jogo

Após o deploy, você receberá uma URL como:

```
https://logistics-manager-XXXX.vercel.app
```

**Para personalizar o domínio**:
1. Vá em **Settings** no dashboard do Vercel
2. Clique em **Domains**
3. Adicione um domínio personalizado

---

## 🔄 Atualizações Automáticas

Depois do primeiro deploy:

1. **Faça mudanças** no código
2. **Commit e push**:
   ```bash
   git add .
   git commit -m "Descrição das mudanças"
   git push
   ```
3. **Vercel faz deploy automático!** ✨

---

## 📊 Monitorar Deploy

- **Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Logs**: Ver status de cada deploy
- **Analytics**: Ver quantas pessoas jogaram
- **Preview**: Cada branch/PR gera uma URL de preview

---

## 🎁 Recursos Grátis do Vercel

✅ HTTPS automático  
✅ CDN global  
✅ Deploy automático  
✅ Preview de branches  
✅ Analytics básico  
✅ 100GB de bandwidth/mês  

---

## 🤝 Compartilhar o Jogo

Após o deploy, compartilhe com:

```
🎮 Jogue Logistics Manager!
https://logistics-manager-XXXX.vercel.app

Gerencie um centro de distribuição de produtos médicos!
```

---

## 📝 Checklist Final

- [ ] Código no GitHub
- [ ] Build local funcionando (`npm run build`)
- [ ] Deploy no Vercel
- [ ] Jogo abrindo na URL do Vercel
- [ ] Logs e eventos funcionando
- [ ] Compartilhado com amigos! 🎉

---

**Está pronto para jogar online!** 🚀📦

---

*Última atualização: Dezembro 2025*
