import { LuView } from "react-icons/lu";
import { Suspense } from "react";
import { GetFormStats } from "@/actions/form";
import {
  Card,

  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/ui/card";
import { Skeleton } from "@/components/ui/ui/skeleton";
export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCard loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCard loading={false} data={stats} />;
}

interface StatsCardProps {
  data: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards(props: StatsProps) {
  const { data, loading } = props;
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCards
        title="Total visits"
        icons={<LuView className="text-blue-600" />}
        helperText="All time from visits"
        value={data?.visits.toLacalString() || ""}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
    </div>
  );
}
function StatsCard({
  title,
  value,
  icons,
  helperText,
  loading,
  className,
}: {
  title: string;
  value: string;
  icons: ReactNode;
  helperText: string;
  loading: boolean;
  className: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {icons}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span>0</span>
            </Skeleton>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
