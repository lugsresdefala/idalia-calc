import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/global.css"; // Added import for global styles

createRoot(document.getElementById("root")!).render(<App />);