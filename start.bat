@echo off
chcp 65001 > nul
echo ====================================
echo   🚀 تشغيل مشروع وصلني
echo ====================================
echo.
echo ✅ بدء تشغيل Laravel Server...
echo.
start cmd /k "php artisan serve"
timeout /t 2 > nul
echo.
echo ✅ بدء تشغيل Vite Dev Server...
echo.
start cmd /k "npm run dev"
echo.
echo ====================================
echo   ✨ تم تشغيل السيرفرات!
echo ====================================
echo.
echo 🌐 افتح المتصفح على:
echo    http://localhost:8000
echo.
echo 📋 لوحة الإدارة:
echo    http://localhost:8000/admin
echo    الهاتف: 0500000000
echo    كلمة المرور: password
echo.
echo ⚠️  ملاحظة: تأكد من تشغيل قاعدة البيانات
echo    وتنفيذ: php artisan migrate --seed
echo.
pause

