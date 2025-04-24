
import React from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PrintOperationButtonProps {
  onPrint: () => void;
}

const PrintOperationButton = ({ onPrint }: PrintOperationButtonProps) => {
  const { toast } = useToast();

  const handlePrint = () => {
    toast({
      title: "Imprimindo operação",
      description: "A janela de impressão será aberta em instantes.",
    });
    onPrint();
  };

  return (
    <Button onClick={handlePrint} variant="outline" className="gap-2">
      <Printer className="h-4 w-4" />
      Imprimir Operação
    </Button>
  );
};

export default PrintOperationButton;
