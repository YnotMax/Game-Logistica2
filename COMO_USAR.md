# 🎮 Como Iniciar o Jogo

## 🚀 Método Fácil (Duplo Clique)

### Para Jogar:
1. **Duplo clique** em `INICIAR.bat`
2. Aguarde alguns segundos
3. O navegador abrirá automaticamente em `http://localhost:5173`
4. **Divirta-se!** 🎉

### Para Fazer Build de Produção:
1. **Duplo clique** em `BUILD.bat`
2. Aguarde a compilação
3. Arquivos prontos para deploy em `dist/`

---

## ⌨️ Método Manual (Terminal)

### Desenvolvimento:
```bash
npm run dev
```
Acesse: http://localhost:5173

### Build de Produção:
```bash
npm run build
```

### Testar Build:
```bash
npm run preview
```
Acesse: http://localhost:4173

---

## 🛑 Parar o Servidor

- **Via .bat**: Pressione `Ctrl+C` na janela preta
- **Via terminal**: Pressione `Ctrl+C`

---

## 📝 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Compila para produção |
| `npm run preview` | Testa o build de produção |

---

## 🚨 Problemas?

### "npm não é reconhecido"
- Instale o Node.js: https://nodejs.org

### Porta 5173 em uso
- Feche outras instâncias do jogo
- Ou mude a porta em `vite.config.ts`

### Tela azul / não carrega
- Abra o Console (F12)
- Veja os logs para identificar o erro
- Atualize a página (F5)

---

📚 **Guia completo**: Veja `README.md` para mais detalhes sobre o jogo
