# Trainy

Welcome to Trainy, a comprehensive fitness application designed to motivate, guide, and track your fitness journey. This README provides instructions on how to clone and run the application locally.

With Trainy, users can create custom workouts from an extensive collection of exercises, each with varying levels of difficulty from beginner to advanced. Each exercise comes equipped with a helpful video and description to ensure correct form and technique. For added convenience and organization, users can schedule their custom workouts on a built-in calendar, enabling easy tracking of fitness progress and routine. Beyond individual workouts, Trainy also houses a smart recommendation system that encourages progress by suggesting harder workouts based on previous difficulties.

## Prerequisites

- React-Native (version 0.71.8)
- MongoDB (latest version pulled from Docker Hub)
- Node.js (version 18.14.0)
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

## Demo Account

Username: demouser

Password: demo1234!

## Contacts

For any queries or feedback, please feel free to reach out to us:

Luka Moleh: luka.moleh@student.um.si

Nik Fišer: nik.fiser@student.um.si

Anej Lah: anej.lah@student.um.si
