import { MediaQuery, Aside as A, Group } from "@mantine/core";
import MainUser from "../MainUser/MainUser";
import MediaIcons from "../MediaIcons/MediaIcons";

export default function Aside() {
  return (
    <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
      <A p={16} width={{ sm: 0, md: 300 }}>
        <MainUser />
        <Group align="center" mt={48 + 14} spacing={0} position="apart">
          <MediaIcons />
        </Group>
      </A>
    </MediaQuery>
  );
}
