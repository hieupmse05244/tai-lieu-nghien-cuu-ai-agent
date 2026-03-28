# Centralized Document Management System

## Overview
A secure, scalable document management system supporting:
- **Markdown Editing** (Mermaid charts, diagrams).
- **Blob Storage** (Images, Videos, MS Word, Text).
- **Resource-based ACL** (Inheritance support, Group/User permissions).
- **Separated Storage** (MinIO backend).

## Technical Stack
- **Frontend:** Next.js, Tailwind CSS, React-Markdown.
- **Backend:** Node.js, Express, Prisma ORM.
- **Database:** PostgreSQL.
- **Storage:** MinIO (S3 Compatible).
- **Auth:** OAuth2 (Google) & Local RBAC.

## Getting Started

### 1. Infrastructure
```bash
cd infrastructure
docker-compose up -d
```

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

## Agent Contracts
Defined in `/docs/contracts/` (TBD).
- **BE-FE:** OpenAPI
- **ACL Service:** Logic rules
- **QA/QC:** Validation rubric
