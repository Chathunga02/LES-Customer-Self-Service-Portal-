import { SubscriptionState, type Seat, type Notification, type Invoice, type BillingDetails, type Product } from '@/types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'SFI Monitor',
    subscription: {
      planTier: 'Pro',
      state: SubscriptionState.ACTIVE,
      validUntil: '14 Jun 2026',
      seatsAssigned: 8,
      seatsTotal: 10,
    },
    addons: [
      { id: 'add-1', name: 'Bulk Import', status: 'ACTIVE' },
      { id: 'add-2', name: 'Adv. Analytics', status: 'ACTIVE' },
    ],
    seats: [
      {
        id: '1',
        userId: 'u1',
        userName: 'Alex Rivers',
        userEmail: 'alex.r@acme.com',
        assignedAt: '2026-05-10T09:00:00Z',
        licenseKey: 'SK-A1B2-C3D4',
        status: 'ACTIVE',
      },
      {
        id: '2',
        userId: 'u2',
        userName: 'Jordan Smith',
        userEmail: 'j.smith@acme.com',
        assignedAt: '2026-05-09T14:30:00Z',
        licenseKey: 'SK-E5F6-G7H8',
        status: 'ACTIVE',
      },
      {
        id: '3',
        userId: 'u3',
        userName: 'Taylor Wong',
        userEmail: 't.wong@acme.com',
        assignedAt: '2026-05-08T11:15:00Z',
        licenseKey: 'SK-I9J0-K1L2',
        status: 'ACTIVE',
      },
      {
        id: '4',
        userId: 'u4',
        userName: 'Maria Brooks',
        userEmail: 'm.brooks@acme.com',
        assignedAt: '2026-05-06T10:00:00Z',
        licenseKey: 'SK-M3N4-O5P6',
        status: 'ACTIVE',
      },
      {
        id: '5',
        userId: 'u5',
        userName: 'Kevin Park',
        userEmail: 'k.park@acme.com',
        assignedAt: '2026-05-03T16:45:00Z',
        licenseKey: 'SK-Q7R8-S9T0',
        status: 'ACTIVE',
      },
      {
        id: '6',
        userId: 'u6',
        userName: 'Priya Nair',
        userEmail: 'p.nair@acme.com',
        assignedAt: '2026-05-01T08:30:00Z',
        licenseKey: 'SK-U1V2-W3X4',
        status: 'ACTIVE',
      },
      {
        id: '7',
        userId: 'u7',
        userName: 'Daniel Lee',
        userEmail: 'd.lee@acme.com',
        assignedAt: '2026-04-28T13:15:00Z',
        licenseKey: 'SK-Y5Z6-A7B8',
        status: 'ACTIVE',
      },
      {
        id: '8',
        userId: 'u8',
        userName: 'Sophie Clarke',
        userEmail: 's.clarke@acme.com',
        assignedAt: '2026-04-20T15:00:00Z',
        licenseKey: 'SK-C9D0-E1F2',
        status: 'ACTIVE',
      },
    ],
    invoices: [
      {
        id: 'inv1',
        number: 'INV-2026-00041',
        issueDate: '14 Jun 2025',
        dueDate: '14 Jun 2025',
        description: 'SFI Monitor Pro · 10 seats (Annual)',
        amount: 4800.00,
        status: 'PAID',
      },
      {
        id: 'inv2',
        number: 'INV-2026-00042',
        issueDate: '14 Jun 2025',
        dueDate: '14 Jun 2025',
        description: 'Add-on: Adv. Analytics (Annual)',
        amount: 600.00,
        status: 'PAID',
      },
      {
        id: 'inv3',
        number: 'INV-2026-00043',
        issueDate: '14 Jun 2025',
        dueDate: '14 Jun 2025',
        description: 'Add-on: Bulk Import (Annual)',
        amount: 300.00,
        status: 'PAID',
      },
      {
        id: 'inv4',
        number: 'INV-2025-00031',
        issueDate: '14 Jun 2024',
        dueDate: '14 Jun 2024',
        description: 'SFI Monitor Pro · 10 seats (Annual)',
        amount: 4800.00,
        status: 'PAID',
      },
      {
        id: 'inv5',
        number: 'INV-2025-00032',
        issueDate: '14 Jun 2024',
        dueDate: '14 Jun 2024',
        description: 'Add-on: Adv. Analytics (Annual)',
        amount: 600.00,
        status: 'PAID',
      },
      {
        id: 'inv6',
        number: 'INV-2026-00055',
        issueDate: '14 May 2026',
        dueDate: '14 Jun 2026',
        description: 'Renewal Invoice — Due Jun 14, 2026',
        amount: 5700.00,
        status: 'UPCOMING',
      },
    ]
  },
  {
    id: 'prod-2',
    name: 'LES Analytics',
    subscription: {
      planTier: 'Enterprise',
      state: SubscriptionState.ACTIVE,
      validUntil: '01 Jan 2027',
      seatsAssigned: 3,
      seatsTotal: 5,
    },
    addons: [],
    seats: [
      {
        id: '101',
        userId: 'u1',
        userName: 'Alex Rivers',
        userEmail: 'alex.r@acme.com',
        assignedAt: '2026-01-05T09:00:00Z',
        licenseKey: 'ENT-A1B2-C3D4',
        status: 'ACTIVE',
      },
      {
        id: '102',
        userId: 'u5',
        userName: 'Kevin Park',
        userEmail: 'k.park@acme.com',
        assignedAt: '2026-01-10T14:30:00Z',
        licenseKey: 'ENT-E5F6-G7H8',
        status: 'ACTIVE',
      },
      {
        id: '103',
        userId: 'u9',
        userName: 'Sarah Jenkins',
        userEmail: 's.jenkins@acme.com',
        assignedAt: '2026-02-15T11:15:00Z',
        licenseKey: 'ENT-I9J0-K1L2',
        status: 'ACTIVE',
      },
    ],
    invoices: [
      {
        id: 'inv-ent-1',
        number: 'INV-2026-00102',
        issueDate: '01 Jan 2026',
        dueDate: '01 Jan 2026',
        description: 'LES Analytics Enterprise · 5 seats (Annual)',
        amount: 12000.00,
        status: 'PAID',
      }
    ]
  }
];

// For backward compatibility while refactoring, export the first product's data temporarily.
// But ideally we should remove these soon.
export const MOCK_SUBSCRIPTION = MOCK_PRODUCTS[0].subscription;
export const MOCK_SEATS = MOCK_PRODUCTS[0].seats;
export const MOCK_INVOICES = MOCK_PRODUCTS[0].invoices;

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Subscription renewal',
    message: 'Your SFI Monitor subscription renews in 34 days. Renewal invoice is available.',
    type: 'renewal_reminder',
    timestamp: '2026-05-11T08:00:00Z',
    isRead: false,
    link: '/portal/billing',
  },
];

export const MOCK_BILLING: BillingDetails = {
  companyName: 'Acme Industries Ltd',
  taxId: 'US123456789',
  address: {
    line1: '123 Innovation Drive',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94105',
    country: 'United States',
  },
  contactName: 'Sarah Johnson',
  contactEmail: 's.johnson@acme.com',
  paymentMethod: {
    type: 'CREDIT_CARD',
    last4: '4242',
    brand: 'Visa',
    expiry: '05/28',
  },
};

