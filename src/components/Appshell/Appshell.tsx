import { AppShell as AS } from "@mantine/core";
import { ReactNode } from "react";
import Footer from "./Footer/Footer";
import dynamic from "next/dynamic";

export default function Appshell({ children }: { children: ReactNode }) {
  const Header = dynamic(() => import("./Header/Header"), { ssr: false });
  return (
    <AS footer={<Footer />} header={<Header />}>
      {children}
    </AS>
  );
}
