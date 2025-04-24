import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { ArrowDown, ArrowUp, ToggleLeft, FileCheck } from "lucide-react";
import { Operation } from "@/types/operations";
import OperationPayoffChart from "./OperationPayoffChart";
import ClientContractsChart from "./ClientContractsChart";

interface OperationSimulationProps {
  operation: Operation;
  onStatusUpdate?: (newStatus: string) => void;
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
  operation,
  onStatusUpdate
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
    const entryPrice = parseFloat(values.entryPrice);
    const exitPrice = parseFloat(values.exitPrice);
    const quantity = parseFloat(values.quantity);
    const interestRate = values.interestRate ? parseFloat(values.interestRate) / 100 : 0;

    const grossResult = (exitPrice - entryPrice) * quantity;
    const investmentValue = entryPrice * quantity;
    
    let estimatedReturn = (grossResult / investmentValue) * 100;
    
    if (interestRate > 0) {
      estimatedReturn += interestRate * 100;
    }

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

  const handleEmitCertificate = () => {
    if (onStatusUpdate) {
      onStatusUpdate("Processado");
    }
    
    toast({
      title: "Certificado emitido",
      description: "O certificado foi gerado com sucesso e a operação foi processada.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Operação</CardTitle>
          <CardDescription>
            {operation.name} - {operation.type}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label>Status</Label>
              <p className="text-sm">{operation.status}</p>
            </div>
            <div className="space-y-2">
              <Label>Data de Emissão</Label>
              <p className="text-sm">{operation.creationDate}</p>
            </div>
            <div className="space-y-2">
              <Label>Data de Vencimento</Label>
              <p className="text-sm">{operation.maturityDate}</p>
            </div>
            <div className="space-y-2">
              <Label>Rentabilidade Esperada</Label>
              <p className="text-sm">{operation.expectedReturn}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <OperationPayoffChart operationType={operation.type} />
        <ClientContractsChart operation={operation} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Simulação de Estrutura</CardTitle>
          <CardDescription>
            Simule os resultados potenciais para esta estrutura {operation.type}
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
                {operation.type.toLowerCase().includes("opção") && (
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
            <div className="mt-8 space-y-6">
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
              
              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleEmitCertificate}
                  className="gap-2"
                >
                  <FileCheck className="h-4 w-4" />
                  Emitir Certificado
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationSimulation;
