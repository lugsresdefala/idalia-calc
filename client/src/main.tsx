import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/global.css"; // Added import for global styles
import "./lib/errorMonitoring"; // Initialize error monitoring

createRoot(document.getElementById("root")!).render(<App />);