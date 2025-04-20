
import { CheckCircle, Clock, FileText, Send, AlertCircle, XCircle } from "lucide-react";
import React from "react";

export const getStatusBadge = (status: string) => {
  const statusStyles = {
    "Processado": "bg-green-100 text-green-800",
    "Em análise": "bg-blue-100 text-blue-800",
    "Em edição": "bg-amber-100 text-amber-800",
    "Enviado": "bg-purple-100 text-purple-800",
    "Rejeitado": "bg-red-100 text-red-800",
    "Cancelado": "bg-gray-100 text-gray-800"
  };
  
  return statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800";
};

export const getStatusIcon = (status: string) => {
  switch(status) {
    case "Processado":
      return function ProcessadoIcon() { return <CheckCircle className="h-5 w-5 text-green-600" />; };
    case "Em análise":
      return function AnaliseIcon() { return <Clock className="h-5 w-5 text-blue-600" />; };
    case "Em edição":
      return function EdicaoIcon() { return <FileText className="h-5 w-5 text-amber-600" />; };
    case "Enviado":
      return function EnviadoIcon() { return <Send className="h-5 w-5 text-purple-600" />; };
    case "Rejeitado":
      return function RejeitadoIcon() { return <AlertCircle className="h-5 w-5 text-red-600" />; };
    case "Cancelado":
      return function CanceladoIcon() { return <XCircle className="h-5 w-5 text-gray-600" />; };
    default:
      return function DefaultIcon() { return <FileText className="h-5 w-5 text-gray-600" />; };
  }
};
