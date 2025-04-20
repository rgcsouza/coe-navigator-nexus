
export type OfferType = "d0" | "24x7" | "scheduled";

export interface Operation {
  id: string;
  type: string;
  asset: string;
  protection: string;
  status: string;
  offerType: OfferType;
  // Add missing properties
  date?: string;
  totalValue?: string;
  clientCount?: number;
  clients?: Array<{
    name: string;
    cpf?: string;
    document?: string;
    value: string;
    status: string;
  }>;
  value?: string;
  issuer?: string;
}

export const getOfferTypeLabel = (offerType: OfferType): string => {
  const labels = {
    d0: "D0",
    "24x7": "24x7",
    scheduled: "BookBuild"
  };
  return labels[offerType];
};

export const getOfferTypeStyles = (offerType: OfferType): string => {
  const styles = {
    d0: "bg-[#FF8801] text-white",
    "24x7": "bg-[#FEC000] text-white",
    scheduled: "bg-[#FEC000] text-white"
  };
  return styles[offerType];
};
