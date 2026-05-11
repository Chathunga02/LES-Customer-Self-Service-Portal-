import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  Building, 
  Search, 
  Filter, 
  FileText,
  ExternalLink,
  Info
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MOCK_BILLING, 
  MOCK_INVOICES, 
  MOCK_SUBSCRIPTION 
} from '@/lib/mockData';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from "sonner";

const Billing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const b = MOCK_BILLING;

  const filteredInvoices = MOCK_INVOICES.filter(inv => 
    inv.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Invoices & Billing</h1>
      </div>

      {/* Renewal Invoice Access (Contextual for T-30) */}
      <Card className="bg-brand-primary border-none shadow-sm text-white overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Your renewal invoice is ready.</h3>
                <p className="text-white/80 text-sm">Next renewal: June 14, 2026 for $1,188.00</p>
              </div>
            </div>
            <Button className="bg-white text-brand-primary hover:bg-white/90 font-bold px-6">
              Download renewal invoice
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Billing Contact */}
        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardHeader className="pb-3 border-b border-slate-50">
            <CardTitle className="text-base font-semibold">Billing contact</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div>
              <p className="text-sm font-bold text-slate-900">{b.contactName}</p>
              <p className="text-sm text-slate-500 font-medium">{b.contactEmail}</p>
            </div>
            <Button variant="outline" className="text-brand-primary font-semibold border-slate-200 h-9">
              Update billing contact
            </Button>
            <p className="text-[11px] text-slate-400 italic mt-2">
              Billing emails and invoices are sent to this address.
            </p>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardHeader className="pb-3 border-b border-slate-50">
            <CardTitle className="text-base font-semibold">Payment method</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {b.paymentMethod.type === 'CREDIT_CARD' ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 bg-slate-100 rounded border border-slate-200 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{b.paymentMethod.brand} ending ••••{b.paymentMethod.last4}</p>
                    <p className="text-xs text-slate-500 font-medium">Expires {b.paymentMethod.expiry}</p>
                  </div>
                </div>
                <Button variant="outline" className="text-slate-600 font-semibold border-slate-200 h-9">
                  Update
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-bold text-slate-900">Bank transfer</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Payment Reference</p>
                  <p className="text-sm font-mono text-slate-700">PAY-ACME-INV2026-00045</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Invoice History */}
      <Card className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden">
        <CardHeader className="pb-3 border-b border-slate-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base font-semibold">Invoice history</CardTitle>
              <CardDescription className="text-xs">Records kept for 7 years.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
               <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="Search by invoice #" 
                  className="pl-10 h-9 text-xs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="h-9 px-3 gap-2 text-slate-600 font-semibold border-slate-200">
                <Filter className="w-3.5 h-3.5" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold text-slate-500">Invoice #</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold text-slate-500">Issue Date</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold text-slate-500">Amount</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold text-slate-500">Status</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold text-slate-500 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((inv) => (
                <TableRow key={inv.id} className="hover:bg-slate-50/30 transition-colors">
                  <TableCell className="font-mono text-sm font-semibold text-brand-primary hover:underline cursor-pointer">
                    {inv.number}
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {format(new Date(inv.issueDate), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-slate-900">
                    ${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "text-[10px] uppercase font-bold py-0.5 border-none",
                      inv.status === 'PAID' ? "bg-green-100 text-green-700" : 
                      inv.status === 'UNPAID' ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                    )}>
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-slate-500 hover:text-brand-primary font-semibold"
                      onClick={() => toast.success(`Downloading ${inv.number}...`)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
