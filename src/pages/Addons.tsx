import React, { useState } from 'react';
import { 
  AlertTriangle, 
} from 'lucide-react';
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
import { toast } from "sonner";
import { useProduct } from '@/contexts/ProductContext';

interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  renews?: string;
}

const initialActiveAddons: Addon[] = [
  {
    id: 'a1',
    name: 'Bulk Import',
    description: 'Import large datasets in bulk via CSV/Excel. Supports up to 100k rows per job.',
    price: 300,
    renews: '14 Jun 2026',
  },
  {
    id: 'a2',
    name: 'Adv. Analytics',
    description: 'Advanced reporting dashboards, custom KPIs, and data export to BI tools.',
    price: 600,
    renews: '14 Jun 2026',
  }
];

const initialAvailableAddons: Addon[] = [
  {
    id: 'a3',
    name: 'Priority Support',
    description: 'Dedicated support queue with 4-hour SLA response time and a named account manager.',
    price: 900,
  },
  {
    id: 'a4',
    name: 'API Access',
    description: 'Full REST API access for integrating SFI Monitor data with your internal systems.',
    price: 450,
  }
];

const Addons = () => {
  const { activeProduct } = useProduct();
  
  // Transform activeProduct addons to match local structure, matching prices roughly
  const mappedActiveAddons = activeProduct.addons.map(a => ({
    id: a.id,
    name: a.name,
    description: `Capability extension for ${activeProduct.name}`,
    price: a.name.includes('Analytics') ? 600 : 300,
    renews: activeProduct.subscription.validUntil
  }));

  const [activeAddons, setActiveAddons] = useState<Addon[]>(mappedActiveAddons);
  const [availableAddons, setAvailableAddons] = useState<Addon[]>(initialAvailableAddons);

  React.useEffect(() => {
    setActiveAddons(activeProduct.addons.map(a => ({
      id: a.id,
      name: a.name,
      description: `Capability extension for ${activeProduct.name}`,
      price: a.name.includes('Analytics') ? 600 : 300,
      renews: activeProduct.subscription.validUntil
    })));
  }, [activeProduct.id]);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedAddon, setSelectedAddon] = useState<Addon | null>(null);

  const handleAdd = () => {
    if (!selectedAddon) return;
    const newActive = { ...selectedAddon, renews: '14 Jun 2026' };
    setActiveAddons([...activeAddons, newActive]);
    setAvailableAddons(availableAddons.filter(a => a.id !== selectedAddon.id));
    setIsAddModalOpen(false);
    toast.success(`${selectedAddon.name} added to subscription.`);
  };

  const handleRemove = () => {
    if (!selectedAddon) return;
    setAvailableAddons([...availableAddons, { ...selectedAddon, renews: undefined }]);
    setActiveAddons(activeAddons.filter(a => a.id !== selectedAddon.id));
    setIsRemoveModalOpen(false);
    toast.success(`${selectedAddon.name} removed from subscription.`);
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-[22px] font-bold text-[#111827]">{activeProduct.name} - Add-ons</h1>
        <p className="text-[#6B7280] text-[14px] mt-1">Extend {activeProduct.name} with additional capabilities.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-widest">CURRENTLY ACTIVE</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeAddons.length > 0 ? activeAddons.map((addon) => (
            <Card key={addon.id} className="bg-white border border-slate-200 shadow-sm rounded-lg flex flex-col p-6">
              <div className="flex justify-between items-start mb-4">
                <Badge className="bg-[#DCFCE7] text-[#16A34A] hover:bg-[#DCFCE7] text-[12px] font-medium py-0.5 px-2.5 rounded-full border-none uppercase tracking-wide">ACTIVE</Badge>
              </div>
              <h3 className="text-[18px] font-bold text-[#111827] mb-2">{addon.name}</h3>
              <p className="text-[14px] text-[#6B7280] mb-6 flex-1">{addon.description}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <p className="text-[16px] font-bold text-[#111827]">${addon.price} <span className="text-[14px] font-normal text-[#6B7280]">/ year</span></p>
                  <p className="text-[13px] text-[#6B7280] mt-1">Renews: {addon.renews}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedAddon(addon);
                    setIsRemoveModalOpen(true);
                  }}
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 font-medium"
                >
                  Remove Add-on
                </Button>
              </div>
            </Card>
          )) : (
            <div className="col-span-full p-8 text-center bg-slate-50 border border-slate-200 border-dashed rounded-lg">
               <p className="text-[14px] text-slate-500">No active add-ons.</p>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-widest">AVAILABLE TO PURCHASE</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {availableAddons.length > 0 ? availableAddons.map((addon) => (
            <Card key={addon.id} className="bg-white border border-slate-200 shadow-sm rounded-lg flex flex-col p-6">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="secondary" className="bg-[#F3F4F6] text-[#374151] hover:bg-[#F3F4F6] text-[12px] font-medium py-0.5 px-2.5 rounded-full border-none uppercase tracking-wide">AVAILABLE</Badge>
              </div>
              <h3 className="text-[18px] font-bold text-[#111827] mb-2">{addon.name}</h3>
              <p className="text-[14px] text-[#6B7280] mb-6 flex-1">{addon.description}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <p className="text-[16px] font-bold text-[#111827]">${addon.price} <span className="text-[14px] font-normal text-[#6B7280]">/ year</span></p>
                <Button 
                  onClick={() => {
                    setSelectedAddon(addon);
                    setIsAddModalOpen(true);
                  }}
                  className="bg-brand-primary hover:bg-brand-primary/90 text-white font-medium"
                >
                  Add to Subscription
                </Button>
              </div>
            </Card>
          )) : (
            <div className="col-span-full p-8 text-center bg-slate-50 border border-slate-200 border-dashed rounded-lg">
               <p className="text-[14px] text-slate-500">All available add-ons are active.</p>
            </div>
          )}
        </div>
      </section>

      {/* Add to Subscription Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-[18px] font-bold text-[#111827]">Add {selectedAddon?.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex justify-between text-[14px] text-[#111827]">
              <span>{selectedAddon?.name} · Annual</span>
              <span>${selectedAddon?.price}.00</span>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-between font-bold text-[#111827] text-[16px]">
              <span>Total due today:</span>
              <span>${selectedAddon?.price}.00</span>
            </div>
            <p className="text-[12px] text-[#6B7280] italic">
              (Amount is pro-rated to your renewal date)
            </p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mt-2">
              <p className="text-[14px] text-[#111827]">Charged to Visa ending in 4242</p>
            </div>
          </div>
          <DialogFooter className="mt-4 gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)} className="text-[#6B7280] font-medium">Cancel</Button>
            <Button onClick={handleAdd} className="bg-brand-primary hover:bg-brand-primary/90 text-white font-medium">Confirm Purchase</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Add-on Modal */}
      <Dialog open={isRemoveModalOpen} onOpenChange={setIsRemoveModalOpen}>
        <DialogContent className="max-w-md p-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <DialogHeader>
                <DialogTitle className="text-[18px] font-bold text-[#111827]">Remove {selectedAddon?.name}?</DialogTitle>
                <DialogDescription className="text-[14px] text-[#6B7280] mt-2">
                  This add-on will remain active until your renewal date (14 Jun 2026). It will not be included in your next renewal invoice.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-6 gap-2 sm:gap-0">
                <Button variant="ghost" onClick={() => setIsRemoveModalOpen(false)} className="text-[#6B7280] font-medium">Cancel</Button>
                <Button variant="destructive" onClick={handleRemove} className="bg-red-600 hover:bg-red-700 font-medium">
                  Remove Add-on
                </Button>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Addons;
