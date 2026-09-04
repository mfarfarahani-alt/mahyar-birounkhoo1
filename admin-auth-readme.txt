============================================================
راه‌اندازی ورود امن پنل ادمین
============================================================

۱) در ریشه پروژه فایل .env.local بسازید:

ADMIN_PASSWORD=یک-رمز-قوی-انتخاب-کنید
ADMIN_SESSION_TOKEN=یک-رشته-تصادفی-بلند

مثال ساخت توکن:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

۲) سرور را ری‌استارت کنید (npm run dev)

۳) آدرس ورود:
   /admin/login

۴) بعد از ورود موفق به /admin/news هدایت می‌شوید.

۵) مسیرهای محافظت‌شده:
   - /admin/*
   - /api/admin/*  (به‌جز login و logout)

۶) کوکی httpOnly با اعتبار ۷ روز

============================================================
فایل‌های جدید:
- middleware.ts
- app/admin/login/page.tsx
- app/api/admin/login/route.ts
- app/api/admin/logout/route.ts
- .env.example

============================================================
