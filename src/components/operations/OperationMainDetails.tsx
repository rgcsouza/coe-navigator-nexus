
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Operation } from "@/types/operations";

interface OperationDetailsProps {
  operation: Operation;
}

const OperationMainDetails = ({ operation }: OperationDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações da Operação</CardTitle>
        <CardDescription>Detalhes principais do certificado</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Código</p>
            <p className="font-medium">{operation.id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Nome</p>
            <p className="font-medium">{operation.name || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Tipo</p>
            <p className="font-medium">{operation.type}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Ativo</p>
            <p className="font-medium">{operation.asset}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Proteção</p>
            <p className="font-medium">{operation.protection}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Emissor</p>
            <p className="font-medium">{operation.issuer}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Data de Criação</p>
            <p className="font-medium">{operation.date || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Data de Vencimento</p>
            <p className="font-medium">{operation.maturityDate || 'N/A'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OperationMainDetails;
