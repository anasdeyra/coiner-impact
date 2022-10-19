import { TextInput, ActionIcon } from "@mantine/core";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";

export default function SearchBar({ grow = 0 }) {
  const { push } = useRouter();
  const { getInputProps, onSubmit, values, isDirty } = useForm({
    initialValues: { query: "" },
  });
  return (
    <form
      style={{ flexGrow: grow, maxWidth: 700 }}
      onSubmit={onSubmit(() => {
        isDirty("query") && push(`/search?query=${values.query}`);
      })}
    >
      <TextInput
        color="dark"
        sx={{ width: "100%" }}
        rightSection={
          <ActionIcon type="submit" variant="transparent">
            <SearchIcon color="#333" size={20} />
          </ActionIcon>
        }
        radius={"xl"}
        variant="filled"
        placeholder="Search articles, authors, topics..."
        {...getInputProps("query")}
      />
    </form>
  );
}
