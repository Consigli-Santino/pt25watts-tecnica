# Prueba Técnica - Aplicación Full Stack

Esta aplicación cumple con todos los requisitos funcionales que se pidieron en la prueba técnica.

## Demo en Producción

**URL**: [http://frontendpt25watts-env-4.eba-mh2fxvpg.us-east-2.elasticbeanstalk.com/login](http://frontendpt25watts-env-4.eba-mh2fxvpg.us-east-2.elasticbeanstalk.com/login)

### Usuarios de Prueba

- **Administrador**: `santino` / `123`
- **Cliente**: `eliseo` / `123`

## Resolucion

Para el **backend** usé Node.js con Express. El **frontend** lo desarrollé en React con Vite. La **base de datos** la armé con MySQL.

Para desarrollo local utilicé Docker pulleando una imagen de MySQL, así no tengo que instalar gestores de base de datos en mi máquina. Para producción subí todo a AWS: la base de datos en RDS y tanto el frontend como el backend en Elastic Beanstalk.

El frontend lo compilé y generé los archivos estáticos para producción. Dentro de AWS creé los entornos necesarios y configuré todo con variables de entorno para separar desarrollo de producción.

## Autenticacion y usuarios

Todos los usuarios tienen autenticación cuando se loguean. Los endpoints no están protegidos porque no era un requisito funcional, pero sí implementé la autenticación con JWT.

Agregué algo que no era requisito pero me pareció útil: la gestión de usuarios para poder manejar administradores y clientes por separado.

## Diagrama de Base de Datos

<img width="1381" height="679" alt="image" src="https://github.com/user-attachments/assets/81ce9445-80eb-4609-a393-1655efeb5ea5" />


## Cómo ejecutarlo local

La base de datos se crea automáticamente cuando prendés el backend, está configurado para que haga el "create_all".

1. Primero ejecutá el docker-compose para levantar el contenedor de MySQL:
```bash
docker-compose up -d
```

2. Después se inicia el backend:
```bash
npm run dev
```

3. Y por último el frontend:
```bash
npm run dev
```
## El repositorio incluye

- Todo el código fuente
- El docker-compose para la base de datos
- Un script con los inserts de prueba
- Las variables de entorno ya configuradas
