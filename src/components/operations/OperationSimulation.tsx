
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Operation } from "@/types/operations";
import { useSimulationForm } from "@/hooks/useSimulationForm";
import SimulationForm from "./SimulationForm";
import SimulationResults from "./SimulationResults";
import OperationPayoffChart from "./OperationPayoffChart";
import ClientContractsChart from "./ClientContractsChart";

interface OperationSimulationProps {
  operation: Operation;
  onStatusUpdate?: (newStatus: string) => void;
}

const OperationSimulation = ({
  operation,
  onStatusUpdate
}: OperationSimulationProps) => {
  const {
    form,
    simulationResult,
    calculateSimulation,
    handleEmitCertificate
  } = useSimulationForm(onStatusUpdate);

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
          <SimulationForm 
            form={form}
            operationType={operation.type}
            onSubmit={calculateSimulation}
          />
          
          {simulationResult && (
            <SimulationResults
              result={simulationResult}
              onEmitCertificate={handleEmitCertificate}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationSimulation;
