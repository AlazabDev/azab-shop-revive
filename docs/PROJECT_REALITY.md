# الواقع الفعلي للمشروع - محدث بتاريخ اليوم

## ⚠️ هذا المستند يعكس الواقع الفعلي للمشروع الآن

---

## 📊 الجداول الموجودة فعلياً في القاعدة

### جداول طلبات الصيانة (8 جداول)
- `maintenance_requests` - الجدول الرئيسي للطلبات
- `maintenance_requests_v2` - نسخة ثانية (يحتاج مراجعة)
- `maintenance_requests_archive` - أرشيف الطلبات
- `quick_maintenance_requests` - طلبات سريعة
- `request_events` - أحداث الطلبات ✅
- `request_lifecycle` - دورة حياة الطلب
- `request_status_history` - تاريخ الحالات
- `request_status_audit` - تدقيق الحالات

### جداول المولات والمحلات (4 جداول) ✅
- `malls` - المولات الموجودة فعلياً ✅
- `stores` - المحلات (العملاء الحاليون) ✅  
- `mall_branches` - فروع المولات ✅ (تم إضافتها حديثاً)
- `mall_tenants` - المستأجرون ✅ (تم إضافتها حديثاً)

### جداول الخدمات (7 جداول)
- `services` - الخدمات
- `maintenance_services` - خدمات الصيانة
- `service_categories` - فئات الخدمات
- `service_subcategories` - فئات فرعية
- `service_requests` - طلبات الخدمة
- `service_prices` - أسعار الخدمات
- `service_price_tiers` - مستويات الأسعار

### جداول الموردين والفنيين (5 جداول)
- `vendors` - الموردين/الفنيين
- `vendor_locations` - مواقع الموردين
- `vendor_communications` - اتصالات الموردين ✅ (جديد)
- `vendor_appointments` - مواعيد الموردين
- `user_vendor_map` - ربط المستخدمين بالموردين

### جداول المواعيد (4 جداول)
- `appointments` - المواعيد
- `appointments_secure` - المواعيد الآمنة
- `request_appointments_v2` - مواعيد الطلبات

### جداول المشاريع (9 جداول)
- `projects` - المشاريع ✅
- `project_documents` - مستندات المشاريع
- `project_gallery` - معرض المشاريع
- `project_phases` - مراحل المشاريع
- `project_reviews` - تقييمات المشاريع
- `project_tasks` - مهام المشاريع
- `project_updates` - تحديثات المشاريع
- `project_views` - مشاهدات المشاريع

### جداول العقارات (3 جداول)
- `properties` - العقارات
- `units` - الوحدات
- `branches` - الفروع

### جداول الفواتير والمدفوعات (5 جداول)
- `invoices` - الفواتير
- `invoice_items` - بنود الفاتورة
- `payments` - المدفوعات
- `subscription_invoices` - فواتير الاشتراكات
- `subscriptions` - الاشتراكات

### جداول قطع الغيار والمواد (4 جداول)
- `parts_orders` - طلبات قطع الغيار ✅ (جديد)
- `material_requests` - طلبات المواد
- `materials` - المواد
- `service_checklists` - قوائم التحقق ✅ (جديد)

### جداول النظام والأمان (12 جدول)
- `profiles` - ملفات المستخدمين
- `user_roles` - أدوار المستخدمين
- `user_preferences` - تفضيلات المستخدمين
- `platform_permissions` - صلاحيات المنصة
- `audit_logs` - سجلات التدقيق
- `error_logs` - سجلات الأخطاء
- `notifications` - الإشعارات
- `scheduled_notifications` - الإشعارات المجدولة
- `system_settings` - إعدادات النظام

### جداول أخرى (15 جدول)
- `categories` - الفئات
- `subcategories` - الفئات الفرعية
- `regions` - المناطق
- `internal_teams` - الفرق الداخلية
- `comments` - التعليقات
- `notes` - الملاحظات
- `posts` - المنشورات
- `expenses` - المصاريف
- `maintenance_reports` - تقارير الصيانة
- `gallery_images` - صور المعرض
- `request_approvals` - موافقات الطلبات
- `request_reviews` - تقييمات الطلبات
- `sla_policies` - سياسات SLA ✅ (جديد)
- `status_defs` - تعريفات الحالات
- `status_transitions` - انتقالات الحالات

**المجموع: 85 جدول**

---

## 🔄 حالات طلبات الصيانة الفعلية

### في الكود (useMaintenanceRequests.ts):
```typescript
export type WorkflowStage = 
  | 'draft'           // مسودة
  | 'submitted'       // مُرسل
  | 'acknowledged'    // مُستلم
  | 'assigned'        // مُعيّن
  | 'scheduled'       // مجدول
  | 'in_progress'     // جارٍ التنفيذ
  | 'inspection'      // فحص
  | 'waiting_parts'   // انتظار قطع
  | 'completed'       // مكتمل
  | 'billed'          // مفوّتر
  | 'paid'            // مدفوع
  | 'closed'          // مغلق
  | 'cancelled'       // ملغي
  | 'on_hold';        // معلّق
```

