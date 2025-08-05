"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FarmerNextStepProps = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function FarmerNextStep({
  formData,
  setFormData,
}: FarmerNextStepProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label
          htmlFor="phoneNumber"
          className="text-sm text-[#158f20] font-[Inter]"
        >
          Phone Number
        </Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="e.g. +233XXXXXXXXX"
          className="h-10 border-[#D6DFBC] text-[#158f20] text-sm font-[Inter]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dob" className="text-sm text-[#158f20] font-[Inter]">
          Date of Birth
        </Label>
        <Input
          id="dob"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          className="h-10 border-[#D6DFBC] text-[#158f20] text-sm font-[Inter]"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="nationalID"
          className="text-sm text-[#158f20] font-[Inter]"
        >
          National ID Number
        </Label>
        <Input
          id="nationalID"
          name="nationalID"
          type="text"
          value={formData.nationalID}
          onChange={handleChange}
          placeholder="e.g. GHA-XXXX-XXXX"
          className="h-10 border-[#D6DFBC] text-[#158f20] text-sm font-[Inter]"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="country"
          className="text-sm text-[#158f20] font-[Inter]"
        >
          Country
        </Label>
        <Input
          id="country"
          name="country"
          type="text"
          value={formData.country}
          onChange={handleChange}
          placeholder="Ghana"
          className="h-10 border-[#D6DFBC] text-[#157148] text-sm font-[Inter]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="region" className="text-sm text-[#157148] font-[Inter]">
          Region
        </Label>
        <Input
          id="region"
          name="region"
          type="text"
          value={formData.region}
          onChange={handleChange}
          placeholder="Greater Accra"
          className="h-10 border-[#D6DFBC] text-[#157148] text-sm font-[Inter]"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="homeAddress"
          className="text-sm text-[#157148] font-[Inter]"
        >
          Home Address
        </Label>
        <Textarea
          id="homeAddress"
          name="homeAddress"
          value={formData.homeAddress}
          onChange={handleChange}
          placeholder="e.g. House No. 23, Agbogba Road, Madina"
          className="border-[#D6DFBC] text-[#157148] text-sm font-[Inter]"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="produce"
          className="text-sm text-[#157148] font-[Inter]"
        >
          Main Produce (comma separated)
        </Label>
        <Input
          id="produce"
          name="produce"
          type="text"
          value={formData.produce.join(", ")}
          onChange={(e) =>
            setFormData((prev: any) => ({
              ...prev,
              produce: e.target.value.split(",").map((item) => item.trim()),
            }))
          }
          placeholder="e.g. Tomatoes, Maize, Cassava"
          className="h-10 border-[#D6DFBC] text-[#157148] text-sm font-[Inter]"
        />
      </div>
    </div>
  );
}
