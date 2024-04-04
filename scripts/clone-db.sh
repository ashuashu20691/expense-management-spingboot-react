#!/bin/bash

# Configuration Variables
SOURCE_DB_OCID="ocid1.autonomousdatabase.oc1.ap-mumbai-1.anrg6ljrobogfhqajjp7nk74dr3bputn3aa646uistr5xiyxwu5tkh3octuq"
CLONE_DB_NAME="test-clone"
CLONE_DB_DISPLAY_NAME="Test Clone"
CPU_CORE_COUNT=3 # Adjust as needed
DATA_STORAGE_SIZE_IN_TB=1 # Adjust as needed
COMPARTMENT_OCID="ocid1.compartment.oc1..aaaaaaaavkerdgzd55avjsnomocb2ttxb4j4j7gecxwdfwtstwb2iyowtfba"

# Create Autonomous Database from Clone
echo "Creating Autonomous Database from Clone..."
CREATE_RESPONSE=$(oci db autonomous-database create-from-clone \
                --source-autonomous-database-id $SOURCE_DB_OCID \
                --display-name "$CLONE_DB_DISPLAY_NAME" \
                --cpu-core-count $CPU_CORE_COUNT \
                --data-storage-size-in-tbs $DATA_STORAGE_SIZE_IN_TB \
                --compartment-id $COMPARTMENT_OCID \
                --wait-for-state AVAILABLE \
                --query 'data.id' --raw-output)

if [ -z "$CREATE_RESPONSE" ]; then
    echo "Failed to create the Autonomous Database from Clone."
    exit 1
else
    CLONED_DB_OCID=$CREATE_RESPONSE
    echo "Successfully created the Autonomous Database from Clone. OCID: $CLONED_DB_OCID"
fi

# Optionally, Resize the Cloned Database (Upgrade or Downgrade)
# This step is optional and can be used to further adjust the cloned database if needed
echo "Resizing the cloned Autonomous Database..."
oci db autonomous-database update --autonomous-database-id $CLONED_DB_OCID \
    --cpu-core-count $CPU_CORE_COUNT \
    --data-storage-size-in-tbs $DATA_STORAGE_SIZE_IN_TB \
    --wait-for-state AVAILABLE

echo "Resize operation completed."

# Add any additional operations you need to perform on the cloned DB below
