#!/bin/bash

# Extract the TNS_SERVICE_NAME from the tnsnames.ora file
TNS_SERVICE_NAME=$(grep -o '\w*_tp' /wallet/tnsnames.ora | grep -o '^[^_]*' | head -n 1)

# Export the variable for this session
export TNS_SERVICE_NAME

# Echo the variable (for debugging, optional)
echo "Running Java application with TNS_SERVICE_NAME: $TNS_SERVICE_NAME"

# Start the Java application with the dynamically set TNS_SERVICE_NAME
exec java -Dspring.datasource.url="jdbc:oracle:thin:@${TNS_SERVICE_NAME}_tp?TNS_ADMIN=/wallet" -jar /app/app.jar