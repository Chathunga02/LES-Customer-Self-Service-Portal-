import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bell, 
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
import { cn } from '@/lib/utils';
import { useProduct } from '@/contexts/ProductContext';

const NAV_LINKS = [
  { label: 'Overview', href: '/portal/dashboard', icon: LayoutDashboard },
  { label: 'Seats & Users', href: '/portal/seats', icon: Users },
  { label: 'Invoices & Billing', href: '/portal/billing', icon: CreditCard },
  { label: 'Add-ons', href: '/portal/addons', icon: PlusCircle },
  { label: 'Account', href: '/portal/account', icon: Settings },
];

export const SubscriptionStatusBanner = () => {
  const { activeProduct } = useProduct();
  const { state, validUntil } = activeProduct.subscription;
  
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
    <div className={cn("w-full px-6 py-3 border-l-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3", config.bg, config.border)}>
      <div className="flex items-start sm:items-center gap-3">
        <Icon className={cn("w-5 h-5 shrink-0 mt-0.5 sm:mt-0", config.iconColor)} />
        <p className="text-sm font-medium text-slate-800">{config.message}</p>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        {config.cta && (
          <Button size="sm" className="bg-brand-primary hover:bg-brand-primary/90 text-white h-8 px-4 text-xs font-semibold whitespace-nowrap">
            {config.cta}
          </Button>
        )}
        {config.link && (
          <Link to="#" className="text-xs font-semibold text-brand-primary hover:underline whitespace-nowrap">
            {config.link}
          </Link>
        )}
      </div>
    </div>
  );
};

export const SideBar = () => {
  const location = useLocation();
  const { activeProduct, products, setActiveProduct } = useProduct();

  return (
    <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 bg-white border-r border-nav-border z-50">
      {/* Top: Logo & Product Switcher */}
      <div className="p-6 pb-4 border-b border-slate-100 space-y-6">
        <Link to="/portal/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#111827] rounded flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-[#111827]">LES PORTAL</span>
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full flex items-center justify-between border-slate-200 shadow-sm text-[#111827] font-medium h-9 bg-slate-50/50 hover:bg-slate-100/80 transition-colors px-3">
              <span className="truncate">{activeProduct.name}</span>
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Products</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {products.map(p => (
              <DropdownMenuItem 
                key={p.id} 
                className={cn(
                  "font-medium cursor-pointer",
                  activeProduct.id === p.id ? "bg-slate-100 text-brand-primary font-bold" : "text-slate-700"
                )}
                onClick={() => setActiveProduct(p.id)}
              >
                {p.name}
                {activeProduct.id === p.id && <CheckCircle2 className="w-4 h-4 ml-auto text-brand-primary" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Middle: Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                isActive 
                  ? "bg-brand-primary/10 text-brand-primary" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-brand-primary"
              )}
            >
              <Icon className={cn(
                "w-5 h-5",
                isActive ? "text-brand-primary" : "text-slate-400 group-hover:text-brand-primary/70"
              )} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Notifications & Profile */}
      <div className="p-4 border-t border-slate-100 space-y-4 bg-slate-50/30">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start gap-3 bg-white border-slate-200 hover:bg-slate-50 hover:text-brand-primary group relative px-3">
              <Bell className="w-4 h-4 text-slate-500 group-hover:text-brand-primary transition-colors shrink-0" />
              <span className="text-sm font-medium">Notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-primary rounded-full ring-2 ring-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-80 ml-2 p-0 border-slate-200 shadow-lg rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
              <span className="text-[14px] font-bold text-[#111827]">Notifications</span>
              <span className="text-[11px] font-semibold text-brand-primary cursor-pointer hover:underline">Mark all as read</span>
            </div>
            <div className="max-h-[340px] overflow-y-auto">
              <div className="p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0 relative transition-colors">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary" />
                <p className="text-[13px] font-bold text-[#111827] mb-1">Subscription Renewal Approaching</p>
                <p className="text-[13px] text-[#6B7280] leading-snug">Your annual subscription will renew in 30 days. Your invoice is ready for review.</p>
                <p className="text-[11px] font-semibold text-slate-400 mt-2 uppercase tracking-wider">2 hours ago</p>
              </div>
              <div className="p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0 transition-colors">
                <p className="text-[13px] font-bold text-[#111827] mb-1">New user assigned</p>
                <p className="text-[13px] text-[#6B7280] leading-snug">A new seat was assigned to Alex Rivers.</p>
                <p className="text-[11px] font-semibold text-slate-400 mt-2 uppercase tracking-wider">Yesterday</p>
              </div>
            </div>
            <div className="p-2 border-t border-slate-100 text-center bg-slate-50/50">
               <span className="text-[12px] font-semibold text-slate-500 cursor-pointer hover:text-slate-700">View all notifications</span>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors group">
              <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white text-sm font-semibold transition-all shadow-sm shrink-0">
                SJ
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-[14px] font-bold text-slate-900 truncate">Sarah Johnson</p>
                <p className="text-[12px] text-slate-500 truncate">Acme Industries Ltd</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-primary shrink-0 transition-colors" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-56 ml-2">
            <DropdownMenuItem className="text-slate-900 font-bold px-4 py-2">
              Sarah Johnson
              <br />
              <span className="font-normal text-slate-500 text-sm">s.johnson@acme.com</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/portal/account" className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" /> Account Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 cursor-pointer">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};

export const MobileHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeProduct, products, setActiveProduct } = useProduct();
  const location = useLocation();

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-[60px] bg-white border-b border-nav-border z-50 px-4 flex items-center justify-between shadow-sm">
      <Link to="/portal/dashboard" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#111827] rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">L</span>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1 border-slate-200 shadow-sm text-[#111827] font-medium h-8 bg-slate-50/50">
              <span className="truncate max-w-[120px]">{activeProduct.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="text-xs font-bold text-slate-500 uppercase tracking-wider">Products</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {products.map(p => (
              <DropdownMenuItem 
                key={p.id} 
                className={cn(
                  "font-medium cursor-pointer",
                  activeProduct.id === p.id ? "bg-slate-100 text-brand-primary font-bold" : "text-slate-700"
                )}
                onClick={() => setActiveProduct(p.id)}
              >
                {p.name}
                {activeProduct.id === p.id && <CheckCircle2 className="w-4 h-4 ml-auto text-brand-primary" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-slate-500 h-8 w-8 ml-1">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0 flex flex-col">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center shrink-0">
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
                          ? "bg-brand-primary/10 text-brand-primary" 
                          : "text-slate-600 hover:bg-slate-50 hover:text-brand-primary"
                      )}
                    >
                      <Icon className={cn("w-5 h-5", isActive ? "text-brand-primary" : "text-slate-400")} />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            
            <div className="p-6 mt-auto border-t">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white text-sm font-semibold">
                    SJ
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-slate-900">Sarah Johnson</p>
                    <p className="text-[12px] text-slate-500">Acme Industries Ltd</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="relative text-slate-500">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-brand-primary rounded-full ring-2 ring-white" />
                </Button>
              </div>
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
    <div className="min-h-screen bg-surface-page font-sans selection:bg-brand-primary/10 selection:text-brand-primary flex flex-col lg:flex-row">
      <SideBar />
      <MobileHeader />
      <main className="flex-1 flex flex-col pt-[60px] lg:pt-0 lg:ml-64 w-full min-h-screen">
        <SubscriptionStatusBanner />
        <div className="max-w-[1100px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-10 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};
