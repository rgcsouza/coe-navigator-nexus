import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { mockOperationDetails } from "@/data/mockOperationDetails";
import OperationStatusBanner from "@/components/operations/OperationStatusBanner";
import OperationMainDetails from "@/components/operations/OperationMainDetails";
import OperationPayoffChart from "@/components/operations/OperationPayoffChart";
import OperationAdditionalFields from "@/components/operations/OperationAdditionalFields";
import ClientDetailsTable from "@/components/dashboard/ClientDetailsTable";
import { Button } from "@/components/ui/button";

const OperationDetails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [operation, setOperation] = useState(mockOperationDetails);
  const [loading, setLoading] = useState(false);
  const [additionalFields, setAdditionalFields] = useState({
    observations: "",
    commercialConditions: "",
    legalNotes: ""
  });

  const handleAdditionalFieldChange = (field: string, value: string) => {
    setAdditionalFields((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendOperation = () => {
    if (!additionalFields.commercialConditions.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "As condições comerciais devem ser preenchidas antes de enviar.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      setOperation(prev => ({
        ...prev,
        status: "Enviado",
        clients: prev.clients.map(client => ({
          ...client,
          status: "Enviado"
        }))
      }));
      
      setLoading(false);
      
      toast({
        title: "Operação enviada com sucesso",
        description: "A operação foi enviada para processamento na B3.",
      });
    }, 1500);
  };

  const handleCancelOperation = () => {
    setLoading(true);
    
    setTimeout(() => {
      setOperation(prev => ({
        ...prev,
        status: "Cancelado",
        clients: prev.clients.map(client => ({
          ...client,
          status: "Cancelado"
        }))
      }));
      
      setLoading(false);
      
      toast({
        title: "Operação cancelada",
        description: "A operação foi cancelada com sucesso.",
      });
    }, 1500);
  };
  
  const canSendOperation = operation.status === "Em edição" || operation.status === "Rejeitado";
  const canCancelOperation = operation.status !== "Processado" && operation.status !== "Cancelado";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Detalhes da Operação</h1>
          <p className="text-muted-foreground">
            Visualize e gerencie os detalhes desta operação de COE.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            Voltar
          </Button>
        </div>
      </div>
      
      <OperationStatusBanner status={operation.status} />
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <OperationMainDetails operation={operation} />
          <ClientDetailsTable clients={operation.clients} />
        </div>
        
        <div>
          <OperationPayoffChart 
            operationType={operation.type} 
            className="h-[300px] w-full" 
          />
        </div>
      </div>

      <OperationAdditionalFields
        fields={additionalFields}
        canSendOperation={canSendOperation}
        canCancelOperation={canCancelOperation}
        loading={loading}
        onFieldChange={handleAdditionalFieldChange}
        onSendOperation={handleSendOperation}
        onCancelOperation={handleCancelOperation}
      />
    </div>
  );
};

export default OperationDetails;
