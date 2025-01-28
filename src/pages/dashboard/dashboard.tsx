import DashboardCards from "./_components/cards";
import UserTable from "./_components/table";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <DashboardCards />
      <UserTable />
    </div>
  );
}
