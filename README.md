# Temperature Monitor

A full-stack application that publishes random temperature data via MQTT, stores it in a PostgreSQL database, and displays it in real-time on a React frontend.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Set Up Environment Variables](#2-set-up-environment-variables)
  - [3. Spin up the PostgreSQL container with Docker Compose](#3-start-the-postgres-with-docker-compose)
  - [4. Backend Setup](#2-backend-setup)
  - [5. Frontend Setup](#3-frontend-setup)
  - [6. Run the MQTT Publisher](#4-run-the-mqtt-publisher)

## Features

- **MQTT Publisher**: Publishes random temperature data every 2 seconds.
- **Backend**: Node.js server with TypeScript and Prisma ORM to subscribe to MQTT topics and store data in PostgreSQL.
- **Database**: PostgreSQL managed via Docker Compose.
- **Frontend**: React application with TypeScript and Tailwind CSS displaying real-time temperature data in a graph.
- **Real-Time Updates**: Graph updates every 2 seconds to reflect the latest temperature readings from the last minute.

## Tech Stack

- **Backend**: Node.js, TypeScript, Express, Prisma, MQTT
- **Database**: PostgreSQL, Docker Compose
- **Frontend**: React, TypeScript, Tailwind CSS, Chart.js
- **MQTT**: paho-mqtt (Python)

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine.
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
- [Python](https://www.python.org/) installed.

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/temperature-monitor.git
cd temperature-monitor
```

### 2. Set Up Environment Variables

To run this project, you will need to add the following environment variables to your .env file inside `backend`

`DATABASE_URL`
`MQTT_BROKER_HIVEMQ_URL`
`MQTT_TOPIC`
`PORT`
`CORS_ORIGIN`

### 3. Spin up the PostgreSQL container with Docker Compose

```bash
  docker-compose up db -d
```

### 4. Backend Setup

Go to the backend directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Create a .env file in the backend directory and add the following:

```bash
  DATABASE_URL=postgresql://<db-username>:<db-password>@localhost:5432/<db-name>
```

Replace `db-username`, `db-password`, and `db-name` with your PostgreSQL credentials.

Run Prisma migrations to set up the database:

```bash
  npx prisma migrate dev
```

Start the backend server:

```bash
  npm run dev
```

### 5. Frontend Setup

Navigate to the frontend directory:

```bash
  cd frontend
```

Install the frontend dependencies:

```bash
  npm install
```

Start the React frontend development server:

```bash
  npm run dev
```

### 6. Run the MQTT Publisher

Install the mqtt client `paho-mqtt` first:

```bash
  pip install paho-mqtt
```

Run the Python publisher script before running frontend to publish temperature data:

```bash
  cd publisher-subscriber
```

```bash
  python publisher.py
```
