import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash, Save, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for parameters
const mockIssuers = [
  { id: 1, name: "Banco ABC", active: true },
  { id: 2, name: "Banco XYZ", active: true },
  { id: 3, name: "Banco DEF", active: true },
];

const mockAssets = [
  { id: 1, name: "IBOVESPA", type: "Índice", active: true },
  { id: 2, name: "S&P 500", type: "Índice", active: true },
  { id: 3, name: "NASDAQ", type: "Índice", active: true },
  { id: 4, name: "EUR/USD", type: "Câmbio", active: true },
  { id: 5, name: "Ouro", type: "Commodity", active: true },
];

const mockProtectionTypes = [
  { id: 1, name: "Capital Protegido 100%", value: "100%", active: true },
  { id: 2, name: "Capital Protegido 98%", value: "98%", active: true },
  { id: 3, name: "Capital Protegido 95%", value: "95%", active: true },
  { id: 4, name: "Capital Protegido 90%", value: "90%", active: true },
];

const mockTerms = [
  { id: 1, name: "Curto Prazo", months: 6, active: true },
  { id: 2, name: "Médio Prazo", months: 12, active: true },
  { id: 3, name: "Longo Prazo", months: 24, active: true },
  { id: 4, name: "Muito Longo", months: 36, active: true },
];

// Mock data for instruments
const mockInstruments = [
  { id: 1, name: "Call Européia", type: "Opção", underlying: "IBOVESPA", active: true },
  { id: 2, name: "Put Européia", type: "Opção", underlying: "IBOVESPA", active: true },
  { id: 3, name: "Call Digital", type: "Opção", underlying: "S&P 500", active: true },
  { id: 4, name: "Call Spread", type: "Opção", underlying: "NASDAQ", active: true },
  { id: 5, name: "Put Spread", type: "Opção", underlying: "EUR/USD", active: true },
];

