import EmployeeTable from '@/components/EmployeeTable';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmployeeTable />
      </div>
    </main>
  );
}