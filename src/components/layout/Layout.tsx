import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bell, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Info, 
  AlertTriangle, 
  Clock, 
  CheckCircle2,
  ChevronDown,
  LayoutDashboard,
  Users,
  CreditCard,
  PlusCircle,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { type SubscriptionState } from '@/types';
import { MOCK_SUBSCRIPTION } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Overview', href: '/portal/dashboard', icon: LayoutDashboard },
  { label: 'Seats & Users', href: '/portal/seats', icon: Users },
  { label: 'Invoices & Billing', href: '/portal/billing', icon: CreditCard },
  { label: 'Add-ons', href: '/portal/addons', icon: PlusCircle },
  { label: 'Account', href: '/portal/account', icon: Settings },
];

export const SubscriptionStatusBanner = () => {
  const { state, validUntil } = MOCK_SUBSCRIPTION;
  
  if (state === 'ACTIVE') return null;

  const config = {
    TRIAL: {
      bg: 'bg-[#EFF6FF]',
      border: 'border-l-[#378ADD]',
      icon: Info,
      iconColor: 'text-[#378ADD]',
      message: `Your trial is active. It ends on ${validUntil}.`,
    },
    GRACE: {
      bg: 'bg-[#FFFBEB]',
      border: 'border-l-[#EF9F27]',
      icon: AlertTriangle,
      iconColor: 'text-[#EF9F27]',
      message: `Your subscription expired on ${validUntil}. You have until June 20th to renew before access is lost.`,
      cta: 'Renew now',
    },
    PENDING_PAYMENT: {
      bg: 'bg-[#FEF3C7]',
      border: 'border-l-[#EF9F27]',
      icon: Clock,
      iconColor: 'text-[#EF9F27]',
      message: 'Your subscription is pending payment confirmation. Contact us if you\'ve already transferred.',
    },
    EXPIRED: {
      bg: 'bg-[#FEF2F2]',
      border: 'border-l-[#E24B4A]',
      icon: X,
      iconColor: 'text-[#E24B4A]',
      message: 'Your subscription has expired. Renew now to restore access.',
      cta: 'Renew now',
    },
    SUSPENDED: {
      bg: 'bg-[#FEF2F2]',
      border: 'border-l-[#E24B4A]',
      icon: X,
      iconColor: 'text-[#E24B4A]',
      message: 'Your account has been suspended. Contact support to reactivate.',
      link: 'Contact support',
    },
  }[state as keyof typeof config];

  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className={cn("w-full px-6 py-3 border-l-4 flex items-center justify-between", config.bg, config.border)}>
      <div className="flex items-center gap-3">
        <Icon className={cn("w-5 h-5", config.iconColor)} />
        <p className="text-sm font-medium text-slate-800">{config.message}</p>
      </div>
      <div className="flex items-center gap-4">
        {config.cta && (
          <Button size="sm" className="bg-brand-primary hover:bg-brand-primary/90 text-white h-8 px-4 text-xs font-semibold">
            {config.cta}
          </Button>
        )}
        {config.link && (
          <Link to="#" className="text-xs font-semibold text-brand-primary hover:underline">
            {config.link}
          </Link>
        )}
      </div>
    </div>
  );
};

export const TopNav = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] bg-white border-b border-nav-border z-50 px-6 flex items-center justify-between">
      {/* Left: Logo */}
      <Link to="/portal/dashboard" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">L</span>
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:block">LES PORTAL</span>
      </Link>

      {/* Center: Desktop Nav */}
      <nav className="hidden lg:flex items-center h-full">
        {NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-4 h-full flex items-center text-[14px] font-medium transition-all border-b-2 hover:text-brand-primary",
                isActive 
                  ? "text-brand-primary border-brand-primary" 
                  : "text-slate-600 border-transparent"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-brand-primary">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
        </Button>

        <div className="hidden sm:block h-6 w-px bg-slate-200 mx-1" />

        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right">
            <p className="text-[14px] font-medium text-slate-900 truncate max-w-[160px]">Acme Industries Ltd</p>
            <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Customer Admin</p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 hover:bg-transparent flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-brand-primary font-bold transition-all group-hover:ring-2 group-hover:ring-brand-primary/20">
                  SJ
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-primary transition-colors" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/portal/account" className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" /> Profile settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile menu trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden text-slate-500">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900">LES PORTAL</span>
              </div>
              <div className="space-y-1">
                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-slate-100 text-brand-primary" 
                          : "text-slate-600 hover:bg-slate-50 hover:text-brand-primary"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="p-6">
              <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 px-3">
                <LogOut className="w-5 h-5 mr-3" />
                Sign out
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-surface-page font-sans selection:bg-brand-primary/10 selection:text-brand-primary">
      <TopNav />
      <main className="pt-[60px]">
        <SubscriptionStatusBanner />
        <div className="max-w-[1100px] mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};
