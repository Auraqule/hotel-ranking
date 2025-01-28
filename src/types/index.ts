import { z } from "zod";

export const HotelChainSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Chain name is required"),
});

export const HotelSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Hotel name is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  address: z.string().min(1, "Address is required"),
  chainId: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
});

export type HotelChain = z.infer<typeof HotelChainSchema>;
export type Hotel = z.infer<typeof HotelSchema>;
