
# **Haldavalley E-Commerce – Deployment & Project Overview**

## 📋 Overview

Haldavalley E-Commerce is a custom online store built with:

* **Frontend:** Nuxt 3
* **Backend:** Vanilla Node.js (REST API)
* **Infrastructure:** Docker containers running on a **DigitalOcean Linux Droplet**
* **CI/CD:** Automated deployment via **GitHub Actions**

The goal is a lightweight, full-stack e-commerce application with automated, zero-downtime deployments.

---

## 🏗 Architecture

```
┌──────────────────────────┐
│  Nuxt 3 Frontend         │  -> Serves SPA/SSR pages
└─────────┬────────────────┘
          │
┌─────────▼───────────────┐
│  Node.js API Server     │  -> Handles products, orders, users
└─────────┬───────────────┘
          │
┌─────────▼───────────────┐
│  MongoDB (managed)      │
└─────────────────────────┘
```

Both the Nuxt frontend and the Node API are containerized with Docker and orchestrated on a single DigitalOcean Droplet.

---

## 🚀 Deployment Workflow

1. **Push to `main` branch**

   * Developer pushes or merges code to GitHub `main`.

2. **GitHub Actions CI/CD**

   * **Build job**: installs dependencies and runs `npm run build` for Nuxt and the Node backend.
   * **Deploy job**:

     * Uses [`appleboy/ssh-action`](https://github.com/appleboy/ssh-action) to SSH into the DigitalOcean droplet.
     * Pulls the latest code, rebuilds Docker images, and restarts containers.

3. **Docker**

   * `docker-compose.yml` defines two services:

     * `frontend` (Nuxt)
     * `backend` (Node.js API)
   * Containers expose ports behind Nginx or directly via PM2/Docker networking.

---

## 🛠️ Key Commands

### Local Development

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run dev
```

### Production Deployment (manual)

```bash
ssh root@your-server-ip
cd /var/www/halda-ecom
git pull origin main
docker-compose build --no-cache
docker-compose up -d
```

Normally this is handled automatically by GitHub Actions.

---

## 🔑 GitHub Actions Secrets/Variables

| Name                       | Purpose                        |
| -------------------------- | ------------------------------ |
| `HVECOM_SERVER_IP`         | Server IP for SSH              |
| `HVECOM_SERVER_USERNAME`   | SSH user (e.g., `root`)        |
| `HV_ECOM_SERVER_SECRET_DO` | Private SSH key for deployment |
| `HVECOM_SSH_PORT`          | SSH port (default 22)          |

---

## 🌐 Hosting Details

* **Platform:** DigitalOcean Droplet (Ubuntu Linux)
* **Docker** used for consistent environments and easy scaling.
* **Nginx/PM2** (if used) handles reverse proxy and process management.

---

## 🧩 Tech Stack

* Nuxt 3 + Vue 3 + Tailwind CSS
* Node.js 20 (Vanilla)
* MongoDB
* Docker & Docker Compose
* GitHub Actions CI/CD

---

## ✨ Highlights

* Fully automated deployment pipeline
* Lightweight backend with pure Node.js
* SEO-friendly Nuxt SSR for optimal performance
