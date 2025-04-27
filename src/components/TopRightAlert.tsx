// components/TopRightAlert.tsx
import { ReactNode } from "react";

interface TopRightAlertProps {
  message: string;
  icon?: ReactNode;
}

export default function TopRightAlert({ message, icon }: TopRightAlertProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-green-500 text-white px-4 py-2 shadow-lg animate-slide-in">
      {icon && <div className="text-xl">{icon}</div>}
      <span className="text-sm">{message}</span>
    </div>
  );
}
