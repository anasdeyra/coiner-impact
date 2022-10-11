import { TextInput } from "@mantine/core";
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
  return (
    <TextInput
      radius={"xl"}
      variant="filled"
      placeholder="Search articles, authors, topics..."
      icon={<IoSearch size={20} />}
    />
  );
}
