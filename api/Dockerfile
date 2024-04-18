FROM maven:3.8.1-openjdk-17


WORKDIR /api/


COPY . /api/


RUN mvn clean package -DskipTests


EXPOSE 8082


# Indicar o caminho do .jar
ENTRYPOINT [ "java", "-jar", "./target/api-0.0.1-SNAPSHOT.jar", "--spring.datasource.url=${SPRING_DATASOURCE_URL}", "--spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}", "--server.port=${SERVER_PORT}"]
