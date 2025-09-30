import { createContext } from "react";

export interface ToastContextType {
  showToast: (
    message: string,
    type: "success" | "error" | "info" | "warning",
    duration?: number
  ) => void;
}

export const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});
