# CollabForge ⚡

> A real-time collaborative code editor with low-latency sync, concurrent session support, and AI-powered code suggestions — built for developers who need to code together, live.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

---

## 🚀 What is CollabForge?

CollabForge is a **real-time collaborative code editor** where multiple developers can write, edit, and review code simultaneously — with zero lag. Think Google Docs, but for code — powered by WebSockets, Monaco Editor, and Gemini AI.

Built to eliminate the friction of async code reviews and remote pair programming.

---

## ✨ Features

### 🔄 Real-Time Collaboration
- **Low-latency sync** via Socket.io — every keystroke broadcast instantly to all participants
- **Live cursor broadcasting** — see every collaborator's cursor position in real time
- **Concurrent session support** — multiple users edit simultaneously without conflicts

### 🏠 Room-Based Sessions
- Create or join **named coding rooms** with unique session IDs
- **Real-time state sync** across all connected clients in a room
- New joiners receive full document state immediately on connect

### 🤖 AI Code Suggestions (Gemini AI)
- **Gemini AI embedded inside Monaco Editor** as a context-aware suggestion provider
- Reads current file context and cursor position to return relevant completions
- Supports **12+ programming languages** including JS, TS, Python, Java, C++, Go, and more

### 🖊️ Monaco Editor
- The same editor powering VS Code
- Syntax highlighting, IntelliSense, and multi-language support out of the box

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, Monaco Editor |
| **Backend** | Node.js, Express.js |
| **Real-Time** | Socket.io, WebSockets |
| **Database** | MongoDB |
| **AI** | Gemini AI |

---

## 📐 Architecture

```
Client A ──┐
           ├──► Socket.io Server ──► MongoDB (session store)
Client B ──┘         │
                      └──► Gemini AI (context-aware suggestions)
                                │
                           Monaco Editor (client-side)
```

- Every keystroke emits a **socket event**, broadcast to all room participants
- Server reconciles state and pushes to all clients to maintain consistency
- Gemini AI receives current file context and returns inline completions

---

## 🔌 Core Socket Events

| Event | Description |
|---|---|
| `join-room` | Client joins a named coding session |
| `code-change` | Broadcasts editor delta to all room participants |
| `cursor-update` | Broadcasts real-time cursor positions |
| `sync-state` | Sends full document state to newly joined clients |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Gemini AI API Key

### Installation

```bash
git clone https://github.com/simransethi06/CollabForge.git
cd CollabForge
npm install
cp .env.example .env
# Fill in your MongoDB URI and Gemini API key
```

### Environment Variables

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

### Run

```bash
# Backend
npm run server

# Frontend (new terminal)
npm run client
```

Open `http://localhost:3000`, create a room, and share the link.

---

## 📸 Demo

> *(Add a GIF or screenshot of live collaboration here — highly recommended)*

---

## 🗺️ Roadmap

- [ ] Voice chat within rooms
- [ ] Git integration — commit directly from the editor
- [ ] Code execution sandbox
- [ ] Role-based permissions (viewer / editor / owner)

---

## 👩‍💻 Author

**Simran Sethi**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/simransethi06)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/simransethi06)
[![LeetCode](https://img.shields.io/badge/LeetCode-FFA116?style=flat&logo=leetcode&logoColor=black)](https://leetcode.com/simransethi06)

---

## 📄 License

MIT License — free to use, fork, and build on.
