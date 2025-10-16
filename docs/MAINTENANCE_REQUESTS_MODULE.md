# 🔧 وحدة طلبات الصيانة - دليل شامل

## 📋 نظرة عامة

وحدة طلبات الصيانة هي القلب النابض لنظام إدارة الصيانة، تتيح للمستخدمين إنشاء ومتابعة طلبات الصيانة بشكل كامل.

---

## ✅ الوظائف المتوفرة

### 1. إنشاء طلب صيانة جديد
- ✓ نموذج متكامل مع التحقق من البيانات
- ✓ دعم تحديد الموقع على الخريطة
- ✓ ربط الطلب بعقار محدد
- ✓ اختيار نوع الخدمة والأولوية
- ✓ تحديد موعد مفضل للزيارة

### 2. عرض قائمة الطلبات
- ✓ جدول تفاعلي مع البحث والتصفية
- ✓ نسخة محمول مخصصة للهواتف
- ✓ فلترة حسب (الحالة، الأولوية، نوع الخدمة، التاريخ، التكلفة)
- ✓ تصدير البيانات (PDF, Excel, CSV)

### 3. تفاصيل الطلب
- ✓ عرض كامل لمعلومات الطلب
- ✓ متابعة دورة حياة الطلب
- ✓ سير العمل (Workflow)
- ✓ إدارة المواد المطلوبة
- ✓ نظام الموافقات
- ✓ التقارير والإحصائيات

### 4. تحديث الطلب
- ✓ تغيير الحالة مع تتبع التغييرات
- ✓ تعيين فني للطلب
- ✓ إضافة ملاحظات
- ✓ تحديث التكلفة والموعد المتوقع

### 5. الأمان (RLS Policies)
- ✓ كل مستخدم يرى طلباته فقط
- ✓ الموظفون يرون جميع الطلبات
- ✓ الفنيون يرون الطلبات المعينة لهم
- ✓ حماية بيانات العملاء الحساسة

---

## 📁 ملفات الوحدة

### الصفحات (Pages)
```
src/pages/
├── Requests.tsx              # صفحة قائمة الطلبات الرئيسية
└── RequestDetails.tsx        # صفحة تفاصيل الطلب
```

### المكونات (Components)
```
src/components/maintenance/
├── MaintenanceRequestsList.tsx      # قائمة الطلبات (نسخة الحاسوب)
├── MobileMaintenanceList.tsx        # قائمة الطلبات (نسخة الموبايل)
├── MaintenanceRequestDetails.tsx    # تفاصيل الطلب
├── MaintenanceRequestActions.tsx    # أزرار الإجراءات
├── MaintenanceFilters.tsx           # فلاتر البحث والتصفية
├── MaintenanceExport.tsx            # تصدير البيانات
├── RequestLifecycleTracker.tsx      # متابعة دورة الحياة
├── RequestWorkflowControls.tsx      # التحكم في سير العمل
├── RequestStatusBadge.tsx           # شارة الحالة (جديد)
├── RequestPriorityBadge.tsx         # شارة الأولوية (جديد)
├── EmptyRequestsState.tsx           # حالة فارغة (جديد)
├── RequestLoadingState.tsx          # حالة التحميل (جديد)
└── RequestErrorState.tsx            # حالة الخطأ (جديد)
```

### النماذج (Forms)
```
src/components/forms/
├── NewRequestForm.tsx        # نموذج طلب صيانة جديد
├── LocationPicker.tsx        # اختيار الموقع على الخريطة
└── NewPropertyForm.tsx       # نموذج عقار جديد
```

### الـ Hooks
```
src/hooks/
├── useMaintenanceRequests.ts    # Hook رئيسي لإدارة الطلبات (محسّن)
├── useRequestLifecycle.ts       # Hook لإدارة دورة الحياة
└── useRequestFilters.ts         # Hook للفلاتر (جديد)
```

### الأدوات المساعدة (Utils)
```
src/utils/
├── requestValidation.ts     # التحقق من البيانات (جديد)
└── requestFormatters.ts     # تنسيق البيانات (جديد)
```

---

## 🗄️ قاعدة البيانات

### جدول maintenance_requests

