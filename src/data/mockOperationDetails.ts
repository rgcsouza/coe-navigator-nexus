
import { OfferType } from "@/types/operations";

export const mockOperationDetails = {
  id: "COE-2023-05-01",
  name: "Autocall IBOVESPA Q2 2023",
  type: "Autocall", 
  asset: "IBOVESPA", 
  protection: "95%",
  status: "Em edição",
  creationDate: "01/05/2023",
  maturityDate: "01/05/2025",
  totalValue: "R$ 1.250.000,00",
  issuer: "Banco ABC",
  offerType: "agendado" as OfferType, // Changed from "scheduled" to "agendado"
  clients: [
    { name: "Cliente A", document: "123.456.789-00", value: "R$ 500.000,00", status: "Em edição" },
    { name: "Cliente B", document: "987.654.321-00", value: "R$ 300.000,00", status: "Em edição" },
    { name: "Cliente C", document: "456.789.123-00", value: "R$ 200.000,00", status: "Em edição" },
    { name: "Cliente D", document: "789.123.456-00", value: "R$ 150.000,00", status: "Em edição" },
    { name: "Cliente E", document: "321.654.987-00", value: "R$ 100.000,00", status: "Em edição" }
  ],
  additionalFields: {
    observations: "",
    commercialConditions: "",
    legalNotes: ""
  }
};
