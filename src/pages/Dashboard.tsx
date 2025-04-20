
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
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
import { ChevronDown, ChevronUp, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for dashboard stats
const dashboardStats = [
  { title: "Operações Registradas", value: 124, change: "+5%", changeType: "positive" },
  { title: "Operações Pendentes", value: 8, change: "-2", changeType: "positive" },
  { title: "Templates Ativos", value: 15, change: "+3", changeType: "positive" },
  { title: "Arquivos Gerados", value: 97, change: "+12", changeType: "positive" },
];

// Mock aggregated operations
const aggregatedOperations = [
  { 
    id: "COE-2023-05-01", 
    type: "Autocall", 
    asset: "IBOVESPA", 
    protection: "95%",
    status: "Processado",
    date: "2023-05-01", 
    totalValue: "R$ 1.250.000,00",
    clientCount: 5,
    clients: [
      { name: "Cliente A", cpf: "123.456.789-00", value: "R$ 500.000,00", status: "Processado" },
      { name: "Cliente B", cpf: "987.654.321-00", value: "R$ 300.000,00", status: "Processado" },
      { name: "Cliente C", cpf: "456.789.123-00", value: "R$ 200.000,00", status: "Processado" },
      { name: "Cliente D", cpf: "789.123.456-00", value: "R$ 150.000,00", status: "Processado" },
      { name: "Cliente E", cpf: "321.654.987-00", value: "R$ 100.000,00", status: "Processado" }
    ]
  },
  { 
    id: "COE-2023-04-28", 
    type: "Duplo Índice", 
    asset: "S&P 500 / IBOVESPA", 
    protection: "100%",
    status: "Em análise",
    date: "2023-04-28", 
    totalValue: "R$ 750.000,00",
    clientCount: 3,
    clients: [
      { name: "Cliente F", cpf: "111.222.333-44", value: "R$ 300.000,00", status: "Em análise" },
      { name: "Cliente G", cpf: "555.666.777-88", value: "R$ 250.000,00", status: "Em análise" },
      { name: "Cliente H", cpf: "999.888.777-66", value: "R$ 200.000,00", status: "Em análise" }
    ]
  },
  { 
    id: "COE-2023-04-27", 
    type: "Autocall", 
    asset: "NASDAQ", 
    protection: "90%",
    status: "Em edição",
    date: "2023-04-27", 
    totalValue: "R$ 500.000,00",
    clientCount: 2,
    clients: [
      { name: "Cliente I", cpf: "444.555.666-77", value: "R$ 300.000,00", status: "Em edição" },
      { name: "Cliente J", cpf: "222.333.444-55", value: "R$ 200.000,00", status: "Em edição" }
    ]
  },
  { 
    id: "COE-2023-04-25", 
    type: "Capital Protegido", 
    asset: "IBOVESPA", 
    protection: "100%",
    status: "Enviado",
    date: "2023-04-25", 
    totalValue: "R$ 1.000.000,00",
    clientCount: 4,
    clients: [
      { name: "Cliente K", cpf: "777.888.999-00", value: "R$ 300.000,00", status: "Enviado" },
      { name: "Cliente L", cpf: "666.555.444-33", value: "R$ 250.000,00", status: "Enviado" },
      { name: "Cliente M", cpf: "333.222.111-00", value: "R$ 250.000,00", status: "Enviado" },
      { name: "Cliente N", cpf: "888.777.666-55", value: "R$ 200.000,00", status: "Enviado" }
    ]
  },
];

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

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [expandedOperation, setExpandedOperation] = useState<string | null>(null);
  
  const toggleOperation = (operationId: string) => {
    if (expandedOperation === operationId) {
      setExpandedOperation(null);
    } else {
      setExpandedOperation(operationId);
    }
  };
  
  const handleViewOperationDetails = (operationId: string) => {
    navigate(`/operation/${operationId}`);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo, {user?.name}! Aqui está um resumo das operações COE.
        </p>
      </div>
      
      {/* Dashboard Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`text-sm ${stat.changeType === "positive" ? "text-green-500" : "text-red-500"}`}>
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Aggregated Operations */}
      <Card>
        <CardHeader>
          <CardTitle>Operações Agregadas</CardTitle>
          <CardDescription>Operações COE agrupadas por produto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Ativo</TableHead>
                  <TableHead>Proteção</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Clientes</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aggregatedOperations.map((op) => (
                  <React.Fragment key={op.id}>
                    <TableRow className="hover:bg-muted/50">
                      <TableCell className="font-medium text-primary">{op.id}</TableCell>
                      <TableCell>{op.type}</TableCell>
                      <TableCell>{op.asset}</TableCell>
                      <TableCell>{op.protection}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadge(op.status)}>
                          {op.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{op.date}</TableCell>
                      <TableCell className="font-medium">{op.totalValue}</TableCell>
                      <TableCell>{op.clientCount}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toggleOperation(op.id)}
                            className="p-0 h-8 w-8"
                          >
                            {expandedOperation === op.id ? 
                              <ChevronUp className="h-4 w-4" /> : 
                              <ChevronDown className="h-4 w-4" />
                            }
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-0 h-8 w-8"
                            onClick={() => handleViewOperationDetails(op.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    {/* Expanded client details */}
                    {expandedOperation === op.id && (
                      <TableRow>
                        <TableCell colSpan={9} className="p-0">
                          <div className="bg-muted/30 p-4">
                            <h4 className="font-medium mb-2">Detalhes dos Clientes</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Nome</TableHead>
                                  <TableHead>CPF</TableHead>
                                  <TableHead>Valor</TableHead>
                                  <TableHead>Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {op.clients.map((client, clientIndex) => (
                                  <TableRow key={clientIndex}>
                                    <TableCell>{client.name}</TableCell>
                                    <TableCell>{client.cpf}</TableCell>
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
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
