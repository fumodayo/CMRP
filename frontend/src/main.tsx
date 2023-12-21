import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import StoreProvider from "./context/Store.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { viVN } from "@mui/material/locale";
import { ConfigProvider } from "antd";
import vi_VN from "antd/locale/vi_VN";

const theme = createTheme(viVN);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <ConfigProvider locale={vi_VN}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ConfigProvider>
    </StoreProvider>
  </React.StrictMode>
);
