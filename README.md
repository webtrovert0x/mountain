# Covenant Of Mercy Interdenominational Mountain

A dynamic church website built with React, TypeScript, Vite, and Tailwind CSS. It features a complete public-facing interface for members and a secure backend portal for the admin to manage content dynamically.

## Features

- **Dynamic Sermons & Events**: Posts managed by the admin sync in real-time to the public site.
- **Admin Portal**: Secure backend access using Firebase Authentication. Full CRUD capabilities for Sermons, Events, and managing site settings (like the physical address for the Google Map).
- **Beautiful UI**: Built with modern design aesthetics using Tailwind CSS, including elegant gold gradients, scroll animations, and responsive interactions.
- **Firebase Backend**: Real-time Firestore database handles the content layer securely.

## Setup Instructions

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root based on your Firebase configuration:

```env
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
VITE_FIREBASE_MEASUREMENT_ID="your-measurement-id"
```

4. Run `npm run dev` to start the development web server.
5. Access the admin portal at `/admin` (Default password logic configured in Firebase).

## Built With
- React / Vite
- TypeScript
- Tailwind CSS
- Firebase (Auth, Firestore)
- Lucide React (Icons)
