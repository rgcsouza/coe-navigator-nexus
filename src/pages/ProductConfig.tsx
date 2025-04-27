
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ProductList } from "@/components/products/ProductList";
import { ProductDetails } from "@/components/products/ProductDetails";

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

const ProductConfig = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Configuração de Produtos</h1>
        <p className="text-muted-foreground">
          Gerencie os produtos e suas configurações
        </p>
      </div>

      {selectedProduct ? (
        <ProductDetails 
          product={selectedProduct}
          onBack={handleBackToList}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Lista de Produtos</CardTitle>
            <CardDescription>Produtos disponíveis para configuração</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductList onSelectProduct={handleSelectProduct} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductConfig;
