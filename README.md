Studio App - Login (React + Django)

Quickstart

Backend
```
source venv/bin/activate
cd backend
python manage.py runserver 0.0.0.0:8000
```

Frontend
```
cd frontend
npm start
```

Endpoints
- POST `/api/auth/login/` { email, password, consent }
- POST `/api/auth/google/` { credential, consent }

Notes
- Checkbox consent is required by API for both flows.
- Configure Google OAuth Web client in the frontend `GoogleLogin` via environment if needed.

