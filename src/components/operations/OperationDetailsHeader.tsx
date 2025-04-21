
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const OperationDetailsHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Detalhes da Operação</h1>
        <p className="text-muted-foreground">
          Visualize e gerencie os detalhes desta operação Estruturada.
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
  );
};

export default OperationDetailsHeader;
