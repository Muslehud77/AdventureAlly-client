import { ChartTooltipContent, ChartContainer } from "../../components/ui/chart";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const SalesOverview = ({ sales }: { sales: Record<string, unknown>[] }) => {
  console.log(sales);

  return (
    <div className="aspect-[9/4]">
      <ChartContainer
        config={{
          sales:{}
        }}
      >
        <BarChart
          width={500}
          height={300}
          data={sales}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />

          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar
            dataKey="sales"
            fill="black"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default SalesOverview;
