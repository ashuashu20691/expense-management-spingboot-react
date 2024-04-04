#!/bin/bash

# Configuration Variables
SOURCE_DB_OCID="ocid1.autonomousdatabase.oc1.ap-mumbai-1.anrg6ljrobogfhqajjp7nk74dr3bputn3aa646uistr5xiyxwu5tkh3octuq"
CLONE_TYPE="FULL"
CLONE_DB_DISPLAY_NAME="Test Clone"
COMPARTMENT_OCID="ocid1.compartment.oc1..aaaaaaaavkerdgzd55avjsnomocb2ttxb4j4j7gecxwdfwtstwb2iyowtfba"

# Create Autonomous Database from Clone
echo "Creating Autonomous Database from Clone..."
CREATE_RESPONSE=$(oci db autonomous-database create-from-clone \
                --clone-type "$CLONE_TYPE" \
                --compartment-id "$COMPARTMENT_OCID" \
                --source-id "$SOURCE_DB_OCID" \
                --display-name "$CLONE_DB_DISPLAY_NAME" \
                --wait-for-state AVAILABLE \
                --query 'data.id' --raw-output)

if [ -z "$CREATE_RESPONSE" ]; then
    echo "Failed to create the Autonomous Database from Clone."
    exit 1
else
    CLONED_DB_OCID=$CREATE_RESPONSE
    echo "Successfully created the Autonomous Database from Clone. OCID: $CLONED_DB_OCID"
fi

# Optionally, add any additional parameters as needed
