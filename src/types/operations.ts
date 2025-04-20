
export type OfferType = "d0" | "24x7" | "scheduled";

export interface Operation {
  id: string;
  type: string;
  asset: string;
  protection: string;
  status: string;
  offerType: OfferType;
  date: string;
  totalValue: string;
  clientCount: number;
  clients: Array<{
    name: string;
    cpf: string;
    value: string;
    status: string;
  }>;
}

export const getOfferTypeLabel = (offerType: OfferType): string => {
  const labels = {
    d0: "Em negociação em D0",
    "24x7": "Oferta 24x7",
    scheduled: "Oferta Agendada"
  };
  return labels[offerType];
};
