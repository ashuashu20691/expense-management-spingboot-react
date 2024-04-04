#!/bin/bash

# Configuration Variables
SOURCE_DB_OCID="ocid1.autonomousdatabase.oc1.ap-mumbai-1.anrg6ljrobogfhqajjp7nk74dr3bputn3aa646uistr5xiyxwu5tkh3octuq"
CLONE_TYPE="FULL"
CLONE_DB_DISPLAY_NAME="Test Clone"
CLONE_DB_NAME="TestClone1"
COMPARTMENT_OCID="ocid1.compartment.oc1..aaaaaaaavkerdgzd55avjsnomocb2ttxb4j4j7gecxwdfwtstwb2iyowtfba"
ADMIN_PASSWORD="Igdefault@123"
COMPUTE_MODEL="ECPU"
COMPUTE_COUNT=2
DB_WORKLOAD="OLTP"

# Create Autonomous Database from Clone
echo "Creating Autonomous Database from Clone..."
CREATE_RESPONSE=$(oci db autonomous-database create-from-clone \
                --clone-type "$CLONE_TYPE" \
                --compartment-id "$COMPARTMENT_OCID" \
                --source-id "$SOURCE_DB_OCID" \
                --display-name "$CLONE_DB_DISPLAY_NAME" \
                --db-name "$CLONE_DB_NAME" \
                --wait-for-state AVAILABLE \
                --admin-password "$ADMIN_PASSWORD" \
                --data-storage-size-in-tbs 1 \
                --compute-model "$COMPUTE_MODEL" \
                --compute-count "$COMPUTE_COUNT" \
                --db-workload "$DB_WORKLOAD")

if [ -z "$CREATE_RESPONSE" ]; then
    echo "Failed to create the Autonomous Database from Clone."
    exit 1
else
    CLONED_DB_OCID=$(echo "$CREATE_RESPONSE" | jq -r '.data.id')
    echo "Successfully created the Autonomous Database from Clone. OCID: $CLONED_DB_OCID"
fi