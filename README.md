# Ubay

## Abstract

Este repositorio contiene todo el código fuente y documentación de la aplicación Ubay, realizada como parte de la asignatura de ingeniería del software, del grado de ingeniería informàtica en la Universitat de Barcelona.

En este proyecto, pretendemos aplicar todas las técnicas de diseño, desarrollo e implementación de software que hemos aprendido durante los estudios de grado para desarrollar una aplicación web de venta de productos on-line, de una manera profesional, y utilizando metodologias que se usan en las empresas y organizaciones más punteras del sector.

Los integrantes del proyecto somos Nerea Cuba, Joan Domenech, Ángel Morales, Adrià Rojo y Changhao Wang.

## Funcionamiento de la aplicación


Cuando accedemos a la página, vamos a la homepage, desde la que podemos ver distintos productos disponibles:

![Homepage image](https://github.com/UB-ES-2021-A3/Ubay/blob/main/documents/gallery/UBAY_DEMO_HOMEPAGE.png)

Podemos buscar otros usando la barra de búsqueda, o acceder a la información de un producto seleccionandolo.


## Sistema de branching

Para este proyecto utilizaremos la metodologia github flow, que no permite desarrollar la aplicación con un sistema de ramas, las quales vamos juntando a través de pull request, que además nos obligan a revisar el código generado por nuestros compañeros y facilita que la aplicación se desarrolle de una forma coherente.

Sobre las distintas ramas del proyecto, podemos destacar 4 principales: main, development, frontend y backend. En la rama main encontramos la última versión de la aplicación ya puesta en producción (con el deployment hecho). En la rama development, como su nombre indica, es la última versión funcional en la que aún se está trabajando. 
En la rama frontend se trabajan los avances de la parte visual de la aplicación (UI, views, web...), mientras que en la rama backend se trabajan todos los aspectos del modelo de datos de la página (obtención de recursos, bases de datos, estructuras de datos...). Podemos ver que la rama development servirá de punto de encuentro entre estas dos últimas ramas. 
Aunque a veces será necesario trabajar tanto en el backend como en el frontend a la vez, en estos casos añadiremos primero estos a la rama backend.


# Database modeling

In this section we will show models and documentation related with our database modeling.


![product table](https://github.com/UB-ES-2021-A3/Ubay/blob/main/documents/gallery/db_product_fields.png)

# heroku deployment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build --prod --build-optimizer --baseHref="/static/"` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Deployed website

Latest deployed version can be found at the urls: https://ubay-2021-es.herokuapp.com/ or https://ubayub.herokuapp.com/
