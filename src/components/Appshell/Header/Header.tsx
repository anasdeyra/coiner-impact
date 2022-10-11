import {
  ActionIcon,
  Avatar,
  Burger,
  Divider,
  Group,
  Header as H,
} from "@mantine/core";

import {
  FiSearch as SearchIcon,
  FiBookmark,
  FiMenu,
  FiBell,
} from "react-icons/fi";

export default function Header() {
  return (
    <H p={16} withBorder={false} pb={0} height={55 + 16}>
      <Group>
        <Avatar
          //@ts-ignore
          radius={"50%"}
          size={"md"}
          src={
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          }
        />
        <Group spacing={16} position="right" sx={{ flexGrow: 1 }}>
          <ActionIcon variant="transparent">
            <SearchIcon color={"#111"} size={24} />
          </ActionIcon>
          <ActionIcon variant="transparent">
            <FiBell color={"#111"} size={24} />
          </ActionIcon>
          <ActionIcon variant="transparent">
            <FiBookmark color={"#111"} size={24} />
          </ActionIcon>
          <ActionIcon variant="transparent">
            <FiMenu color={"#111"} size={24} />
          </ActionIcon>
        </Group>
      </Group>
      <Divider color={"#dbdbdb"} size={"xs"} mt={16} orientation="horizontal" />
    </H>
  );
}
