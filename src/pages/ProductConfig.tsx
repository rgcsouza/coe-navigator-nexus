
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Exemplos mockados
const mockIssuers = [
  { id: 1, name: "Banco ABC", active: true },
  { id: 2, name: "Banco XYZ", active: true }
];
const mockAssets = [
  { id: 1, name: "IBOVESPA", type: "Índice", active: true }
];
const mockProtectionTypes = [
  { id: 1, name: "Proteção Total", value: "100%", active: true },
  { id: 2, name: "Proteção Parcial", value: "95%", active: true }
];
const mockTerms = [
  { id: 1, name: "Curto Prazo", months: 6, active: true },
  { id: 2, name: "Longo Prazo", months: 24, active: true }
];
const mockInstruments = [
  { id: 1, name: "Call Européia", type: "Opção", underlying: "IBOVESPA", active: true },
  { id: 2, name: "Swap", type: "Swap", underlying: "USD/BRL", active: true }
];
const mockOfferTypes = [
  { type: "d0", label: "D0" },
  { type: "24x7", label: "24x7" },
  { type: "agendado", label: "Agendado" }
];

const ProductConfig = () => {
  const [tab, setTab] = useState("issuers");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Configuração de Produtos</h1>
      <p className="text-muted-foreground mb-6">
        Cadastre e vincule todos os elementos essenciais para estruturação de um certificado.
      </p>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="issuers">Emissores</TabsTrigger>
          <TabsTrigger value="assets">Ativos</TabsTrigger>
          <TabsTrigger value="protection">Proteção</TabsTrigger>
          <TabsTrigger value="terms">Prazos</TabsTrigger>
          <TabsTrigger value="instruments">Instrumentos</TabsTrigger>
          <TabsTrigger value="offerTypes">Tipos de Oferta</TabsTrigger>
        </TabsList>
        
        <TabsContent value="issuers">
          <Card>
            <CardHeader>
              <CardTitle>Emissores</CardTitle>
              <CardDescription>Instituições autorizadas para emissão</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockIssuers.map((issuer) => (
                    <TableRow key={issuer.id}>
                      <TableCell>{issuer.name}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${issuer.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {issuer.active ? "Ativo" : "Inativo"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assets">
          <Card>
            <CardHeader>
              <CardTitle>Ativos</CardTitle>
              <CardDescription>Ativos vinculados ao certificado</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAssets.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>{a.name}</TableCell>
                      <TableCell>{a.type}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${a.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {a.active ? "Ativo" : "Inativo"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protection">
          <Card>
            <CardHeader>
              <CardTitle>Proteção</CardTitle>
              <CardDescription>Tipos de proteção disponíveis</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockProtectionTypes.map(p => (
                    <TableRow key={p.id}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.value}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${p.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {p.active ? "Ativo" : "Inativo"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terms">
          <Card>
            <CardHeader>
              <CardTitle>Prazos</CardTitle>
              <CardDescription>Definição dos prazos de vencimento</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Meses</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTerms.map(t => (
                    <TableRow key={t.id}>
                      <TableCell>{t.name}</TableCell>
                      <TableCell>{t.months}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${t.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {t.active ? "Ativo" : "Inativo"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instruments">
          <Card>
            <CardHeader>
              <CardTitle>Instrumentos Derivativos</CardTitle>
              <CardDescription>Estruturas baseadas em opções</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Ativo Subjacente</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInstruments.map(inst => (
                    <TableRow key={inst.id}>
                      <TableCell>{inst.name}</TableCell>
                      <TableCell>{inst.type}</TableCell>
                      <TableCell>{inst.underlying}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${inst.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {inst.active ? "Ativo" : "Inativo"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="offerTypes">
          <Card>
            <CardHeader>
              <CardTitle>Tipos de Oferta</CardTitle>
              <CardDescription>Configure os tipos de oferta aceitos</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOfferTypes.map(o => (
                    <TableRow key={o.type}>
                      <TableCell>{o.type}</TableCell>
                      <TableCell>{o.label}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductConfig;
