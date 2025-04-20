import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StatsCard from "@/components/dashboard/StatsCard";
import AggregatedOperationsTable from "@/components/dashboard/AggregatedOperationsTable";
import { Operation, getOfferTypeLabel, getOfferTypeStyles } from "@/types/operations";

// Mock data for dashboard stats
const dashboardStats = [
  { title: "Operações Registradas", value: 124, change: "+5%", changeType: "positive" as const },
  { title: "Operações Pendentes", value: 8, change: "-2", changeType: "positive" as const },
  { title: "Templates Ativos", value: 15, change: "+3", changeType: "positive" as const },
  { title: "Arquivos Gerados", value: 97, change: "+12", changeType: "positive" as const },
];

// Updated mock aggregated operations
const aggregatedOperations: Operation[] = [
  { 
    id: "COE-2023-05-01", 
    type: "Autocall", 
    asset: "IBOVESPA", 
    protection: "95%",
    status: "Processado",
    offerType: "d0",
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
    offerType: "24x7",
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
    offerType: "scheduled",
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
    offerType: "d0",
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
  const { toast } = useToast();
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

  const handleConcludeOperation = (operationId: string) => {
    toast({
      title: "Operação concluída",
      description: `A operação ${operationId} foi concluída com sucesso.`
    });
  };

  const handleCancelOperation = (operationId: string) => {
    toast({
      title: "Operação cancelada",
      description: `A operação ${operationId} foi cancelada.`
    });
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
          <StatsCard key={i} {...stat} />
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
            <AggregatedOperationsTable
              operations={aggregatedOperations}
              expandedOperation={expandedOperation}
              onToggleOperation={toggleOperation}
              onViewOperationDetails={handleViewOperationDetails}
              onConcludeOperation={handleConcludeOperation}
              onCancelOperation={handleCancelOperation}
              getStatusBadge={getStatusBadge}
              getOfferTypeStyles={getOfferTypeStyles}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
