import { Stack, createStyles, ActionIcon, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Article, User } from "@prisma/client";
import { MdPublish, MdEdit } from "react-icons/md";
import ArticleModal from "../Modals/ArticleModal/ArticleModal";

const useStyles = createStyles((t) => ({
  stack: {
    position: "absolute",
    top: 0,
    right: 0,
    fontWeight: "bold",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    margin: `${t.spacing.md}px ${t.spacing.md}px 0 0`,
  },
}));

export default function AdminOptions({
  publishHandler,
  article,
  isPublishing,
}: Props) {
  const { classes } = useStyles();
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <>
      <ArticleModal
        close={close}
        opened={opened}
        article={article}
        mode="Edit"
      />
      <Stack spacing={"xs"} className={classes.stack}>
        <Tooltip label="edit">
          <ActionIcon
            variant="filled"
            color="dark"
            onClick={() => {
              open();
            }}
          >
            <MdEdit />
          </ActionIcon>
        </Tooltip>

        {!article.isPublished && (
          <Tooltip label="publish">
            <ActionIcon
              variant="light"
              onClick={publishHandler}
              loading={isPublishing}
            >
              <MdPublish color="#111" />
            </ActionIcon>
          </Tooltip>
        )}
      </Stack>
    </>
  );
}

interface Props {
  publishHandler: () => void;
  article: Article & { author: User };
  isPublishing: boolean;
}
