import { Drawer, Stack, Group, Button, Text } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import MediaIcons from "../MediaIcons/MediaIcons";
import Newsletter from "../Newsletter/Newsletter";
import { COPYRIGHT } from "@const";

export default function NavDrawer({
  onClose,
  opened,
}: {
  onClose: () => void;
  opened: boolean;
}) {
  const { data } = useSession();
  return (
    <Drawer
      position="right"
      padding={"md"}
      size={"full"}
      onClose={onClose}
      opened={opened}
    >
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
    </Drawer>
  );
}
