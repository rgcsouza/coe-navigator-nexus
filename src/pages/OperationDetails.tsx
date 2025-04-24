import React, { useState } from "react";
import { mockOperationDetails } from "@/data/mockOperationDetails";
import { useOperation } from "@/hooks/useOperation";
import OperationDetailsHeader from "@/components/operations/OperationDetailsHeader";
import OperationStatusBanner from "@/components/operations/OperationStatusBanner";
import OperationMainDetails from "@/components/operations/OperationMainDetails";
import OperationSimulation from "@/components/operations/OperationSimulation";
import ClientDetailsTable from "@/components/dashboard/ClientDetailsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, CircleChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";

const OperationDetails = () => {
  const {
    operation,
    loading,
    additionalFields,
    canSendOperation,
    canCancelOperation,
    handleAdditionalFieldChange,
    handleSendOperation,
    handleCancelOperation
  } = useOperation({ initialOperation: mockOperationDetails });

  const handleStatusUpdate = (newStatus: string) => {
    if (handleSendOperation) {
      handleSendOperation();
    }
  };

  return (
    <div className="space-y-6">
      <OperationDetailsHeader />
      <OperationStatusBanner status={operation.status} />
      
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="details" className="flex-1">
            <CircleChevronDown className="mr-2 h-4 w-4" />
            Detalhes da Operação
          </TabsTrigger>
          <TabsTrigger value="simulation" className="flex-1">
            <ChevronDown className="mr-2 h-4 w-4" />
            Simulação de Estrutura
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <OperationMainDetails operation={operation} />
              {operation.clients && <ClientDetailsTable clients={operation.clients} />}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="simulation">
          <OperationSimulation 
            operation={operation}
            onStatusUpdate={handleStatusUpdate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OperationDetails;
