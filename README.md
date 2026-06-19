# Portfolio — Friemann LOKONON

Portfolio professionnel fullstack : site vitrine + dashboard d'administration.

**Démo en ligne :** []

## Stack technique

**Frontend** — Next.js, React, Tailwind CSS, Framer Motion
**Backend** — Django, Django REST Framework, PostgreSQL
**Auth** — JWT (Simple JWT)
**Stockage médias** — Cloudinary
**Déploiement** — Vercel (frontend) · Render (backend) · Neon (base de données)

## Structure du projet

```
.
├── frontend/          Application Next.js (site public + dashboard)
└── backend/           API Django REST
```

## Fonctionnalités

- Site portfolio avec sections À propos, Projets, Services, Contact
- Pages détail dynamiques pour chaque projet
- Dashboard d'administration protégé par authentification JWT
- CRUD complet sur les projets, services et messages de contact
- Formulaire de contact connecté à l'API
- SEO : métadonnées dynamiques, sitemap, Open Graph
- Rate limiting sur l'authentification

## Installation locale

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Créer un fichier `.env` à la racine de `backend/` avec :

```
SECRET_KEY=
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db
CORS_ALLOWED_ORIGINS=http://localhost:3000
REDIS_URL=redis://127.0.0.1:6379/1
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

```bash
python3 manage.py migrate
python3 manage.py createsuperuser
python3 manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
```

Créer un fichier `.env.local` à la racine de `frontend/` avec :

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

```bash
npm run dev
```

## Accès

- Site public : `http://localhost:3000`
- Dashboard admin : `http://localhost:3000/login`
- Admin Django : `http://localhost:8000/admin`

## Auteur

**Friemann LOKONON** — Développeur Web Fullstack
[LinkedIn](https://www.linkedin.com/in/friemann-lokonon/) · [GitHub](https://github.com/FarhaneXDev)
