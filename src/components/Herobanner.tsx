import React from "react";
import TextAnime from "./TextAnime";
import Button from "./Button";
import { useRouter } from "next/navigation";
import FadeInSection from "./FadeInSection";

const Herobanner = () => {
  const router = useRouter();
  const handleRegister = () => {
    router.push("/login"); // Redirect to login page if user is not authenticated
  };
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* วิดีโอ background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video/1128(1).mp4" type="video/mp4" />
        Your browser does not support HTML video.
      </video>
      {/* Overlay สำหรับมืดนิดๆ */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      {/* ข้อความตรงกลาง */}
      <div className="relative z-10 flex items-center justify-center h-full text-center">
        <FadeInSection>
          <div className="flex items-center justify-center flex-col">
            <div className="text-white px-4">
              <TextAnime text="Automate Your Success " />
              <TextAnime text="Powerful EA for Every Trader!" />
            </div>
            <div className="mt-5">
              <Button type="button" label="Let Go" onClick={handleRegister} />
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Herobanner;
