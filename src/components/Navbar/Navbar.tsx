import { NAVICONS } from "@const";
import { MediaQuery, Navbar as N, Stack, Box } from "@mantine/core";
import NavIcon from "@/components/NavIcon/NavIcon";
import { FiLogOut } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import Logo from "../Logo/Logo";

export default function Navbar() {
  const { data } = useSession();
  return (
    <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
      <N p={16} width={{ sm: 0, md: 72 }}>
        <N.Section>
          <Logo />
        </N.Section>
        <N.Section grow sx={{ alignContent: "center" }}>
          <Stack mt={48} spacing={40}>
            {NAVICONS.map((props, i) => (
              <NavIcon key={i} {...props} />
            ))}
          </Stack>
        </N.Section>
        {data && (
          <N.Section>
            <Box
              onClick={() => {
                signOut();
              }}
            >
              <NavIcon Icon={FiLogOut} />
            </Box>
          </N.Section>
        )}
      </N>
    </MediaQuery>
  );
}
