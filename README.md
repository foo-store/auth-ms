<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# MICROSERVICIO DE AUTENTICACIÓN

## DESARROLLO

1. Clonar el repositorio
2. Crear un `.env` basado en `.env.sample`
3. Cambia las credenciales a tus credenciales
4. Ejecuta

    ```bash
    docker compose up --build
    ```

## PRODUCCIÓN

1. Clonar el repositorio
2. Crear un `.env` basado en `.env.sample`
3. Cambia las credenciales a tus credenciales
4. Ejecuta

    ```bash
    docker build -f dockerfile.prod -t auth-ms .
    ```
