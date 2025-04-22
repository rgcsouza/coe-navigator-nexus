
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Search, User, Settings, LogOut, Menu } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-primary text-primary-foreground py-3 px-4 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-4">
        {isAuthenticated && (
          <SidebarTrigger className="md:flex">
            <Menu className="h-6 w-6" />
          </SidebarTrigger>
        )}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-accent text-accent-foreground font-bold text-xl px-2 py-1 rounded">Estruturada</div>
          <span className="font-semibold text-lg hidden sm:inline">Sistema de Operações Estruturadas</span>
        </Link>
      </div>

      {isAuthenticated ? (
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar operações..."
              className="pl-9 pr-4 py-1 rounded-md bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 border-none focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="p-2 hover:bg-primary-foreground/10"
                aria-label="Perfil do usuário"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.role}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="flex items-center cursor-pointer text-destructive focus:text-destructive" 
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
