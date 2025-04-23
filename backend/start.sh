#!/bin/bash

# Variables
WORKERS=2
HOST="0.0.0.0"
PORT=8050
APP="app:app"
LOG_DIR="logs"
ACCESS_LOG="$LOG_DIR/access_log.log"
ERROR_LOG="$LOG_DIR/error_log.log"
TIMEOUT=6000

# Ensure logs directory exists
mkdir -p "$LOG_DIR"

# Run the Gunicorn server with variables
gunicorn --workers "$WORKERS" \
         -b "$HOST:$PORT" \
         "$APP" \
         --access-logfile "$ACCESS_LOG" \
         --error-logfile "$ERROR_LOG" \
         --daemon \
         --timeout "$TIMEOUT"
