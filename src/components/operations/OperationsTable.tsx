
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, File, Settings } from "lucide-react";

interface Operation {
  id: string;
  type: string;
  asset: string;
  protection: string;
  date: string;
  value: string;
}

interface OperationsTableProps {
  operations: Operation[];
  sortField: string;
  sortDirection: string;
  onSort: (field: string) => void;
}

export const OperationsTable = ({
  operations,
  sortField,
  sortDirection,
  onSort,
}: OperationsTableProps) => {
  const navigate = useNavigate();

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? 
      <span className="ml-1">↑</span> : 
      <span className="ml-1">↓</span>;
  };

  const handleViewOperationDetails = (operationId: string) => {
    navigate(`/operation/${operationId}`);
  };

  return (
    <table className="w-full">
      <thead className="bg-muted/50">
        <tr>
          <th 
            className="text-left py-3 px-4 font-medium cursor-pointer"
            onClick={() => onSort("id")}
          >
            <div className="flex items-center">
              ID <SortIcon field="id" />
            </div>
          </th>
          <th 
            className="text-left py-3 px-4 font-medium cursor-pointer"
            onClick={() => onSort("type")}
          >
            <div className="flex items-center">
              Tipo <SortIcon field="type" />
            </div>
          </th>
          <th 
            className="text-left py-3 px-4 font-medium cursor-pointer"
            onClick={() => onSort("asset")}
          >
            <div className="flex items-center">
              Ativo <SortIcon field="asset" />
            </div>
          </th>
          <th 
            className="text-left py-3 px-4 font-medium cursor-pointer"
            onClick={() => onSort("protection")}
          >
            <div className="flex items-center">
              Proteção <SortIcon field="protection" />
            </div>
          </th>
          <th 
            className="text-left py-3 px-4 font-medium cursor-pointer"
            onClick={() => onSort("date")}
          >
            <div className="flex items-center">
              Data <SortIcon field="date" />
            </div>
          </th>
          <th 
            className="text-left py-3 px-4 font-medium cursor-pointer"
            onClick={() => onSort("value")}
          >
            <div className="flex items-center">
              Valor <SortIcon field="value" />
            </div>
          </th>
          <th className="text-center py-3 px-4 font-medium">Ações</th>
        </tr>
      </thead>
      <tbody>
        {operations.map((op, i) => (
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
  );
};

