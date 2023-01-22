import { Image } from "@mantine/core";
import { NextLink } from "@mantine/next";

export default function Logo() {
  return (
    <NextLink href={"/"}>
      <Image
        alt="logo"
        src={"/logo.png"}
        height={40}
        width={40}
        style={{ borderRadius: "50%" }}
      />
    </NextLink>
  );
}
