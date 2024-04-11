# Use the official Maven image as the base image
FROM maven:3.8.4-openjdk-17-slim AS build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml file to the container
COPY pom.xml .

# Download the dependencies and create a layer for them
RUN mvn dependency:go-offline -B

# Copy the project source code to the container

COPY src src

# Build the application
RUN mvn package -DskipTests

# Use the official OpenJDK image as the base image for runtime
FROM openjdk:17-jdk-slim AS runtime

# Install OCI CLI. This requires some additional packages to be installed first.
RUN apt-get update && \
    apt-get install -y curl python3 python3-pip git && \
    pip3 install oci-cli && \
    apt-get install -y unzip && \
    rm -rf /var/lib/apt/lists/*


# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the build image to the runtime image
COPY --from=build /app/target/spring-boot-oracle-0.0.1-SNAPSHOT.jar app.jar

# Copy the wallet folder from the host to the container's root directory
#COPY wallet /wallet

# Optionally, add your OCI CLI configuration files
# COPY config /root/.oci/config
# COPY oci_api_key.pem /root/.oci/oci_api_key.pem

# Alternatively, you can configure OCI CLI dynamically at runtime 
# by setting environment variables in your container orchestration system (e.g., Kubernetes, Docker Compose)

# Expose the port on which the application will run
EXPOSE 8080

COPY setup-oci-cli.sh setup-oci-cli.sh

COPY branch_info.txt branch_info.txt

RUN chmod +x setup-oci-cli.sh

RUN sh setup-oci-cli.sh

# Specify the command to run your application
CMD ["java", "-Dspring.datasource.url=jdbc:oracle:thin:@${TNS_SERVICE_NAME}_tp?TNS_ADMIN=/wallet", "-jar", "app.jar"]