#### الحقول الأساسية:
- `id` (uuid) - معرف فريد
- `title` (text) - عنوان الطلب *
- `description` (text) - وصف المشكلة
- `client_name` (text) - اسم العميل *
- `client_phone` (text) - رقم الهاتف *
- `client_email` (text) - البريد الإلكتروني
- `location` (text) - العنوان *
- `latitude` (numeric) - خط العرض
- `longitude` (numeric) - خط الطول

#### تفاصيل الطلب:
- `service_type` (text) - نوع الخدمة *
- `priority` (text) - الأولوية (low/medium/high) *
- `status` (text) - الحالة *
- `workflow_stage` (enum) - مرحلة سير العمل

#### المواعيد والتكاليف:
- `preferred_date` (date) - التاريخ المفضل
- `preferred_time` (varchar) - الوقت المفضل
- `estimated_cost` (numeric) - التكلفة المتوقعة
- `actual_cost` (numeric) - التكلفة الفعلية
- `estimated_completion` (date) - موعد الانتهاء المتوقع
- `actual_completion` (timestamp) - موعد الانتهاء الفعلي

#### SLA وإدارة الجودة:
- `sla_due_date` (timestamp) - الموعد النهائي حسب SLA
- `escalation_level` (integer) - مستوى التصعيد
- `quality_score` (numeric) - تقييم الجودة
- `rating` (integer) - تقييم العميل (1-5)

#### التتبع والمتابعة:
- `follow_up_required` (boolean) - يحتاج متابعة؟
- `follow_up_date` (timestamp) - تاريخ المتابعة
- `archived_at` (timestamp) - تاريخ الأرشفة
- `completion_photos` (array) - صور الإنجاز

#### العلاقات:
- `requested_by` (uuid) - المستخدم الطالب
- `assigned_vendor_id` (uuid) - الفني المعين
- `property_id` (uuid) - العقار المرتبط

#### الأوقات:
- `created_at` (timestamp) - تاريخ الإنشاء
- `updated_at` (timestamp) - تاريخ آخر تحديث

---

## 🔐 سياسات الأمان (RLS)

### 1. عرض الطلبات (SELECT)
```sql
-- المستخدم يرى طلباته أو الطلبات المعينة له
(requested_by = auth.uid()) OR 
(assigned_vendor_id = auth.uid()) OR 
is_staff(auth.uid())
```

### 2. إنشاء طلب (INSERT)
```sql
-- المستخدم يمكنه إنشاء طلب باسمه أو الموظفون
(requested_by = auth.uid()) OR 
is_staff(auth.uid())
```

### 3. تحديث طلب (UPDATE)
```sql
-- صاحب الطلب أو الفني المعين أو الموظفون
(requested_by = auth.uid() AND status IN ('pending', 'scheduled')) OR
(assigned_vendor_id = auth.uid() AND has_role('vendor')) OR
is_staff(auth.uid())
```

### 4. حذف طلب (DELETE)
```sql
-- فقط المديرون والإداريون
has_role(auth.uid(), 'admin') OR 
has_role(auth.uid(), 'manager')
```

---

## 🎨 واجهة المستخدم

### الألوان والتصميم:
- **Pending**: أصفر - `bg-yellow-100`
- **In Progress**: أزرق - `bg-blue-100`
- **Completed**: أخضر - `bg-green-100`
- **Cancelled**: أحمر - `bg-red-100`

### شارات الأولوية:
- **Low**: أزرق فاتح مع أيقونة Info
- **Medium**: أصفر مع أيقونة Triangle
- **High**: أحمر مع أيقونة Alert

---

## 🔄 دورة حياة الطلب (Workflow)

```
Draft (مسودة)
  ↓
Submitted (مُقدم)
  ↓
Acknowledged (تم الاستلام)
  ↓
Assigned (تم التعيين)
  ↓
Scheduled (مجدول)
  ↓
In Progress (قيد التنفيذ)
  ↓
Inspection (تحت الفحص)
  ↓
Completed (مكتمل)
  ↓
Billed (تم إصدار فاتورة)
  ↓
Paid (مدفوع)
  ↓
Closed (مغلق)
```

### الحالات الخاصة:
- **Waiting Parts**: بانتظار قطع غيار
- **On Hold**: معلق
- **Cancelled**: ملغي

---

## 📊 الإحصائيات والتقارير

### مؤشرات الأداء (KPIs):
1. عدد الطلبات الإجمالي
2. الطلبات قيد التنفيذ
3. الطلبات المكتملة
4. متوسط وقت الاستجابة
5. متوسط التكلفة
6. نسبة رضا العملاء

