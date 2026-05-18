import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  ArrowRight, 
  Clock, 
  Package,
  CheckCircle2,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useProduct } from '@/contexts/ProductContext';
import { format } from 'date-fns';

const SubscriptionStatusCard = () => {
  const { activeProduct } = useProduct();
  const s = activeProduct.subscription;
  const usagePercent = (s.seatsAssigned / s.seatsTotal) * 100;

  return (
    <Card className="mb-6 overflow-hidden bg-white border border-slate-200 shadow-sm rounded-lg">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[18px] font-bold text-slate-900">{activeProduct.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-[#F3F4F6] text-[#374151] hover:bg-[#F3F4F6] text-[12px] font-medium py-0.5 px-2.5 rounded-full border-none">
                    PRO
                  </Badge>
                  <Badge className="bg-[#DCFCE7] text-[#16A34A] hover:bg-[#DCFCE7] text-[12px] font-medium py-0.5 px-2.5 rounded-full border-none">
                    ACTIVE
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[14px] text-[#6B7280]">Valid until</p>
                <p className="text-xl font-bold text-slate-900 mt-1">{s.validUntil}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end text-[14px]">
                <span className="text-slate-900 font-medium">{s.seatsAssigned} of {s.seatsTotal} seats assigned</span>
                <span className="text-[#6B7280]">{Math.round(usagePercent)}% used</span>
              </div>
              <Progress value={usagePercent} className="h-2 bg-slate-100" indicatorClassName="bg-brand-primary" />
            </div>
          </div>
          
          <div className="border-t md:border-t-0 md:border-l border-slate-100 p-6 flex items-center justify-center min-w-[240px]">
            <p className="text-[14px] text-[#6B7280] italic">Subscription in good standing.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const { activeProduct } = useProduct();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-[#111827]">Overview</h1>
          <p className="text-[#6B7280] text-[14px] mt-1">Welcome back. Here's what's happening with your account.</p>
        </div>
      </div>

      {/* Banner Component (Render conditionally if within 30 days) - Hidden by default per spec */}
      {/* 
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg flex items-center justify-between">
        <p className="text-amber-800 text-sm font-medium">Your subscription expires in 14 days. Renew now to avoid interruption.</p>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white">Renew Now</Button>
      </div>
      */}

      <SubscriptionStatusCard />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Seats Summary */}
          <Card className="bg-white border border-slate-200 shadow-sm rounded-lg">
            <CardHeader className="pb-3 border-b border-slate-100 p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[20px] font-bold text-[#111827]">Seats</CardTitle>
                <Users className="w-5 h-5 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-6 p-6">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-[36px] font-bold text-[#111827]">{activeProduct.subscription.seatsAssigned} / {activeProduct.subscription.seatsTotal}</span>
                <span className="text-[14px] text-[#6B7280] whitespace-nowrap">seats currently active</span>
              </div>
              
              <div className="space-y-4">
                <p className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-widest">RECENTLY ASSIGNED</p>
                <div className="space-y-4">
                  {activeProduct.seats.slice(0, 5).map((seat) => (
                    <div key={seat.id} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[14px] font-bold text-slate-700">
                          {seat.userName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-[#111827] leading-none mb-1.5">{seat.userName}</p>
                          <p className="text-[12px] text-[#6B7280] leading-none">{seat.userEmail}</p>
                        </div>
                      </div>
                      <p className="text-[12px] text-[#6B7280]">
                        {format(new Date(seat.assignedAt), 'MMM d')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <Link to="/portal/seats" className="text-[14px] font-medium text-brand-primary hover:underline inline-flex items-center gap-1 group">
                  Manage seats <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Active Add-ons */}
          <Card className="bg-white border border-slate-200 shadow-sm rounded-lg">
            <CardHeader className="pb-3 border-b border-slate-100 p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[20px] font-bold text-[#111827]">Active add-ons</CardTitle>
                <Package className="w-5 h-5 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-6 p-6">
              <div className="flex flex-col gap-3 mb-6">
                {activeProduct.addons.length > 0 ? (
                  activeProduct.addons.map(addon => (
                    <div key={addon.id} className="flex items-center">
                      <Badge className="bg-[#DCFCE7] text-[#16A34A] hover:bg-[#DCFCE7] border-none px-3 py-1 text-[13px] font-medium rounded-full">{addon.name}</Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-[14px] text-[#6B7280]">No active add-ons.</p>
                )}
              </div>
              <Link to="/portal/addons" className="text-[14px] font-medium text-brand-primary hover:underline inline-flex items-center gap-1 group">
                Manage add-ons <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </CardContent>
          </Card>

          {/* Next Renewal */}
          <Card className="bg-white border border-slate-200 shadow-sm rounded-lg">
            <CardHeader className="pb-3 border-b border-slate-100 p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[20px] font-bold text-[#111827]">Next renewal</CardTitle>
                <Clock className="w-5 h-5 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-6 p-6 space-y-5">
              <div>
                <p className="text-[24px] font-bold text-[#111827]">{activeProduct.subscription.validUntil}</p>
                <p className="text-[14px] text-[#6B7280] mt-1">Annual subscription · Auto-renew ON</p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <span className="text-[14px] text-slate-700 font-medium">Auto-renew enabled</span>
              </div>

              <Button variant="outline" className="w-full text-brand-primary border-brand-primary/20 hover:bg-slate-50 font-medium shadow-sm">
                <Download className="w-4 h-4 mr-2" />
                Download Renewal Invoice
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
