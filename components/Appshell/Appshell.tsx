import { AppShell as AS } from "@mantine/core";
import { ReactNode } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export default function Appshell({ children }: { children: ReactNode }) {
  return (
    <AS footer={<Footer />} header={<Header />}>
      {children}
    </AS>
  );
}
