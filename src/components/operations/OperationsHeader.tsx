
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, Plus } from "lucide-react";

interface OperationsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const OperationsHeader = ({
  searchTerm,
  onSearchChange,
}: OperationsHeaderProps) => {
  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar operações..."
          className="pl-8 w-full"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
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
  );
};

