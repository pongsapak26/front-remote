"use client";
import Button from "@/components/Button";
import { ResEaKey } from "@/components/EakeyCard";
import Input from "@/components/Input";
import { aosall } from "@/lib/aos";
import { editEakey, getEaKeyById } from "@/lib/api";
import { showAlert } from "@/lib/sweetAlert";
import { X } from "lucide-react";
import { useRouter, useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";

export interface EaKey {
  trailing_fibo: string;
  trailing_rang: string;
  breakeven_trigger: string;
  breakeven_rang: string;
}
export default function Page() {
  const { eakey } = useParams<{ eakey: string }>();
  const [loading, setloading] = useState<boolean>(false);

  const [data, setdata] = useState<ResEaKey>({
    trailingfibo: "",
    trailingrang: "",
    breakeventrigger: "",
    breakevenrang: "",
    buyStart: "",
    buyEnd: "",
    sellStart: "",
    sellEnd: "",
    buylot: "",
    selllot: "",
    buylotlimit: "",
    selllotlimit: "",
    exp: new Date(),
    account: "",
    eaName: "",
    eaapiKey: "",
    id: "",
    type: "",
  });
  if (!eakey) {
    notFound(); // หรือทำการจัดการกรณีที่ไม่มี eakey
  }

  useEffect(() => {
    const fetchEakey = async () => {
      const res = await getEaKeyById(eakey);
      setdata(res.eakeys);
    };

    fetchEakey();
  }, []);

  const handleChange = async () => {
    try {
      const status = await editEakey(data, setloading, data.id);
      if (status) {
        showAlert("Success", status.message, "success");
        router.push("/profile"); // Redirect to profile page after successful login
      }
    } catch (error) {
      showAlert("Error", "Login failed" + error, "error");
    }
  };

  const fields = [
    {
      label: "Name",
      name: "eaName",
      placeholder: "Name",
      value: data.eaName,
      type: "all",
    },
    {
      label: "Account ID",
      name: "account",
      placeholder: "Account ID",
      value: data.account,
      type: "all",
    },
    {
      label: "Trailing trigger",
      name: "trailingfibo",
      placeholder: "Trailing trigger",
      value: data.trailingfibo,
      type: "sl",
    },
    {
      label: "Trailing rang",
      name: "trailingrang",
      placeholder: "Trailing rang",
      value: data.trailingrang,
      type: "sl",
    },
    {
      label: "Breakeven trigger",
      name: "breakeventrigger",
      placeholder: "Breakeven trigger",
      value: data.breakeventrigger,
      type: "sl",
    },
    {
      label: "Breakeven rang",
      name: "breakevenrang",
      placeholder: "Breakeven rang",
      value: data.breakevenrang,
      type: "sl",
    },
    {
      label: "Buy Start",
      name: "buyStart",
      placeholder: "Buy Start",
      value: data.buyStart,
      type: "rsi",
    },
    {
      label: "Buy End",
      name: "buyEnd",
      placeholder: "Buy End",
      value: data.buyEnd,
      type: "rsi",
    },
    {
      label: "Sell Start",
      name: "sellStart",
      placeholder: "Sell Start",
      value: data.sellStart,
      type: "rsi",
    },
    {
      label: "Sell End",
      name: "sellEnd",
      placeholder: "Sell End",
      value: data.sellEnd,
      type: "rsi",
    },
    {
      label: "Buy lot",
      name: "buylot",
      placeholder: "Buy lot",
      value: data.buylot,
      type: "rsi",
    },
    {
      label: "Sell lot",
      name: "selllot",
      placeholder: "Sell lot",
      value: data.selllot,
      type: "rsi",
    },
    {
      label: "Buy lot limit",
      name: "buylotlimit",
      placeholder: "Buy lot limit",
      value: data.buylotlimit,
      type: "rsi",
    },
    {
      label: "Sell lot limit",
      name: "selllotlimit",
      placeholder: "Sell lot limit",
      value: data.selllotlimit,
      type: "rsi",
    },
  ];

  const router = useRouter();
  return (
    <div className="flex align-middle justify-center pt-10">
      <div
        {...aosall}
        className="bgbox p-4 shadow-lg grid grid-cols-1 4 gap-4 m-auto max-w-xl"
      >
        <div className="flex justify-between items-center mb-2">
          <div className="text-3xl font-bold">Change Setting EA</div>
          <button
            onClick={() => {
              router.push(`/profile/`);
              // Handle save logic here
            }}
            className="transition-all hover:font-bold py-2 cursor-pointer"
          >
            <X />
          </button>
        </div>
        {fields.map((field, index) => {
          if(field.type === "all" || field.type === data.type){ 
            return (
              <div key={index}>
                <Input
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) =>
                    setdata({ ...data, [field.name]: e.target.value })
                  }
                />
              </div>
            );
          }
        })}
        <div className="justify-end flex pb-4">
          <div className="w-4/12">
            <Button
              type="button"
              label="Save"
              loading={loading}
              onClick={() => {
                handleChange();
              }}
              addicon="save"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
