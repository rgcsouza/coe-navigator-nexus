
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for dashboard
const dashboardStats = [
  { title: "Operações Registradas", value: 124, change: "+5%", changeType: "positive" },
  { title: "Operações Pendentes", value: 8, change: "-2", changeType: "positive" },
  { title: "Templates Ativos", value: 15, change: "+3", changeType: "positive" },
  { title: "Arquivos Gerados", value: 97, change: "+12", changeType: "positive" },
];

// Mock recent operations
const recentOperations = [
  { id: "COE-2023-05-01", type: "Autocall", status: "Concluída", date: "2023-05-01", value: "R$ 1.250.000,00" },
  { id: "COE-2023-04-28", type: "Duplo Índice", status: "Concluída", date: "2023-04-28", value: "R$ 750.000,00" },
  { id: "COE-2023-04-27", type: "Autocall", status: "Concluída", date: "2023-04-27", value: "R$ 500.000,00" },
  { id: "COE-2023-04-25", type: "Capital Protegido", status: "Concluída", date: "2023-04-25", value: "R$ 1.000.000,00" },
];

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo, {user?.name}! Aqui está um resumo das operações COE.
        </p>
      </div>
      
      {/* Dashboard Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`text-sm ${stat.changeType === "positive" ? "text-green-500" : "text-red-500"}`}>
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Recent Operations */}
      <Card>
        <CardHeader>
          <CardTitle>Operações Recentes</CardTitle>
          <CardDescription>Operações COE registradas recentemente no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium">ID</th>
                  <th className="text-left py-3 px-2 font-medium">Tipo</th>
                  <th className="text-left py-3 px-2 font-medium">Status</th>
                  <th className="text-left py-3 px-2 font-medium">Data</th>
                  <th className="text-left py-3 px-2 font-medium">Valor</th>
                </tr>
              </thead>
              <tbody>
                {recentOperations.map((op, i) => (
                  <tr key={i} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-2 text-primary">{op.id}</td>
                    <td className="py-3 px-2">{op.type}</td>
                    <td className="py-3 px-2">
                      <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                        {op.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">{op.date}</td>
                    <td className="py-3 px-2 font-medium">{op.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
