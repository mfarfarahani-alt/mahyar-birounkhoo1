@echo off
chcp 65001 >nul
setlocal

rem ===== Settings =====
set "REPO1=https://github.com/mfarfarahani-alt/mahyar-birounkhoo1.git"
set "REPO2=https://github.com/mahyarbiroonkhu-svg/mahyar.biroonkho.git"
set "BRANCH=main"

rem ===== Check that we are inside a git project =====
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo ERROR: This folder is not a git project. Place this file in the project root.
    pause
    exit /b 1
)

rem ===== Add remotes if they do not exist =====
git remote get-url origin >nul 2>&1 || git remote add origin %REPO1%
git remote get-url second >nul 2>&1 || git remote add second %REPO2%

echo.
echo Current remotes:
git remote -v
echo.

rem ===== Commit =====
set "MSG="
set /p MSG=Commit message [Enter for default]: 
if "%MSG%"=="" set "MSG=update %date% %time%"

git add .
git commit -m "%MSG%"
if errorlevel 1 echo (Nothing new to commit, continuing to push...)

rem ===== Push to repo 1 =====
echo.
echo ===== Pushing to repo 1 =====
git push origin %BRANCH%
if errorlevel 1 (
    echo WARNING: Push to repo 1 failed.
) else (
    echo OK: Repo 1 done.
)

rem ===== Push to repo 2 =====
echo.
echo ===== Pushing to repo 2 =====
git push second %BRANCH%
if errorlevel 1 (
    echo WARNING: Push to repo 2 failed. If it says non-fast-forward, histories differ.
    set "FORCE="
    set /p FORCE=Force push to repo 2? This REPLACES its history. [y/N]: 
    if /i "%FORCE%"=="y" (
        git push second %BRANCH% --force
    )
) else (
    echo OK: Repo 2 done.
)

echo.
echo Finished.
pause
endlocal