const Parameters = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";

  const [newIssuer, setNewIssuer] = useState("");
  const [newAssetName, setNewAssetName] = useState("");
  const [newAssetType, setNewAssetType] = useState("");
  const [newProtectionName, setNewProtectionName] = useState("");
  const [newProtectionValue, setNewProtectionValue] = useState("");
  const [newTermName, setNewTermName] = useState("");
  const [newTermMonths, setNewTermMonths] = useState<number | string>("");

  const [newInstrumentName, setNewInstrumentName] = useState("");
  const [newInstrumentType, setNewInstrumentType] = useState("");
  const [newInstrumentUnderlying, setNewInstrumentUnderlying] = useState("");
  const [instruments, setInstruments] = useState(mockInstruments);

  const [issuers, setIssuers] = useState(mockIssuers);
  const [assets, setAssets] = useState(mockAssets);
  const [protectionTypes, setProtectionTypes] = useState(mockProtectionTypes);
  const [terms, setTerms] = useState(mockTerms);

  const handleAddIssuer = () => {
    if (!newIssuer.trim()) return;
    
    const newIssuersArray = [
      ...issuers,
      { id: issuers.length + 1, name: newIssuer, active: true }
    ];
    setIssuers(newIssuersArray);
    setNewIssuer("");
  };

  const handleAddAsset = () => {
    if (!newAssetName.trim() || !newAssetType.trim()) return;
    
    const newAssetsArray = [
      ...assets,
      { id: assets.length + 1, name: newAssetName, type: newAssetType, active: true }
    ];
    setAssets(newAssetsArray);
    setNewAssetName("");
    setNewAssetType("");
  };

  const handleAddProtection = () => {
    if (!newProtectionName.trim() || !newProtectionValue.trim()) return;
    
    const newProtectionsArray = [
      ...protectionTypes,
      { id: protectionTypes.length + 1, name: newProtectionName, value: newProtectionValue, active: true }
    ];
    setProtectionTypes(newProtectionsArray);
    setNewProtectionName("");
    setNewProtectionValue("");
  };

  const handleAddTerm = () => {
    if (!newTermName.trim() || !newTermMonths) return;
    
    const months = typeof newTermMonths === 'string' ? parseInt(newTermMonths, 10) : newTermMonths;
    
    const newTermsArray = [
      ...terms,
      { id: terms.length + 1, name: newTermName, months: months, active: true }
    ];
    setTerms(newTermsArray);
    setNewTermName("");
    setNewTermMonths("");
  };

  const handleAddInstrument = () => {
    if (!newInstrumentName.trim() || !newInstrumentType.trim() || !newInstrumentUnderlying.trim()) return;
    
    const newInstrumentsArray = [
      ...instruments,
      { 
        id: instruments.length + 1,
        name: newInstrumentName, 
        type: newInstrumentType, 
        underlying: newInstrumentUnderlying,
        active: true 
      }
    ];
    setInstruments(newInstrumentsArray);
    setNewInstrumentName("");
    setNewInstrumentType("");
    setNewInstrumentUnderlying("");
  };

  const handleRemoveIssuer = (id: number) => {
    setIssuers(issuers.filter(issuer => issuer.id !== id));
  };

  const handleRemoveAsset = (id: number) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  const handleRemoveProtection = (id: number) => {
    setProtectionTypes(protectionTypes.filter(protection => protection.id !== id));
  };

  const handleRemoveTerm = (id: number) => {
    setTerms(terms.filter(term => term.id !== id));
  };

  const handleRemoveInstrument = (id: number) => {
    setInstruments(instruments.filter(instrument => instrument.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Parâmetros</h1>
        <p className="text-muted-foreground">
          Configure os parâmetros utilizados nas operações COE
        </p>
      </div>

      <Tabs defaultValue="issuers" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="issuers">Emissores</TabsTrigger>
          <TabsTrigger value="assets">Ativos</TabsTrigger>
          <TabsTrigger value="protection">Proteção</TabsTrigger>
          <TabsTrigger value="terms">Prazos</TabsTrigger>
          <TabsTrigger value="instruments">Instrumentos</TabsTrigger>
        </TabsList>

        {/* Issuers Tab */}
        <TabsContent value="issuers" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Emissores</CardTitle>
              <CardDescription>
                Configure os emissores disponíveis para registro de operações COE
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isAdmin && (
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Nome do Emissor
                      </label>
                      <Input
                        placeholder="Adicione um novo emissor"
                        value={newIssuer}
                        onChange={(e) => setNewIssuer(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddIssuer} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      <span>Adicionar</span>
                    </Button>
                  </div>
                )}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Status</TableHead>
                      {isAdmin && <TableHead className="w-[100px]">Ações</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {issuers.map((issuer) => (
                      <TableRow key={issuer.id}>
                        <TableCell>{issuer.name}</TableCell>
                        <TableCell>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${issuer.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {issuer.active ? "Ativo" : "Inativo"}
                          </span>
                        </TableCell>
                        {isAdmin && (
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveIssuer(issuer.id)}
                              >
                                <Trash className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                    {issuers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={isAdmin ? 3 : 2} className="text-center py-4 text-muted-foreground">
                          Nenhum emissor cadastrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                {isAdmin && (
                  <div className="flex justify-end mt-4">
                    <Button className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      <span>Salvar Alterações</span>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assets Tab */}
        <TabsContent value="assets" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Ativos</CardTitle>
              <CardDescription>
                Configure os ativos disponíveis para as operações COE
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isAdmin && (
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Nome do Ativo
                      </label>
                      <Input
                        placeholder="Nome do ativo"
                        value={newAssetName}
                        onChange={(e) => setNewAssetName(e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Tipo
                      </label>
                      <Input
                        placeholder="Tipo do ativo"
                        value={newAssetType}
                        onChange={(e) => setNewAssetType(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddAsset} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      <span>Adicionar</span>
                    </Button>
                  </div>
                )}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Status</TableHead>
                      {isAdmin && <TableHead className="w-[100px]">Ações</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assets.map((asset) => (
                      <TableRow key={asset.id}>
                        <TableCell>{asset.name}</TableCell>
                        <TableCell>{asset.type}</TableCell>
                        <TableCell>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${asset.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {asset.active ? "Ativo" : "Inativo"}
                          </span>
                        </TableCell>
                        {isAdmin && (
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveAsset(asset.id)}
                              >
                                <Trash className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                    {assets.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={isAdmin ? 4 : 3} className="text-center py-4 text-muted-foreground">
                          Nenhum ativo cadastrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                {isAdmin && (
                  <div className="flex justify-end mt-4">
                    <Button className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      <span>Salvar Alterações</span>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Protection Tab */}
        <TabsContent value="protection" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Tipos de Proteção</CardTitle>
              <CardDescription>
                Configure os tipos de proteção de capital disponíveis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isAdmin && (
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Nome da Proteção
                      </label>
                      <Input
                        placeholder="Nome da proteção"
                        value={newProtectionName}
                        onChange={(e) => setNewProtectionName(e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Valor (%)
                      </label>
                      <Input
                        placeholder="Ex: 95%"
                        value={newProtectionValue}
                        onChange={(e) => setNewProtectionValue(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddProtection} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      <span>Adicionar</span>
                    </Button>
                  </div>
                )}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      {isAdmin && <TableHead className="w-[100px]">Ações</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {protectionTypes.map((protection) => (
                      <TableRow key={protection.id}>
                        <TableCell>{protection.name}</TableCell>
                        <TableCell>{protection.value}</TableCell>
                        <TableCell>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${protection.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {protection.active ? "Ativo" : "Inativo"}
                          </span>
                        </TableCell>
                        {isAdmin && (
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveProtection(protection.id)}
                              >
                                <Trash className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                    {protectionTypes.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={isAdmin ? 4 : 3} className="text-center py-4 text-muted-foreground">
                          Nenhuma proteção cadastrada
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                {isAdmin && (
                  <div className="flex justify-end mt-4">
                    <Button className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      <span>Salvar Alterações</span>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Terms Tab */}
        <TabsContent value="terms" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Prazos</CardTitle>
              <CardDescription>
                Configure os prazos disponíveis para operações COE
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isAdmin && (
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Nome do Prazo
                      </label>
                      <Input
                        placeholder="Nome do prazo"
                        value={newTermName}
                        onChange={(e) => setNewTermName(e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Meses
                      </label>
                      <Input
                        type="number"
                        placeholder="Duração em meses"
                        value={newTermMonths}
                        onChange={(e) => setNewTermMonths(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddTerm} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      <span>Adicionar</span>
                    </Button>
                  </div>
                )}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Meses</TableHead>
                      <TableHead>Status</TableHead>
                      {isAdmin && <TableHead className="w-[100px]">Ações</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {terms.map((term) => (
                      <TableRow key={term.id}>
                        <TableCell>{term.name}</TableCell>
                        <TableCell>{term.months}</TableCell>
                        <TableCell>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${term.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {term.active ? "Ativo" : "Inativo"}
                          </span>
                        </TableCell>
                        {isAdmin && (
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveTerm(term.id)}
                              >
                                <Trash className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                    {terms.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={isAdmin ? 4 : 3} className="text-center py-4 text-muted-foreground">
                          Nenhum prazo cadastrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                {isAdmin && (
                  <div className="flex justify-end mt-4">
                    <Button className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      <span>Salvar Alterações</span>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Instruments Tab */}
        <TabsContent value="instruments" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Instrumentos Derivativos</CardTitle>
              <CardDescription>
                Configure os instrumentos derivativos disponíveis para estruturação de COE
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isAdmin && (
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Nome do Instrumento
                      </label>
                      <Input
                        placeholder="Nome do instrumento"
                        value={newInstrumentName}
                        onChange={(e) => setNewInstrumentName(e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Tipo
                      </label>
                      <Select
                        value={newInstrumentType}
                        onValueChange={setNewInstrumentType}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Opção">Opção</SelectItem>
                          <SelectItem value="Swap">Swap</SelectItem>
                          <SelectItem value="Forward">Forward</SelectItem>
                          <SelectItem value="Outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Ativo Subjacente
                      </label>
                      <Select
                        value={newInstrumentUnderlying}
                        onValueChange={setNewInstrumentUnderlying}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o ativo" />
                        </SelectTrigger>
                        <SelectContent>
                          {assets.map(asset => (
                            <SelectItem key={asset.id} value={asset.name}>
                              {asset.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddInstrument} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      <span>Adicionar</span>
                    </Button>
                  </div>
                )}
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Ativo Subjacente</TableHead>
                      <TableHead>Status</TableHead>
                      {isAdmin && <TableHead className="w-[100px]">Ações</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {instruments.map((instrument) => (
                      <TableRow key={instrument.id}>
                        <TableCell>{instrument.name}</TableCell>
                        <TableCell>{instrument.type}</TableCell>
                        <TableCell>{instrument.underlying}</TableCell>
                        <TableCell>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${instrument.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {instrument.active ? "Ativo" : "Inativo"}
                          </span>
                        </TableCell>
                        {isAdmin && (
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveInstrument(instrument.id)}
                              >
                                <Trash className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                    {instruments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={isAdmin ? 5 : 4} className="text-center py-4 text-muted-foreground">
                          Nenhum instrumento cadastrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                
                {isAdmin && (
                  <div className="flex justify-end mt-4">
                    <Button className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      <span>Salvar Alterações</span>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Parameters;
