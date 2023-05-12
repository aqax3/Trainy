# Trainy

Welcome to the repository of Trainy! This application consists of a frontend and a backend, and this README provides instructions on how to clone and run the application locally.

## Prerequisites

- Node.js (version v18.14.0)
- Docker (version 23.0.5)
- Expo CLI (installed globally)

## Clone the Repository

Clone this repository to your local machine using the following command:

git clone https://github.com/aqax3/trainy.git

## Backend Setup
Navigate to the backend directory:
```bash
cd trainy/backend
```
Install the required dependencies:
```bash
npm install
```
Start the Express.js and MongoDB server using Docker Compose. Make sure you have Docker installed and running on your machine. Run the following command in the uppermost directory that contains the docker-compose.yml file:
```bash
docker-compose up
```
This command will start the server and connect to the MongoDB database.

## Frontend Setup
Navigate to the frontend directory:
```bash
cd trainy/frontend
```
Install the required dependencies:
```bash
npm install
```
Start the frontend part using Expo CLI:
```bash
npx expo start
```
If the connection fails, try running Expo in tunnel mode:
```bash
npx expo start --tunnel
```
The Expo development server will start, and you can access your application through the Expo app on your mobile device, which you can download on the iOS App Store, or an emulator.