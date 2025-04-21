
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-secondary to-background">
      <div className="container mx-auto flex-1 flex flex-col md:flex-row items-center justify-center px-4 py-12">
        <div className="md:w-1/2 md:pr-8 text-center md:text-left mb-8 md:mb-0">
          <div className="inline-block mb-4 rounded bg-primary px-3 py-1 text-sm text-primary-foreground">
            Sistema para negociação e gestão de Estruturada
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-primary">Estruturada</span> Captação <span className="text-accent">Nexus</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-muted-foreground">
            Registre operações Estruturadas, configure estruturas personalizadas e gere arquivos para envio à B3 conforme especificações.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={() => navigate("/login")}
            >
              <LogIn className="mr-2 h-4 w-4" /> Entrar no Sistema
            </Button>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-accent/20 rounded-xl transform rotate-3"></div>
            <div className="absolute inset-0 bg-primary/20 rounded-xl transform -rotate-3"></div>
            <div className="relative bg-card shadow-2xl rounded-xl p-6 border">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <div className="bg-accent text-accent-foreground font-bold text-lg px-2 py-1 rounded">Estruturada</div>
                  <h2 className="font-semibold">Dashboard</h2>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <div className="w-2 h-2 rounded-full bg-muted"></div>
                  <div className="w-2 h-2 rounded-full bg-muted"></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-3 grid-cols-2">
                  <div className="bg-muted rounded-md p-3">
                    <div className="text-sm text-muted-foreground">Operações Estruturadas</div>
                    <div className="text-2xl font-bold">124</div>
                  </div>
                  <div className="bg-muted rounded-md p-3">
                    <div className="text-sm text-muted-foreground">Templates</div>
                    <div className="text-2xl font-bold">15</div>
                  </div>
                </div>

                <div className="bg-muted rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">Operações Recentes</div>
                    <div className="text-xs text-muted-foreground">Ver todas</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <div className="text-sm">COE-2023-05-01</div>
                      <div className="text-sm">R$ 1.250.000,00</div>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <div className="text-sm">COE-2023-04-28</div>
                      <div className="text-sm">R$ 750.000,00</div>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <div className="text-sm">COE-2023-04-27</div>
                      <div className="text-sm">R$ 500.000,00</div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-md p-3 flex items-center">
                  <div className="w-3 h-3 bg-accent rounded-full mr-2"></div>
                  <div className="text-sm">Arquivo B3 gerado com sucesso</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <span className="text-lg font-bold text-primary mr-2">Estruturada</span>
                <span className="text-sm">Captação Nexus</span>
              </div>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Sistema para negociação e gestão de Estruturada
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Sobre
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contato
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Suporte
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
