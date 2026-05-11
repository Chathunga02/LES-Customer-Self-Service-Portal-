import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[420px] space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg shadow-brand-primary/20">
            L
          </div>
          <h1 className="text-2xl font-bold text-slate-900">LES PORTAL</h1>
          <p className="text-slate-500 text-sm mt-1">Customer Self-Service</p>
        </div>

        <Card className="border-none shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/60 p-4">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold">Sign in</CardTitle>
            <CardDescription className="text-sm">Enter your credentials to manage your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="admin@company.com" className="pl-10 h-11" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                <Link to="#" className="text-xs font-semibold text-brand-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="pl-10 h-11" 
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 h-11 w-11 text-slate-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full h-11 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-base">
              Sign in
            </Button>
            <p className="text-xs text-center text-slate-500">
              New to LES? <Link to="#" className="font-semibold text-brand-primary hover:underline">Contact your administrator</Link>
            </p>
          </CardFooter>
        </Card>

        <div className="text-center">
            <p className="text-[11px] text-slate-400 font-medium">© 2026 License Enforcement System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
