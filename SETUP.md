# دليل إعداد المشروع

## خطوات التثبيت السريع

### 1. تثبيت Dependencies
```bash
# تثبيت PHP dependencies
composer install

# تثبيت Node.js dependencies
npm install
```

### 2. إعداد البيئة
```bash
# نسخ ملف البيئة
cp .env.example .env

# توليد مفتاح التطبيق
php artisan key:generate
```

### 3. إعداد قاعدة البيانات
```bash
# تشغيل migrations
php artisan migrate
```

### 4. بناء الأصول
```bash
# بناء ملفات CSS و JS
npm run build
```

### 5. تشغيل المشروع
```bash
# تشغيل خادم Laravel
php artisan serve
```

## للتطوير

```bash
# تشغيل Vite للتطوير (في terminal منفصل)
npm run dev
```

## إنشاء مستخدم إدارة

```bash
# تشغيل Tinker
php artisan tinker

# إنشاء مستخدم إدارة
$user = new App\Models\User();
$user->name = 'Admin';
$user->email = 'admin@example.com';
$user->password = Hash::make('password');
$user->role = 'admin';
$user->phone = '1234567890';
$user->save();
```

## اختبار المشروع

1. افتح المتصفح على `http://localhost:8000`
2. سجل حساب جديد كعميل أو سائق
3. أو استخدم حساب الإدارة المُنشأ أعلاه

## هيكل المستخدمين

- **الإدارة**: `admin@example.com` / `password`
- **العميل**: سجل حساب جديد من صفحة التسجيل
- **السائق**: سجل حساب جديد من صفحة التسجيل

## استكشاف الأخطاء

### مشكلة في قاعدة البيانات
```bash
# حذف قاعدة البيانات وإعادة إنشائها
rm database/database.sqlite
touch database/database.sqlite
php artisan migrate
```

### مشكلة في الأصول
```bash
# إعادة بناء الأصول
npm run build
```

### مشكلة في Cache
```bash
# مسح Cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```
