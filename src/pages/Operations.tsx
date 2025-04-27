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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
    offerType: "agendado",
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
    offerType: "agendado",
    date: "2023-04-15", 
    value: "R$ 1.500.000,00",
    protection: "98%" 
  },
  { 
    id: "COE-2023-04-10", 
    type: "Autocall Phoenix", 
    asset: "PETR4", 
    issuer: "Banco XYZ", 
    status: "Pendente", 
    offerType: "d0",
    date: "2023-04-10", 
    value: "R$ 2.000.000,00",
    protection: "92%" 
  },
  { 
    id: "COE-2023-04-05", 
    type: "Digital", 
    asset: "Vale3", 
    issuer: "Banco ABC", 
    status: "Precificação", 
    offerType: "24x7",
    date: "2023-04-05", 
    value: "R$ 800.000,00",
    protection: "100%" 
  },
  { 
    id: "COE-2023-04-01", 
    type: "Call Spread", 
    asset: "IBOVESPA", 
    issuer: "Banco DEF", 
    status: "Certificado Solicitado", 
    offerType: "agendado",
    date: "2023-04-01", 
    value: "R$ 1.800.000,00",
    protection: "95%" 
  },
  { 
    id: "COE-2023-03-28", 
    type: "Barrier Reverse", 
    asset: "ITUB4", 
    issuer: "Banco XYZ", 
    status: "Emitido", 
    offerType: "d0",
    date: "2023-03-28", 
    value: "R$ 950.000,00",
    protection: "90%" 
  }
];

const ITEMS_PER_PAGE = 5;

const Operations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

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
    (op.issuer?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  const sortedOperations = useOperationsSort(filteredOperations, sortField, sortDirection);
  
  const totalPages = Math.ceil(sortedOperations.length / ITEMS_PER_PAGE);
  const paginatedOperations = sortedOperations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const activeOperations = sortedOperations.filter(op => 
    ["Pendente", "Precificação", "Certificado Solicitado"].includes(op.status)
  );

  const paginatedActiveOperations = activeOperations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Operações Estruturadas</h1>
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
                Visualize e gerencie todas as operações estruturadas registradas no sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <OperationsTable 
                  operations={paginatedOperations}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                  getOfferTypeLabel={getOfferTypeLabel}
                  getOfferTypeStyles={getOfferTypeStyles}
                />
                {sortedOperations.length > ITEMS_PER_PAGE && (
                  <div className="py-4 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
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
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <OperationsTable 
                  operations={paginatedActiveOperations}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                  getOfferTypeLabel={getOfferTypeLabel}
                  getOfferTypeStyles={getOfferTypeStyles}
                />
                {activeOperations.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Não há operações em andamento no momento
                  </div>
                )}
                {activeOperations.length > ITEMS_PER_PAGE && (
                  <div className="py-4 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
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
