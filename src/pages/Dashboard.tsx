import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  ArrowRight, 
  Clock, 
  CreditCard, 
  Package, 
  Info,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  MOCK_SUBSCRIPTION, 
  MOCK_SEATS, 
  MOCK_NOTIFICATIONS, 
  MOCK_INVOICES 
} from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { formatDistanceToNow, format } from 'date-fns';

const SubscriptionStatusCard = () => {
  const s = MOCK_SUBSCRIPTION;
  const usagePercent = (s.seatsAssigned / s.seatsTotal) * 100;
  
  const getProgressColor = (percent: number) => {
    if (percent >= 100) return "bg-red-500";
    if (percent >= 80) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <Card className="mb-6 overflow-hidden border-none shadow-sm ring-1 ring-slate-200">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[16px] font-semibold text-slate-900">{s.productName}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-[10px] uppercase font-bold py-0.5">
                    {s.planTier}
                  </Badge>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-[10px] uppercase font-bold py-0.5 border-none">
                    Active
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-500">Valid until</p>
                <p className="text-sm font-semibold text-slate-900">{format(new Date(s.validUntil), 'MMM d, yyyy')}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end text-xs">
                <span className="font-semibold text-slate-700">{s.seatsAssigned} of {s.seatsTotal} seats assigned</span>
                <span className="text-slate-400">{Math.round(usagePercent)}% used</span>
              </div>
              <Progress value={usagePercent} className="h-1.5" indicatorClassName={getProgressColor(usagePercent)} />
            </div>
          </div>
          
          <div className="bg-slate-50/50 border-t md:border-t-0 md:border-l border-slate-100 p-6 flex items-center justify-center min-w-[240px]">
            {/* Conditional CTA based on state - simplified for spec */}
            <p className="text-xs text-slate-500 text-center italic">Subscription in good standing.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Welcome back. Here's what's happening with your account.</p>
        </div>
      </div>

      <SubscriptionStatusCard />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Seats Summary */}
          <Card className="border-none shadow-sm ring-1 ring-slate-200">
            <CardHeader className="pb-3 border-b border-slate-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Seats</CardTitle>
                <Users className="w-4 h-4 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold text-slate-900">{MOCK_SUBSCRIPTION.seatsAssigned} / {MOCK_SUBSCRIPTION.seatsTotal}</span>
                <span className="text-sm text-slate-500 font-medium whitespace-nowrap">seats currently active</span>
              </div>
              
              <div className="space-y-4">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Recently assigned</p>
                <div className="space-y-3">
                  {MOCK_SEATS.slice(0, 3).map((seat) => (
                    <div key={seat.id} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-600">
                          {seat.userName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 leading-none mb-1">{seat.userName}</p>
                          <p className="text-xs text-slate-500 leading-none">{seat.userEmail}</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {format(new Date(seat.assignedAt), 'MMM d')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-50">
                <Link to="/portal/seats" className="text-sm font-semibold text-brand-primary hover:underline inline-flex items-center gap-1 group">
                  Manage all seats
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Active Add-ons */}
          <Card className="border-none shadow-sm ring-1 ring-slate-200">
            <CardHeader className="pb-3 border-b border-slate-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Active add-ons</CardTitle>
                <Package className="w-4 h-4 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none px-3 py-1 text-xs">Bulk Import</Badge>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none px-3 py-1 text-xs">Adv. Analytics</Badge>
              </div>
              <Link to="/portal/addons" className="text-sm font-semibold text-brand-primary hover:underline inline-flex items-center gap-1 mt-2">
                Manage add-ons
                <ArrowRight className="w-4 h-4" />
              </Link>
            </CardContent>
          </Card>

          {/* Upcoming Renewal */}
          <Card className="border-none shadow-sm ring-1 ring-slate-200">
            <CardHeader className="pb-3 border-b border-slate-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Next renewal</CardTitle>
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">14 Jun 2026</p>
                <p className="text-xs text-slate-500 font-medium">in 34 days</p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xs font-semibold text-slate-700">Payment method</span>
                </div>
                <p className="text-xs text-slate-600 ml-5">Visa ending ••••4242</p>
              </div>

              <Link to="/portal/billing" className="text-sm font-semibold text-brand-primary hover:underline inline-flex items-center gap-1">
                Manage billing contact
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Notifications Strip */}
      <Card className="border-none shadow-sm ring-1 ring-slate-200">
        <CardHeader className="pb-3 border-b border-slate-50">
           <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Recent notifications</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="divide-y divide-slate-50">
            {MOCK_NOTIFICATIONS.slice(0, 5).map((n) => (
              <div key={n.id} className="py-4 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    n.isRead ? "bg-slate-100 text-slate-400" : "bg-blue-100 text-blue-600"
                  )}>
                    {n.type === 'payment_success' ? <CreditCard className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className={cn("text-sm transition-colors", n.isRead ? "text-slate-500" : "text-slate-900 font-semibold")}>
                      {n.title}
                    </h4>
                    <p className="text-xs text-slate-500">{formatDistanceToNow(new Date(n.timestamp))} ago</p>
                  </div>
                </div>
                <Link to={n.link || '#'} className="text-xs font-semibold text-brand-primary hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                  View
                </Link>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-50 flex justify-center">
             <Button variant="ghost" size="sm" className="text-slate-500 text-xs font-semibold hover:text-brand-primary">
               View all notifications
             </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
