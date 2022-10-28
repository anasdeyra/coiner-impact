import {
  Group,
  Stack,
  Avatar,
  Text,
  ActionIcon,
  Skeleton,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useSession } from "next-auth/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import UserMenu from "../Appshell/Header/UserMenu";

export default function MainUser() {
  const { data, status } = useSession();
  if (status === "loading") return <Skeleton></Skeleton>;
  if (!data) return null;
  return (
    <Group align="start">
      <Avatar
        component={NextLink}
        href={`#`}
        size={42}
        // @ts-ignore
        radius={"50%"}
        src={data.user.image}
      />

      <Stack
        justify={"space-between"}
        align="start"
        sx={{ flexGrow: 1 }}
        spacing={0}
      >
        <Text component={NextLink} href={`#`} size={"sm"} weight={700}>
          {data.user.name}
        </Text>
        <Text
          sx={{ textTransform: "capitalize" }}
          weight={500}
          size={"xs"}
          color={"dimmed"}
        >
          {data.user.role}
        </Text>
      </Stack>
      <UserMenu>
        <ActionIcon variant="transparent">
          <BiDotsVerticalRounded />
        </ActionIcon>
      </UserMenu>
    </Group>
  );
}
