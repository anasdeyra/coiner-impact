import { trpc } from "@/trpc/hook";
import {
  Text,
  Button,
  Stack,
  createStyles,
  Skeleton,
  Popover,
  TextInput,
  ActionIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { FiSend, FiMail } from "react-icons/fi";
import showNotification from "src/utils/showNotification";

//@ts-ignore: dynamic import bug
const Paper = dynamic(() => import("@mantine/core").then((m) => m.Paper), {
  ssr: false,
  loading: () => <Skeleton animate radius={"md"} height={152 + 32} />,
});

const useStyles = createStyles((t) => ({
  input: {
    background: "none",
    borderBottom: "2px solid #ddd",
    flexGrow: 1,
  },
}));

export default function Newsletter() {
  const { classes } = useStyles();
  const [opened, { close, open, toggle }] = useDisclosure(false);
  return (
    //@ts-ignore: dynamic import bug
    <Paper sx={{ background: "#111" }} radius={"md"} shadow="lg" p={"md"}>
      <Stack spacing={"xl"}>
        <Text weight={500} align="center" color={"white"}>
          Get our best tips. Join the smartest marketers who receive our twice
          monthly update
        </Text>
        <Popover radius={"md"} opened={opened} withArrow>
          <Popover.Dropdown>
            <Dropdown close={close} />
          </Popover.Dropdown>
          <Popover.Target>
            <Button
              onClick={toggle}
              sx={{ fontWeight: "bold" }}
              radius={"xl"}
              variant="white"
              color={"dark"}
            >
              Join news letter
            </Button>
          </Popover.Target>
        </Popover>
      </Stack>
    </Paper>
  );
}

function Dropdown({ close }: { close: () => void }) {
  const { mutate, isLoading } = trpc.public.newsletterSignup.useMutation();
  const form = useForm({ initialValues: { mail: "" } });
  return (
    <form
      onSubmit={form.onSubmit(() => {
        if (!form.isDirty("mail")) return;
        mutate({ email: form.values.mail });
        showNotification({ title: "Thank you for joining our newsletter" });
        close();
      })}
    >
      <TextInput
        radius={"md"}
        {...form.getInputProps("mail")}
        type={"email"}
        icon={<FiMail />}
        placeholder="example@mail.com"
        rightSection={
          <ActionIcon
            radius={"sm"}
            type="submit"
            loading={isLoading}
            color={"dark"}
            variant="filled"
          >
            <FiSend />
          </ActionIcon>
        }
      />
    </form>
  );
}
