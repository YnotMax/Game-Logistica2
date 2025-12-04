@echo off
title Logistics Manager - Iniciando...
color 0A

echo.
echo ========================================
echo    LOGISTICS MANAGER - GAME SERVER
echo ========================================
echo.
echo [1/2] Verificando dependencias...
echo.

if not exist "node_modules\" (
    echo ^> Instalando dependencias pela primeira vez...
    echo ^> Isso pode levar alguns minutos...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo [ERRO] Falha ao instalar dependencias!
        echo Verifique se o Node.js esta instalado.
        echo.
        pause
        exit /b 1
    )
    echo.
    echo ^> Dependencias instaladas com sucesso!
    echo.
) else (
    echo ^> Dependencias ja instaladas! OK
    echo.
)

echo [2/2] Iniciando servidor de desenvolvimento...
echo.
echo ========================================
echo    JOGO RODANDO EM:
echo    http://localhost:5173
echo ========================================
echo.
echo - Pressione Ctrl+C para parar o servidor
echo - Nao feche esta janela enquanto estiver jogando
echo.
echo Abrindo navegador em 3 segundos...
echo.

timeout /t 3 /nobreak > nul
start http://localhost:5173

echo Servidor iniciado!
echo.

call npm run dev
