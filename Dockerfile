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

# Use the official OpenJDK image as the base image
FROM openjdk:17-jdk-slim AS runtime

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the build image to the runtime image
COPY --from=build /app/target/spring-boot-oracle-0.0.1-SNAPSHOT.jar app.jar


# Expose the port on which the application will run
EXPOSE 8080

# Specify the command to run your application
CMD ["java", "-jar", "app.jar"]

#CMD ["mvn","spring-boot:run"]