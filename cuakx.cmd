@echo off
setlocal
pushd "%~dp0" >nul
bash ./cuakx.sh %*
set "exitcode=%errorlevel%"
popd >nul
exit /b %exitcode%
