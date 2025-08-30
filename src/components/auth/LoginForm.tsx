import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Building2, UserPlus } from 'lucide-react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { smartSignup, smartLogin } from '@/lib/smartAuth';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال البريد الإلكتروني وكلمة المرور",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await smartLogin(email, password);
      
      if (result.ok) {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في نظام إدارة الصيانة",
        });
      } else {
        const messages = {
          confirm_resent: "تم إرسال رابط التفعيل إلى بريدك الإلكتروني",
          reset_sent: "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني",
          error: result.error?.message || "حدث خطأ في تسجيل الدخول"
        };
        
        toast({
          title: result.mode === 'error' ? "خطأ في تسجيل الدخول" : "تم الإرسال",
          description: messages[result.mode as keyof typeof messages],
          variant: result.mode === 'error' ? "destructive" : "default",
        });
      }
    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال البريد الإلكتروني وكلمة المرور",
        variant: "destructive",
      });
      return;
    }

    setIsSigningUp(true);

    try {
      const result = await smartSignup(email, password, 'محمد عزب');
      
      if (result.ok) {
        toast({
          title: result.mode === 'signup' ? "تم إنشاء الحساب بنجاح" : "تم تسجيل الدخول بنجاح",
          description: result.mode === 'signup' ? "يمكنك الآن تسجيل الدخول" : "مرحباً بك في نظام إدارة الصيانة",
        });
      } else {
        const messages = {
          confirm_resent: "تم إرسال رابط التفعيل إلى بريدك الإلكتروني",
          reset_sent: "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني",
          otp_sent: "تم إرسال رابط دخول سحري إلى بريدك الإلكتروني",
          error: result.error?.message || "حدث خطأ في إنشاء الحساب"
        };
        
        toast({
          title: result.mode === 'error' ? "خطأ في إنشاء الحساب" : "تم الإرسال",
          description: messages[result.mode as keyof typeof messages],
          variant: result.mode === 'error' ? "destructive" : "default",
        });
      }
    } catch (error: any) {
      toast({
        title: "خطأ في إنشاء الحساب",
        description: "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "تعذر تسجيل الدخول بجوجل",
        variant: "destructive",
      });
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "تعذر تسجيل الدخول بفيسبوك",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">azab.services</CardTitle>
          <p className="text-muted-foreground">نظام إدارة طلبات الصيانة</p>
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
                placeholder="admin@azab.services"
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
                placeholder="كلمة المرور"
                required
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={isLoading || isSigningUp}>
                {isLoading && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
                تسجيل الدخول
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleSignUp}
                disabled={isLoading || isSigningUp}
                className="flex-1 gap-2"
              >
                {isSigningUp && <Loader2 className="h-4 w-4 animate-spin" />}
                <UserPlus className="h-4 w-4" />
                إنشاء حساب
              </Button>
            </div>
          </form>

          <div className="mt-4 space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">أو سجل الدخول باستخدام</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                className="flex-1 gap-2"
                disabled={isLoading || isSigningUp}
              >
                <FaGoogle className="h-4 w-4 text-red-500" />
                جوجل
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={handleFacebookLogin}
                className="flex-1 gap-2"
                disabled={isLoading || isSigningUp}
              >
                <FaFacebook className="h-4 w-4 text-blue-600" />
                فيسبوك
              </Button>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              <strong>خطوات البدء:</strong><br />
              1. اضغط "إنشاء حساب" لإنشاء حساب جديد<br />
              2. ثم سجل الدخول بنفس البيانات<br />
              <strong>مثال:</strong> admin@azab.services
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}