# DOCKER

## Desarrollo

Cada servicio tiene su propio Dockerfile para generar las imágenes a partir del docker-compose del directorio raíz.

Para realizar la generación del worker mediante Dockerfile, hay que eliminar el plugin de jib del pom.xml.

## Ejecución

Para realizar la ejecución de la aplicación mediante las imágenes publicadas en docker hub, se ejecuta el docker-compose del directorio /executable.

## JIB

El comando usado para la subida del contenedor worker, ejecutado desde el directorio /worker, es el siguiente:

```bash
sudo mvn compile jib:build -Dimage=vicsmr/worker
```
