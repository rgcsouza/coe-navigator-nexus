
import React from "react";
import { mockOperationDetails } from "@/data/mockOperationDetails";
import { useOperation } from "@/hooks/useOperation";
import OperationDetailsHeader from "@/components/operations/OperationDetailsHeader";
import OperationStatusBanner from "@/components/operations/OperationStatusBanner";
import OperationMainDetails from "@/components/operations/OperationMainDetails";
import OperationPayoffChart from "@/components/operations/OperationPayoffChart";
import OperationAdditionalFields from "@/components/operations/OperationAdditionalFields";
import ClientDetailsTable from "@/components/dashboard/ClientDetailsTable";

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

  return (
    <div className="space-y-6">
      <OperationDetailsHeader />
      <OperationStatusBanner status={operation.status} />
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <OperationMainDetails operation={operation} />
          <ClientDetailsTable clients={operation.clients} />
        </div>
        
        <div>
          <OperationPayoffChart 
            operationType={operation.type} 
            className="h-[300px] w-full" 
          />
        </div>
      </div>

      <OperationAdditionalFields
        fields={additionalFields}
        canSendOperation={canSendOperation}
        canCancelOperation={canCancelOperation}
        loading={loading}
        onFieldChange={handleAdditionalFieldChange}
        onSendOperation={handleSendOperation}
        onCancelOperation={handleCancelOperation}
      />
    </div>
  );
};

export default OperationDetails;
