import {
  Paper,
  Text,
  TextInput,
  Button,
  Stack,
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
    <Paper sx={{ background: "#111" }} radius={"md"} shadow="lg" p={"md"}>
      <Stack>
        <Text weight={500} align="center" color={"white"}>
          Get our best tips. Join the smartest marketers who receive our twice
          monthly update
        </Text>
        <Button
          sx={{ fontWeight: "bold" }}
          radius={"xl"}
          variant="white"
          color={"dark"}
        >
          join news letter
        </Button>
      </Stack>
    </Paper>
  );
}
