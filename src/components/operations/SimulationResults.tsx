
import React from "react";
import { Button } from "@/components/ui/button";
import { SimulationResult } from "@/hooks/useSimulationForm";
import { ArrowDown, ArrowUp, ToggleLeft, FileCheck } from "lucide-react";

interface SimulationResultsProps {
  result: SimulationResult;
  onEmitCertificate: () => void;
}

const SimulationResults = ({ result, onEmitCertificate }: SimulationResultsProps) => {
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
    <div className="mt-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center p-4 border rounded-md">
          <p className="text-sm text-muted-foreground mb-2">Resultado Bruto</p>
          <p className={`text-2xl font-bold ${result.grossResult >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            R$ {result.grossResult.toFixed(2)}
          </p>
        </div>
        <div className="flex flex-col items-center p-4 border rounded-md">
          <p className="text-sm text-muted-foreground mb-2">Rentabilidade Estimada</p>
          <p className={`text-2xl font-bold ${result.estimatedReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {result.estimatedReturn.toFixed(2)}%
          </p>
        </div>
        <div className="flex flex-col items-center p-4 border rounded-md">
          <p className="text-sm text-muted-foreground mb-2">Cenário</p>
          <div className="flex items-center gap-2">
            {getScenarioIcon(result.scenario)}
            <span className={`text-lg font-semibold ${getScenarioColor(result.scenario)}`}>
              {result.scenario === 'positive' ? 'Ganho' : 
               result.scenario === 'negative' ? 'Perda' : 'Neutro'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        <Button onClick={onEmitCertificate} className="gap-2">
          <FileCheck className="h-4 w-4" />
          Emitir Certificado
        </Button>
      </div>
    </div>
  );
};

export default SimulationResults;
