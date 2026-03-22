# NextHire AI

AI-powered resume screening and interview intelligence platform.

## Tech Stack

Frontend: React  
Backend: Node.js + Express  
AI Engine: Python Flask  
Database: PostgreSQL

---

## Setup

### Clone Repo

git clone https://github.com/achintya623/nexthire-ai.git

---

### Frontend

cd web-app  
npm install  
npm run dev

---

### Node Backend

cd node-backend  
npm install  
npm start

---

### AI Backend

cd backend  
python -m venv venv  
venv\Scripts\Activate  
pip install -r requirements.txt  
python app.py

---

## Forgot Password Setup

Add this to `node backend/.env`:

`FRONTEND_URL=http://localhost:5173`




## Database Setup

Create the database:

CREATE DATABASE nexthire;

Run the schema file:

psql -U postgres -d nexthire -f database/schema.sql
