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
  LoadingOverlay,
} from "@mantine/core";
import { trpc } from "@/trpc/hook";
import { useForm } from "@mantine/form";
import dynamic from "next/dynamic";
import { Article, Topic } from "@prisma/client";
import { FiCheck, FiX } from "react-icons/fi";
import showNotification from "src/utils/showNotification";
// import { useCallback } from "react";

const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => (
    <Center mt={"xl"}>
      <Loader color={"dark"} />
    </Center>
  ),
});

export default function ArticleModal({ close, mode, opened, article }: Props) {
  const trpcContext = trpc.useContext();

  const addMutation = trpc.article.add.useMutation({
    onSuccess: (_, { title }) => {
      close();
      showNotification({
        title: `Article was added successfully!`,
        message: title,
      });
      trpcContext.article.invalidate();
    },
    onError: (e) => {
      showNotification({
        title: `There was problem adding your article!`,
        isError: true,
      });
      const error = JSON.parse(e.message)[0];

      form.setFieldError(error.path[0] || "", error.message || "");
    },
  });

  const editMutation = trpc.article.edit.useMutation({
    onSuccess: (_, { title }) => {
      close();
      showNotification({
        title: `Article was edited successfully`,
        message: title,
      });
      trpcContext.article.invalidate();
    },
    onError: (e) => {
      showNotification({
        title: `There was problem editing your article!`,
        isError: true,
      });
      const error = JSON.parse(e.message)[0];

      form.setFieldError(error.path[0] || "", error.message || "");
    },
  });

  const form = useForm({
    initialValues: article
      ? {
          isPublished: article.isPublished,
          topic: article.topic,
          title: article.title,
          slug: article.slug,
          imageUrl: article.imageUrl,
          content: article.content,
        }
      : {
          isPublished: false,
          topic: "",
          title: "",
          slug: "",
          imageUrl: "",
          content: "<p>Start writing your article <b>here</b></p>",
        },

    validate: {},
  });

  // const handleImageUpload = useCallback(
  //   (file: File): Promise<string> =>
  //     new Promise((resolve, reject) => {
  //       const formData = new FormData();
  //       formData.append("image", file);

  //       fetch("https://api.imgur.com/3/upload", {
  //         headers: {
  //           Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMAGUR_ID}`,
  //         },
  //         method: "POST",
  //         body: formData,
  //       })
  //         .then((response) => response.json())
  //         .then((result) => {
  //           console.log(result.data);
  //           return resolve(result.data.url);
  //         })
  //         .catch(() => reject(new Error("Upload failed")));
  //     }),
  //   []
  // );

  const isLoading =
    mode === "Create" ? addMutation.isLoading : editMutation.isLoading;

  const handleSubmit =
    mode === "Create"
      ? form.onSubmit((data) => addMutation.mutate(data))
      : form.onSubmit((data) =>
          editMutation.mutate({ ...data, id: Number(article?.id) })
        );

  return (
    <Modal
      radius={"lg"}
      title={`${mode} an article`}
      size={"xl"}
      onClose={close}
      opened={opened}
      closeOnClickOutside={false}
      styles={{ title: { fontWeight: "bold", fontSize: 24 } }}
    >
      <LoadingOverlay
        loaderProps={{ color: "dark" }}
        visible={isLoading}
        overlayColor="#111"
        overlayBlur={2}
      />
      <form onSubmit={handleSubmit}>
        <Stack mt={48}>
          <Group grow>
            <TextInput
              radius={"md"}
              label="Title"
              required
              {...form.getInputProps("title")}
              error={form.errors.title}
            />
            <Select
              color="dark"
              radius={"md"}
              label="Topic"
              required
              {...form.getInputProps("topic")}
              error={form.errors.topic}
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
            error={form.errors.slug}
          />
          <TextInput
            radius={"md"}
            label="image URL"
            required
            {...form.getInputProps("imageUrl")}
            error={form.errors?.imageUrl}
          />
          <Switch
            color={"dark"}
            label="Publish"
            {...form.getInputProps("isPublished")}
            error={form.errors.isPublished}
            defaultChecked={article?.isPublished}
          />

          <RichTextEditor
            sx={{ minHeight: 300 }}
            radius={"md"}
            id="rte"
            onChange={(value) => {
              form.setFieldValue("content", value);
            }}
            // onImageUpload={handleImageUpload}
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
              {mode}
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
