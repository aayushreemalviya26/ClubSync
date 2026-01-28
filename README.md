# 🏛️ ClubSync (Society Management Platform)

ClubSync is a web-based society management platform designed to simplify communication, coordination, and administration for college societies.
It provides a centralized system for members and admins to manage announcements, chats, attendance, tasks, and society participation.

This project was built as an MVP for a hackathon, focusing on core functionality and scalability.

## 🚀 Features 
### 🔐 Authentication

Email & password login using Firebase Authentication

Signup for new users

Role-based access (Admin / Member)

### 🏠 User Dashboard

View joined societies

Join a society using a society code

Central landing screen after login

### 🏛 Society Dashboard

Accessible after joining a society, with tab-based navigation:

#### 💬 Chat – Real-time society chat using Firebase Firestore

#### 📢 Announcements

Admins can create announcements

Important announcements can be pinned

Members can view all announcements

#### 🧾 Attendance

Admins can start attendance

Members can mark themselves present

#### ✅ Tasks

Admins can assign tasks

Members can view task status

#### 🏫 Rooms / Meetings (basic structure for discussions)

### ⚙️ Profile / Settings

View user details

Logout functionality

Role-based access handling

## 🧠 Tech Stack

Frontend: React.js

Backend / Database: Firebase Firestore

Authentication: Firebase Auth

State Management: React Hooks

Real-time Updates: Firestore onSnapshot

## 🔐 Roles & Access Control

Admin

Create & pin announcements

Start attendance

Assign tasks

Member

View announcements

Participate in chat

Mark attendance

Complete assigned tasks

Role information is stored in Firestore and checked at runtime.

## 🎯 Future Enhancements 

Push notifications

Society analytics dashboard

Role management by admins

File sharing in chat

Mobile responsiveness improvements
