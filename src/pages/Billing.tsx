import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  ArrowRight
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  MOCK_BILLING 
} from '@/lib/mockData';
import { useProduct } from '@/contexts/ProductContext';
import { cn } from '@/lib/utils';
import { toast } from "sonner";

const Billing = () => {
  const { activeProduct } = useProduct();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const b = MOCK_BILLING;

  const handleDownload = () => {
    toast.success("Invoice downloaded");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[#111827]">{activeProduct.name} - Invoices & Billing</h1>
          <p className="text-[#6B7280] text-[14px] mt-1">View and download your billing history for {activeProduct.name}.</p>
        </div>
      </div>

      {/* Payment Method Banner Card */}
      <Card className="bg-white border border-slate-200 shadow-sm rounded-lg p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 bg-slate-100 rounded border border-slate-200 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-slate-500" />
            </div>
            <p className="text-[16px] font-bold text-[#111827]">
              Payment Method: {b.paymentMethod.brand} ending in {b.paymentMethod.last4}
            </p>
          </div>
          <button 
            onClick={() => setIsPaymentModalOpen(true)}
            className="text-[14px] font-medium text-brand-primary hover:underline flex items-center gap-1 group whitespace-nowrap"
          >
            Update Payment Method <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </Card>

      {/* Invoice History */}
      <Card className="border border-slate-200 shadow-sm rounded-lg bg-white overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-[#F9FAFB] border-b border-slate-200">
              <TableRow className="hover:bg-[#F9FAFB]">
                <TableHead className="text-[12px] font-semibold text-[#6B7280] h-11">Invoice #</TableHead>
                <TableHead className="text-[12px] font-semibold text-[#6B7280] h-11">Date</TableHead>
                <TableHead className="text-[12px] font-semibold text-[#6B7280] h-11 w-[300px]">Description</TableHead>
                <TableHead className="text-[12px] font-semibold text-[#6B7280] h-11">Amount</TableHead>
                <TableHead className="text-[12px] font-semibold text-[#6B7280] h-11">Status</TableHead>
                <TableHead className="text-[12px] font-semibold text-[#6B7280] h-11 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeProduct.invoices.length > 0 ? (
                activeProduct.invoices.map((inv) => (
                <TableRow 
                  key={inv.id} 
                  className={cn(
                    "group transition-colors border-b border-slate-100 last:border-0",
                    inv.status === 'UPCOMING' ? "bg-blue-50/50 hover:bg-blue-50/80" : "hover:bg-slate-50"
                  )}
                >
                  <TableCell className="text-[14px] text-[#111827] font-medium">
                    {inv.number}
                  </TableCell>
                  <TableCell className="text-[14px] text-[#6B7280]">
                    {inv.issueDate}
                  </TableCell>
                  <TableCell className="text-[14px] text-[#111827]">
                    {inv.description}
                  </TableCell>
                  <TableCell className="text-[14px] text-[#111827] font-medium">
                    ${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "text-[12px] font-medium py-0.5 px-2.5 rounded-full border-none uppercase tracking-wide",
                      inv.status === 'PAID' ? "bg-[#DCFCE7] text-[#16A34A] hover:bg-[#DCFCE7]" : 
                      inv.status === 'UPCOMING' ? "bg-[#DBEAFE] text-[#1D4ED8] hover:bg-[#DBEAFE]" : "bg-slate-100 text-slate-500"
                    )}>
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 text-[13px] text-slate-700 border-slate-200 hover:bg-slate-50 font-medium"
                      onClick={handleDownload}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-48 text-center text-slate-500 text-sm">
                    No invoices found for this product.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Update Payment Method Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-[18px] font-bold text-[#111827]">Update Payment Method</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-[14px] text-[#6B7280]">
              You will be redirected to our secure payment gateway to update your card details. Your card information is never stored by LES Portal.
            </p>
          </div>
          <DialogFooter className="mt-2 flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setIsPaymentModalOpen(false)} className="text-[#6B7280] font-medium">Cancel</Button>
            <Button onClick={() => setIsPaymentModalOpen(false)} className="bg-brand-primary hover:bg-brand-primary/90 text-white font-medium group">
              Continue to Payment Gateway <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Billing;
