import React, { useState } from 'react';
import { 
  Users, 
  ArrowRight,
  Download,
  AlertTriangle
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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
} from '@/components/ui/dialog';
import { useProduct } from '@/contexts/ProductContext';
import { format } from 'date-fns';
import { toast } from "sonner";
import { cn } from '@/lib/utils';

const Seats = () => {
  const { activeProduct } = useProduct();
  const [seats, setSeats] = useState(activeProduct.seats);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isUnassignModalOpen, setIsUnassignModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<any>(null);
  const [newEmail, setNewEmail] = useState('');

  // Update local state when product changes
  React.useEffect(() => {
    setSeats(activeProduct.seats);
  }, [activeProduct.id]);

  const seatsUsed = seats.length;
  const seatsTotal = activeProduct.subscription.seatsTotal;
  const seatsAvailable = seatsTotal - seatsUsed;

  const handleUnassign = () => {
    setSeats(seats.filter(s => s.id !== selectedSeat.id));
    setIsUnassignModalOpen(false);
    toast.success(`Seat for ${selectedSeat.userName} has been unassigned.`);
  };

  const handleAssign = () => {
    if (!newEmail) return;
    
    // Create mock user from email
    const namePart = newEmail.split('@')[0];
    const newName = namePart.charAt(0).toUpperCase() + namePart.slice(1).replace('.', ' ');
    
    const newSeat = {
      id: Date.now().toString(),
      userId: `u${Date.now()}`,
      userName: newName,
      userEmail: newEmail,
      assignedAt: new Date().toISOString(),
      licenseKey: `SK-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      status: 'ACTIVE',
    };

    setSeats([newSeat, ...seats]);
    setIsAssignModalOpen(false);
    setNewEmail('');
    toast.success(`Seat assigned to ${newName}.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[#111827]">{activeProduct.name} - Seats & Users</h1>
          <p className="text-[#6B7280] text-[14px] mt-1">Manage who has access to {activeProduct.name} in your organisation.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-200 text-slate-700 font-medium">
            Export CSV
          </Button>
          <Button 
            onClick={() => setIsAssignModalOpen(true)}
            className="bg-brand-primary hover:bg-brand-primary/90 text-white font-medium"
            disabled={seatsAvailable <= 0}
          >
            + Assign User
          </Button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border border-slate-200 shadow-sm rounded-lg p-6">
          <p className="text-[14px] text-[#6B7280] font-medium mb-1">Seats Used</p>
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-bold text-[#111827]">{seatsUsed} / {seatsTotal}</span>
            <span className="text-[14px] text-[#6B7280]">{seatsAvailable} seats available</span>
          </div>
        </Card>
        
        <Card className="bg-white border border-slate-200 shadow-sm rounded-lg p-6">
          <p className="text-[14px] text-[#6B7280] font-medium mb-1">Active Users</p>
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-bold text-[#111827]">{seatsUsed}</span>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 ml-1 mb-1"></div>
          </div>
        </Card>

        <Card className="bg-white border border-slate-200 shadow-sm rounded-lg p-6">
          <p className="text-[14px] text-[#6B7280] font-medium mb-1">Available Seats</p>
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-bold text-[#111827]">{seatsAvailable}</span>
            <button 
              onClick={() => setIsAssignModalOpen(true)}
              disabled={seatsAvailable <= 0}
              className="text-[14px] font-medium text-brand-primary hover:underline flex items-center gap-1 ml-1 disabled:opacity-50 disabled:hover:no-underline"
            >
              Add users <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </Card>
      </div>

      <Card className="border border-slate-200 shadow-sm rounded-lg bg-white overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-[#F9FAFB] border-b border-slate-200">
              <TableRow className="hover:bg-[#F9FAFB]">
                <TableHead className="text-[12px] font-semibold text-[#6B7280] h-11 w-[250px]">User</TableHead>
                <TableHead className="text-[12px] font-semibold text-[#6B7280] h-11">Email</TableHead>
                <TableHead className="text-[12px] font-semibold text-[#6B7280] h-11">Status</TableHead>
                <TableHead className="text-[12px] font-semibold text-[#6B7280] h-11">Assigned Date</TableHead>
                <TableHead className="text-[12px] font-semibold text-[#6B7280] h-11">License Key</TableHead>
                <TableHead className="text-[12px] font-semibold text-[#6B7280] h-11 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {seats.length > 0 ? (
                seats.map((seat) => (
                  <TableRow key={seat.id} className="group hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                    <TableCell>
                      <div className="flex items-center gap-3 py-1">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[12px] font-bold text-slate-700">
                          {seat.userName.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <p className="text-[14px] font-medium text-[#111827]">{seat.userName}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-[14px] text-[#6B7280]">
                      {seat.userEmail}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "text-[12px] font-medium py-0.5 px-2.5 rounded-full border-none",
                        seat.status === 'ACTIVE' ? "bg-[#DCFCE7] text-[#16A34A] hover:bg-[#DCFCE7]" : "bg-slate-100 text-slate-500"
                      )}>
                        {seat.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[14px] text-[#6B7280]">
                      {format(new Date(seat.assignedAt), 'd MMM yyyy')}
                    </TableCell>
                    <TableCell>
                      <code className="text-[13px] font-mono text-[#111827]">
                        {seat.licenseKey}
                      </code>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 text-[12px] text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                          onClick={() => {
                            setSelectedSeat(seat);
                            setIsUnassignModalOpen(true);
                          }}
                        >
                          Unassign
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 text-[12px] text-slate-600 border-slate-200 hover:bg-slate-50"
                        >
                          Transfer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-48 text-center text-slate-500 text-sm">
                    No users assigned.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Unassign Modal */}
      <Dialog open={isUnassignModalOpen} onOpenChange={setIsUnassignModalOpen}>
        <DialogContent className="max-w-md p-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <DialogHeader>
                <DialogTitle className="text-[18px] font-bold text-[#111827]">Unassign {selectedSeat?.userName}?</DialogTitle>
                <DialogDescription className="text-[14px] text-[#6B7280] mt-2">
                  This will immediately invalidate their license key ({selectedSeat?.licenseKey}). They will lose access to {activeProduct.name} right away.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-6 gap-2 sm:gap-0">
                <Button variant="ghost" onClick={() => setIsUnassignModalOpen(false)} className="text-[#6B7280] font-medium">Cancel</Button>
                <Button variant="destructive" onClick={handleUnassign} className="bg-red-600 hover:bg-red-700 font-medium">
                  Unassign
                </Button>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assign Modal */}
      <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-[18px] font-bold text-[#111827]">Assign a Seat</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-[14px] font-medium text-[#111827]">Email address</label>
              <Input 
                placeholder="Enter user email or search existing users" 
                className="h-10 border-slate-200" 
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            {/* Mock dropdown UI - just visually showing it as per spec requirements if needed, but skipped complex combobox for simplicity */}
            <p className="text-[14px] text-[#6B7280]">
              An invitation email will be sent to the user with their license key.
            </p>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-3 sm:gap-0 items-center justify-between mt-2">
            <span className="text-[14px] text-[#6B7280] font-medium">{seatsAvailable} of {seatsTotal} seats remaining</span>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setIsAssignModalOpen(false)} className="text-[#6B7280] font-medium">Cancel</Button>
              <Button onClick={handleAssign} className="bg-brand-primary hover:bg-brand-primary/90 text-white font-medium" disabled={!newEmail}>Assign Seat</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Seats;
