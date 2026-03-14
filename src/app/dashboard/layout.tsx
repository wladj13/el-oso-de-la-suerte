import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-72">
        <DashboardTopbar />
        <main className="flex-1 p-4 md:p-8 pt-20 md:pt-24">{children}</main>
      </div>
    </div>
  );
}
