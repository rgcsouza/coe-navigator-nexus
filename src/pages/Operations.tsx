
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OperationsHeader } from "@/components/operations/OperationsHeader";
import { OperationsTable } from "@/components/operations/OperationsTable";
import { useOperationsSort } from "@/hooks/useOperationsSort";
import { getOfferTypeLabel, getOfferTypeStyles, Operation } from "@/types/operations";

const mockOperations: Operation[] = [
  { 
    id: "COE-2023-05-01", 
    type: "Autocall", 
    asset: "IBOVESPA", 
    offerType: "d0", 
    status: "Concluída", 
    date: "2023-05-01", 
    value: "R$ 1.250.000,00",
    protection: "95%"
  },
  { 
    id: "COE-2023-04-28", 
    type: "Duplo Índice", 
    asset: "S&P 500 / IBOVESPA", 
    issuer: "Banco XYZ", 
    status: "Concluída", 
    offerType: "24x7",
    date: "2023-04-28", 
    value: "R$ 750.000,00",
    protection: "100%"
  },
  { 
    id: "COE-2023-04-27", 
    type: "Autocall", 
    asset: "NASDAQ", 
    issuer: "Banco ABC", 
    status: "Concluída", 
    offerType: "scheduled",
    date: "2023-04-27", 
    value: "R$ 500.000,00",
    protection: "90%" 
  },
  { 
    id: "COE-2023-04-25", 
    type: "Capital Protegido", 
    asset: "IBOVESPA", 
    issuer: "Banco DEF", 
    status: "Concluída", 
    offerType: "d0",
    date: "2023-04-25", 
    value: "R$ 1.000.000,00",
    protection: "100%"
  },
  { 
    id: "COE-2023-04-20", 
    type: "Call Digital", 
    asset: "Ouro", 
    issuer: "Banco XYZ", 
    status: "Concluída", 
    offerType: "24x7",
    date: "2023-04-20", 
    value: "R$ 350.000,00",
    protection: "95%" 
  },
  { 
    id: "COE-2023-04-15", 
    type: "Duplo Índice", 
    asset: "EUR/USD / IBOVESPA", 
    issuer: "Banco DEF", 
    status: "Concluída", 
    offerType: "scheduled",
    date: "2023-04-15", 
    value: "R$ 1.500.000,00",
    protection: "98%" 
  },
];

const Operations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredOperations = mockOperations.filter(op => 
    op.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedOperations = useOperationsSort(filteredOperations, sortField, sortDirection);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Operações COE</h1>
        <p className="text-muted-foreground">
          Gerencie operações de Certificados de Operações Estruturadas
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <TabsList className="mb-2 sm:mb-0">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="active">Em andamento</TabsTrigger>
            <TabsTrigger value="completed">Finalizadas</TabsTrigger>
          </TabsList>
          
          <OperationsHeader 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
        </div>

        <TabsContent value="all" className="m-0">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Operações Registradas</CardTitle>
              <CardDescription>
                Visualize e gerencie todas as operações COE registradas no sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <OperationsTable 
                  operations={sortedOperations}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                  getOfferTypeLabel={getOfferTypeLabel}
                  getOfferTypeStyles={getOfferTypeStyles}
                />
                {sortedOperations.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground">
                    Nenhuma operação encontrada para os filtros aplicados
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Operações em Andamento</CardTitle>
              <CardDescription>
                Operações que ainda não foram finalizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Não há operações em andamento no momento
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Operações Finalizadas</CardTitle>
              <CardDescription>
                Operações que já foram concluídas
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <OperationsTable 
                  operations={sortedOperations}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                  getOfferTypeLabel={getOfferTypeLabel}
                  getOfferTypeStyles={getOfferTypeStyles}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Operations;
