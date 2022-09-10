ECHO OFF
ECHO Starting Services
CD D:\zuplyd
START npm nx serve frontend
START npm nx serve api-gateway
START npm nx serve user-mgmt
@REM START nx serve procurement
@REM START nx serve comp-mgmt
@REM START nx serve inventory
@REM START nx serve notification
@REM START nx serve request-handler
PAUSE
