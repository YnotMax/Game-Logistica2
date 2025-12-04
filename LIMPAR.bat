@echo off
title Logistics Manager - Limpar e Reinstalar
color 0C

echo.
echo ========================================
echo    LIMPAR E REINSTALAR
echo ========================================
echo.
echo ATENCAO: Isso vai:
echo - Deletar a pasta node_modules
echo - Deletar a pasta dist
echo - Reinstalar todas as dependencias
echo.
echo Pressione qualquer tecla para continuar...
echo ou feche esta janela para cancelar.
pause > nul

echo.
echo [1/3] Removendo node_modules...
if exist "node_modules\" (
    rmdir /s /q "node_modules"
    echo ^> Removido!
) else (
    echo ^> Pasta nao encontrada, pulando...
)

echo.
echo [2/3] Removendo build antigo...
if exist "dist\" (
    rmdir /s /q "dist"
    echo ^> Removido!
) else (
    echo ^> Pasta nao encontrada, pulando...
)

echo.
echo [3/3] Instalando dependencias novamente...
echo.
call npm install

if errorlevel 1 (
    echo.
    echo [ERRO] Falha ao instalar dependencias!
    pause
    exit /b 1
)

echo.
echo ========================================
echo    LIMPEZA CONCLUIDA!
echo ========================================
echo.
echo O projeto foi reinstalado com sucesso.
echo Agora voce pode usar INICIAR.bat normalmente.
echo.
pause
