import React from "react";

const Footer = () => {
  return (
    <footer className="container mx-auto mt-10 text-slate-400 px-5 md:px-0 flex flex-col items-center justify-center relative">
      <div className="fixed right-9 bottom-6 hover:drop-shadow-2xl transition-all">
        <a href="http://m.me/61575087822954" target="_blank">
          <img className="w-10 hover:drop-shadow-lg transition-all" src="/images/Facebook.svg.png" alt="FB" />
        </a>
      </div>
      <div className="mt-32 text-sm">
        คำเตือนความเสี่ยง:
        เว็บไซต์นี้ให้บริการเฉพาะการควบคุมและตั้งค่าการทำงานของ EA
        เพื่อการเลื่อน Stop Loss อย่างปลอดภัยเท่านั้น
        ไม่ใช่การเสนอซื้อขายผลิตภัณฑ์ทางการเงินหรือคำแนะนำการลงทุนใด ๆ การใช้งาน
        EA อาจมีความเสี่ยงในการขาดทุนโดยขึ้นอยู่กับการตั้งค่าของผู้ใช้งาน
        โปรดศึกษาข้อมูลให้เข้าใจก่อนการใช้งาน ห้ามนำ EA
        หรือซอฟต์แวร์ที่เกี่ยวข้องไปจำหน่ายหรือเผยแพร่โดยไม่ได้รับอนุญาตอย่างเด็ดขาด
        การละเมิดอาจถูกดำเนินคดีตามกฎหมาย
        ข้อมูลและเนื้อหาบนเว็บไซต์นี้มีวัตถุประสงค์เพื่อการให้ข้อมูลเท่านั้น
        ไม่ถือเป็นการชักชวนหรือคำแนะนำในการลงทุน ข้อมูลทั้งหมดสงวนสิทธิ์
        และห้ามคัดลอกหรือเผยแพร่โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร
        การใช้บริการเว็บไซต์นี้ถือว่าคุณยอมรับข้อกำหนดและเงื่อนไขทั้งหมด
      </div>
      <div className="mt-10 mb-10 ">© Copyright 2025 AFK.</div>
    </footer>
  );
};

export default Footer;
