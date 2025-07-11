// notification.js
import { toast } from "react-hot-toast";

export const toastSuccess = (msg = "Success!") =>
  toast.success(msg, {
    position: "bottom-right",
    duration: 5000,
    icon: "✅",
    style: { borderRadius: "10px", background: "#333", color: "#fff" },
    ariaProps: { role: "status", "aria-live": "polite" },
    iconTheme: {
      primary: "#4ade80",
      secondary: "#FFFAEE",
    },

  });

export const toastError = (msg = "Something went wrong!") =>
  toast.error(msg, {
    position: "bottom-right",
    duration: 5000,
    icon: "❌",
    style: { borderRadius: "10px", background: "#333", color: "#fff" },
    ariaProps: { role: "status", "aria-live": "polite" },
    iconTheme: {
      primary: "#EF4444",
      secondary: "#FFFAEE",
    },
  });

export const toastWarning = (msg = "Warning!") =>
  toast(msg, {
    position: "bottom-right",
    duration: 5000,
    icon: "⚠️",
    style: { borderRadius: "10px", background: "#333", color: "#fff" },
    ariaProps: { role: "status", "aria-live": "polite" },
    iconTheme: {
      primary: "#FBBF24",
      secondary: "#FFFAEE",
    },
  });

export const toastInfo = (msg = "Info!") =>
  toast(msg, {
    position: "bottom-right",
    duration: 5000,
    icon: "i️",
    style: { borderRadius: "10px", background: "#333", color: "#fff" },
    ariaProps: { role: "status", "aria-live": "polite" },
    iconTheme: {
      primary: "#3B82F6",
      secondary: "#FFFAEE",
    },
  });