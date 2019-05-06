call getLatestVersion
@echo off
echo ########################
echo ########################
echo ########################
echo #getLatestVersion Done!#
echo ########################
echo ########################
echo ########################
Setlocal EnableDelayedExpansion
rem Read the lines of JSon file, removing braces
REM for /F "tokens=1,2" %%a in (../dump/latestBuild.json) do (
REM     echo "%%a"
REM )



REM set "jsonfile=latestBuild.json"
REM REM ID
REM set "psCmd="add-type -As System.Web.Extensions;^
REM $JSON = new-object Web.Script.Serialization.JavaScriptSerializer;^
REM $JSON.DeserializeObject($input).dataViewSet.data.id""

REM for /f %%I in ('^<"%jsonfile%" powershell -noprofile %psCmd%') do (
REM     if "%%I"=="1" (
REM         echo true
REM     )
REM )
