# 🚀 البدء السريع - وصلني

## التثبيت في 5 دقائق ⏱️

### 1️⃣ تثبيت التبعيات
```bash
composer install
npm install
```

### 2️⃣ إعداد قاعدة البيانات
```bash
# إنشاء قاعدة بيانات MySQL
mysql -u root -p
CREATE DATABASE wasalni;
exit;

# تعديل ملف .env (إذا لزم الأمر)
DB_DATABASE=wasalni
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 3️⃣ تشغيل Migrations و Seeders
```bash
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan storage:link
```

### 4️⃣ تشغيل المشروع
```bash
# Terminal 1
php artisan serve

# Terminal 2 (في نافذة جديدة)
npm run dev
```

### 5️⃣ الوصول للتطبيق
- **الصفحة الرئيسية:** http://localhost:8000
- **لوحة الإدارة:** http://localhost:8000/admin

---

## 🔑 بيانات الدخول السريعة

| الدور | الهاتف | كلمة المرور |
|-------|---------|-------------|
| مدير | 0500000000 | password |
| سائق 1 | 0501111111 | password |
| سائق 2 | 0502222222 | password |
| عميل 1 | 0503333333 | password |
| عميل 2 | 0504444444 | password |

---

## 📱 اختبار سريع

### كعميل:
1. سجل دخول بحساب عميل
2. اذهب إلى "رحلاتي"
3. أنشئ رحلة جديدة
4. تابع حالة الرحلة

### كسائق:
1. سجل دخول بحساب سائق
2. اذهب إلى "الرحلات المتاحة"
3. اقبل رحلة
4. أكمل الرحلة
5. تحقق من أرباحك

### كمدير:
1. سجل دخول للوحة الإدارة
2. شاهد جميع المستخدمين
3. أضف مدن جديدة
4. راقب الرحلات

---

## 🧪 اختبار API

```bash
# الحصول على المدن
curl http://localhost:8000/api/cities

# تسجيل دخول
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"0503333333","password":"password"}'
```

---

## ⚡ أوامر مفيدة

```bash
# إعادة تهيئة قاعدة البيانات
php artisan migrate:fresh --seed

# مسح Cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# عرض جميع المسارات
php artisan route:list

# عرض جميع المسارات API فقط
php artisan route:list --path=api

# بناء للإنتاج
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## 🐛 حل المشاكل

### المشكلة: لا يعمل npm run dev
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### المشكلة: أخطاء في Migrations
```bash
php artisan migrate:fresh --seed
```

### المشكلة: أخطاء في الصلاحيات (Linux/Mac)
```bash
chmod -R 775 storage bootstrap/cache
```

### المشكلة: الصور لا تظهر
```bash
php artisan storage:link
```

---

## 📚 مزيد من المعلومات

- **التفاصيل الكاملة:** اقرأ `README.md`
- **التثبيت التفصيلي:** اقرأ `INSTALLATION.md`
- **توثيق API:** اقرأ `API_DOCUMENTATION.md`
- **ملخص المشروع:** اقرأ `PROJECT_SUMMARY.md`

---

## 🎉 مبروك!

أنت الآن جاهز للبدء في التطوير! 🚀

إذا واجهت أي مشكلة، راجع:
- ملف `INSTALLATION.md` للتفاصيل
- سجلات Laravel في `storage/logs/laravel.log`
- افتح Issue على GitHub

**نتمنى لك تطويراً سعيداً! 💻✨**

