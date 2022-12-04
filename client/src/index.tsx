import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorMessage } from "./Components/ErrorHandle";
import { malfunction } from "./Const/message";

if (process.env.NODE_ENV === "production") {
  console.log(() => {});
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ErrorBoundary fallback={<ErrorMessage content={malfunction} />}>
    <React.StrictMode>
      <RecoilRoot>

        <App />
      </RecoilRoot>
    </React.StrictMode>
  </ErrorBoundary>
);

reportWebVitals();
