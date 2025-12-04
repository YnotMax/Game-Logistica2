@echo off
title Logistics Manager - Build de Producao
color 0B

echo.
echo ========================================
echo    LOGISTICS MANAGER - BUILD
echo ========================================
echo.
echo [1/2] Verificando dependencias...
echo.

if not exist "node_modules\" (
    echo ^> Instalando dependencias...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo [ERRO] Falha ao instalar dependencias!
        pause
        exit /b 1
    )
    echo.
)

echo [2/2] Compilando para producao...
echo.

call npm run build

if errorlevel 1 (
    echo.
    echo ========================================
    echo [ERRO] Falha ao compilar o projeto!
    echo ========================================
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo    BUILD CONCLUIDO COM SUCESSO!
echo ========================================
echo.
echo Arquivos prontos para deploy em: dist/
echo.
echo Proximos passos:
echo   1. Teste local: npm run preview
echo   2. Deploy Vercel: vercel --prod
echo.
pause
