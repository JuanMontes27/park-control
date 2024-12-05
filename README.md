# Park control

## Description

This is an API that allows managing the access and exit of vehicles in a paid parking lot. It can register the entries and exits of vehicles, as well as calculate and record the corresponding charges according to the type of vehicle.

## Technologies Used

- **TypeScript**
- **NestJS**
- **TypeORM**
- **SQLite**

## Prerequisites

- Node.js
- npm

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/JuanMontes27/park-control.git
    ```
2. Navigate to the project directory:
    ```bash
    cd park-control
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the server:
    ```bash
    npm run start
    ```
2. Make requests to:
    ```
    http://localhost:3000/vehicles
    http://localhost:3000/vehicle-types
    ```

## Hexagonal Architecture

The application uses **hexagonal architecture** to allow a clear separation between business rules and external interfaces, thus facilitating the extensibility and maintenance of the project.

---

# Park Control

## Descripción

Es un API la cual permite gestionar el acceso y salida de vehículos a un estacionamiento de pago. Esta puede registrar las entradas y salidas de los vehículos, así como calcular y registrar los cobros correspondientes según el tipo de vehículo.

## Tecnologías Utilizadas

- **TypeScript**
- **NestJS**
- **TypeORM**
- **SQLite**

## Requisitos Previos

- Node.js
- npm

## Instalación

1. Clonar el repositorio:
    ```bash
    git clone https://github.com/JuanMontes27/park-control.git
    ```
2. Navegar al directorio del proyecto:
    ```bash
    cd park-control
    ```
3. Instalar las dependencias:
    ```bash
    npm install
    ```

## Uso

1. Iniciar el servidor:
    ```bash
    npm run start
    ```
2. Realizar peticiones a:
    ```
    http://localhost:3000/vehicles
    http://localhost:3000/vehicle-types
    ```

## Arquitectura Hexagonal

La aplicación utiliza la **arquitectura hexagonal** para permitir una separación clara entre las reglas de negocio y las interfaces externas, facilitando así la extensibilidad y el mantenimiento del proyecto.
