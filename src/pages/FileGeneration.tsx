
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ArrowDown, FileDown, FileUp, Check } from "lucide-react";

// Mock operations for selection
const mockOperations = [
  { id: "COE-2023-05-01", name: "Autocall IBOVESPA", status: "Concluída" },
  { id: "COE-2023-04-28", name: "Duplo Índice S&P 500 / IBOVESPA", status: "Concluída" },
  { id: "COE-2023-04-27", name: "Autocall NASDAQ", status: "Concluída" },
  { id: "COE-2023-04-25", name: "Capital Protegido IBOVESPA", status: "Concluída" },
  { id: "COE-2023-04-20", name: "Call Digital Ouro", status: "Concluída" },
];

// Mock file formats
const fileFormats = [
  { id: "b3-standard", name: "Formato Padrão B3" },
  { id: "csv", name: "CSV" },
  { id: "json", name: "JSON" },
];

const FileGeneration = () => {
  const [selectedOperations, setSelectedOperations] = useState<string[]>([]);
  const [fileFormat, setFileFormat] = useState<string | undefined>();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleOperationToggle = (operationId: string) => {
    if (selectedOperations.includes(operationId)) {
      setSelectedOperations(selectedOperations.filter(id => id !== operationId));
    } else {
      setSelectedOperations([...selectedOperations, operationId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedOperations.length === mockOperations.length) {
      setSelectedOperations([]);
    } else {
      setSelectedOperations(mockOperations.map(op => op.id));
    }
  };

  const handleGenerateFile = () => {
    if (!fileFormat || selectedOperations.length === 0) return;
    
    setIsGenerating(true);
    
    // Simulate file generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsSuccess(true);
      setShowSuccessDialog(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Geração de Arquivos</h1>
        <p className="text-muted-foreground">
          Gere arquivos para envio à B3 e outros formatos
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gerador de Arquivos</CardTitle>
          <CardDescription>
            Selecione as operações e o formato para geração do arquivo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Operações</h3>
              <Button 
                variant="outline" 
                onClick={handleSelectAll}
                size="sm"
              >
                {selectedOperations.length === mockOperations.length ? "Desmarcar Todos" : "Selecionar Todos"}
              </Button>
            </div>

            <div className="border rounded-md divide-y">
              {mockOperations.map((operation) => (
                <div 
                  key={operation.id}
                  className="flex items-center p-3 hover:bg-muted/50"
                >
                  <Checkbox 
                    id={operation.id}
                    checked={selectedOperations.includes(operation.id)}
                    onCheckedChange={() => handleOperationToggle(operation.id)}
                  />
                  <label 
                    htmlFor={operation.id}
                    className="ml-3 flex-1 cursor-pointer"
                  >
                    <div className="font-medium">{operation.name}</div>
                    <div className="text-sm text-muted-foreground">{operation.id}</div>
                  </label>
                  <div>
                    <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                      {operation.status}
                    </span>
                  </div>
                </div>
              ))}

              {mockOperations.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                  Nenhuma operação disponível
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Formato do Arquivo</Label>
            <Select value={fileFormat} onValueChange={setFileFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o formato de saída" />
              </SelectTrigger>
              <SelectContent>
                {fileFormats.map((format) => (
                  <SelectItem key={format.id} value={format.id}>
                    {format.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            className="w-full flex items-center gap-2"
            disabled={!fileFormat || selectedOperations.length === 0 || isGenerating}
            onClick={handleGenerateFile}
          >
            {isGenerating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span>Gerando arquivo...</span>
              </>
            ) : (
              <>
                <FileDown className="h-4 w-4" />
                <span>Gerar Arquivo</span>
              </>
            )}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            {selectedOperations.length > 0 
              ? `${selectedOperations.length} operação(ões) selecionada(s)` 
              : "Nenhuma operação selecionada"}
          </p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Arquivos</CardTitle>
          <CardDescription>
            Arquivos gerados recentemente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-md divide-y">
              <div className="flex items-center justify-between p-3">
                <div>
                  <div className="font-medium">B3_COE_20230501.xml</div>
                  <div className="text-sm text-muted-foreground">Gerado em 01/05/2023</div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowDown className="h-4 w-4" />
                  <span>Download</span>
                </Button>
              </div>
              <div className="flex items-center justify-between p-3">
                <div>
                  <div className="font-medium">B3_COE_20230428.xml</div>
                  <div className="text-sm text-muted-foreground">Gerado em 28/04/2023</div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowDown className="h-4 w-4" />
                  <span>Download</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <Check className="h-5 w-5" />
              Arquivo Gerado com Sucesso
            </DialogTitle>
            <DialogDescription>
              O arquivo foi gerado e está pronto para download
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-muted p-3 rounded-md flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileUp className="h-5 w-5 text-primary" />
              <span className="font-medium">B3_COE_{new Date().toISOString().split('T')[0].replace(/-/g, '')}.xml</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {(Math.random() * 100).toFixed(1)} KB
            </div>
          </div>
          
          <DialogFooter>
            <Button className="w-full" onClick={() => setShowSuccessDialog(false)}>
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileGeneration;
