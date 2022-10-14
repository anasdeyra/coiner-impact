import {
  Stack,
  createStyles,
  ActionIcon,
  Tooltip,
  Popover,
  Text,
  Group,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Article, User } from "@prisma/client";
import { MdPublish, MdEdit, MdDelete } from "react-icons/md";
import ArticleModal from "../Modals/ArticleModal/ArticleModal";

const useStyles = createStyles((t) => ({
  stack: {
    position: "absolute",
    top: 0,
    right: 0,
    fontWeight: "bold",
    "&>button": { boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" },
    margin: `${t.spacing.md}px ${t.spacing.md}px 0 0`,
  },
}));

export default function AdminOptions({
  publishHandler,
  deleteHandler,
  article,
  isPublishing,
  isDeleting,
}: Props) {
  const { classes } = useStyles();
  const [opened, { close, open }] = useDisclosure(false);
  const [delPopOpened, delPopHandlers] = useDisclosure(false);
  return (
    <>
      {opened && (
        <ArticleModal
          close={close}
          opened={opened}
          article={article}
          mode="Edit"
        />
      )}
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

        <Popover
          opened={delPopOpened}
          position="bottom"
          withArrow
          width={"max-content"}
        >
          <Popover.Target>
            <Tooltip label="delete">
              <ActionIcon
                onClick={delPopHandlers.toggle}
                variant="filled"
                color="red"
              >
                <MdDelete />
              </ActionIcon>
            </Tooltip>
          </Popover.Target>
          <Popover.Dropdown>
            <Stack align={"center"} spacing={"xs"}>
              <Text size={"xs"}>Delete this article?</Text>

              <Group grow>
                <Button
                  onClick={delPopHandlers.close}
                  size="xs"
                  color={"dark"}
                  variant="light"
                >
                  cancel
                </Button>
                <Button
                  loading={isDeleting}
                  size="xs"
                  onClick={deleteHandler}
                  color={"red"}
                >
                  Delete
                </Button>
              </Group>
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </Stack>
    </>
  );
}

interface Props {
  publishHandler: () => void;
  deleteHandler: () => void;
  article: Article & { author: User };
  isPublishing: boolean;
  isDeleting: boolean;
}
