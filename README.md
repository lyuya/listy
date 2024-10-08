# Listy

## Project Overview

Listy is a simple and intuitive to-do list application designed to help users efficiently organize and manage their daily tasks. With a user-friendly interface, it simplifies task management for improved productivity.

The project is inspired by [Structured](https://structured.app/) and deployed using Vercel. You can access the live demo here: [Listy on Vercel](listy-ecru.vercel.app).

## Features

- **Task List by Date:** Create and organize tasks for specific dates, making it easy to plan your day.

- **Edit Tasks:** Modify task details such as name, date, start time, end time, subtasks, and descriptions.

- **Task Completion Toggle:** Mark tasks as completed directly from the task list or task detail modal.

- **Daily Task Summary:** View a summary of your daily tasks, including total time spent, number of tasks, and tasks completed.

- **Firebase Authentication:** Securely save and sync your tasks with your Google account.

- **Customizable Color Themes:** Personalize the app with 8 available color themes to suit your preferences.
- **Responsive Design:** The app is fully responsive and supports both desktop and mobile screen sizes.

## Tech stack

- **Frontend:** Next.js, React

- **UI Library**: MUI (Material-UI) Icon, MUI DatePicker-X

- **Backend:** Firebase (Firestore, Authentication)

- **Styling:** Tailwind CSS

- **State Management:** Redux

## Screenshots

**Task list view**

<img width="900" alt="Screenshot 2024-10-07 at 17 03 10" src="https://github.com/user-attachments/assets/aec15489-2fc1-4d9b-a783-0ce5c95c3b3f">

**Task Detail Modal**

<img width="900" alt="Screenshot 2024-10-07 at 17 03 21" src="https://github.com/user-attachments/assets/fcfe49e6-6a9d-457a-9dcc-b5d0e8fe37b6">

**Customizable Themes**

<img width="900" alt="Screenshot 2024-10-07 at 17 03 41" src="https://github.com/user-attachments/assets/3f89962d-4c8f-49c6-a3b1-bd74f5ea1575">

## Get started

```shell
cd task-manager

npm install

npm run start
```

### Firebase Setup

Listy uses Firebase for database and authentication services. Before running the app, ensure that you set up Firebase and Firestore:

1. Go to [Firebase Console](https://console.firebase.google.com/), create a new project, and enable Firestore and Firebase Authentication.

2. Configure your Firebase project settings and get the Firebase configuration details (API keys, etc.).

3. Add these configuration details in the firebaseConfig.js file within your project.

For more detailed instructions on how to initialize Firestore, visit the official Firebase documentation:
[Firestore Quickstart](https://firebase.google.com/docs/firestore/quickstart).

## Deployed Application

You can view the live version of Listy deployed on Vercel at:
https://listy-ecru.vercel.app.
