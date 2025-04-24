
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Operation } from "@/types/operations";

interface ClientContractsChartProps {
  operation: Operation;
}

const ClientContractsChart = ({ operation }: ClientContractsChartProps) => {
  const chartData = operation.clients?.map(client => ({
    name: client.name,
    value: parseFloat(client.value.replace(/[^0-9.-]+/g, "")),
  })) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contratos por Cliente</CardTitle>
        <CardDescription>Distribuição do valor total por cliente</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer
            config={{
              clients: {
                label: "Clientes",
                theme: {
                  light: "#475569",
                  dark: "#94a3b8"
                }
              },
              value: {
                label: "Valor",
                theme: {
                  light: "#8b5cf6",
                  dark: "#a78bfa"
                }
              }
            }}
          >
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="name"
                label={{ value: 'Cliente', position: 'bottom' }}
                className="text-muted-foreground text-xs"
              />
              <YAxis
                label={{ value: 'Valor', angle: -90, position: 'left' }}
                className="text-muted-foreground text-xs"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-muted-foreground text-xs">Cliente:</div>
                          <div className="font-mono text-xs font-medium">
                            {payload[0].payload.name}
                          </div>
                          <div className="text-muted-foreground text-xs">Valor:</div>
                          <div className="font-mono text-xs font-medium">
                            {`R$ ${payload[0].payload.value.toLocaleString()}`}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="value"
                fill="var(--color-value)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientContractsChart;
