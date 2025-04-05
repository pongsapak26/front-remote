import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

type Props = {
  data: string;
};

const EakeyCard = ({ data }: Props) => {
  const router = useRouter();
  const handleNavigate = (slug:string) => {
    router.push(`/profile/${slug}`); // นำทางไปยังหน้า /profile/test
  };
  return (
    <div className="bg-gray-900 text-white">
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-4">Eakey Name</h1>
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg">trailing fibo </p>
          <p>{data}</p>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg">trailing rang </p>
          <p>{data}</p>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg">breakeven trigge </p>
          <p>{data}</p>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg">breakeven rang </p>
          <p>{data}</p>
        </div>
        <Button
          type="button"
          label="Edit Eakey"
          onClick={()=>handleNavigate('test')} // Navigate to /profile/test
        />
      </div>
    </div>
  );
};

export default EakeyCard;
