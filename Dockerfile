# Use the official Maven image as the base image for building
FROM maven:3.8.4-openjdk-17-slim AS build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml file to the container
COPY pom.xml .

# Download the dependencies
RUN mvn dependency:go-offline -B

# Copy the project source code to the container
COPY src src

# Build the application
RUN mvn package -DskipTests

# Use the official OpenJDK image as the base image for runtime
FROM openjdk:17-jdk-slim AS runtime

# Install OCI CLI and other necessary packages
RUN apt-get update && \
    apt-get install -y curl python3 python3-pip git && \
    pip3 install oci-cli && \
    apt-get install -y unzip && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the build image to the runtime image
COPY --from=build /app/target/spring-boot-oracle-0.0.1-SNAPSHOT.jar app.jar

# Expose the port on which the application will run
EXPOSE 8080

# Copy additional files
COPY setup-oci-cli.sh setup-oci-cli.sh
COPY entrypoint.sh entrypoint.sh
COPY branch_info.txt branch_info.txt

# Set permissions and execute setup script
RUN chmod +x setup-oci-cli.sh entrypoint.sh && \
    sh setup-oci-cli.sh

# Remove unnecessary packages and files
RUN apt-get remove -y curl python3-pip git unzip && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /root/.m2

# Specify the command to run your application
ENTRYPOINT ["/app/entrypoint.sh"]
