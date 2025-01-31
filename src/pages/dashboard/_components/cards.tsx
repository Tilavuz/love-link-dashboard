import { Sparkles, UserCheck, UserPlus, Users } from "lucide-react";
import DashboardCard from "./card";
import { useEffect, useState } from "react";
import { statisticsService } from "@/services/statistics.service";

export default function DashboardCards() {
  const [statistics, setStatistics] = useState<{
    usersTotal: number;
    totalAmountStars: number;
    subscriptionTotal: number;
    lastMonthUsersTotal: number;
  }>();

  useEffect(() => {
    (async () => {
      const data = await statisticsService.getStatistics();
      setStatistics(data);
    })();
  }, []);

  return (
    <div className="flex items-center justify-around gap-4 flex-wrap">
      <DashboardCard
        title="Total Users"
        icon={<Users className="h-4 w-4" />}
      >
        <div className="text-2xl font-bold">{statistics?.usersTotal}</div>
      </DashboardCard>
      <DashboardCard
        title="Total Stars"
        icon={<Sparkles className="h-4 w-4" />}
      >
        <div className="text-2xl font-bold">{statistics?.totalAmountStars}</div>
      </DashboardCard>
      <DashboardCard
        title="Subscribed Users"
        icon={<UserCheck className="h-4 w-4" />}
      >
        <div className="text-2xl font-bold">{statistics?.subscriptionTotal}</div>
      </DashboardCard>
      <DashboardCard
        title="Joined This Month"
        icon={<UserPlus className="h-4 w-4" />}
      >
        <div className="text-2xl font-bold">{statistics?.lastMonthUsersTotal}</div>
      </DashboardCard>
    </div>
  );
}
