
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Client {
  name: string;
  cpf: string;
  value: string;
  status: string;
}

interface ClientDetailsTableProps {
  clients: Client[];
  getStatusBadge: (status: string) => string;
}

const ClientDetailsTable = ({ clients, getStatusBadge }: ClientDetailsTableProps) => {
  return (
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
          {clients.map((client, clientIndex) => (
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
  );
};

export default ClientDetailsTable;
