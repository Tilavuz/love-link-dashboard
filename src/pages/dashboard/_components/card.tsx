import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function DashboardCard({
  title,
  icon,
  children,
}: DashboardCardProps) {
  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
