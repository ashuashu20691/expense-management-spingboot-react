#!/bin/bash

# Set up OCI CLI configuration directory
mkdir -p /root/.oci

echo "-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD1Uu2TWhgyB5ph
OnoNOQy1Mp/qRsrZP8FUD/ZKjZYEHjIv+3EtJ0DyZQny9dQyOLqzf8b2UnP1nxIJ
AAtBCi475NkWrq1H4/J1a9jL5d3kwcV+g1TxoWqcHtFd0CauHYM+wGe9laCgMTCZ
HCRLsAfgCXRU8jh3J7jciWjAtMbOfkBd9JYjqW1IfcRRV/TZfo/bJRl+PF5GVN9x
AlMb4Bn1bx8Chk1NtddsnjRkYBgaJdZoLAHRhXkWmvORJMn/70BqEgxntxH+s0a2
Kv1ZtziVziaL6Nj+6bCrkFtL9AklBesdCuV4KnL9Thg0KJtGJP0RhLiI48rFFoFM
VjQk9Oa3AgMBAAECggEBAOsQRuxGC6EEf/xh18kLvQ1yMKB+rKd123z8vnW5LOFN
PbGUMGGfly+reNkAjA6DJQIRkUc8wje778AH9sCfTKW/JfQB869Kz2uLpvPYkcE7
mk0a8i2FCW4GaX6GkEmNpdBe9AhIctyLxZEv0edkCGe3J2ytm0UxHoTSdTkQ/t2j
YynWeR0ZNI/aznPKCcwEmipetilT3lH3xMYqcbixGOqfrAPdS2LE74LO8rp03tjb
xPBgeiwZ9PyieOZCJ0zZA2BFRAX9imY6Ga43P5bH6X8VwYygrEUzG5PT58l8GSX/
Ih8xavetRfNSrqV6QBKuitKhK7SMS9S1HYzzRFZ/5cECgYEA/TG823RLSmy7JbIi
4U+WbLY868at1HZDH1brtkNtv0QsmdKuAJpBylXsTD5Xfw6iO5nTNKIyMnhleaMT
0BC0Id7T9/8tnuHfkCCSchfEFVIDdjyPHVm4sUe9TEpF2mkddjJQNtU21bPIeZxQ
O1FYi2c7AKZidALw3iOeZ4/f31kCgYEA+ArdGbj+3YBdBN7/Vsu2DN+RJa14jujI
Kb7fFq1JmNrfUL8HgsH3DOkK0kaEr+I7IU2+8/nvt/Svl2jcM4SM/qSD7818Wo44
5akk1w883Ap5++HTP1TE2RLIKtH7ysPU/GZ/3wOmWKZJ4TjSbs7TZp7n5pi/7Djf
bW+mKpE/xI8CgYEAgIHxF/VjjWe4aP6L442QjKbGLukNK0vG764fPsfkePJyLLSY
qiehAsAvidcOc6eKwfNmFk3IaoNfBai2kqEXvCUrsrBqiDyeSrmteokDdcrFhQph
nQT/z8LYmlMMNzmowWfx/JKlHTv9oXOr6R91cHO5p6/LQpSHikfLy0Zj2ykCgYAD
SAmCxJrCjWctoFGacVl4NCD0caYNpfC39Kl44FP/7K1VoSFVToGZLyAQhhRNS13i
4+dpzN2p/lewVhfLqq4+1ChWrM4/WHBSQXmWSsJQWucgOO2VgeaUxJXXUy3UkeCo
ciaw6ZhyxchmbV0DUEMlsWZ5+31Wf64dAYQePgus6wKBgFJ+iaqE76dp/nVKcbbU
ljRB1XMnA1K8cwZvwqDfnRoKbA8+jsgXQTs7W57z9ktKU2wV4JL0OvNfnwsdOrwk
r4VCUvfonRg/k/9A6+VRw1xcXqMQ+L2J1MWRadQiXQx7MSjwWGyaRPfURdxzUoi9
bYDZl5UVuwIj1vr7NB5qM3/g
-----END PRIVATE KEY-----" > /root/.oci/oci_api_key.pem


# Create the OCI CLI config file dynamically using environment variables
cat > /root/.oci/config << EOF
[DEFAULT]
user=ocid1.user.oc1..aaaaaaaajxmzb5c53vppyqqbsfidw6ltgkpitiswxshc37soo3ebw3zxl4xa
fingerprint=ed:0d:8e:a6:ca:8a:5c:06:cb:f0:99:3a:78:43:db:8f
tenancy=ocid1.tenancy.oc1..aaaaaaaafj37mytx22oquorcznlfuh77cd45int7tt7fo27tuejsfqbybzrq
region=ap-mumbai-1
key_file=/root/.oci/oci_api_key.pem
EOF

# Expect the OCI API private key to be passed as a Docker secret or bind-mounted file
# Ensure the oci_api_key.pem is placed correctly or mounted at runtime


chmod 600 /root/.oci/config /root/.oci/oci_api_key.pem

echo oci -v

BRANCH_NAME=$(cat branch_info.txt)


# Execute the command to get the content of the file from OCI Object Storage
ADB_ID=$(oci os object get --bucket-name expense-tracker --name "$BRANCH_NAME/cloned-adb-oci-id.txt" --file -)

# Check if the command was successful and the ADB_ID is not empty
if [ -n "$ADB_ID" ]; then
    echo "ADB ID retrieved successfully: $ADB_ID"
else
    echo "Failed to retrieve ADB ID"
fi


WALLET_PASSWORD="Igdefault123"

echo $ADB_ID

# Generate wallet for Autonomous Database
oci db autonomous-database generate-wallet --autonomous-database-id ${ADB_ID} --file /tmp/wallet.zip --password "${WALLET_PASSWORD}"

# Unzip the wallet file

unzip -P "${WALLET_PASSWORD}" -o /tmp/wallet.zip -d /wallet

echo /wallet/tnsnames.ora

# Remove the downloaded wallet zip file
rm /tmp/wallet.zip


# Execute OCI CLI command if provided
if [ "$#" -eq 0 ]; then
    # Default to bash if no command is specified
    exec /bin/bash
else
    # Execute the passed command
    exec "$@"
fi

export TNS_SERVICE_NAME=testcloneautomatecicdqaa