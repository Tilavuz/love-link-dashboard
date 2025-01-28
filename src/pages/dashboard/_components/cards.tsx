import { DollarSign } from "lucide-react";
import DashboardCard from "./card";

export default function DashboardCards() {
  return (
    <div className="flex items-center justify-around gap-4 flex-wrap">
      <DashboardCard
        title="Total Revenue"
        icon={<DollarSign className="h-4 w-4" />}
      >
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </DashboardCard>
      <DashboardCard
        title="Total Revenue"
        icon={<DollarSign className="h-4 w-4" />}
      >
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </DashboardCard>
      <DashboardCard
        title="Total Revenue"
        icon={<DollarSign className="h-4 w-4" />}
      >
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </DashboardCard>
      <DashboardCard
        title="Total Revenue"
        icon={<DollarSign className="h-4 w-4" />}
      >
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </DashboardCard>
    </div>
  );
}
