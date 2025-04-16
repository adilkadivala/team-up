# 🚀 Hackathon Teammate Finder

A full-stack project using **Next.js** for the frontend and **Express.js** for the backend to help users find teammates for hackathons.


## 🧾 Folder Structure

```
project/
├── client/          # 🎨 Next.js frontend
│   ├── app/         # Pages (e.g., page.tsx)
│   ├── components/  # Reusable React components
│   ├── public/      # Static assets
│   ├── styles/      # Tailwind & global styles
│   ├── package.json # Frontend dependencies
│   └── tsconfig.json
├── server/          # ⚙️ Express.js backend
│   ├── routes/      # API endpoints (e.g., profile.js)
│   ├── config/      # Database configuration
│   ├── package.json # Backend dependencies
│   └── server.js    # Main Express server file
└── README.md        # 📘 Project documentation
```

---

## ⚙️ Getting Started

### 📌 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [MySQL](https://www.mysql.com/) (for the database)

---

## 🖥️ Project Setup

### 🔹 Client (Next.js)

```bash
cd client
pnpm install       # or yarn / pnpm / bun
pnpm run dev       # or yarn dev / pnpm dev / bun dev
```

➡️ Open [http://localhost:3000](http://localhost:3000) to view in your browser.

---

### 🔸 Server (Express.js)

```bash
cd server
pnpm install express cors mysql2
```

🛠️ Set up a MySQL database (e.g., `teammate_finder`) and update your credentials in `server/config/db.js`.

```bash
node server.js
```

➡️ Backend runs at [http://localhost:5000](http://localhost:5000)

---

## 🧩 Tech Stack

- ⚡ **Next.js** with **TypeScript**
- 🎯 **Express.js** with **MySQL**
- 💨 **Tailwind CSS** for styling
- 🧱 **shadcn/ui** for reusable components

---

## 🧪 Development Notes

You can start editing the frontend in `client/app/page.tsx` – hot reload is enabled.  
The backend can be tested using tools like Postman at the API endpoints in `server/routes`.

---

## 📚 Learn More

- 📘 [Next.js Documentation](https://nextjs.org/docs)
- 📘 [Express.js Documentation](https://expressjs.com/)
- 📘 [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- 🧑‍💻 [Learn Next.js](https://nextjs.org/learn)

---

## 🚀 Deployment

- 🌐 **Frontend (Next.js):** Deploy easily using [Vercel](https://vercel.com/)
- 🔧 **Backend (Express.js):** Deploy on [Render](https://render.com/) or [Heroku](https://www.heroku.com/)

Refer to the deployment guide or setup scripts for smooth CI/CD integration.

---

## 📤 Submission Guidelines

- ✅ **GitHub:** Submit your repository URL with complete source code and example `.env` if applicable.
- 🔗 **Live Demo:** Include a deployed link (e.g., Vercel URL).
- 📞 **Contact Info:** Add your Telegram ID, Twitter ID, and contact number.

---

## ⭐ Like this project?

Drop a star ⭐ on the repo if this helped you. Contributions and feedback are welcome!
