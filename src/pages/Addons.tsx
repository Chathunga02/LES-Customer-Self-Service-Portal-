import React from 'react';
import { 
  Puzzle, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Mail,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_SUBSCRIPTION } from '@/lib/mockData';

const Addons = () => {
  const activeAddons = [
    {
      id: 'a1',
      name: 'Bulk Import',
      description: 'Import large datasets from CSV or JSON in seconds.',
      features: ['Up to 1M rows', 'Auto-mapping', 'Validation logs'],
      expiry: '2026-06-14',
      icon: Zap,
    },
    {
      id: 'a2',
      name: 'Advanced Analytics',
      description: 'Get deeper insights into your organizational seat usage.',
      features: ['Custom reports', 'Historical trends', 'Export to PDF'],
      expiry: '2026-06-14',
      icon: BarChart3,
    }
  ];

  const availableAddons = [
    {
      id: 'a3',
      name: 'Audit Trail Plus',
      description: 'Extended log retention and detailed action history for compliance.',
      features: ['2 year retention', 'Detailed IP logs', 'Compliance export'],
      icon: ShieldCheck,
    },
    {
      id: 'a4',
      name: 'Email White-labeling',
      description: 'Send invitation and license emails from your own domain.',
      features: ['Custom SMTP', 'No LES branding', 'DKIM support'],
      icon: Mail,
    }
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Add-ons</h1>
        <p className="text-slate-500 text-sm mt-1">Enhance your {MOCK_SUBSCRIPTION.productName} experience with specialized modules.</p>
      </div>

      <section className="space-y-6">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          Active add-ons
          <Badge className="bg-green-100 text-green-700 border-none font-bold ml-1">{activeAddons.length}</Badge>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeAddons.map((addon) => {
            const Icon = addon.icon;
            return (
              <Card key={addon.id} className="border-none shadow-sm ring-1 ring-slate-200 flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-brand-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-none font-bold uppercase text-[10px]">Active</Badge>
                  </div>
                  <CardTitle className="text-[14px] font-bold">{addon.name}</CardTitle>
                  <CardDescription className="text-xs">{addon.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {addon.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-4 border-t border-slate-50">
                  <p className="text-[10px] font-medium text-slate-400">
                    Expires on {format(new Date(addon.expiry), 'MMM d, yyyy')}
                  </p>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <div className="border-t border-slate-200 pt-10">
          <div className="mb-6">
             <h2 className="text-lg font-bold text-slate-800">Available add-ons</h2>
             <p className="text-sm text-slate-500">To add a module to your subscription, contact our team. We'll get it set up for you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableAddons.map((addon) => {
              const Icon = addon.icon;
              return (
                <Card key={addon.id} className="border-none shadow-sm ring-1 ring-slate-100 opacity-80 flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="outline" className="text-slate-400 border-slate-200 font-bold uppercase text-[10px]">Inactive</Badge>
                    </div>
                    <CardTitle className="text-[14px] font-bold">{addon.name}</CardTitle>
                    <CardDescription className="text-xs">{addon.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {addon.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-xs text-slate-500">
                          <div className="w-3.5 h-3.5 rounded-full border border-slate-200" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-slate-50">
                    <Button variant="outline" className="w-full text-xs font-bold text-slate-600 h-9">
                      Contact us to add
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Addons;
