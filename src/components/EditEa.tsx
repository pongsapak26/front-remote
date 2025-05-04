"use client";
import Button from "@/components/Button";
import { ResEaKey } from "@/components/EakeyCard";
import Input from "@/components/Input";
import { aosall } from "@/lib/aos";
import { useState } from "react";

export interface EaKey {
  data: ResEaKey;
  handleChangeEakey: (data: ResEaKey) => void;
}

const EditEa = (props: EaKey) => {
//   const { eakey } = useParams<{ eakey: string }>();

  const [data, setdata] = useState<ResEaKey>(props.data);
  return (
    <div className="flex align-middle justify-center pt-10">
      <div
        {...aosall}
        className="bgbox p-4 shadow-lg grid grid-cols-1 4 gap-4 m-auto max-w-xl"
      >
        <div>
          <label className="">Name</label>
          <Input
            type="text"
            name="eaName"
            placeholder="Name"
            value={data.eaName}
            onChange={(e) => setdata({ ...data, eaName: e.target.value })}
          />
        </div>
        <div>
          <label className="">Account ID</label>
          <Input
            type="text"
            name="account"
            placeholder="Account ID"
            value={data.account}
            onChange={(e) => setdata({ ...data, account: e.target.value })}
          />
        </div>
        <div>
          <label className="">Trailing Trigger</label>
          <Input
            type="text"
            name="trailing_fibo"
            placeholder="Trailing trigger"
            value={data.trailingfibo}
            onChange={(e) => setdata({ ...data, trailingfibo: e.target.value })}
          />
        </div>
        <div>
          <label className="">Trailing Range</label>
          <Input
            type="text"
            name="trailing_rang"
            placeholder="Trailing rang"
            value={data.trailingrang}
            onChange={(e) => setdata({ ...data, trailingrang: e.target.value })}
          />
        </div>
        <div>
          <label className="">Breakeven Trigger</label>
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
          <label className="">Breakeven Range</label>
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
        <div className="justify-end flex pb-4">
          <div className="w-2/12">
            <Button
              type="button"
              label="Save"
              onClick={() => {
                props.handleChangeEakey(data);
              }}
              addicon="save"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEa;
