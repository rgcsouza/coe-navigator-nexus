
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Eye, FileText } from "lucide-react";
import ClientDetailsTable from "./ClientDetailsTable";

interface Operation {
  id: string;
  type: string;
  asset: string;
  protection: string;
  status: string;
  date: string;
  totalValue: string;
  clientCount: number;
  clients: Array<{
    name: string;
    cpf: string;
    value: string;
    status: string;
  }>;
}

interface AggregatedOperationsTableProps {
  operations: Operation[];
  expandedOperation: string | null;
  onToggleOperation: (operationId: string) => void;
  onViewOperationDetails: (operationId: string) => void;
  getStatusBadge: (status: string) => string;
}

const AggregatedOperationsTable = ({
  operations,
  expandedOperation,
  onToggleOperation,
  onViewOperationDetails,
  getStatusBadge,
}: AggregatedOperationsTableProps) => {
  return (
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
        {operations.map((op) => (
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
                    onClick={() => onToggleOperation(op.id)}
                    className="p-0 h-8 w-8"
                  >
                    {expandedOperation === op.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-8 w-8"
                    onClick={() => onViewOperationDetails(op.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            {expandedOperation === op.id && (
              <TableRow>
                <TableCell colSpan={9} className="p-0">
                  <ClientDetailsTable clients={op.clients} getStatusBadge={getStatusBadge} />
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default AggregatedOperationsTable;
