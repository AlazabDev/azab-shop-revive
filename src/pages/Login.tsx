import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowRight, Cog } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: error.message === "Invalid login credentials" 
            ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
            : error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في نظام إدارة الصيانة",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "حاول مرة أخرى لاحقاً",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail("admin@alazab.online");
    setPassword("123456");
    
    // Auto submit after setting demo credentials
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <div className="relative">
                <span className="text-primary-foreground font-bold text-2xl">A</span>
                <Cog className="absolute -top-1 -right-1 h-4 w-4 text-primary-foreground/80 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">azab.services</h1>
          <p className="text-muted-foreground mt-2">نظام إدارة طلبات الصيانة المتطور</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">تسجيل الدخول</CardTitle>
            <CardDescription className="text-center">
              ادخل بياناتك للوصول إلى لوحة التحكم
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري تسجيل الدخول...
                  </>
                ) : (
                  <>
                    تسجيل الدخول
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </>
                )}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full" 
                onClick={handleDemoLogin}
                disabled={isLoading}
              >
                دخول تجريبي سريع
              </Button>
            </form>
            
            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                ليس لديك حساب؟{" "}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  إنشاء حساب جديد
                </Link>
              </p>
              <p className="text-sm">
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  العودة للصفحة الرئيسية
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}