export function generateRandomText(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export function convertThaiToUTC(thaiDateString: string): Date {
  // ใช้ Date.parse เพื่อแปลงวันที่ไทยเป็น Date object
  const [thaiDate, time] = thaiDateString.split(","); // แยกวันที่และเวลา
  const [day, month, yearTH] = thaiDate.split("/").map((v) => parseInt(v));
  const [hour, minute, second] = time.split(":").map((v) => parseInt(v));

  // แปลงปี พ.ศ. เป็น ค.ศ.
  const year = yearTH;

  // สร้าง Date object โดยใช้ข้อมูลที่ได้
  const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));

  return date;
}
