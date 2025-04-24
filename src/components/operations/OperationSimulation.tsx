import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Operation } from "@/types/operations";
import { useSimulationForm } from "@/hooks/useSimulationForm";
import SimulationForm from "./SimulationForm";
import SimulationResults from "./SimulationResults";
import OperationPayoffChart from "./OperationPayoffChart";
import ClientContractsChart from "./ClientContractsChart";
import PrintOperationButton from "./PrintOperationButton";

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

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const content = `
      <html>
        <head>
          <title>Detalhes da Operação - ${operation.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { margin-bottom: 20px; }
            .section { margin-bottom: 15px; }
            .label { font-weight: bold; color: #666; }
            .value { margin-left: 10px; }
            .results { margin-top: 20px; padding: 15px; border: 1px solid #ddd; }
            @media print {
              body { padding: 0; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Detalhes da Operação</h1>
            <p>Nome: ${operation.name}</p>
            <p>Tipo: ${operation.type}</p>
            <p>Status: ${operation.status}</p>
          </div>
          
          <div class="section">
            <h2>Informações da Operação</h2>
            <p><span class="label">Código:</span> <span class="value">${operation.id}</span></p>
            <p><span class="label">Ativo:</span> <span class="value">${operation.asset}</span></p>
            <p><span class="label">Data de Emissão:</span> <span class="value">${operation.creationDate}</span></p>
            <p><span class="label">Data de Vencimento:</span> <span class="value">${operation.maturityDate}</span></p>
            <p><span class="label">Rentabilidade Esperada:</span> <span class="value">${operation.expectedReturn}</span></p>
          </div>
          
          ${simulationResult ? `
            <div class="results">
              <h2>Resultados da Simulação</h2>
              <p><span class="label">Resultado Bruto:</span> <span class="value">R$ ${simulationResult.grossResult.toFixed(2)}</span></p>
              <p><span class="label">Rentabilidade Estimada:</span> <span class="value">${simulationResult.estimatedReturn.toFixed(2)}%</span></p>
              <p><span class="label">Cenário:</span> <span class="value">${
                simulationResult.scenario === 'positive' ? 'Ganho' : 
                simulationResult.scenario === 'negative' ? 'Perda' : 'Neutro'
              }</span></p>
            </div>
          ` : ''}
        </body>
      </html>
    `;

    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        {simulationResult && <PrintOperationButton onPrint={handlePrint} />}
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OperationPayoffChart operationType={operation.type} />
        <ClientContractsChart operation={operation} />
      </div>
    </div>
  );
};

export default OperationSimulation;
