# 📚 توثيق API - مشروع وصلني

## Base URL
```
http://localhost:8000/api
```

## Authentication
تستخدم API نظام Sanctum للمصادقة. بعد تسجيل الدخول، استخدم Token في الـ headers:

```
Authorization: Bearer {your-token}
Accept: application/json
Content-Type: application/json
```

---

## 🔐 المصادقة (Authentication)

### 1. تسجيل مستخدم جديد
```http
POST /api/auth/register
```

**Body:**
```json
{
    "name": "أحمد محمد",
    "phone": "0501234567",
    "password": "password123",
    "password_confirmation": "password123",
    "user_type": "customer"
}
```

**Response (201):**
```json
{
    "message": "تم التسجيل بنجاح. يرجى التحقق من رقم الهاتف.",
    "user": {
        "id": 1,
        "name": "أحمد محمد",
        "phone": "0501234567",
        "user_type": "customer"
    },
    "otp_code": "123456"
}
```

---

### 2. تسجيل الدخول
```http
POST /api/auth/login
```

**Body:**
```json
{
    "phone": "0501234567",
    "password": "password123"
}
```

**Response (200):**
```json
{
    "message": "تم تسجيل الدخول بنجاح",
    "user": {
        "id": 1,
        "name": "أحمد محمد",
        "phone": "0501234567",
        "user_type": "customer"
    },
    "token": "1|xxxxxxxxxxxxxxxxxxxxx"
}
```

---

### 3. التحقق من OTP
```http
POST /api/auth/verify-otp
```

**Body:**
```json
{
    "phone": "0501234567",
    "code": "123456"
}
```

---

### 4. تسجيل الخروج
```http
POST /api/auth/logout
```

**Headers:** `Authorization: Bearer {token}`

---

## 🏙️ المدن (Cities)

### 1. عرض جميع المدن
```http
GET /api/cities
```

**Response:**
```json
{
    "cities": [
        {
            "id": 1,
            "name_ar": "الرياض",
            "name_en": "Riyadh",
            "latitude": "24.71360000",
            "longitude": "46.67530000",
            "is_active": true
        }
    ]
}
```

---

### 2. عرض مدينة محددة
```http
GET /api/cities/{id}
```

---

## 🛣️ المسارات (Routes)

### 1. عرض جميع المسارات
```http
GET /api/routes
```

**Query Parameters:**
- `from_city_id` (optional): تصفية حسب المدينة المصدر
- `to_city_id` (optional): تصفية حسب المدينة الوجهة

**Example:**
```http
GET /api/routes?from_city_id=1&to_city_id=2
```

---

## 🚗 الرحلات (Rides)

### 1. عرض رحلاتي
```http
GET /api/customer/rides
```

**Headers:** `Authorization: Bearer {token}`

---

### 2. إنشاء رحلة جديدة
```http
POST /api/customer/rides
```

**Body:**
```json
{
    "route_id": 1,
    "pickup_location": "حي النخيل، الرياض",
    "dropoff_location": "شارع التحلية، جدة",
    "pickup_lat": 24.7136,
    "pickup_lng": 46.6753,
    "dropoff_lat": 21.5433,
    "dropoff_lng": 39.1728,
    "scheduled_at": "2024-03-15 10:00:00",
    "passenger_count": 2,
    "payment_method": "cash",
    "notes": "يرجى الاتصال عند الوصول"
}
```

**Response (201):**
```json
{
    "message": "تم إنشاء الرحلة بنجاح",
    "ride": {
        "id": 1,
        "ride_number": "R12345678",
        "status": "pending",
        "price": 450.00
    }
}
```

---

### 3. عرض تفاصيل رحلة
```http
GET /api/customer/rides/{id}
```

---

### 4. إلغاء رحلة
```http
POST /api/customer/rides/{id}/cancel
```

**Body:**
```json
{
    "cancellation_reason": "تغيير في الخطط"
}
```

---

### 5. تقييم رحلة
```http
POST /api/customer/rides/{id}/rate
```

**Body:**
```json
{
    "rating": 5,
    "review": "سائق ممتاز وخدمة رائعة"
}
```

---

## 📦 الطرود (Packages)

### 1. عرض طرودي
```http
GET /api/customer/packages
```

---

### 2. إنشاء طرد جديد
```http
POST /api/customer/packages
```

**Body:**
```json
{
    "from_city_id": 1,
    "to_city_id": 2,
    "package_type": "document",
    "package_description": "مستندات رسمية",
    "weight_kg": 0.5,
    "sender_name": "أحمد محمد",
    "sender_phone": "0501234567",
    "sender_address": "شارع الملك فهد، الرياض",
    "receiver_name": "سارة أحمد",
    "receiver_phone": "0509876543",
    "receiver_address": "شارع التحلية، جدة",
    "scheduled_pickup_at": "2024-03-15 14:00:00",
    "payment_method": "cash"
}
```

---

## 🚚 السائق (Driver)

### 1. عرض الرحلات المتاحة
```http
GET /api/driver/available-rides
```

**Headers:** `Authorization: Bearer {driver-token}`

---

### 2. عرض الطرود المتاحة
```http
GET /api/driver/available-packages
```

---

### 3. قبول رحلة
```http
POST /api/driver/rides/{id}/accept
```

---

### 4. إتمام رحلة
```http
POST /api/driver/rides/{id}/complete
```

---

### 5. قبول طرد
```http
POST /api/driver/packages/{id}/accept
```

---

### 6. إتمام توصيل طرد
```http
POST /api/driver/packages/{id}/complete
```

**Body (multipart/form-data):**
```json
{
    "delivery_image": "file"
}
```

---

### 7. عرض الأرباح
```http
GET /api/driver/earnings
```

**Response:**
```json
{
    "total_earnings": 5000.00,
    "total_trips": 50,
    "rides_earning": 3000.00,
    "packages_earning": 2000.00,
    "rating": 4.8
}
```

---

## 🔒 أكواد الحالة (Status Codes)

| Code | Meaning |
|------|---------|
| 200 | نجح الطلب |
| 201 | تم الإنشاء بنجاح |
| 400 | خطأ في البيانات المرسلة |
| 401 | غير مصرح - يتطلب تسجيل الدخول |
| 403 | ممنوع - لا تملك الصلاحية |
| 404 | غير موجود |
| 422 | خطأ في التحقق من البيانات |
| 500 | خطأ في السيرفر |

---

## 📝 ملاحظات

1. جميع التواريخ بصيغة: `YYYY-MM-DD HH:MM:SS`
2. الأسعار بالريال السعودي (SAR)
3. نظام OTP للتطوير فقط - في الإنتاج يجب دمج SMS gateway
4. المرحلة الثانية ستشمل: دفع إلكتروني، إشعارات فورية، Google Maps

---

## 🧪 اختبار API

يمكنك استخدام Postman أو أي أداة أخرى لاختبار API. مثال باستخدام cURL:

```bash
# تسجيل دخول
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "phone": "0503333333",
    "password": "password"
  }'

# عرض المدن
curl -X GET http://localhost:8000/api/cities \
  -H "Accept: application/json"

# إنشاء رحلة (يتطلب token)
curl -X POST http://localhost:8000/api/customer/rides \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "route_id": 1,
    "pickup_location": "الرياض",
    "dropoff_location": "جدة",
    "passenger_count": 2,
    "payment_method": "cash"
  }'
```

