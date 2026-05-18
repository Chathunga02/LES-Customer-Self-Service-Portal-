import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  CreditCard, 
  Mail,
  MapPin,
  FileText,
  Package,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { MOCK_BILLING } from '@/lib/mockData';
import { useProduct } from '@/contexts/ProductContext';

const Account = () => {
  const { activeProduct } = useProduct();
  const b = MOCK_BILLING;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-[22px] font-bold text-[#111827]">Account Settings</h1>
        <p className="text-[#6B7280] text-[14px] mt-1">Manage your organization details and view active add-ons.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Organization Details */}
        <Card className="bg-white border border-slate-200 shadow-sm rounded-lg flex flex-col h-full">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-5 h-5 text-brand-primary" />
              <CardTitle className="text-[18px] font-bold text-[#111827]">Organization Details</CardTitle>
            </div>
            <CardDescription className="text-[14px] text-[#6B7280]">
              The legal entity associated with this account. (Read-only)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 flex-1">
            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5"/> Company Name</label>
              <p className="text-[15px] font-medium text-[#111827]">{b.companyName}</p>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider flex items-center gap-1.5"><FileText className="w-3.5 h-3.5"/> Tax ID / VAT Number</label>
              <p className="text-[15px] font-medium text-[#111827]">{b.taxId}</p>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5"/> Billing Address</label>
              <p className="text-[15px] font-medium text-[#111827]">
                {b.address.line1}<br/>
                {b.address.city}, {b.address.state} {b.address.postalCode}<br/>
                {b.address.country}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Billing Contact */}
        <Card className="bg-white border border-slate-200 shadow-sm rounded-lg flex flex-col h-full">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="w-5 h-5 text-brand-primary" />
              <CardTitle className="text-[18px] font-bold text-[#111827]">Billing Contact</CardTitle>
            </div>
            <CardDescription className="text-[14px] text-[#6B7280]">
              Who receives invoices and billing-related emails.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 flex-1">
            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider flex items-center gap-1.5">Contact Name</label>
              <p className="text-[15px] font-medium text-[#111827]">{b.contactName}</p>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider flex items-center gap-1.5">Email Address</label>
              <p className="text-[15px] font-medium text-[#111827]">{b.contactEmail}</p>
            </div>
            <div className="pt-4 mt-auto">
              <Button disabled variant="outline" className="w-full text-slate-500 border-slate-200 font-medium opacity-60">
                Contact Support to Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add-ons Awareness */}
      <Card className="bg-white border border-slate-200 shadow-sm rounded-lg mt-8">
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-5 h-5 text-brand-primary" />
            <CardTitle className="text-[18px] font-bold text-[#111827]">Active Add-ons for {activeProduct.name}</CardTitle>
          </div>
          <CardDescription className="text-[14px] text-[#6B7280]">
            Review your current capability extensions and purchase more.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              {activeProduct.addons.length > 0 ? (
                activeProduct.addons.map(addon => (
                  <Badge key={addon.id} className="bg-[#DCFCE7] text-[#16A34A] hover:bg-[#DCFCE7] border-none px-3 py-1 text-[13px] font-medium rounded-full uppercase tracking-wide">
                    {addon.name}
                  </Badge>
                ))
              ) : (
                <p className="text-[14px] text-[#6B7280]">No add-ons currently active.</p>
              )}
            </div>
            <Button asChild variant="outline" className="text-brand-primary border-brand-primary/20 hover:bg-brand-primary/5 font-medium whitespace-nowrap">
              <Link to="/portal/addons">
                Manage Add-ons <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;
