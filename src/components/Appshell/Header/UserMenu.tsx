import { Menu, Avatar } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useSession, signOut } from "next-auth/react";
import { ReactNode } from "react";
import {
  FiLogOut,
  FiUser,
  FiSettings,
  FiPlusCircle,
  FiBarChart2 as FiActivity,
} from "react-icons/fi";

export default function UserMenu({ children }: { children: ReactNode }) {
  const { data } = useSession();
  if (!data) return null;
  return (
    <Menu width={180} radius={"lg"}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Actions</Menu.Label>
        <Menu.Item icon={<FiUser />}>Profile</Menu.Item>
        <Menu.Item icon={<FiPlusCircle />}>New Article</Menu.Item>
        {data.user.role === "admin" && (
          <Menu.Item icon={<FiActivity />} component={NextLink} href="/admin">
            Admin Dashboard
          </Menu.Item>
        )}
        <Menu.Item icon={<FiSettings />}>Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item
          icon={<FiLogOut />}
          color={"red"}
          onClick={() => {
            signOut();
          }}
        >
          logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
