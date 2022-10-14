import { ActionIcon } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

export default function Component({
  Icon,
  link,
}: {
  Icon: IconType;
  link: string;
}) {
  const { pathname } = useRouter();
  const isActive = pathname === link;
  return (
    <ActionIcon
      component={NextLink}
      href={link}
      radius={8}
      sx={isActive ? { boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)" } : {}}
      variant="transparent"
      size={40}
    >
      <Icon color="#111" size={28} />
    </ActionIcon>
  );
}
