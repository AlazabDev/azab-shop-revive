import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Download
} from "lucide-react";

export const Footer = () => {
  const footerLinks = {
    services: [
      "إدارة الصيانة",
      "إدارة العقارات", 
      "التقارير والتحليلات",
      "إدارة الموردين",
      "نظام المواعيد"
    ],
    support: [
      "مركز المساعدة",
      "الدعم الفني",
      "التدريب",
      "الأسئلة الشائعة",
      "تواصل معنا"
    ],
    company: [
      "عن الشركة",
      "فريق العمل",
      "الشراكات",
      "الوظائف",
      "الأخبار"
    ],
    legal: [
      "شروط الاستخدام",
      "سياسة الخصوصية",
      "سياسة الإرجاع",
      "الأمان والحماية"
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary-foreground rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold">A</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">azab.services</h3>
                  <p className="text-sm text-primary-foreground/70">نظام إدارة الصيانة الذكي</p>
                </div>
              </div>
              
              <p className="text-primary-foreground/80 leading-relaxed">
                منصة شاملة لإدارة عمليات الصيانة والعقارات مع أحدث التقنيات وأفضل الممارسات 
                لضمان كفاءة وجودة الخدمة.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+966 12 345 6789</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@azab.services</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">الرياض، المملكة العربية السعودية</span>
              </div>
            </div>

            {/* App Download */}
            <div className="space-y-3">
              <h4 className="font-semibold">تطبيق سهل لإدارة عقاراتك</h4>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="text-primary bg-primary-foreground hover:bg-primary-foreground/90">
                  <Download className="h-4 w-4 mr-2" />
                  App Store
                </Button>
                <Button variant="outline" size="sm" className="text-primary bg-primary-foreground hover:bg-primary-foreground/90">
                  <Download className="h-4 w-4 mr-2" />
                  Google Play
                </Button>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">خدماتنا</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">الدعم</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="font-semibold mb-4">الشركة</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold mb-4">قانوني</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-primary-foreground/70">
              © 2024 azab.services. جميع الحقوق محفوظة.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};