
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

export const simulationFormSchema = z.object({
  entryPrice: z.string().min(1, "Preço de entrada é obrigatório"),
  exitPrice: z.string().min(1, "Preço de saída é obrigatório"),
  quantity: z.string().min(1, "Quantidade é obrigatória"),
  interestRate: z.string().optional(),
  volatility: z.string().optional(),
});

export type SimulationFormValues = z.infer<typeof simulationFormSchema>;

export interface SimulationResult {
  grossResult: number;
  estimatedReturn: number;
  scenario: "positive" | "negative" | "neutral";
}

export const useSimulationForm = (onStatusUpdate?: (newStatus: string) => void) => {
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

  const calculateSimulation = (values: SimulationFormValues) => {
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

  const handleEmitCertificate = () => {
    if (onStatusUpdate) {
      onStatusUpdate("Processado");
    }
    
    toast({
      title: "Certificado emitido",
      description: "O certificado foi gerado com sucesso e a operação foi processada.",
    });
  };

  return {
    form,
    simulationResult,
    calculateSimulation,
    handleEmitCertificate,
  };
};
