import {
  Paper,
  Text,
  TextInput,
  Button,
  Group,
  createStyles,
} from "@mantine/core";

const useStyles = createStyles((t) => ({
  input: {
    background: "none",
    borderBottom: "2px solid #ddd",
    flexGrow: 1,
  },
}));

export default function Newsletter() {
  const { classes } = useStyles();
  return (
    <Paper sx={{ background: "#111" }} radius={"xl"} p={32}>
      <Text weight={"bold"} size={48} color={"white"}>
        Join our newsteller
      </Text>
      <Text size={"lg"} mt={"md"} weight={"bold"} color={"#dadada"}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation
      </Text>
      <Group mt={48}>
        <TextInput
          variant="unstyled"
          className={classes.input}
          placeholder="Enter your email here"
          size="lg"
          styles={{ input: { color: "white", fontWeight: "bold" } }}
        />
        <Button
          sx={{ color: "#111", fontWeight: "bold" }}
          variant="white"
          radius={"xl"}
          size="lg"
        >
          Join now
        </Button>
      </Group>
    </Paper>
  );
}
