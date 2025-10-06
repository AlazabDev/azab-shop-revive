import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function MaintenanceProcedures() {
  const navigate = useNavigate();

  const procedures = [
    {
      title: "إجراءات الصيانة الكهربائية",
      icon: "⚡",
      safety: [
        "فصل التيار الكهربائي قبل بدء أي أعمال صيانة",
        "استخدام أدوات معزولة وآمنة فقط",
        "عدم لمس الأسلاك المكشوفة أو الرطبة",
        "التأكد من جفاف اليدين والمنطقة المحيطة"
      ],
      steps: [
        {
          title: "فحص اللوحة الكهربائية",
          details: "التحقق من سلامة القواطع الكهربائية، عدم وجود أسلاك مكشوفة أو محترقة، وسلامة التوصيلات الأرضية."
        },
        {
          title: "فحص المفاتيح والمقابس",
          details: "اختبار جميع المفاتيح والمقابس للتأكد من عملها بشكل سليم، استبدال أي مفاتيح تالفة أو مقابس متآكلة."
        },
        {
          title: "فحص الإضاءة",
          details: "التحقق من عمل جميع وحدات الإضاءة، استبدال المصابيح المحترقة، وتنظيف الثريات والوحدات."
        },
        {
          title: "قياس الجهد الكهربائي",
          details: "استخدام جهاز الملتيميتر للتأكد من استقرار الجهد الكهربائي وعدم وجود تذبذبات خطرة."
        }
      ]
    },
    {
      title: "إجراءات صيانة السباكة",
      icon: "🚰",
      safety: [
        "إغلاق صمام المياه الرئيسي قبل البدء",
        "استخدام معدات الوقاية الشخصية",
        "التأكد من التهوية الجيدة عند استخدام المواد الكيميائية",
        "فحص خطوط المياه الساخنة بحذر لتجنب الحروق"
      ],
      steps: [
        {
          title: "فحص التسريبات",
          details: "فحص جميع الحنفيات، المواسير، الخزانات، والوصلات للكشف عن أي تسريبات. استخدام كاشف التسرب أو الصابون للكشف عن التسريبات الصغيرة."
        },
        {
          title: "فحص الصرف الصحي",
          details: "التأكد من سلامة خطوط الصرف، تنظيف المصافي والسيفونات، والتحقق من عدم وجود انسدادات."
        },
        {
          title: "فحص السخانات",
          details: "فحص سخانات المياه (كهربائية أو غاز)، تنظيف الترسبات، التحقق من عمل الثرموستات، وفحص صمامات الأمان."
        },
        {
          title: "فحص الخزانات",
          details: "تنظيف خزانات المياه العلوية والأرضية، التحقق من سلامة العوامة، وفحص الأنابيب الموصلة."
        }
      ]
    },
    {
      title: "إجراءات صيانة التكييف",
      icon: "❄️",
      safety: [
        "فصل التيار الكهربائي قبل الصيانة",
        "استخدام معدات السلامة عند العمل على الأسطح",
        "تجنب ملامسة غاز الفريون مباشرة",
        "التأكد من التهوية الجيدة أثناء العمل"
      ],
      steps: [
        {
          title: "تنظيف الفلاتر",
          details: "إزالة وتنظيف فلاتر الهواء أو استبدالها إذا كانت تالفة. يجب تنظيف الفلاتر كل شهر للحفاظ على كفاءة التكييف."
        },
        {
          title: "فحص غاز الفريون",
          details: "قياس مستوى غاز التبريد وإعادة تعبئته إذا لزم الأمر. انخفاض مستوى الغاز يؤثر على كفاءة التبريد."
        },
        {
          title: "تنظيف الوحدة الخارجية",
          details: "تنظيف زعانف المكثف من الأتربة والأوساخ، التحقق من عمل المروحة، وإزالة أي عوائق حول الوحدة."
        },
        {
          title: "فحص نظام الصرف",
          details: "التأكد من سلامة خط تصريف المياه المتكثفة، تنظيف المصرف من الانسدادات، وفحص مضخة الصرف إن وجدت."
        },
        {
          title: "فحص الكهرباء",
          details: "فحص التوصيلات الكهربائية، قياس التيار المستهلك، والتحقق من عمل الثرموستات والتايمر."
        }
      ]
    },
    {
      title: "إجراءات الصيانة العامة",
      icon: "🔧",
      safety: [
        "ارتداء معدات الحماية الشخصية المناسبة",
        "استخدام الأدوات الصحيحة لكل مهمة",
        "التأكد من استقرار السلالم قبل الصعود",
        "العمل في ظروف إضاءة جيدة"
      ],
      steps: [
        {
          title: "فحص الأبواب والنوافذ",
          details: "التحقق من سلامة المفصلات، الأقفال، وآليات الإغلاق. تزييت الأجزاء المتحركة وإصلاح أي تلف في الأختام العازلة."
        },
        {
          title: "فحص الدهانات",
          details: "تفقد حالة الدهان الداخلي والخارجي، معالجة التشققات والتقشير، وإعادة طلاء المناطق المتضررة."
        },
        {
          title: "فحص الأرضيات",
          details: "التحقق من سلامة البلاط، السيراميك، أو الباركيه. إصلاح أي كسور أو فراغات، وتنظيف الفواصل."
        },
        {
          title: "فحص الأسقف",
          details: "البحث عن علامات التسرب أو الرطوبة، فحص العوازل، والتأكد من عدم وجود تشققات."
        }
      ]
    },
    {
      title: "إجراءات صيانة الحدائق",
      icon: "🌳",
      safety: [
        "ارتداء القفازات عند التعامل مع النباتات",
        "استخدام المعدات الكهربائية بحذر",
        "تجنب الري في أوقات الحرارة الشديدة",
        "التأكد من سلامة المبيدات المستخدمة"
      ],
      steps: [
        {
          title: "العناية بالعشب",
          details: "قص العشب بانتظام، إزالة الأعشاب الضارة، تسميد التربة، والري المنتظم حسب الموسم."
        },
        {
          title: "صيانة أنظمة الري",
          details: "فحص الرشاشات والتنقيط، إصلاح التسريبات، تنظيف الفلاتر، وضبط توقيت الري."
        },
        {
          title: "تقليم الأشجار",
          details: "إزالة الأغصان الميتة أو المريضة، تشكيل الأشجار للنمو الصحي، وتنظيف منطقة الجذور."
        },
        {
          title: "مكافحة الآفات",
          details: "فحص النباتات للكشف عن الآفات أو الأمراض، استخدام المبيدات الآمنة، وتطبيق المكافحة الوقائية."
        }
      ]
    },
    {
      title: "إجراءات الطوارئ",
      icon: "🚨",
      safety: [
        "الحفاظ على الهدوء واتخاذ قرارات سريعة",
        "إبعاد الأشخاص من منطقة الخطر",
        "الاتصال بالطوارئ فوراً إذا لزم الأمر",
        "عدم المخاطرة بالسلامة الشخصية"
      ],
      steps: [
        {
          title: "تسرب الغاز",
          details: "إغلاق صمام الغاز الرئيسي فوراً، فتح جميع النوافذ للتهوية، عدم استخدام الكهرباء أو أي مصدر للشرر، إخلاء المبنى، والاتصال بشركة الغاز والإطفاء."
        },
        {
          title: "حريق كهربائي",
          details: "فصل التيار الكهربائي الرئيسي، استخدام طفاية حريق من نوع CO2 أو البودرة (لا تستخدم الماء)، إخلاء المبنى، والاتصال بالإطفاء."
        },
        {
          title: "فيضان المياه",
          details: "إغلاق صمام المياه الرئيسي، فصل التيار الكهربائي عن المنطقة المتضررة، إزالة الأثاث والممتلكات، وبدء عملية الشفط والتجفيف."
        },
        {
          title: "انقطاع التيار الكهربائي",
          details: "فحص القواطع الكهربائية أولاً، التواصل مع شركة الكهرباء، استخدام مصادر إضاءة آمنة، وفصل الأجهزة الحساسة من الكهرباء."
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">إجراءات الصيانة</h1>
            <p className="text-muted-foreground mt-1">دليل شامل لإجراءات وخطوات الصيانة المختلفة</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => navigate('/documentation')}>
          العودة للتوثيق
        </Button>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>تنبيه هام:</strong> جميع إجراءات الصيانة يجب أن يقوم بها فنيون مختصون. هذا الدليل للمعلومات فقط.
          في حالات الطوارئ، اتصل فوراً على رقم الطوارئ: 920000000
        </AlertDescription>
      </Alert>

      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>إجراءات الصيانة حسب النوع</CardTitle>
          <CardDescription>
            اختر نوع الصيانة لعرض الإجراءات والخطوات التفصيلية وتعليمات السلامة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {procedures.map((procedure, procedureIndex) => (
              <AccordionItem key={procedureIndex} value={`procedure-${procedureIndex}`}>
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{procedure.icon}</span>
                    {procedure.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 pr-6">
                    {/* قواعد السلامة */}
                    <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <h3 className="font-semibold text-destructive">قواعد السلامة الأساسية</h3>
                      </div>
                      <ul className="space-y-2 text-sm">
                        {procedure.safety.map((rule, ruleIndex) => (
                          <li key={ruleIndex} className="flex items-start gap-2">
                            <span className="text-destructive mt-1">•</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* الخطوات التفصيلية */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">الخطوات التفصيلية</h3>
                      </div>
                      <Accordion type="multiple" className="border-r-2 border-primary/20 pr-4">
                        {procedure.steps.map((step, stepIndex) => (
                          <AccordionItem key={stepIndex} value={`step-${procedureIndex}-${stepIndex}`}>
                            <AccordionTrigger className="text-base">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                <span className="font-medium">{stepIndex + 1}. {step.title}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed pr-6">
                              {step.details}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="card-elegant bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            ملاحظات مهمة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• يجب إجراء الصيانة الدورية حسب الجدول الزمني المحدد لكل نوع من المعدات</p>
          <p>• الاحتفاظ بسجل توثيقي لجميع أعمال الصيانة المنجزة</p>
          <p>• استخدام قطع الغيار الأصلية فقط لضمان الجودة وطول العمر الافتراضي</p>
          <p>• التواصل مع الدعم الفني عند وجود أي استفسار أو مشكلة: 920000000</p>
          <p>• في حالات الطوارئ، لا تحاول الإصلاح بنفسك واتصل بالفنيين المختصين فوراً</p>
        </CardContent>
      </Card>
    </div>
  );
}
