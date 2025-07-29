# Medi Rally - Medical Campaign Platform

Medi Rally is a full-stack web application designed to facilitate the organization, registration, and management of medical camps. It serves as a platform for healthcare organizers to promote their services and for participants to discover and join impactful health camps.

---

## 🔗 Live Links

* **Live Site**: https://medi-rally.web.app <br>
* **Client Repo**: https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-apolo-itnet.git <br>
* **Server Repo**: https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-apolo-itnet.git <br>

---

## 🗂️ Pages & Routes

| Route                      | Description                                     | Protected |
| -------------------------- | ----------------------------------------------- | --------- |
| `/`                        | Homepage with banners, top camps, and feedbacks | No        |
| `/available-camps`         | View all camps with filters and search          | No        |
| `/camp-details/:campId`    | View camp details and join camp form            | No        |
| `/join-us`                 | Authentication page                             | No        |
| `/register`                | New user registration                           | No        |
| `/dashboard/organizer/*`   | Organizer Dashboard                             | Yes       |
| `/dashboard/participant/*` | Participant Dashboard                           | Yes       |

---

## 🚀 How to Run Locally

1. **Clone the Repositories**

   ```bash
   git clone <client-repo-url>
   git clone <server-repo-url>
   ```

2. **Client Side**

   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Server Side**

   ```bash
   cd server
   npm install
   npm run start
   ```

4. Create `.env` file for server with:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret
   ```

---

## 🛠️ Technologies & Packages Used

### Frontend Dependencies

```
"@stripe/react-stripe-js": ^3.8.0
"@stripe/stripe-js": ^7.6.1
"@tailwindcss/vite": ^4.1.11
"@tanstack/react-query": ^5.83.0
"aos": ^2.3.4
"axios": ^1.10.0
"firebase": ^11.10.0
"lucide-react": ^0.525.0
"motion": ^12.23.3
"react": ^19.1.0
"react-datepicker": ^8.4.0
"react-dom": ^19.1.0
"react-hook-form": ^7.60.0
"react-hot-toast": ^2.5.2
"react-icons": ^5.5.0
"react-intersection-observer": ^9.16.0
"react-router": ^7.6.3
"recharts": ^3.1.0
"styled-components": ^6.1.19
"sweetalert2": ^11.22.2
"swiper": ^11.2.10
"tailwind-datepicker-react": ^1.4.3
"tailwindcss": ^4.1.11
```

### Backend Dependencies

```
"bcryptjs": ^3.0.2
"cors": ^2.8.5
"dotenv": ^17.2.0
"express": ^5.1.0
"firebase-admin": ^13.4.0
"jsonwebtoken": ^9.0.2
"mongodb": ^6.17.0
"mongoose": ^8.16.4
"multer": ^2.0.2
"stripe": ^18.3.0
```

---

## 🎯 Project Purpose

Create a seamless platform for:

* Organizers to host impactful medical camps
* Participants to easily discover, join, and manage their medical events

---

## ✨ Key Features

* Authentication & Role-Based Dashboard
* Organizer profile management & camp CRUD
* Participant registration with Stripe payment
* Feedback and rating system
* Dynamic camp search, sort, and layout view toggle
* Protected routes via JWT

---

## 📋 CRUD Functionalities

* Organizers: Create, Read, Update, Delete camps
* Participants: Register, Cancel camp, Provide feedback
* Admin: Manual organizer role setup

---

## 🔐 Security

* JWT authentication with token storage in localStorage
* Route protection for dashboards and sensitive data
* Firebase Admin SDK for user verification

---

## 🚀 Deployment

* **Client**: Vercel
* **Server**: Firebase Functions / Vercel
* **Database**: MongoDB Atlas

---

## 🎁 Bonus Features

* AOS animations & smooth UI transitions
* Custom layout switching button for camps grid view
* Custom dashboard chart using Recharts
* Toast notifications and confirmation dialogs

---

## 🖼️ Project Screenshots

Add screenshots for:

* Homepage
* Camp details page
* Participant dashboard
* Organizer dashboard
* Payment and feedback UI

---

## 💡 Inspiration

This project is inspired by real-world health campaigns. The goal is to simplify the process of organizing and joining medical camps for both participants and healthcare professionals.

---

## 👨‍💻 Developer Info

**Apolo Barua Apurbo**
💼 MERN Stack Web Developer
📧 Email: [apolo.itnet@gmail.com](mailto:apolo.itnet@gmail.com)
📍 Location: Bangladesh

---

## ✅ Suggested Improvements (Optional)

* Add Admin Role & Analytics
* OTP email verification for login security
* Add Image Upload to Firebase/Cloudinary
* Mobile app version using React Native
* Automated email notification for joined camps

---

Feel free to copy-paste this README into your GitHub project and update with your screenshots and live links!
