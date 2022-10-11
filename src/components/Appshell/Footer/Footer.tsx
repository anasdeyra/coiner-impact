import { ActionIcon, Footer as F, Group, Paper } from "@mantine/core";
import { MdDashboard, MdExplore, MdCreate, MdSettings } from "react-icons/md";

export default function Footer() {
  return (
    <F p={16} height={72} fixed>
      <Group position="apart">
        <ActionIcon
          radius={8}
          sx={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
          variant="transparent"
          size={40}
        >
          <MdDashboard color="#111" size={28} />
        </ActionIcon>

        <ActionIcon variant="transparent" size={40}>
          <MdCreate color="#111" size={28} />
        </ActionIcon>
        <ActionIcon variant="transparent" size={40}>
          <MdExplore color="#111" size={28} />
        </ActionIcon>
        <ActionIcon variant="transparent" size={40}>
          <MdSettings color="#111" size={28} />
        </ActionIcon>
      </Group>
    </F>
  );
}
