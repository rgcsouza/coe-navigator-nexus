
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number;
  change: string;
  changeType: "positive" | "negative";
}

const StatsCard = ({ title, value, change, changeType }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div className="text-2xl font-bold">{value}</div>
          <div className={`text-sm ${changeType === "positive" ? "text-green-500" : "text-red-500"}`}>
            {change}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
