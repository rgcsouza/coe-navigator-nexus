
import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SimulationFormValues } from "@/hooks/useSimulationForm";
import { UseFormReturn } from "react-hook-form";

interface SimulationFormProps {
  form: UseFormReturn<SimulationFormValues>;
  operationType: string;
  onSubmit: (values: SimulationFormValues) => void;
}

const SimulationForm = ({ form, operationType, onSubmit }: SimulationFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="entryPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço de Entrada*</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="exitPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço de Saída Desejado*</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade*</FormLabel>
                <FormControl>
                  <Input type="number" step="1" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Taxa de Juros (%)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="0.0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {operationType.toLowerCase().includes('opção') && (
            <FormField
              control={form.control}
              name="volatility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Volatilidade (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" placeholder="0.0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <Button type="submit" className="mt-4">Calcular Simulação</Button>
      </form>
    </Form>
  );
};

export default SimulationForm;
