import { NAVICONS } from "@const";
import { MediaQuery, Navbar as N, Stack } from "@mantine/core";
import NavIcon from "@/components/NavIcon/NavIcon";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { NextLink } from "@mantine/next";

export default function Navbar() {
  return (
    <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
      <N p={16} width={{ sm: 0, md: 72 }}>
        <N.Section>
          <NextLink href={"/"}>
            <Image src={"/favicon.ico"} height={40} width={40} />
          </NextLink>
        </N.Section>
        <N.Section grow sx={{ alignContent: "center" }}>
          <Stack mt={48} spacing={40}>
            {NAVICONS.map((props, i) => (
              <NavIcon key={i} {...props} />
            ))}
          </Stack>
        </N.Section>
        <N.Section>
          <NavIcon Icon={FiLogOut} link={"/api/auth/signout"} />
        </N.Section>
      </N>
    </MediaQuery>
  );
}
