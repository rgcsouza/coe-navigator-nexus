
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider
} from "@/components/ui/sidebar";
import { 
  Home, 
  File, 
  Settings, 
  Database, 
  User, 
  Calendar,
  FileDown
} from "lucide-react";

const customNavItems = [
  {
    label: "Produtos",
    items: [
      {
        name: "Configurações de Produtos",
        icon: Settings,
        path: "/product-config",
        roles: ["admin"]
      }
    ]
  }
];

const navigationItems = [
  {
    label: "Principal",
    items: [
      { 
        name: "Dashboard", 
        icon: Home, 
        path: "/dashboard",
        roles: ["admin", "operator"]
      },
      { 
        name: "Operações", 
        icon: File, 
        path: "/operations",
        roles: ["admin", "operator"]
      },
      { 
        name: "Histórico", 
        icon: Calendar, 
        path: "/history",
        roles: ["admin", "operator"] 
      },
      { 
        name: "Gerar Arquivos", 
        icon: FileDown, 
        path: "/file-generation",
        roles: ["admin", "operator"] 
      },
    ],
  },
  {
    label: "Configurações",
    items: [
      { 
        name: "Parâmetros", 
        icon: Database, 
        path: "/parameters",
        roles: ["admin"]
      },
      { 
        name: "Templates", 
        icon: File, 
        path: "/templates",
        roles: ["admin"]
      },
      { 
        name: "Usuários", 
        icon: User, 
        path: "/users",
        roles: ["admin"]
      },
      { 
        name: "Sistema", 
        icon: Settings, 
        path: "/system",
        roles: ["admin"]
      },
    ],
  },
];

export function AppSidebar() {
  const { user } = useAuth();
  const location = useLocation();
  
  const hasAccess = (roles: string[]) => {
    if (!user || !user.role) return false;
    return roles.includes(user.role.toLowerCase());
  };

  return (
    <SidebarContainer className="border-r" collapsible="none">
      <SidebarHeader className="flex justify-between items-center pb-2">
        <Link to="/dashboard" className="flex items-center space-x-1 px-4">
          <span className="font-bold text-accent">Estruturada</span>
          <span className="font-medium text-sm">Captação</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        {customNavItems.map((group, i) => (
          <SidebarGroup key={`custom${i}`}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.filter(item => hasAccess(item.roles)).map((item, j) => (
                  <SidebarMenuItem key={j}>
                    <SidebarMenuButton 
                      asChild
                      className={cn(
                        "flex items-center space-x-2",
                        location.pathname === item.path ? "bg-sidebar-accent text-accent font-medium" : ""
                      )}
                    >
                      <Link to={item.path}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        {navigationItems.map((group, i) => (
          <SidebarGroup key={i}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.filter(item => hasAccess(item.roles)).map((item, j) => (
                  <SidebarMenuItem key={j}>
                    <SidebarMenuButton 
                      asChild
                      className={cn(
                        "flex items-center space-x-2",
                        location.pathname === item.path ? "bg-sidebar-accent text-accent font-medium" : ""
                      )}
                    >
                      <Link to={item.path}>
                        <item.icon className="h-4 w-4" />
                        <span>
                          {item.name === "Operações" ? "Operações Estruturadas" : item.name}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </SidebarContainer>
  );
}
