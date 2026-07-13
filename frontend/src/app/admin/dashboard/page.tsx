import type { Metadata } from 'next';
import AdminDashboardClient from './AdminDashboardClient';

export const metadata: Metadata = { title: 'Admin Dashboard - GRD Travels' };

export default function AdminDashboardPage() {
  return <AdminDashboardClient />;
}
