import { NAVICONS } from "@const";
import { Footer as F, Group } from "@mantine/core";
import NavIcon from "@/components/NavIcon/NavIcon";

export default function Footer() {
  return (
    <F sx={{ borderColor: "#dbdbdb" }} p={16} height={72} fixed>
      <Group position="apart">
        {NAVICONS.map((props, i) => (
          <NavIcon key={i} {...props} />
        ))}
      </Group>
    </F>
  );
}
