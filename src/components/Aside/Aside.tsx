import { COPYRIGHT } from "@const";
import {
  MediaQuery,
  Aside as A,
  Group,
  Stack,
  Button,
  Text,
} from "@mantine/core";
import { useSession, signIn } from "next-auth/react";
import MainUser from "../MainUser/MainUser";
import MediaIcons from "../MediaIcons/MediaIcons";
import Newsletter from "../Newsletter/Newsletter";

export default function Aside() {
  const { data } = useSession();
  return (
    <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
      <A p={16} width={{ sm: 0, md: 300 }}>
        <MainUser />

        <Stack
          mb={48}
          justify={"center"}
          sx={{ height: 40 }}
          mt={data ? 48 + 12 : 0}
        >
          <Group align="center" spacing={0} position="apart">
            <MediaIcons />
          </Group>
        </Stack>

        {!data && (
          <Stack mb={48}>
            <Button
              sx={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
              radius={"xl"}
              color={"dark"}
              onClick={() => {
                signIn();
              }}
            >
              Sign in
            </Button>
            <Button
              onClick={() => {
                signIn();
              }}
              radius={"xl"}
              variant="outline"
              color={"dark"}
            >
              Sign up
            </Button>
          </Stack>
        )}

        <Newsletter />

        <Text mt={48} align="center" size={"xs"} color={"dimmed"}>
          {COPYRIGHT}
        </Text>
      </A>
    </MediaQuery>
  );
}
