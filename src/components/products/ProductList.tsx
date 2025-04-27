
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface Product {
  id: string;
  type: string;
  asset: string;
  protection: string;
  term: string;
  instrument: string;
  offerType: string;
  active: boolean;
  formula?: string;
}

interface ProductListProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const mockProducts: Product[] = [
  {
    id: "PROD-001",
    type: "Autocall",
    asset: "IBOVESPA",
    protection: "95%",
    term: "12 meses",
    instrument: "Call Européia",
    offerType: "d0",
    active: true,
    formula: "prazo * quantidade * 0.10"
  },
  {
    id: "PROD-002",
    type: "Capital Protegido",
    asset: "S&P 500",
    protection: "100%",
    term: "24 meses",
    instrument: "Call Européia",
    offerType: "24x7",
    active: true
  }
];

export const ProductList = ({ onSelectProduct }: ProductListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Ativo</TableHead>
          <TableHead>Proteção</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockProducts.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.type}</TableCell>
            <TableCell>{product.asset}</TableCell>
            <TableCell>{product.protection}</TableCell>
            <TableCell>
              <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                product.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}>
                {product.active ? "Ativo" : "Inativo"}
              </span>
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onSelectProduct(product)}
                className="hover:bg-accent"
              >
                <Info className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
