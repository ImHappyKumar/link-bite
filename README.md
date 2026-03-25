# LinkBite

Developed by Happy Kumar

Link Bite is a lightweight and efficient URL shortening tool built to simplify link sharing and management. It allows users to convert long URLs into short, easy-to-share links while providing a clean and user-friendly interface for quick access and usage.

## Features
- **URL Shortening:** Convert long URLs into short, manageable links.
- **Quick Copy:** Easily copy shortened links to the clipboard.
- **Fast Processing:** Generate short links instantly with optimized performance.
- **Clean Interface:** Simple and intuitive UI for better user experience.
- **Link Management:** Keep track of generated links.
- **Responsive Design:** Works seamlessly across devices.

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js: https://nodejs.org/

## Installation
1. Clone this repository to your local machine:
    ```
    git clone https://github.com/ImHappyKumar/link-bite.git
    ```
2. Navigate to the project directory:
    ```
    cd link-bite
    ```
3. Install dependencies:
    ```
    npm install
    ```

## Firebase Setup
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable **Firestore Database**
3. Copy your Firebase config
4. Create a file named:
    ```
    firebase.js
    ```
5. Use the sample file provided:
    ```
    firebase.sample.js
    ```
6. Replace placeholders with your actual Firebase credentials

## Usage
1. Start the development server:
    ```
    npm run dev
    ```
2. Access the application in your browser at http://localhost:5173

## Deployment (Firebase Hosting)
1. Install Firebase CLI:
    ```
    npm install -g firebase-tools
    ```
2. Login to Firebase:
    ```
    firebase login
    ```
3. Initialize project:
    ```
    firebase init
    ```
4. Deploy:
    ```
    firebase deploy
    ```

## Contributing
Contributions are welcome! If you encounter issues or have suggestions, please create an issue or submit a pull request.