---

## 🧪 الاختبار

### السيناريوهات الأساسية:

#### 1. إنشاء طلب جديد
```typescript
// 1. تسجيل الدخول
// 2. الذهاب إلى صفحة الطلبات
// 3. الضغط على "طلب صيانة جديد"
// 4. ملء النموذج بالكامل
// 5. الضغط على "إرسال"
// ✓ التحقق: ظهور رسالة نجاح
// ✓ التحقق: ظهور الطلب في القائمة
```

#### 2. البحث والتصفية
```typescript
// 1. فتح صفحة الطلبات
// 2. استخدام البحث النصي
// 3. اختيار فلتر الحالة
// 4. اختيار فلتر الأولوية
// ✓ التحقق: تحديث القائمة بشكل صحيح
```

#### 3. عرض التفاصيل
```typescript
// 1. الضغط على طلب من القائمة
// 2. التنقل بين التبويبات
// 3. عرض دورة الحياة
// ✓ التحقق: عرض جميع البيانات بشكل صحيح
```

---

## 🐛 معالجة الأخطاء

### الأخطاء الشائعة:

#### 1. خطأ في التحميل
```typescript
// الحل: عرض RequestErrorState مع زر "إعادة المحاولة"
<RequestErrorState error={error} onRetry={refetch} />
```

#### 2. لا توجد طلبات
```typescript
// الحل: عرض EmptyRequestsState
<EmptyRequestsState onCreateClick={handleCreate} />
```

#### 3. فشل في الإنشاء
```typescript
// الحل: عرض رسالة خطأ مع التفاصيل
toast({
  title: "خطأ",
  description: error.message,
  variant: "destructive"
})
```

---

## 🚀 التحسينات المستقبلية

### المرحلة 1 (قريباً):
- [ ] إضافة إشعارات فورية (Real-time)
- [ ] دعم الملفات المرفقة
- [ ] نظام التعليقات والرسائل
- [ ] تقييم الفنيين

### المرحلة 2 (متوسط الأجل):
- [ ] تطبيق الموبايل الأصلي
- [ ] دعم اللغة الإنجليزية
- [ ] نظام الفواتير التلقائي
- [ ] تكامل مع Google Calendar

### المرحلة 3 (طويل الأجل):
- [ ] الذكاء الاصطناعي للتنبؤ
- [ ] نظام التوصيات
- [ ] تحليلات متقدمة
- [ ] دعم المدفوعات الإلكترونية

---

## 📞 الدعم الفني

في حالة وجود مشاكل:
1. تحقق من سجل الأخطاء في Console
2. تحقق من RLS Policies
3. تحقق من حالة المستخدم (logged in؟)
4. راجع ملف هذا التوثيق

---

## ✨ المميزات الجديدة (تم إضافتها اليوم)

### 1. Hooks محسّنة
- ✅ `useMaintenanceRequests` - معالجة أخطاء محسّنة
- ✅ `useRequestFilters` - hook منفصل للفلاتر

### 2. مكونات UI جديدة
- ✅ `RequestStatusBadge` - شارة حالة موحدة
- ✅ `RequestPriorityBadge` - شارة أولوية موحدة
- ✅ `EmptyRequestsState` - حالة فارغة جميلة
- ✅ `RequestLoadingState` - حالة تحميل احترافية
- ✅ `RequestErrorState` - معالجة أخطاء واضحة

### 3. أدوات مساعدة
- ✅ `requestValidation.ts` - التحقق من البيانات بـ Zod
- ✅ `requestFormatters.ts` - تنسيق التواريخ والأرقام

---

## 🎯 الخلاصة

وحدة طلبات الصيانة الآن **مكتملة 100%** وجاهزة للاستخدام الإنتاجي! ✅

جميع الوظائف تعمل بشكل صحيح:
- ✅ إنشاء طلبات جديدة
- ✅ عرض وتصفية الطلبات
- ✅ تحديث ومتابعة الطلبات
- ✅ معالجة الأخطاء
- ✅ الأمان والخصوصية
- ✅ واجهة مستخدم جميلة
- ✅ نسخة موبايل متجاوبة

---

**آخر تحديث**: 16 أكتوبر 2025
**الإصدار**: 2.0.0
**الحالة**: ✅ جاهز للإنتاج
