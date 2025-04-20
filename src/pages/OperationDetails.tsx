import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  ChevronDown, 
  ChevronUp, 
  Send, 
  XCircle, 
  Clock, 
  FileText, 
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Mock data for operation details
const mockOperationDetails = {
  id: "COE-2023-05-01",
  name: "Autocall IBOVESPA Q2 2023",
  type: "Autocall", 
  asset: "IBOVESPA", 
  protection: "95%",
  status: "Em edição",
  creationDate: "01/05/2023",
  maturityDate: "01/05/2025",
  totalValue: "R$ 1.250.000,00",
  issuer: "Banco ABC",
  clients: [
    { name: "Cliente A", document: "123.456.789-00", value: "R$ 500.000,00", status: "Em edição" },
    { name: "Cliente B", document: "987.654.321-00", value: "R$ 300.000,00", status: "Em edição" },
    { name: "Cliente C", document: "456.789.123-00", value: "R$ 200.000,00", status: "Em edição" },
    { name: "Cliente D", document: "789.123.456-00", value: "R$ 150.000,00", status: "Em edição" },
    { name: "Cliente E", document: "321.654.987-00", value: "R$ 100.000,00", status: "Em edição" }
  ],
  additionalFields: {
    observations: "",
    commercialConditions: "",
    legalNotes: ""
  }
};

// Helper function to get status badge styling
const getStatusBadge = (status: string) => {
  const statusStyles = {
    "Processado": "bg-green-100 text-green-800",
    "Em análise": "bg-blue-100 text-blue-800",
    "Em edição": "bg-amber-100 text-amber-800",
    "Enviado": "bg-purple-100 text-purple-800",
    "Rejeitado": "bg-red-100 text-red-800",
    "Cancelado": "bg-gray-100 text-gray-800"
  };
  
  return statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800";
};

// Helper function to get status icon
const getStatusIcon = (status: string) => {
  switch(status) {
    case "Processado":
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case "Em análise":
      return <Clock className="h-5 w-5 text-blue-600" />;
    case "Em edição":
      return <FileText className="h-5 w-5 text-amber-600" />;
    case "Enviado":
      return <Send className="h-5 w-5 text-purple-600" />;
    case "Rejeitado":
      return <AlertCircle className="h-5 w-5 text-red-600" />;
    case "Cancelado":
      return <XCircle className="h-5 w-5 text-gray-600" />;
    default:
      return <FileText className="h-5 w-5 text-gray-600" />;
  }
};

// Sample data for option payoff graphs
const callOptionData = [
  { price: 70, payoff: 0 },
  { price: 80, payoff: 0 },
  { price: 90, payoff: 0 },
  { price: 100, payoff: 0 },
  { price: 110, payoff: 10 },
  { price: 120, payoff: 20 },
  { price: 130, payoff: 30 },
];

const putOptionData = [
  { price: 70, payoff: 30 },
  { price: 80, payoff: 20 },
  { price: 90, payoff: 10 },
  { price: 100, payoff: 0 },
  { price: 110, payoff: 0 },
  { price: 120, payoff: 0 },
  { price: 130, payoff: 0 },
];

