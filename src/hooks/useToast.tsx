import { useContext } from "react";
import { ToastContext } from "../context/toast/ToastContext";

export const useToast = () => useContext(ToastContext);