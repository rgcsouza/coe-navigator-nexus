import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, Plus, ArrowDown, ArrowUp, File, Settings, Eye } from "lucide-react";

const mockOperations = [
  { 
    id: "COE-2023-05-01", 
    type: "Autocall", 
    asset: "IBOVESPA", 
    issuer: "Banco ABC", 
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
    date: "2023-04-15", 
    value: "R$ 1.500.000,00",
    protection: "98%" 
  },
];

const Operations = () => {
  const navigate = useNavigate();
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

  const sortedOperations = [...mockOperations].sort((a, b) => {
    if (sortField === "value") {
      const valueA = parseFloat(a.value.replace(/[^0-9,-]/g, "").replace(",", "."));
      const valueB = parseFloat(b.value.replace(/[^0-9,-]/g, "").replace(",", "."));
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
    } else if (sortField === "date") {
      const dateA = new Date(a.date.split("-").reverse().join("-"));
      const dateB = new Date(b.date.split("-").reverse().join("-"));
      return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else {
      const fieldA = a[sortField as keyof typeof a];
      const fieldB = b[sortField as keyof typeof b];
      return sortDirection === "asc" 
        ? fieldA.localeCompare(fieldB) 
        : fieldB.localeCompare(fieldA);
    }
  });

  const filteredOperations = sortedOperations.filter(op => 
    op.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? 
      <ArrowUp className="w-3 h-3 ml-1" /> : 
      <ArrowDown className="w-3 h-3 ml-1" />;
  };
  
  const handleViewOperationDetails = (operationId: string) => {
    navigate(`/operation/${operationId}`);
  };

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
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar operações..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Todos os tipos</DropdownMenuItem>
                <DropdownMenuItem>Autocall</DropdownMenuItem>
                <DropdownMenuItem>Capital Protegido</DropdownMenuItem>
                <DropdownMenuItem>Duplo Índice</DropdownMenuItem>
                <DropdownMenuItem>Call Digital</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Nova Operação</span>
            </Button>
          </div>
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
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th 
                        className="text-left py-3 px-4 font-medium cursor-pointer"
                        onClick={() => handleSort("id")}
                      >
                        <div className="flex items-center">
                          ID <SortIcon field="id" />
                        </div>
                      </th>
                      <th 
                        className="text-left py-3 px-4 font-medium cursor-pointer"
                        onClick={() => handleSort("type")}
                      >
                        <div className="flex items-center">
                          Tipo <SortIcon field="type" />
                        </div>
                      </th>
                      <th 
                        className="text-left py-3 px-4 font-medium cursor-pointer"
                        onClick={() => handleSort("asset")}
                      >
                        <div className="flex items-center">
                          Ativo <SortIcon field="asset" />
                        </div>
                      </th>
                      <th 
                        className="text-left py-3 px-4 font-medium cursor-pointer"
                        onClick={() => handleSort("protection")}
                      >
                        <div className="flex items-center">
                          Proteção <SortIcon field="protection" />
                        </div>
                      </th>
                      <th 
                        className="text-left py-3 px-4 font-medium cursor-pointer"
                        onClick={() => handleSort("date")}
                      >
                        <div className="flex items-center">
                          Data <SortIcon field="date" />
                        </div>
                      </th>
                      <th 
                        className="text-left py-3 px-4 font-medium cursor-pointer"
                        onClick={() => handleSort("value")}
                      >
                        <div className="flex items-center">
                          Valor <SortIcon field="value" />
                        </div>
                      </th>
                      <th className="text-center py-3 px-4 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOperations.map((op, i) => (
                      <tr key={i} className="border-t hover:bg-muted/50">
                        <td className="py-3 px-4 text-primary">{op.id}</td>
                        <td className="py-3 px-4">{op.type}</td>
                        <td className="py-3 px-4">{op.asset}</td>
                        <td className="py-3 px-4">{op.protection}</td>
                        <td className="py-3 px-4">{op.date}</td>
                        <td className="py-3 px-4 font-medium">{op.value}</td>
                        <td className="py-2 px-4">
                          <div className="flex justify-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleViewOperationDetails(op.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <File className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredOperations.length === 0 && (
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
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">ID</th>
                      <th className="text-left py-3 px-4 font-medium">Tipo</th>
                      <th className="text-left py-3 px-4 font-medium">Ativo</th>
                      <th className="text-left py-3 px-4 font-medium">Proteção</th>
                      <th className="text-left py-3 px-4 font-medium">Data</th>
                      <th className="text-left py-3 px-4 font-medium">Valor</th>
                      <th className="text-center py-3 px-4 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOperations.map((op, i) => (
                      <tr key={i} className="border-t hover:bg-muted/50">
                        <td className="py-3 px-4 text-primary">{op.id}</td>
                        <td className="py-3 px-4">{op.type}</td>
                        <td className="py-3 px-4">{op.asset}</td>
                        <td className="py-3 px-4">{op.protection}</td>
                        <td className="py-3 px-4">{op.date}</td>
                        <td className="py-3 px-4 font-medium">{op.value}</td>
                        <td className="py-2 px-4">
                          <div className="flex justify-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0" 
                              onClick={() => handleViewOperationDetails(op.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <File className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Operations;
