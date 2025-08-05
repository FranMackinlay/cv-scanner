# 🧠 AI-Powered CV Generator & Screener

This is a full-stack application that:

- ✅ Generates realistic and unique CVs using OpenRouter LLMs (e.g., LLaMA3)
- 🧾 Saves each CV as a **PDF** using `pdf-lib`
- 💬 Provides a **React frontend** for chatting with the AI about a candidate's CV
- 🚀 Uses a **NestJS backend** to manage LLM interaction and PDF processing

---

## 📦 Project Structure

```
/backend      → NestJS API to query LLM and serve results
  /scripts      → Standalone Node.js script to generate PDF CVs
/frontend     → React app with chat interface
```

---

## 🧰 Tech Stack

- **LLM API**: [OpenRouter](https://openrouter.ai)
- **PDF Generation**: [`pdf-lib`](https://github.com/Hopding/pdf-lib)
- **LLM Access**: [`openai` SDK configured for OpenRouter)
- **Backend**: [NestJS](https://nestjs.com)
- **Frontend**: React + Axios

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-cv-generator.git
cd ai-cv-generator
```

### 2. Set Up `.env` File

Create a `.env` file at the project root at `/backend` with:

```
Check each .ENV.EXAMPLE for each project
```

---

## 📄 Run CV Generation Script

Generates 20+ unique CVs as **PDF files** saved in `/data/generated-cvs`.

### 📦 Install Dependencies

```bash
cd scripts
npm install
```

### ▶️ Run Script

```bash
npx tsx generate-cvs.ts
```

> This will call OpenRouter and generate high-quality PDFs.

---

## 🖥️ Run the Frontend (React)

### 📦 Install & Start

```bash
cd ../frontend
npm install
npm run dev
```

> App will run at `http://localhost:5173` (or `3000`, depending on your setup)

---

## 🔙 Run the Backend (NestJS)

### 📦 Install & Start

```bash
cd ../backend
npm install (probably using --legacy-peer-deps)
npm run start:dev
```

> API will be available at `http://localhost:4000`

---

## 💬 Chat Interface

The frontend allows users to:

- Type questions about the CV
- Get AI-generated answers from the backend
- See the full **chat history** in a conversational UI

---

## 📂 Output Example

PDFs will be saved in:

```
/data/generated-cvs/John_Doe_Backend_Developer_CV-<timestamp>.pdf
```

---

## ✅ Free LLM Models Used

- `meta-llama/llama-3-8b-instruct`
- `mistralai/mixtral-8x7b-instruct`
- `meta-llama/llama-4-scout:free`

PDF parsing and comprehension are powered by `pdf-text` engine via OpenRouter.

---

## 🧑‍💻 Author

Built by Francisco Mackinlay

MIT License
