import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Layout } from "./components/layout/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Operations from "./pages/Operations";
import Parameters from "./pages/Parameters";
import Templates from "./pages/Templates";
import History from "./pages/History";
import FileGeneration from "./pages/FileGeneration";
import OperationDetails from "./pages/OperationDetails";
import NotFound from "./pages/NotFound";
import ProductConfig from "./pages/ProductConfig";

import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route element={<Layout />}>
              <Route 
                path="/dashboard" 
                element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
              />
              <Route 
                path="/operations" 
                element={<ProtectedRoute><Operations /></ProtectedRoute>} 
              />
              <Route 
                path="/operation/:operationId" 
                element={<ProtectedRoute><OperationDetails /></ProtectedRoute>} 
              />
              <Route 
                path="/history" 
                element={<ProtectedRoute><History /></ProtectedRoute>} 
              />
              <Route 
                path="/parameters" 
                element={<ProtectedRoute><Parameters /></ProtectedRoute>} 
              />
              <Route 
                path="/templates" 
                element={<ProtectedRoute><Templates /></ProtectedRoute>} 
              />
              <Route 
                path="/file-generation" 
                element={<ProtectedRoute><FileGeneration /></ProtectedRoute>} 
              />
              <Route 
                path="/product-config" 
                element={<ProtectedRoute><ProductConfig /></ProtectedRoute>} 
              />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
