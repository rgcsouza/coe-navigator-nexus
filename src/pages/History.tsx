
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, Search, File } from "lucide-react";
import { format } from "date-fns";

// Mock data for operation history
const mockHistory = [
  { 
    id: "COE-2023-05-01", 
    type: "Autocall", 
    asset: "IBOVESPA", 
    date: "2023-05-01", 
    value: "R$ 1.250.000,00",
    protection: "95%",
    status: "Registrado"
  },
  { 
    id: "COE-2023-04-28", 
    type: "Duplo Índice", 
    asset: "S&P 500 / IBOVESPA", 
    date: "2023-04-28", 
    value: "R$ 750.000,00",
    protection: "100%",
    status: "Registrado"
  },
  { 
    id: "COE-2023-04-27", 
    type: "Autocall", 
    asset: "NASDAQ", 
    date: "2023-04-27", 
    value: "R$ 500.000,00",
    protection: "90%",
    status: "Registrado" 
  },
  { 
    id: "COE-2023-04-25", 
    type: "Capital Protegido", 
    asset: "IBOVESPA", 
    date: "2023-04-25", 
    value: "R$ 1.000.000,00",
    protection: "100%",
    status: "Registrado"
  },
  { 
    id: "COE-2023-04-20", 
    type: "Call Digital", 
    asset: "Ouro", 
    date: "2023-04-20", 
    value: "R$ 350.000,00",
    protection: "95%",
    status: "Registrado" 
  },
];

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const filteredHistory = mockHistory.filter(op => 
    (searchTerm === "" || 
      op.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.asset.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!date || op.date === format(date, "yyyy-MM-dd"))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Histórico</h1>
        <p className="text-muted-foreground">
          Histórico de operações estruturadas registradas no sistema
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Buscar operações..."
            className="pl-9 pr-4 py-2 w-full rounded-md border border-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-auto justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "dd/MM/yyyy") : "Selecionar data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        {date && (
          <Button 
            variant="ghost"
            onClick={() => setDate(undefined)}
          >
            Limpar
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Operações Registradas</CardTitle>
          <CardDescription>
            Histórico completo de operações estruturadas registradas
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-center py-3 px-4 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((op, i) => (
                  <tr key={i} className="border-t hover:bg-muted/50">
                    <td className="py-3 px-4 text-primary">{op.id}</td>
                    <td className="py-3 px-4">{op.type}</td>
                    <td className="py-3 px-4">{op.asset}</td>
                    <td className="py-3 px-4">{op.protection}</td>
                    <td className="py-3 px-4">{op.date}</td>
                    <td className="py-3 px-4 font-medium">{op.value}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                        {op.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex justify-center">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <File className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredHistory.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                Nenhuma operação encontrada para os filtros aplicados
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
