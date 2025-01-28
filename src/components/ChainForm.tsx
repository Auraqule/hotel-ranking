import type React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type HotelChain, HotelChainSchema } from "../types";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

interface ChainFormProps {
  chain?: HotelChain;
  onSubmit: (data: HotelChain) => void;
}

const ChainForm: React.FC<ChainFormProps> = ({ chain, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HotelChain>({
    resolver: zodResolver(HotelChainSchema),
    defaultValues: chain || { id: "", name: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Chain Name</Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="name"
              placeholder="Enter chain name"
              className="w-full"
            />
          )}
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        {chain ? "Update Chain" : "Add Chain"}
      </Button>
    </form>
  );
};

export default ChainForm;
