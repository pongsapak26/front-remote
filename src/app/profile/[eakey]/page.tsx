"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { editEakey } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface EaKey {
  trailing_fibo: string
  trailing_rang: string
  breakeven_trigger: string
  breakeven_rang: string
}
export default function Page() {
  // const { eakey } = params;
  const [loading, setloading] = useState<boolean>(false);

  const [data, setdata] = useState<EaKey>({
    trailing_fibo: "",
    trailing_rang: "",
    breakeven_trigger: "",
    breakeven_rang: "",
  });
  // if (!eakey) {
  //   notFound(); // หรือทำการจัดการกรณีที่ไม่มี eakey
  // }
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">Keyname</h1>
        <h1 className="text-2xl font-bold mb-4">
          EXP {new Date().toLocaleString()}
        </h1>
      </div>
      <div className="bg-gray-800 p-4 shadow-lg grid grid-cols-1 4 gap-4 mx-auto max-w-xl">
        <div>
          <Input
            type="text"
            name="trailing_fibo"
            placeholder="Trailing fibo"
            value={data.trailing_fibo}
            onChange={(e) =>
              setdata({ ...data, trailing_fibo: e.target.value })
            }
          />
        </div>
        <div>
          <Input
            type="text"
            name="trailing_rang"
            placeholder="Trailing rang"
            value={data.trailing_rang}
            onChange={(e) =>
              setdata({ ...data, trailing_rang: e.target.value })
            }
          />
        </div>
        <div>
          <Input
            type="text"
            name="breakeven_trigger"
            placeholder="Breakeven trigger"
            value={data.breakeven_trigger}
            onChange={(e) =>
              setdata({ ...data, breakeven_trigger: e.target.value })
            }
          />
        </div>
        <div>
          <Input
            type="text"
            name="breakeven_rang"
            placeholder="Breakeven rang"
            value={data.breakeven_rang}
            onChange={(e) =>
              setdata({ ...data, breakeven_rang: e.target.value })
            }
          />
        </div>
        <div>
          <Button
            type="button"
            label="Save"
            loading={loading}
            onClick={() => {
              editEakey(data,setloading);
            }}
          />
          <button
            onClick={() => {
              router.push(`/profile/`);
              // Handle save logic here
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 mt-4 cursor-pointer"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
