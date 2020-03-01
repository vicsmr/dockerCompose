FROM maven as builder
COPY ./pom.xml /worker/
COPY . /worker/
WORKDIR /worker
RUN mvn verify clean --fail-never 
RUN mvn -o package

FROM openjdk:8-jre
COPY --from=builder /worker/target/*.jar /usr/app/

WORKDIR /usr/app
COPY wait-for-it.sh .
RUN chmod +x wait-for-it.sh

CMD ["./wait-for-it.sh" , "dbMYSQL:3306" , "--strict" , "--timeout=10000" , "--" ,  "java", "-jar", "worker.jar" ] 