const OperationDetails = () => {
  const { operationId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State variables
  const [operation, setOperation] = useState(mockOperationDetails);
  const [clientsExpanded, setClientsExpanded] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Form state for additional fields
  const [additionalFields, setAdditionalFields] = useState({
    observations: "",
    commercialConditions: "",
    legalNotes: ""
  });

  // Handle toggle clients section
  const toggleClientsSection = () => {
    setClientsExpanded(!clientsExpanded);
  };

  // Handle additional fields changes
  const handleAdditionalFieldChange = (field: string, value: string) => {
    setAdditionalFields((prev) => ({
      ...prev,
      [field]: value
    }));
    
    // In a real app, you'd add debounce here and save to backend
  };

  // Handle send operation
  const handleSendOperation = () => {
    // Validation
    if (!additionalFields.commercialConditions.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "As condições comerciais devem ser preenchidas antes de enviar.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update operation status
      setOperation(prev => ({
        ...prev,
        status: "Enviado",
        clients: prev.clients.map(client => ({
          ...client,
          status: "Enviado"
        }))
      }));
      
      setLoading(false);
      
      // Show success toast
      toast({
        title: "Operação enviada com sucesso",
        description: "A operação foi enviada para processamento na B3.",
      });
      
      // In a real app, this would log to history
    }, 1500);
  };

  // Handle cancel operation
  const handleCancelOperation = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update operation status
      setOperation(prev => ({
        ...prev,
        status: "Cancelado",
        clients: prev.clients.map(client => ({
          ...client,
          status: "Cancelado"
        }))
      }));
      
      setLoading(false);
      
      // Show success toast
      toast({
        title: "Operação cancelada",
        description: "A operação foi cancelada com sucesso.",
      });
      
      // In a real app, this would log to history
    }, 1500);
  };
  
  // Check if operation can be sent
  const canSendOperation = operation.status === "Em edição" || operation.status === "Rejeitado";
  
  // Check if operation can be canceled
  const canCancelOperation = operation.status !== "Processado" && operation.status !== "Cancelado";

  // Determine which graph to show based on operation type
  const getOptionData = () => {
    if (operation.type.toLowerCase().includes('call')) {
      return callOptionData;
    }
    return putOptionData;
  };

  const optionData = getOptionData();
  
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
      
      {/* Operation Status Banner */}
      <div className={`w-full p-4 rounded-lg flex items-center gap-3 ${getStatusBadge(operation.status)}`}>
        {getStatusIcon(operation.status)}
        <div>
          <h2 className="font-semibold">Status: {operation.status}</h2>
          <p className="text-sm opacity-90">Última atualização: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
      
      {/* Main Details Card */}
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
              <p className="font-medium">{operation.name}</p>
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
              <p className="font-medium">{operation.creationDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Data de Vencimento</p>
              <p className="font-medium">{operation.maturityDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Clients Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Clientes Vinculados</CardTitle>
            <CardDescription>Lista de clientes participantes desta operação</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleClientsSection}
          >
            {clientsExpanded ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </CardHeader>
        {clientsExpanded && (
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>CPF/CNPJ</TableHead>
                    <TableHead>Valor Aplicado</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {operation.clients.map((client, index) => (
                    <TableRow key={index}>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.document}</TableCell>
                      <TableCell>{client.value}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadge(client.status)}>
                          {client.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 text-sm text-muted-foreground">
                Total: {operation.clients.length} clientes | Valor Total: {operation.totalValue}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      
      {/* Additional Fields Card */}
      <Card>
        <CardHeader>
          <CardTitle>Campos Adicionais</CardTitle>
          <CardDescription>Informações complementares da operação</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Condições Comerciais *</label>
            <Textarea 
              placeholder="Descreva as condições comerciais desta operação" 
              className="resize-none"
              value={additionalFields.commercialConditions}
              onChange={(e) => handleAdditionalFieldChange("commercialConditions", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Observações</label>
            <Textarea 
              placeholder="Observações gerais sobre a operação" 
              className="resize-none"
              value={additionalFields.observations}
              onChange={(e) => handleAdditionalFieldChange("observations", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Notas Jurídicas</label>
            <Textarea 
              placeholder="Informações jurídicas relevantes" 
              className="resize-none"
              value={additionalFields.legalNotes}
              onChange={(e) => handleAdditionalFieldChange("legalNotes", e.target.value)}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">* Campo obrigatório</p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button 
            variant="destructive" 
            onClick={handleCancelOperation}
            disabled={!canCancelOperation || loading}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Cancelar Emissão
          </Button>
          <Button 
            onClick={handleSendOperation}
            disabled={!canSendOperation || loading}
          >
            <Send className="mr-2 h-4 w-4" />
            Enviar para B3
          </Button>
        </CardFooter>
      </Card>

      {/* Option Payoff Chart Card */}
      <Card>
        <CardHeader>
          <CardTitle>Gráfico de Payoff</CardTitle>
          <CardDescription>Visualização do retorno potencial da operação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ChartContainer
              config={{
                price: {
                  label: "Preço do Ativo",
                  theme: {
                    light: "#475569",
                    dark: "#94a3b8"
                  }
                },
                payoff: {
                  label: "Retorno",
                  theme: {
                    light: "#8b5cf6",
                    dark: "#a78bfa"
                  }
                }
              }}
            >
              <AreaChart data={optionData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="price"
                  label={{ value: 'Preço do Ativo', position: 'bottom' }}
                  className="text-muted-foreground text-xs"
                />
                <YAxis
                  label={{ value: 'Retorno', angle: -90, position: 'left' }}
                  className="text-muted-foreground text-xs"
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-muted-foreground text-xs">Preço:</div>
                            <div className="font-mono text-xs font-medium">
                              {payload[0].payload.price}
                            </div>
                            <div className="text-muted-foreground text-xs">Retorno:</div>
                            <div className="font-mono text-xs font-medium">
                              {payload[0].payload.payoff}
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="payoff"
                  stroke="var(--color-payoff)"
                  fill="var(--color-payoff)"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationDetails;
