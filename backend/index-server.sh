#!/bin/bash

# URL of the API zip file
API_URL="https://eu2.contabostorage.com/d1a2d105c028442a9d537e44356d5594:s2cie/APIs/v0.5.0-api.zip"
OUTPUT_FILE="v0.5.0-api.zip"

# Create a directory for the API if it doesn't exist
mkdir -p api

# Download the API zip file
echo "Downloading Index API..."
curl -L -o "$OUTPUT_FILE" "$API_URL"

if [ $? -eq 0 ]; then
    echo "Download completed successfully"
    
    # Unzip the file into the api directory
    echo "Extracting files..."
    unzip -o "$OUTPUT_FILE" -d api/
    
    if [ $? -eq 0 ]; then
        echo "Extraction completed successfully"
        
        # Clean up the zip file
        rm "$OUTPUT_FILE"
        echo "Cleaned up temporary files"
        
        # Navigate to the odinson-rest-api.sh location and run it
        echo "Starting Odinson REST API..."
        cd api/local/bin && nohup bash odinson-rest-api > ../logfile.log 2>&1 &

    else
        echo "Error: Failed to extract the zip file"
        exit 1
    fi
else
    echo "Error: Failed to download the file"
    exit 1
fi