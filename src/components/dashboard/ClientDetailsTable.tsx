
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getStatusBadge } from "@/utils/statusHelpers";

interface Client {
  name: string;
  cpf?: string;
  document?: string;
  value: string;
  status: string;
}

interface ClientDetailsTableProps {
  clients: Client[];
}

const ClientDetailsTable = ({ clients }: ClientDetailsTableProps) => {
  return (
    <div className="bg-muted/30 p-4">
      <h4 className="font-medium mb-2">Detalhes dos Clientes</h4>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CPF/Documento</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client, clientIndex) => (
            <TableRow key={clientIndex}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.document || client.cpf || 'N/A'}</TableCell>
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
  );
};

export default ClientDetailsTable;
