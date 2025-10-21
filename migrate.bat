@echo off
chcp 65001 > nul
echo ====================================
echo   💾 إعداد قاعدة البيانات
echo ====================================
echo.
echo ⚠️  تأكد من:
echo    1. قاعدة البيانات (wasalni) موجودة
echo    2. بيانات .env صحيحة
echo.
pause
echo.
echo ✅ تشغيل Migrations...
call php artisan migrate
echo.
echo ✅ تشغيل Seeders (بيانات تجريبية)...
call php artisan db:seed
echo.
echo ✅ ربط مجلد التخزين...
call php artisan storage:link
echo.
echo ====================================
echo   ✨ تم إعداد قاعدة البيانات!
echo ====================================
echo.
echo 🔑 بيانات الدخول:
echo.
echo 👨‍💼 مدير:
echo    الهاتف: 0500000000
echo    كلمة المرور: password
echo.
echo 🚗 سائق:
echo    الهاتف: 0501111111
echo    كلمة المرور: password
echo.
echo 👤 عميل:
echo    الهاتف: 0503333333
echo    كلمة المرور: password
echo.
echo الآن شغّل: start.bat
echo.
pause

