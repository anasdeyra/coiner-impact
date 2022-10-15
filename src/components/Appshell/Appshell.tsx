import { AppShell as AS } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode } from "react";
import Aside from "../Aside/Aside";
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer/Footer";
import DesktopHeader from "./Header/DesktopHeader";
import Header from "./Header/Header";

export default function Appshell({ children }: { children: ReactNode }) {
  const isBig = useMediaQuery("(min-width: 992px)", false, {
    getInitialValueInEffect: true,
  });

  return (
    <AS
      navbar={<Navbar />}
      aside={<Aside />}
      footer={<Footer />}
      header={<Header />}
    >
      {isBig && <DesktopHeader />}
      {children}
    </AS>
  );
}
