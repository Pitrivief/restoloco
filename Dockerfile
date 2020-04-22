FROM openjdk:8-jdk-alpine
#Working directories for Tomcat
VOLUME /tmp 
ARG JAR_FILE
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
EXPOSE 8090