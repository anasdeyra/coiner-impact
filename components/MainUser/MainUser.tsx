import {
  Group,
  Stack,
  Avatar,
  Indicator,
  Text,
  ActionIcon,
} from "@mantine/core";
import { BiDotsVerticalRounded } from "react-icons/bi";

export default function MainUser() {
  return (
    <Group align="start">
      <Indicator size={8} color={"green"} position="bottom-end">
        <Avatar
          // @ts-ignore
          radius={"50%"}
          src={
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          }
        />
      </Indicator>
      <Stack sx={{ flexGrow: 1 }} spacing={0}>
        <Text size={"sm"} weight={"bold"}>
          Anas Deyra
        </Text>
        <Text size={"xs"} color={"dimmed"}>
          Admin
        </Text>
      </Stack>
      <ActionIcon>
        <BiDotsVerticalRounded />
      </ActionIcon>
    </Group>
  );
}
