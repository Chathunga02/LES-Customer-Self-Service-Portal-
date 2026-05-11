import { SubscriptionState, type Seat, type Notification, type Invoice, type BillingDetails } from '@/types';

export const MOCK_SUBSCRIPTION = {
  productName: 'SFI Monitor',
  planTier: 'Pro',
  state: SubscriptionState.ACTIVE,
  validUntil: '2026-06-14',
  seatsAssigned: 8,
  seatsTotal: 10,
};

export const MOCK_SEATS: Seat[] = [
  {
    id: '1',
    userId: 'u1',
    userName: 'Alex Rivers',
    userEmail: 'alex.r@acme.com',
    assignedAt: '2026-05-10T09:00:00Z',
    licenseKey: 'SFI-8A2B-C4D5-E6F7',
    status: 'ACTIVE',
  },
  {
    id: '2',
    userId: 'u2',
    userName: 'Jordan Smith',
    userEmail: 'j.smith@acme.com',
    assignedAt: '2026-05-09T14:30:00Z',
    licenseKey: 'SFI-1A2B-3C4D-5E6F',
    status: 'ACTIVE',
  },
  {
    id: '3',
    userId: 'u3',
    userName: 'Taylor Wong',
    userEmail: 't.wong@acme.com',
    assignedAt: '2026-05-08T11:15:00Z',
    licenseKey: 'SFI-7X8Y-9Z0A-1B2C',
    status: 'ACTIVE',
  },
  {
    id: '4',
    userId: 'u4',
    userName: 'Morgan Lee',
    userEmail: 'm.lee@acme.com',
    assignedAt: '2026-05-01T10:00:00Z',
    licenseKey: 'SFI-2P3Q-4R5S-6T7U',
    status: 'ACTIVE',
  },
  {
    id: '5',
    userId: 'u5',
    userName: 'Casey Jones',
    userEmail: 'c.jones@acme.com',
    assignedAt: '2026-04-28T16:45:00Z',
    licenseKey: 'SFI-9M0N-1O2P-3Q4R',
    status: 'ACTIVE',
  },
  {
    id: '6',
    userId: 'u6',
    userName: 'Riley Evans',
    userEmail: 'r.evans@acme.com',
    assignedAt: '2026-04-25T08:30:00Z',
    licenseKey: 'SFI-5V6W-7X8Y-9Z0A',
    status: 'ACTIVE',
  },
  {
    id: '7',
    userId: 'u7',
    userName: 'Jamie Clark',
    userEmail: 'j.clark@acme.com',
    assignedAt: '2026-04-20T13:15:00Z',
    licenseKey: 'SFI-3G4H-5I6J-7K8L',
    status: 'ACTIVE',
  },
  {
    id: '8',
    userId: 'u8',
    userName: 'Quinn Adams',
    userEmail: 'q.adams@acme.com',
    assignedAt: '2026-04-15T15:00:00Z',
    licenseKey: 'SFI-1U2V-3W4X-5Y6Z',
    status: 'ACTIVE',
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Payment confirmed',
    message: 'Your payment for invoice INV-2026-00044 has been received.',
    type: 'payment_success',
    timestamp: '2026-05-11T09:30:00Z',
    isRead: false,
    link: '/portal/billing/invoices/INV-2026-00044',
  },
  {
    id: 'n2',
    title: 'Seat assigned',
    message: 'A new seat has been assigned to Alex Rivers.',
    type: 'seat_assigned',
    timestamp: '2026-05-10T09:00:00Z',
    isRead: true,
    link: '/portal/seats',
  },
  {
    id: 'n3',
    title: 'Subscription renewal',
    message: 'Your subscription will renew in 30 days.',
    type: 'renewal_reminder',
    timestamp: '2026-05-11T08:00:00Z',
    isRead: false,
    link: '/portal/billing',
  },
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv1',
    number: 'INV-2026-00044',
    issueDate: '2026-05-01',
    dueDate: '2026-05-15',
    description: 'Annual subscription — SFI Monitor × 10 seats',
    amount: 1188.00,
    status: 'PAID',
  },
  {
    id: 'inv2',
    number: 'INV-2026-00045',
    issueDate: '2026-06-01',
    dueDate: '2026-06-15',
    description: 'Annual subscription — SFI Monitor × 10 seats',
    amount: 1188.00,
    status: 'UNPAID',
  },
];

export const MOCK_BILLING: BillingDetails = {
  contactName: 'Sarah Jenkins',
  contactEmail: 's.jenkins@acme.com',
  paymentMethod: {
    type: 'CREDIT_CARD',
    last4: '4242',
    brand: 'Visa',
    expiry: '05/28',
  },
};
