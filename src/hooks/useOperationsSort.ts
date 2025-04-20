
import { Operation } from "@/types/operations";

export const useOperationsSort = (operations: Operation[], sortField: string, sortDirection: string) => {
  return [...operations].sort((a, b) => {
    if (sortField === "value" && a.value && b.value) {
      const valueA = parseFloat(a.value.replace(/[^0-9,-]/g, "").replace(",", "."));
      const valueB = parseFloat(b.value.replace(/[^0-9,-]/g, "").replace(",", "."));
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
    } else if (sortField === "date" && a.date && b.date) {
      const dateA = new Date(a.date.split("-").reverse().join("-"));
      const dateB = new Date(b.date.split("-").reverse().join("-"));
      return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else {
      const valA = a[sortField as keyof Operation] as string || "";
      const valB = b[sortField as keyof Operation] as string || "";
      return sortDirection === "asc" 
        ? valA.localeCompare(valB) 
        : valB.localeCompare(valA);
    }
  });
};