### الحقول الفعلية في جدول maintenance_requests:
- `workflow_stage` - المرحلة الحالية ✅
- `status` - الحالة القديمة (pending, in_progress, completed, etc.)
- `sla_due_date` - موعد SLA ✅
- `escalation_level` - مستوى التصعيد ✅
- `quality_score` - درجة الجودة ✅

---

## 💻 المكونات الرئيسية الموجودة فعلياً

### صفحات (Pages):
- ✅ Requests.tsx - صفحة الطلبات
- ✅ RequestDetails.tsx - تفاصيل الطلب
- ✅ Projects.tsx - صفحة المشاريع
- ✅ Properties.tsx - صفحة العقارات
- ✅ Vendors.tsx - صفحة الموردين
- ✅ Dashboard.tsx - لوحة التحكم

### مكونات طلبات الصيانة:
- ✅ MaintenanceRequestsList.tsx - قائمة الطلبات
- ✅ MobileMaintenanceList.tsx - القائمة للموبايل
- ✅ MaintenanceRequestDetails.tsx - تفاصيل الطلب
- ✅ RequestWorkflowControls.tsx - التحكم بالمراحل ✅
- ✅ RequestStatusTimeline.tsx - خط زمني للحالات
- ✅ RequestLifecycleTracker.tsx - متتبع دورة الحياة
- ✅ NewRequestForm.tsx - نموذج طلب جديد

### Hooks:
- ✅ useMaintenanceRequests.ts - إدارة الطلبات
- ✅ useProjects.ts - إدارة المشاريع
- ✅ useProperties.ts - إدارة العقارات
- ✅ useVendors.ts - إدارة الموردين

---

## 🚀 Edge Functions الموجودة فعلياً

1. ✅ `chatbot` - المحادثة الذكية
2. ✅ `error-tracking` - تتبع الأخطاء
3. ✅ `get-maps-key` - الحصول على مفتاح الخرائط
4. ✅ `import-gallery-images` - استيراد صور المعرض
5. ✅ `send-invoice-email` - إرسال فواتير بالبريد
6. ✅ `send-notification` - إرسال الإشعارات
7. ✅ `create-profile` - إنشاء ملف المستخدم

**المجموع: 7 functions**

---

## ⚠️ ما لم يتم تنفيذه بعد

### من المخطط النظري ولكن غير موجود:
- ❌ `jotform-intake` - استقبال نماذج المول
- ❌ `on-tech-first-reply` - رد الفني الأول
- ❌ نظام 4-Eyes للفحص الهندسي
- ❌ Smart Dispatch (الاختيار الذكي للفني)
- ❌ Computer Vision للصور
- ❌ SLA Timers تلقائية
- ❌ الأرشفة التلقائية بعد 90 يوم

### الوظائف الجزئية:
- 🟡 SLA - الجداول موجودة لكن الأتمتة ناقصة
- 🟡 Request Events - الجدول موجود لكن التسجيل غير كامل
- 🟡 Vendor Communications - الجدول موجود لكن بدون إشعارات

---

## 📱 التطبيق المحمول

### Android:
- ✅ Capacitor مُعد
- ✅ Android Manifest جاهز
- ✅ ملفات الموارد موجودة
- ⚠️ يحتاج بناء واختبار

### iOS:
- ⚠️ لم يتم الإعداد بعد

---

## 🎯 الخطوات التالية المقترحة (بصدق)

### الأولوية 1 (ضروري):
1. إصلاح التكامل بين `workflow_stage` و `status`
2. تفعيل تسجيل الأحداث في `request_events`
3. اختبار المشاريع بالروابط الحقيقية

### الأولوية 2 (مهم):
1. إنشاء Edge Function لاستقبال نماذج المول
2. ربط `malls` و `stores` بطلبات الصيانة
3. تفعيل إشعارات البريد للفروع

### الأولوية 3 (تحسينات):
1. تفعيل SLA تلقائية
2. Smart Dispatch للفنيين
3. لوحة تحكم محسنة

---

## 📝 ملاحظات مهمة

1. **التوثيق القديم كان يحتوي على خطط مستقبلية** وليس الواقع الفعلي
2. **المشروع يعمل** لكن بعض المميزات المتقدمة غير مفعلة
3. **القاعدة غنية جداً** (85 جدول) لكن بعضها مكرر أو غير مستخدم
4. **الكود نظيف** ومنظم لكن يحتاج تبسيط وتركيز

---

تم التحديث: 18 أكتوبر 2025
هذا المستند يعكس الواقع 100% بدون مبالغة أو افتراضات.
