import { showNotification as sn } from "@mantine/notifications";
import { Text } from "@mantine/core";
import { FiX, FiCheck } from "react-icons/fi";

export default function showNotification({
  title,
  isError = false,
}: {
  title: string;
  message?: string;
  isError?: boolean;
}) {
  sn({
    message: <Text weight={"bold"}>{title}</Text>,
    color: isError ? "red" : "dark",
    icon: isError ? <FiX /> : <FiCheck />,
    radius: "md",
  });
}
