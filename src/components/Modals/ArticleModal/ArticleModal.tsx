import {
  Text,
  Button,
  Stack,
  Group,
  TextInput,
  Switch,
  Modal,
  Select,
  Loader,
  Center,
} from "@mantine/core";
import { trpc } from "@/trpc/hook";
import { useForm } from "@mantine/form";
import dynamic from "next/dynamic";
import { Article, Topic } from "@prisma/client";
import { showNotification } from "@mantine/notifications";
import { FiCheck, FiX } from "react-icons/fi";

const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => (
    <Center mt={"xl"}>
      <Loader color={"dark"} />
    </Center>
  ),
});

export default function ArticleModal({ close, mode, opened, article }: Props) {
  const { mutate, isLoading } = trpc.article.addArticle.useMutation({
    onSuccess: () => {
      close();
      showNotification({
        message: "Article added successfully!",
        color: "dark",
        icon: <FiCheck />,
      });
      trpc.useContext().article.invalidate();
    },
    onError: () => {
      showNotification({
        message: "There was problem adding your article!",
        color: "dark",
        icon: <FiX />,
      });
    },
  });

  const form = useForm({
    initialValues: {
      isPublished: false,
      topic: "",
      title: "",
      slug: "",
      imageUrl: "",
      content: "<p>Start writing your article <b>here</b></p>",
    },

    validate: {},
  });

  return (
    <Modal
      radius={"lg"}
      title={`${mode} an article`}
      size={"lg"}
      onClose={close}
      opened={opened}
      closeOnClickOutside={false}
      styles={{ title: { fontWeight: "bold", fontSize: 24 } }}
    >
      <form onSubmit={form.onSubmit((data) => mutate(data))}>
        <Stack mt={48}>
          <Group grow>
            <TextInput
              radius={"md"}
              label="Title"
              required
              {...form.getInputProps("title")}
            />
            <Select
              radius={"md"}
              label="Topic"
              required
              {...form.getInputProps("topic")}
              data={[
                Topic.blockcain,
                Topic.crypto,
                Topic.cyber,
                Topic.nft,
                Topic.web3,
              ]}
            />
          </Group>
          <TextInput
            radius={"md"}
            label="Slug"
            required
            {...form.getInputProps("slug")}
          />
          <TextInput
            radius={"md"}
            label="image URL"
            required
            {...form.getInputProps("imageUrl")}
          />
          <Switch
            color={"dark"}
            label="Publish"
            {...form.getInputProps("isPublished")}
          />
          <RichTextEditor
            sx={{ minHeight: 300 }}
            radius={"md"}
            id="rte"
            onChange={(value) => {
              form.setFieldValue("content", value);
            }}
            value={form.values.content}
          />
          <Group mt={"md"} position="right">
            <Button
              onClick={close}
              radius={"md"}
              variant="subtle"
              color={"dark"}
            >
              Cancel
            </Button>
            <Button
              loading={isLoading}
              type="submit"
              radius={"md"}
              color={"dark"}
            >
              Create
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

interface Props {
  mode: "Create" | "Edit";
  article?: Article;
  opened: boolean;
  close: () => void;
}
