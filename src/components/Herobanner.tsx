import React from "react";

const Herobanner = () => {
  // const handleRegister = () => {
  //   router.push("/login"); // Redirect to login page if user is not authenticated
  // };
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* ข้อความตรงกลาง */}
      <div className="relative z-10 flex items-center justify-center h-full text-center">
        <img src={"/images/15031.jpg"} className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80">
        <div className="flex items-center justify-center flex-col h-full">
          <div className="text-white text-4xl px-4">
            Automate Your Success Powerful EA for Every Trader! test
          </div>
          <div className="mt-5">
            {/* <Button type="button" label="Let Go" onClick={handleRegister} /> */}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Herobanner;
