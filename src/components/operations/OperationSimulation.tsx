
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { ArrowDown, ArrowUp, ToggleLeft } from "lucide-react";

interface OperationSimulationProps {
  operationType: string;
  asset: string;
  protection?: string;
}

const simulationFormSchema = z.object({
  entryPrice: z.string().min(1, "Preço de entrada é obrigatório"),
  exitPrice: z.string().min(1, "Preço de saída é obrigatório"),
  quantity: z.string().min(1, "Quantidade é obrigatória"),
  interestRate: z.string().optional(),
  volatility: z.string().optional(),
});

type SimulationFormValues = z.infer<typeof simulationFormSchema>;

interface SimulationResult {
  grossResult: number;
  estimatedReturn: number;
  scenario: "positive" | "negative" | "neutral";
}

const OperationSimulation = ({
  operationType,
  asset,
  protection
}: OperationSimulationProps) => {
  const { toast } = useToast();
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  const form = useForm<SimulationFormValues>({
    resolver: zodResolver(simulationFormSchema),
    defaultValues: {
      entryPrice: "",
      exitPrice: "",
      quantity: "",
      interestRate: "",
      volatility: "",
    },
  });

  const onSubmit = (values: SimulationFormValues) => {
    // Simple simulation calculation
    const entryPrice = parseFloat(values.entryPrice);
    const exitPrice = parseFloat(values.exitPrice);
    const quantity = parseFloat(values.quantity);
    const interestRate = values.interestRate ? parseFloat(values.interestRate) / 100 : 0;

    const grossResult = (exitPrice - entryPrice) * quantity;
    const investmentValue = entryPrice * quantity;
    
    // Calculate estimated return (simplified)
    let estimatedReturn = (grossResult / investmentValue) * 100;
    
    // Add interest rate effect if provided
    if (interestRate > 0) {
      estimatedReturn += interestRate * 100;
    }

    // Determine scenario
    let scenario: "positive" | "negative" | "neutral" = "neutral";
    if (estimatedReturn > 0) {
      scenario = "positive";
    } else if (estimatedReturn < 0) {
      scenario = "negative";
    }

    setSimulationResult({
      grossResult,
      estimatedReturn,
      scenario,
    });

    toast({
      title: "Simulação realizada",
      description: "Os resultados da simulação estão disponíveis abaixo.",
    });
  };

  const getScenarioColor = (scenario: string): string => {
    switch (scenario) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getScenarioIcon = (scenario: string) => {
    switch (scenario) {
      case "positive":
        return <ArrowUp className="h-6 w-6 text-green-600" />;
      case "negative":
        return <ArrowDown className="h-6 w-6 text-red-600" />;
      default:
        return <ToggleLeft className="h-6 w-6 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Simulação de Estrutura</CardTitle>
          <CardDescription>
            Simule os resultados potenciais para esta estrutura {operationType} em {asset}
            {protection && ` com proteção de ${protection}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="entryPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço de Entrada*</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="exitPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço de Saída Desejado*</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade*</FormLabel>
                      <FormControl>
                        <Input type="number" step="1" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interestRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taxa de Juros (%)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="0.0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {operationType.toLowerCase().includes("opção") && (
                  <FormField
                    control={form.control}
                    name="volatility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Volatilidade (%)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="0.0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <Button type="submit" className="mt-4">Calcular Simulação</Button>
            </form>
          </Form>

          {simulationResult && (
            <div className="mt-8 p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Resultado da Simulação</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center p-4 border rounded-md">
                  <p className="text-sm text-muted-foreground mb-2">Resultado Bruto</p>
                  <p className={`text-2xl font-bold ${simulationResult.grossResult >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    R$ {simulationResult.grossResult.toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-md">
                  <p className="text-sm text-muted-foreground mb-2">Rentabilidade Estimada</p>
                  <p className={`text-2xl font-bold ${simulationResult.estimatedReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {simulationResult.estimatedReturn.toFixed(2)}%
                  </p>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-md">
                  <p className="text-sm text-muted-foreground mb-2">Cenário</p>
                  <div className="flex items-center gap-2">
                    {getScenarioIcon(simulationResult.scenario)}
                    <span className={`text-lg font-semibold ${getScenarioColor(simulationResult.scenario)}`}>
                      {simulationResult.scenario === 'positive' ? 'Ganho' : 
                       simulationResult.scenario === 'negative' ? 'Perda' : 'Neutro'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationSimulation;
