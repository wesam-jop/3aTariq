@echo off
chcp 65001 > nul
echo ====================================
echo   ⚙️  إعداد مشروع وصلني
echo ====================================
echo.
echo ✅ الخطوة 1: تثبيت Composer...
call composer install
echo.
echo ✅ الخطوة 2: تثبيت NPM...
call npm install
echo.
echo ✅ الخطوة 3: توليد مفتاح التطبيق...
call php artisan key:generate
echo.
echo ✅ الخطوة 4: إنشاء مجلد Cache...
if not exist "bootstrap\cache" mkdir bootstrap\cache
echo.
echo ====================================
echo   ✨ تم الإعداد الأولي!
echo ====================================
echo.
echo 📋 الخطوات القادمة:
echo    1. أنشئ قاعدة بيانات: wasalni
echo    2. عدّل ملف .env (DB_PASSWORD)
echo    3. شغّل: php artisan migrate --seed
echo    4. شغّل: php artisan storage:link
echo    5. شغّل: start.bat
echo.
pause

