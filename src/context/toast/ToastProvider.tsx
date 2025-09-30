import React from "react";
import type { ReactNode } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ToastContext } from "./ToastContext";
import "react-toastify/dist/ReactToastify.css";

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const showToast = (
    message: string,
    type: "success" | "error" | "info" | "warning",
    duration = 3000
  ) => {
    toast[type](message, { autoClose: duration });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer
        position="top-center"
        aria-label="Notification messages"
      />
    </ToastContext.Provider>
  );
};
