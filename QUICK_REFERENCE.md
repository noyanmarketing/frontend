# 🚀 Quick Reference Guide

## Admin Access

### Via Header Button
1. Look for the **Settings (⚙️) icon** with gold border in the header
2. Click it to open admin panel in new tab
3. Login: `admin@admin.com` / `admin123!`

### Direct URL
- http://localhost:8000/admin/

## Test User Credentials

### Admin User
```
Email: admin@admin.com
Password: admin123!
```

## Database Info

### Status
- ✅ Fresh PostgreSQL database
- ✅ 50 products
- ✅ 10 categories
- ✅ 5 brands
- ✅ 1 admin user

### Reset Database (if needed)
```bash
# From project root
docker exec noyan-db psql -U noyan -d noyan -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
docker exec noyan-api python manage.py migrate
docker exec noyan-api python manage.py createsuperuser --noinput --email admin@admin.com
docker exec -i noyan-api python manage.py shell << 'EOF'
from django.contrib.auth import get_user_model
User = get_user_model()
user = User.objects.get(email='admin@admin.com')
user.set_password('admin123!')
user.first_name = 'Admin'
user.last_name = 'User'
user.save()
EOF
docker exec noyan-api python manage.py seed_data
```

## Common Tasks

### Create New User (via Frontend)
1. Go to http://localhost:3000/register
2. Fill in details
3. Password must have: uppercase, lowercase, number, special char (min 8 chars)
4. Auto-redirected to account page after registration

### Login (via Frontend)
1. Go to http://localhost:3000/login
2. Enter email and password
3. Auto-redirected to account page after login

### View User Profile
- After login, go to http://localhost:3000/account
- Shows your name, email, orders, favorites, etc.

### API Endpoints

#### Authentication
- `POST /api/v1/auth/register/` - Register new user
- `POST /api/v1/auth/login/` - Login user
- `POST /api/v1/auth/logout/` - Logout user (requires auth)
- `GET /api/v1/auth/me/` - Get current user (requires auth)
- `POST /api/v1/auth/refresh/` - Refresh access token
- `POST /api/v1/auth/password/reset/` - Request password reset
- `POST /api/v1/auth/password/reset/confirm/` - Confirm password reset
- `POST /api/v1/auth/password/change/` - Change password (requires auth)

#### Catalog
- Browse products at `/shop`
- API: `GET /api/v1/products/`
- API: `GET /api/v1/categories/`
- API: `GET /api/v1/brands/`

## Remove Admin Button

When you're done testing, remove the admin button from the header:

**File:** `apps/web/components/organisms/Header.tsx`

**Remove lines 85-97:**
```tsx
{/* Admin Panel Access (Temporary) */}
<a
  href="http://localhost:8000/admin/"
  target="_blank"
  rel="noopener noreferrer"
  className="hidden sm:flex"
>
  <IconButton
    icon={Settings}
    label="Admin Panel"
    className="border-2 border-brand-gold dark:border-brand-gold/50"
  />
</a>
```

Also remove the `Settings` import from line 3 if you're not using it elsewhere.

## Troubleshooting

### "Can't login" or "Page just refreshes"
- Check browser console for errors
- Make sure backend is running: `docker ps` (should see noyan-api and noyan-db)
- Check API is accessible: `curl http://localhost:8000/health/`

### "Authentication credentials were not provided"
- Cookies might not be set
- Check browser dev tools > Application > Cookies
- Should see `access_token` and `refresh_token` cookies for localhost:8000

### "Database connection error"
- Make sure Docker containers are running
- Restart: `docker restart noyan-db noyan-api`

### "Products not showing"
- Run seed command: `docker exec noyan-api python manage.py seed_data`

## Architecture

```
Frontend (Next.js)          Backend (Django)
─────────────────          ────────────────
localhost:3000             localhost:8000

/login          ──POST─→   /api/v1/auth/login/
  │                              │
  │                         Sets cookies ✓
  │                              │
  └──────Redirect──────→   /account
                               │
                          GET /api/v1/auth/me/
                               │
                         Reads cookie ✓
                               │
                          Returns user data
```

## Next Steps

1. ✅ Test registration
2. ✅ Test login
3. ✅ View profile
4. ✅ Access admin panel
5. ✅ Browse products
6. 🔨 Start building your features!

---

**Everything is ready to go!** 🎉
