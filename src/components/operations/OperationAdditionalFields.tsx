
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, XCircle } from "lucide-react";

interface AdditionalFieldsProps {
  fields: {
    observations: string;
    commercialConditions: string;
    legalNotes: string;
  };
  canSendOperation: boolean;
  canCancelOperation: boolean;
  loading: boolean;
  onFieldChange: (field: string, value: string) => void;
  onSendOperation: () => void;
  onCancelOperation: () => void;
}

const OperationAdditionalFields = ({
  fields,
  canSendOperation,
  canCancelOperation,
  loading,
  onFieldChange,
  onSendOperation,
  onCancelOperation
}: AdditionalFieldsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campos Adicionais</CardTitle>
        <CardDescription>Informações complementares da estrutura</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Condições Comerciais *</label>
          <Textarea 
            placeholder="Descreva as condições comerciais desta estrutura" 
            className="resize-none"
            value={fields.commercialConditions}
            onChange={(e) => onFieldChange("commercialConditions", e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Observações</label>
          <Textarea 
            placeholder="Observações gerais sobre a estrutura" 
            className="resize-none"
            value={fields.observations}
            onChange={(e) => onFieldChange("observations", e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Notas Jurídicas</label>
          <Textarea 
            placeholder="Informações jurídicas relevantes" 
            className="resize-none"
            value={fields.legalNotes}
            onChange={(e) => onFieldChange("legalNotes", e.target.value)}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">* Campo obrigatório</p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end">
        <Button 
          variant="destructive" 
          onClick={onCancelOperation}
          disabled={!canCancelOperation || loading}
        >
          <XCircle className="mr-2 h-4 w-4" />
          Cancelar Emissão
        </Button>
        <Button 
          onClick={onSendOperation}
          disabled={!canSendOperation || loading}
        >
          <Send className="mr-2 h-4 w-4" />
          Enviar para B3
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OperationAdditionalFields;
