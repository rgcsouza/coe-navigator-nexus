
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, Calculator } from "lucide-react";

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

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetails = ({ product, onBack }: ProductDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          Voltar para lista
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Produto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">ID</Label>
              <Input id="id" value={product.id} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Input id="type" value={product.type} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="asset">Ativo</Label>
              <Input id="asset" value={product.asset} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="protection">Proteção</Label>
              <Input id="protection" value={product.protection} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="term">Prazo</Label>
              <Input id="term" value={product.term} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instrument">Instrumento</Label>
              <Input id="instrument" value={product.instrument} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="offerType">Tipo de Oferta</Label>
              <Input id="offerType" value={product.offerType} />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <Label htmlFor="formula">Fórmula de Rentabilidade</Label>
            </div>
            <Textarea 
              id="formula" 
              placeholder="Ex: prazo * quantidade * taxa 10%"
              value={product.formula || ""}
              className="font-mono"
            />
          </div>

          <div className="flex justify-end">
            <Button className="space-x-2">
              <Calculator className="h-4 w-4" />
              <span>Validar Fórmula</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
