
interface Operation {
  id: string;
  type: string;
  asset: string;
  protection: string;
  date: string;
  value: string;
  [key: string]: string;
}

export const useOperationsSort = (operations: Operation[], sortField: string, sortDirection: string) => {
  return [...operations].sort((a, b) => {
    if (sortField === "value") {
      const valueA = parseFloat(a.value.replace(/[^0-9,-]/g, "").replace(",", "."));
      const valueB = parseFloat(b.value.replace(/[^0-9,-]/g, "").replace(",", "."));
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
    } else if (sortField === "date") {
      const dateA = new Date(a.date.split("-").reverse().join("-"));
      const dateB = new Date(b.date.split("-").reverse().join("-"));
      return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else {
      return sortDirection === "asc" 
        ? a[sortField].localeCompare(b[sortField]) 
        : b[sortField].localeCompare(a[sortField]);
    }
  });
};

