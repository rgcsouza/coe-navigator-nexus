
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface PayoffChartProps {
  operationType: string;
}

const callOptionData = [
  { price: 70, payoff: 0 },
  { price: 80, payoff: 0 },
  { price: 90, payoff: 0 },
  { price: 100, payoff: 0 },
  { price: 110, payoff: 10 },
  { price: 120, payoff: 20 },
  { price: 130, payoff: 30 },
];

const putOptionData = [
  { price: 70, payoff: 30 },
  { price: 80, payoff: 20 },
  { price: 90, payoff: 10 },
  { price: 100, payoff: 0 },
  { price: 110, payoff: 0 },
  { price: 120, payoff: 0 },
  { price: 130, payoff: 0 },
];

const OperationPayoffChart = ({ operationType }: PayoffChartProps) => {
  const optionData = operationType.toLowerCase().includes('call') ? callOptionData : putOptionData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico de Payoff</CardTitle>
        <CardDescription>Visualização do retorno potencial da operação</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer
            config={{
              price: {
                label: "Preço do Ativo",
                theme: {
                  light: "#475569",
                  dark: "#94a3b8"
                }
              },
              payoff: {
                label: "Retorno",
                theme: {
                  light: "#8b5cf6",
                  dark: "#a78bfa"
                }
              }
            }}
          >
            <AreaChart data={optionData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="price"
                label={{ value: 'Preço do Ativo', position: 'bottom' }}
                className="text-muted-foreground text-xs"
              />
              <YAxis
                label={{ value: 'Retorno', angle: -90, position: 'left' }}
                className="text-muted-foreground text-xs"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-muted-foreground text-xs">Preço:</div>
                          <div className="font-mono text-xs font-medium">
                            {payload[0].payload.price}
                          </div>
                          <div className="text-muted-foreground text-xs">Retorno:</div>
                          <div className="font-mono text-xs font-medium">
                            {payload[0].payload.payoff}
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="payoff"
                stroke="var(--color-payoff)"
                fill="var(--color-payoff)"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default OperationPayoffChart;
