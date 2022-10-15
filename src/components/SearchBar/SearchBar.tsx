import { TextInput, ActionIcon } from "@mantine/core";
import { FiSearch as SearchIcon } from "react-icons/fi";

export default function SearchBar({ grow = 0 }) {
  return (
    <TextInput
      sx={{ flexGrow: grow, maxWidth: 700 }}
      rightSection={
        <ActionIcon variant="transparent">
          <SearchIcon color="#333" size={20} />
        </ActionIcon>
      }
      radius={"xl"}
      variant="filled"
      placeholder="Search articles, authors, topics..."
    />
  );
}
