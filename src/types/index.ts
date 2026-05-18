export enum SubscriptionState {
  TRIAL = 'TRIAL',
  GRACE = 'GRACE',
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  EXPIRED = 'EXPIRED',
  SUSPENDED = 'SUSPENDED',
  ACTIVE = 'ACTIVE',
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Seat {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  assignedAt: string;
  licenseKey: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export interface Invoice {
  id: string;
  number: string;
  issueDate: string;
  dueDate: string;
  description: string;
  amount: number;
  status: 'PAID' | 'UNPAID' | 'OVERDUE';
}

export interface BillingDetails {
  contactName: string;
  contactEmail: string;
  companyName: string;
  taxId: string;
  address: {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: {
    type: 'CREDIT_CARD' | 'BANK_TRANSFER';
    last4?: string;
    brand?: string;
    expiry?: string;
  };
}

export interface Subscription {
  planTier: string;
  state: SubscriptionState;
  validUntil: string;
  seatsAssigned: number;
  seatsTotal: number;
}

export interface Addon {
  id: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Product {
  id: string;
  name: string;
  subscription: Subscription;
  seats: Seat[];
  invoices: Invoice[];
  addons: Addon[];
}
