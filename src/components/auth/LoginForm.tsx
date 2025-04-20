
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { LogIn } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro durante o login");
    }
  };
  
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <div className="bg-primary text-primary-foreground p-3 rounded-full">
            <LogIn className="h-6 w-6" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">Sistema COE</CardTitle>
        <CardDescription className="text-center">
          Faça login para acessar o sistema
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-destructive/10 p-3 rounded-md border border-destructive text-destructive text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <a href="#" className="text-xs text-accent hover:text-accent/80">
                Esqueceu sua senha?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </CardFooter>
      </form>
      
      <div className="px-6 pb-6 text-center text-sm text-muted-foreground">
        <p>Use estas credenciais para teste:</p>
        <div className="mt-2 grid grid-cols-2 gap-1 text-xs bg-secondary p-2 rounded">
          <div className="font-semibold">Administrador:</div>
          <div>admin@example.com / admin123</div>
          <div className="font-semibold">Operador:</div>
          <div>operator@example.com / operator123</div>
        </div>
      </div>
    </Card>
  );
}
