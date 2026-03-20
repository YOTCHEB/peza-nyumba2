import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Global error handler for unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  // Ignore errors from Chrome extensions (content.js)
  const stack = event.reason?.stack || String(event.reason);
  if (stack.includes('content.js') || stack.includes('extension://')) {
    return;
  }
  // Ignore abort errors
  if (event.reason?.name === 'AbortError') {
    return;
  }
  console.error("Unhandled promise rejection:", event.reason);
  event.preventDefault();
});

// Global error handler for synchronous errors
window.addEventListener("error", (event) => {
  // Ignore errors from Chrome extensions
  if (event.filename?.includes('content.js') || event.filename?.includes('extension://')) {
    return;
  }
  console.error("Global error:", event.error);
});

createRoot(document.getElementById("root")!).render(<App />);
