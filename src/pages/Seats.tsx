import React, { useState } from 'react';
import { 
  Search, 
  UserPlus, 
  MoreHorizontal, 
  Copy, 
  ExternalLink, 
  Trash2, 
  ArrowRightLeft,
  Users
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
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { MOCK_SUBSCRIPTION, MOCK_SEATS } from '@/lib/mockData';
import { format } from 'date-fns';
import { toast } from "sonner";

const Seats = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isUnassignModalOpen, setIsUnassignModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<any>(null);

  const filteredSeats = MOCK_SEATS.filter(seat => 
    seat.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seat.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const usagePercent = (MOCK_SUBSCRIPTION.seatsAssigned / MOCK_SUBSCRIPTION.seatsTotal) * 100;

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("License key copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Seats & Users</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-700">{MOCK_SUBSCRIPTION.seatsAssigned} of {MOCK_SUBSCRIPTION.seatsTotal} seats assigned</span>
              <Progress value={usagePercent} className="w-24 h-1.5" />
            </div>
          </div>
        </div>
        <Button 
          onClick={() => setIsAssignModalOpen(true)}
          className="bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold"
          disabled={MOCK_SUBSCRIPTION.seatsAssigned >= MOCK_SUBSCRIPTION.seatsTotal}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Assign user
        </Button>
      </div>

      <Card className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-50 bg-white">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search by name or email..." 
              className="pl-10 h-10 bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold text-slate-500 w-[300px]">User</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold text-slate-500">Assigned</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold text-slate-500">License Key</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold text-slate-500">Status</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold text-slate-500 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSeats.length > 0 ? (
                filteredSeats.map((seat) => (
                  <TableRow key={seat.id} className="group hover:bg-slate-50/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-600">
                          {seat.userName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 leading-none mb-1">{seat.userName}</p>
                          <p className="text-xs text-slate-500 leading-none">{seat.userEmail}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {format(new Date(seat.assignedAt), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 group/key">
                        <code className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                          {seat.licenseKey.slice(-8)}
                        </code>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 opacity-0 group-hover/key:opacity-100 transition-opacity"
                          onClick={() => handleCopyKey(seat.licenseKey)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "text-[10px] uppercase font-bold py-0.5 border-none",
                        seat.status === 'ACTIVE' ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                      )}>
                        {seat.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <ArrowRightLeft className="w-4 h-4 mr-2" /> Transfer seat
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600 cursor-pointer"
                            onClick={() => {
                              setSelectedSeat(seat);
                              setIsUnassignModalOpen(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Unassign
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                        <Users className="w-6 h-6 text-slate-300" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">No users found</p>
                        <p className="text-xs text-slate-500">Try adjusting your search criteria.</p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Unassign Modal */}
      <Dialog open={isUnassignModalOpen} onOpenChange={setIsUnassignModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Unassign {selectedSeat?.userName}?</DialogTitle>
            <DialogDescription>
              This will immediately invalidate their license key. They'll lose access to {MOCK_SUBSCRIPTION.productName} right away.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsUnassignModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => {
              toast.success(`Seat for ${selectedSeat?.userName} has been unassigned.`);
              setIsUnassignModalOpen(false);
            }}>
              Unassign seat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Modal (Step 1 placeholder) */}
      <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign a seat</DialogTitle>
            <DialogDescription>
              Search for an existing user or create a new one to assign a seat.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email address</label>
              <Input placeholder="name@company.com" className="h-10" />
            </div>
            <p className="text-[11px] text-slate-500 italic">
              A license key will be generated and emailed to the user upon confirmation.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignModalOpen(false)}>Cancel</Button>
            <Button className="bg-brand-primary">Assign seat</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Seats;
