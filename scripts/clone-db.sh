 #!/bin/bash

# Configuration Variables
SOURCE_DB_OCID="source_db_ocid_here"
CLONE_DB_NAME="clone_db_name_here"
CLONE_DB_DISPLAY_NAME="Clone Database Display Name"
CPU_CORE_COUNT=2 # Adjust as needed
DATA_STORAGE_SIZE_IN_TB=1 # Adjust as needed
COMPARTMENT_OCID="compartment_ocid_here"

# Clone the Autonomous Database
echo "Cloning the Autonomous Database..."
CLONE_RESPONSE=$(oci db autonomous-database clone --source-id $SOURCE_DB_OCID \
                --clone-type FULL \
                --cpu-core-count $CPU_CORE_COUNT \
                --data-storage-size-in-tbs $DATA_STORAGE_SIZE_IN_TB \
                --db-name $CLONE_DB_NAME \
                --display-name $CLONE_DB_DISPLAY_NAME \
                --compartment-id $COMPARTMENT_OCID \
                --wait-for-state AVAILABLE \
                --query 'data.id' --raw-output)

if [ -z "$CLONE_RESPONSE" ]; then
    echo "Failed to clone the Autonomous Database."
    exit 1
else
    CLONED_DB_OCID=$CLONE_RESPONSE
    echo "Successfully cloned the Autonomous Database. OCID: $CLONED_DB_OCID"
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