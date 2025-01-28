import type React from "react";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Hotel, HotelSchema } from "../types";
import { useStore } from "../store/useStore";
import MapPicker from "./MapPicker";
import { useDetectUserLocation } from "../hooks/use-detect-location";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";

interface HotelFormProps {
  hotel?: Hotel;
  onSubmit: (data: Hotel) => void;
}

const HotelForm: React.FC<HotelFormProps> = ({ hotel, onSubmit }) => {
  const { chains } = useStore();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Hotel>({
    resolver: zodResolver(HotelSchema),
    defaultValues: hotel || {
      id: "",
      name: "",
      city: "",
      country: "",
      address: "",
      chainId: null,
      latitude: null,
      longitude: null,
    },
  });

  const { location } = useDetectUserLocation();

  useEffect(() => {
    if (location) {
      setValue("city", location.city);
      setValue("country", location.country);
      setValue("latitude", location.lat);
      setValue("longitude", location.lon);
    }
  }, [location, setValue]);

  return (
    <div>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{hotel ? "Update Hotel" : "Add New Hotel"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} id="name" placeholder="Hotel name" />
                  )}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="chainId">Hotel Chain</Label>
                <Controller
                  name="chainId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field?.value as string}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a chain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="independent">Independent</SelectItem>
                        {chains.map((chain) => (
                          <SelectItem key={chain.id} value={chain.id}>
                            {chain.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} id="city" placeholder="City" />
                  )}
                />
                {errors.city && (
                  <p className="text-sm text-red-600">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} id="country" placeholder="Country" />
                  )}
                />
                {errors.country && (
                  <p className="text-sm text-red-600">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="address" placeholder="Full address" />
                )}
              />
              {errors.address && (
                <p className="text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Controller
                name="latitude"
                control={control}
                render={({ field: latitudeField }) => (
                  <Controller
                    name="longitude"
                    control={control}
                    render={({ field: longitudeField }) => (
                      <MapPicker
                        latitude={latitudeField.value}
                        longitude={longitudeField.value}
                        location={location}
                        onLocationChange={(
                          lat,
                          lng,
                          address,
                          city,
                          country
                        ) => {
                          latitudeField.onChange(lat);
                          longitudeField.onChange(lng);
                          setValue("address", address);
                          setValue("city", city);
                          setValue("country", country);
                        }}
                      />
                    )}
                  />
                )}
              />

              {errors.latitude && (
                <p className="text-sm text-red-600">
                  {errors.latitude.message}
                </p>
              )}
              {errors.longitude && (
                <p className="text-sm text-red-600">
                  {errors.longitude.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              {hotel ? "Update Hotel" : "Add Hotel"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default HotelForm;
