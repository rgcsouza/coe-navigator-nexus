
export type OfferType = "d0" | "24x7" | "agendado";

export interface Operation {
  id: string;
  name?: string;
  type: string;
  asset: string;
  protection: string;
  status: string;
  offerType: OfferType;
  date?: string;
  creationDate?: string;
  maturityDate?: string;
  totalValue?: string;
  clientCount?: number;
  expectedReturn?: string;
  clients?: Array<{
    name: string;
    cpf?: string;
    document?: string;
    value: string;
    status: string;
  }>;
  value?: string;
  issuer?: string;
  additionalFields?: {
    observations: string;
    commercialConditions: string;
    legalNotes: string;
  };
}

export const getOfferTypeLabel = (offerType: OfferType): string => {
  const labels = {
    d0: "D0",
    "24x7": "24x7",
    agendado: "Agendado"
  };
  return labels[offerType];
};

export const getOfferTypeStyles = (offerType: OfferType): string => {
  const styles = {
    d0: "bg-[#FF8801] text-white",
    "24x7": "bg-[#FEC000] text-white",
    agendado: "bg-[#FEC000] text-white"
  };
  return styles[offerType];
};
