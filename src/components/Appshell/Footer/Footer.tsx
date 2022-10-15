import { NAVICONS } from "@const";
import { Footer as F, Group } from "@mantine/core";
import NavIcon from "@/components/NavIcon/NavIcon";
import { useMediaQuery } from "@mantine/hooks";

export default function Footer() {
  const isSmall = useMediaQuery("(max-width: 992px)", false, {
    getInitialValueInEffect: true,
  });
  return (
    <F
      sx={isSmall ? {} : { display: "none" }}
      p={16}
      height={isSmall ? 72 : 0}
      fixed
    >
      <Group position="apart">
        {NAVICONS.map((props, i) => (
          <NavIcon key={i} {...props} />
        ))}
      </Group>
    </F>
  );
}
