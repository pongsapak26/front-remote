"use client";
import Button from "@/components/Button";
import { ResEaKey } from "@/components/EakeyCard";
import Input from "@/components/Input";
import { aosall } from "@/lib/aos";
import { editEakey, getEaKeyById } from "@/lib/api";
import { showAlert } from "@/lib/sweetAlert";
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
    exp: new Date(),
    account: "",
    eaName: "",
    eaapiKey: "",
    _id: "",
  });
  if (!eakey) {
    notFound(); // หรือทำการจัดการกรณีที่ไม่มี eakey
  }

  useEffect(() => {
    const fetchEakey = async () => {
      const res = await getEaKeyById(eakey);
      setdata(res.eakey);
    };

    fetchEakey();
  }, []);

  const handleChange = async () => {
    try {
      const status = await editEakey(data, setloading, data._id);
      if (status) {
        showAlert("Success", status.message, "success");
        router.push("/profile"); // Redirect to profile page after successful login
      }
    } catch (error) {
      showAlert("Error", "Login failed" + error, "error");
    }
  };

  const router = useRouter();
  return (
      <div className="h-full flex align-middle justify-center">
        <div  {...aosall} className="bgbox p-4 shadow-lg grid grid-cols-1 4 gap-4 m-auto max-w-xl">
          <div>
            <label className="text-white">Name</label>
            <Input
              type="text"
              name="eaName"
              placeholder="Name"
              value={data.eaName}
              onChange={(e) => setdata({ ...data, eaName: e.target.value })}
            />
          </div>
          <div>
            <label className="text-white">Account ID</label>
            <Input
              type="text"
              name="account"
              placeholder="Account ID"
              value={data.account}
              onChange={(e) => setdata({ ...data, account: e.target.value })}
            />
          </div>
          <div>
            <label className="text-white">Trailing trigger</label>
            <Input
              type="text"
              name="trailing_fibo"
              placeholder="Trailing trigger"
              value={data.trailingfibo}
              onChange={(e) =>
                setdata({ ...data, trailingfibo: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-white">Trailing rang</label>
            <Input
              type="text"
              name="trailing_rang"
              placeholder="Trailing rang"
              value={data.trailingrang}
              onChange={(e) =>
                setdata({ ...data, trailingrang: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-white">Breakeven trigger</label>
            <Input
              type="text"
              name="breakeven_trigger"
              placeholder="Breakeven trigger"
              value={data.breakeventrigger}
              onChange={(e) =>
                setdata({ ...data, breakeventrigger: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-white">Breakeven rang</label>
            <Input
              type="text"
              name="breakeven_rang"
              placeholder="Breakeven rang"
              value={data.breakevenrang}
              onChange={(e) =>
                setdata({ ...data, breakevenrang: e.target.value })
              }
            />
          </div>
          <div>
            <Button
              type="button"
              label="Save"
              loading={loading}
              onClick={() => {
                handleChange();
              }}
            />
            <button
              onClick={() => {
                router.push(`/profile/`);
                // Handle save logic here
              }}
              className="w-full transition-all hover:font-bold btn-bgred text-white py-2 mt-4 cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      </div>
  );
}
