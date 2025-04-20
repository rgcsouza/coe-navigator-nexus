
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Operation } from "@/types/operations";

interface UseOperationProps {
  initialOperation: Operation;
}

interface AdditionalFields {
  observations: string;
  commercialConditions: string;
  legalNotes: string;
}

export const useOperation = ({ initialOperation }: UseOperationProps) => {
  const { toast } = useToast();
  const [operation, setOperation] = useState(initialOperation);
  const [loading, setLoading] = useState(false);
  const [additionalFields, setAdditionalFields] = useState<AdditionalFields>({
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

  return {
    operation,
    loading,
    additionalFields,
    canSendOperation,
    canCancelOperation,
    handleAdditionalFieldChange,
    handleSendOperation,
    handleCancelOperation
  };
};
