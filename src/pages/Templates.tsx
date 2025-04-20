
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileUp, File, Trash, Settings } from "lucide-react";

// Mock template data
const mockTemplates = [
  { 
    id: 1, 
    name: "Autocall Padrão", 
    description: "Template padrão para operações Autocall",
    lastModified: "15/04/2023", 
    createdBy: "Admin" 
  },
  { 
    id: 2, 
    name: "Capital Protegido", 
    description: "Template para operações com proteção de capital",
    lastModified: "20/03/2023", 
    createdBy: "Admin" 
  },
  { 
    id: 3, 
    name: "Duplo Índice", 
    description: "Template para operações com dois índices",
    lastModified: "10/02/2023", 
    createdBy: "Admin" 
  },
];

const Templates = () => {
  const [selectedTab, setSelectedTab] = useState("list");
  const [templates, setTemplates] = useState(mockTemplates);
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [templateJson, setTemplateJson] = useState("{\n  \"name\": \"\",\n  \"type\": \"coe\",\n  \"fields\": [],\n  \"validations\": []\n}");
  
  const handleCreateTemplate = () => {
    if (!templateName.trim()) return;
    
    const newTemplate = {
      id: templates.length + 1,
      name: templateName,
      description: templateDescription,
      lastModified: new Date().toLocaleDateString(),
      createdBy: "Admin"
    };
    
    setTemplates([...templates, newTemplate]);
    setTemplateName("");
    setTemplateDescription("");
    setTemplateJson("{\n  \"name\": \"\",\n  \"type\": \"coe\",\n  \"fields\": [],\n  \"validations\": []\n}");
    setSelectedTab("list");
  };
  
  const handleDeleteTemplate = (id: number) => {
    setTemplates(templates.filter(template => template.id !== id));
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
        <p className="text-muted-foreground">
          Gerencie templates para operações COE
        </p>
      </div>
      
      <Tabs 
        value={selectedTab} 
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="list">Lista de Templates</TabsTrigger>
            <TabsTrigger value="create">Criar Template</TabsTrigger>
            <TabsTrigger value="upload">Importar Template</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="list" className="m-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Templates Disponíveis</CardTitle>
              <CardDescription>
                Templates configurados para utilização em operações COE
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Última Modificação</TableHead>
                    <TableHead>Criado por</TableHead>
                    <TableHead className="w-[100px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>{template.description}</TableCell>
                      <TableCell>{template.lastModified}</TableCell>
                      <TableCell>{template.createdBy}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteTemplate(template.id)}
                          >
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {templates.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                        Nenhum template cadastrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="create" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Criar Novo Template</CardTitle>
              <CardDescription>
                Configure um novo template para operações COE
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome do Template</label>
                <Input 
                  placeholder="Ex: Autocall Padrão" 
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição</label>
                <Textarea 
                  placeholder="Descreva o template e sua finalidade" 
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Configuração (JSON)</label>
                <Textarea 
                  className="font-mono h-64"
                  placeholder="Configure o template em formato JSON" 
                  value={templateJson}
                  onChange={(e) => setTemplateJson(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => setSelectedTab("list")}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleCreateTemplate}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                <span>Criar Template</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="upload" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Importar Template</CardTitle>
              <CardDescription>
                Importe um arquivo JSON ou YAML contendo a configuração do template
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-muted rounded-lg p-10 text-center">
                <div className="flex justify-center mb-4">
                  <FileUp className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium">
                    Arraste e solte o arquivo ou clique para selecionar
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Formatos suportados: JSON, YAML
                  </p>
                </div>
                <Input 
                  type="file" 
                  className="hidden" 
                  id="template-upload" 
                  accept=".json,.yaml,.yml" 
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => setSelectedTab("list")}
              >
                Cancelar
              </Button>
              <Button className="flex items-center gap-2">
                <FileUp className="h-4 w-4" />
                <span>Importar Template</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Templates;
