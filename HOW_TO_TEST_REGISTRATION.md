# 🧪 How to Test User Registration

## Step-by-Step Testing Guide

### Before You Start:

1. **Clear the rate limit cache** (important!):
```bash
docker exec noyan-redis redis-cli FLUSHALL
```

2. **Make sure both servers are running:**
```bash
# Check Docker containers
docker ps

# Should see:
# - noyan-api (Up)
# - noyan-db (Up)
# - noyan-redis (Up)

# Check frontend
# Should be running on http://localhost:3000
```

---

## Test 1: Register New User

### Step 1: Open Registration Page
- Go to: **http://localhost:3000/register**

### Step 2: Fill the Form
Use these values for guaranteed success:

```
Full Name:     John Smith
Email:         john.smith@example.com
Phone:         (optional - leave blank or enter: +1234567890)
Password:      MySecure123!@#
Confirm:       MySecure123!@#
```

**Password MUST have:**
- ✓ At least 8 characters
- ✓ One uppercase letter (M)
- ✓ One lowercase letter (y)
- ✓ One number (1, 2, 3)
- ✓ One special character (!, @, #)

**Bad passwords (will fail):**
- ❌ `password` - no uppercase, no number, no special char
- ❌ `Password123` - no special character
- ❌ `Pass!` - too short
- ❌ `PASSWORD123!` - no lowercase

### Step 3: Accept Terms
- ✓ Check "I agree to Terms & Conditions"
- ✓ (Optional) Check newsletter subscription

### Step 4: Click "Create Account"

### Expected Result:
1. Button shows "Creating Account..." with spinner
2. After 1-2 seconds, you're redirected to `/account`
3. You see your profile with:
   - Welcome message: "Welcome back, John!"
   - Full Name: John Smith
   - Email: john.smith@example.com

---

## Test 2: Verify User in Admin

### Step 1: Open Admin Panel
- Click ⚙️ icon (gold border) in header
- Or go to: http://localhost:8000/admin/

### Step 2: Login
- Email: `admin@admin.com`
- Password: `admin123!`

### Step 3: Check Users
- Click "Users" in sidebar
- You should see:
  - admin@admin.com (you)
  - john.smith@example.com (new user you created)

### Step 4: View User Details
- Click on john.smith@example.com
- Verify:
  - ✓ Email: john.smith@example.com
  - ✓ First name: John
  - ✓ Last name: Smith
  - ✓ Active: Yes (checked)
  - ✓ Staff: No
  - ✓ Created at: Recent timestamp

---

## Test 3: Login with New User

### Step 1: Logout
- If logged in, click "Logout" in sidebar menu
- Or clear cookies manually

### Step 2: Go to Login Page
- Go to: **http://localhost:3000/login**

### Step 3: Login
```
Email:    john.smith@example.com
Password: MySecure123!@#
```

### Step 4: Click "Sign In"

### Expected Result:
1. Button shows "Signing In..." with spinner
2. After 1-2 seconds, redirected to `/account`
3. You see John Smith's profile

---

## Troubleshooting

### Error: "Request was throttled"

**Cause:** Too many registration attempts

**Solution:**
```bash
# Clear Redis cache
docker exec noyan-redis redis-cli FLUSHALL

# Wait 10 seconds, then try again
```

---

### Error: "This password is too common"

**Cause:** Password doesn't meet requirements

**Solution:** Use a password like `MySecure123!@#` that has:
- Uppercase: M, S
- Lowercase: y, e, c, u, r, e
- Numbers: 1, 2, 3
- Special: !, @, #

---

### Error: "Email already exists"

**Cause:** You already registered this email

**Solution:**
1. Use a different email, OR
2. Test login instead, OR
3. Delete the user from admin panel and try again

---

### Error: "Invalid email address"

**Cause:** Email format is wrong

**Solution:** Make sure email has format: `name@domain.com`

**Good examples:**
- ✓ john@example.com
- ✓ test.user@company.co.uk
- ✓ name123@domain.org

**Bad examples:**
- ❌ john (no @)
- ❌ @example.com (no name)
- ❌ john@example (no domain extension)

---

### Page Just Refreshes / No Error

**Possible causes:**

1. **Check browser console** (F12 > Console tab)
   - Look for red errors
   - Common issue: CORS error

2. **Check Network tab** (F12 > Network tab)
   - Click "Create Account"
   - Look for request to `localhost:8000`
   - Check response status:
     - 201 = Success ✓
     - 400 = Validation error (check response body)
     - 429 = Rate limited (clear Redis)
     - 500 = Server error (check backend logs)

3. **Check cookies** (F12 > Application > Cookies)
   - After successful registration, should see:
     - `access_token` for localhost
     - `refresh_token` for localhost

4. **Verify API URL**
   - Check: `apps/web/.env.local`
   - Should have: `NEXT_PUBLIC_API_URL=http://localhost:8000`

---

### Still Not Working?

**Test backend directly:**

```bash
# Clear cache first
docker exec noyan-redis redis-cli FLUSHALL

# Test registration via curl
curl -v -X POST http://localhost:8000/api/v1/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "curl.test@example.com",
    "password": "CurlTest123!@#",
    "password_confirm": "CurlTest123!@#",
    "first_name": "Curl",
    "last_name": "Test"
  }'

# If this works (status 201), the backend is fine
# The issue is in the frontend
```

**Check backend logs:**
```bash
docker logs noyan-api --tail=50
```

---

## Quick Test Script

Copy and paste this into your terminal to test everything:

```bash
#!/bin/bash

echo "🧪 Testing Registration System"
echo "========================================"

# 1. Clear cache
echo "1. Clearing Redis cache..."
docker exec noyan-redis redis-cli FLUSHALL > /dev/null
echo "   ✓ Cache cleared"

# 2. Test backend registration
echo "2. Testing backend registration..."
RESPONSE=$(curl -s -w "%{http_code}" -X POST http://localhost:8000/api/v1/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "quicktest@example.com",
    "password": "QuickTest123!@#",
    "password_confirm": "QuickTest123!@#",
    "first_name": "Quick",
    "last_name": "Test"
  }')

STATUS="${RESPONSE: -3}"
if [ "$STATUS" = "201" ]; then
  echo "   ✓ Backend registration working (Status: 201)"
else
  echo "   ✗ Backend registration failed (Status: $STATUS)"
fi

# 3. Verify user in database
echo "3. Checking database..."
docker exec -i noyan-api python manage.py shell << 'EOF'
from django.contrib.auth import get_user_model
User = get_user_model()
if User.objects.filter(email='quicktest@example.com').exists():
    print('   ✓ User found in database')
else:
    print('   ✗ User NOT in database')
EOF

echo ""
echo "========================================"
echo "✅ Backend test complete!"
echo ""
echo "Now test in browser:"
echo "1. Go to http://localhost:3000/register"
echo "2. Use password: MySecure123!@#"
echo "3. Click Create Account"
echo "========================================"
```

Save as `test_registration.sh`, make executable, and run:
```bash
chmod +x test_registration.sh
./test_registration.sh
```

---

## ✅ Success Checklist

When registration works correctly, you should see:

- [ ] Form submits without errors
- [ ] Button shows "Creating Account..." spinner
- [ ] Redirected to `/account` page
- [ ] Profile shows your name and email
- [ ] User appears in admin panel
- [ ] Can logout and login again with same credentials
- [ ] Browser has cookies set (access_token, refresh_token)

**If all checked, registration is working perfectly!** 🎉
