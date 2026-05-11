import React from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  ChevronRight,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from "sonner";

const Account = () => {
  return (
    <div className="max-w-[640px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Account settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your personal profile and security preferences.</p>
      </div>

      {/* Profile Card */}
      <Card className="border-none shadow-sm ring-1 ring-slate-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base font-bold">Profile</CardTitle>
            <CardDescription className="text-xs">Your personal information.</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="h-8 text-xs font-semibold">Edit</Button>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Full name</label>
              <p className="text-sm font-medium text-slate-900">Sarah Jenkins</p>
            </div>
            <Separator className="bg-slate-50" />
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email address</label>
              <p className="text-sm font-medium text-slate-900">s.jenkins@acme.com</p>
              <p className="text-[11px] text-slate-400 italic mt-1">Changing your email will require verification before taking effect.</p>
            </div>
            <Separator className="bg-slate-50" />
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Organisation</label>
              <p className="text-sm font-medium text-slate-600 italic">Acme Industries Ltd (Read-only)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Card */}
      <Card className="border-none shadow-sm ring-1 ring-slate-200">
        <CardHeader>
          <CardTitle className="text-base font-bold">Password</CardTitle>
          <CardDescription className="text-xs">Update your security credentials.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Current password</label>
            <div className="relative">
               <Input type="password" placeholder="••••••••" className="h-10" />
               <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-10 w-10 text-slate-400">
                 <EyeOff className="w-4 h-4" />
               </Button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">New password</label>
            <Input type="password" placeholder="Min. 8 characters" className="h-10" />
            {/* Password strength placeholder */}
            <div className="flex gap-1 h-1.5 mt-2">
              <div className="flex-1 bg-slate-100 rounded-full" />
              <div className="flex-1 bg-slate-100 rounded-full" />
              <div className="flex-1 bg-slate-100 rounded-full" />
              <div className="flex-1 bg-slate-100 rounded-full" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Confirm new password</label>
            <Input type="password" placeholder="••••••••" className="h-10" />
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button className="bg-brand-primary font-bold px-6">Update password</Button>
        </CardFooter>
      </Card>

      {/* Notifications Card */}
      <Card className="border-none shadow-sm ring-1 ring-slate-200">
        <CardHeader>
          <CardTitle className="text-base font-bold">Email notifications</CardTitle>
          <CardDescription className="text-xs">Choose which updates you want to receive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-0 pt-2">
          <div className="space-y-0">
             {[
               { id: 'n1', label: 'Renewal reminders (T-30, T-15, T-7, T-1)', toggleable: true, default: true },
               { id: 'n2', label: 'Payment receipt', toggleable: false, default: true },
               { id: 'n3', label: 'Payment failed', toggleable: false, default: true },
               { id: 'n4', label: 'Subscription entering grace period', toggleable: false, default: true },
               { id: 'n5', label: 'Subscription expired', toggleable: false, default: true },
               { id: 'n6', label: 'Seat assigned', toggleable: false, default: true },
               { id: 'n7', label: 'License key rotated', toggleable: true, default: true },
             ].map((pref) => (
               <div key={pref.id} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
                 <div className="flex items-center gap-3">
                   <p className={cn("text-xs font-medium", pref.toggleable ? "text-slate-700" : "text-slate-400")}>
                     {pref.label}
                   </p>
                   {!pref.toggleable && (
                      <span className="text-[9px] font-bold text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">MANDATORY</span>
                   )}
                 </div>
                 <Switch 
                   defaultChecked={pref.default} 
                   disabled={!pref.toggleable} 
                  />
               </div>
             ))}
          </div>
        </CardContent>
        <CardFooter className="pt-4 border-t border-slate-50">
          <Button className="bg-brand-primary w-full font-bold">Save preferences</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Account;
