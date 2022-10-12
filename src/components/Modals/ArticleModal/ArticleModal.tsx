import { ContextModalProps, ModalsProvider } from "@mantine/modals";
import { Text, Button } from "@mantine/core";
import { Article } from "@prisma/client";

export default function ArticleModal({
  context,
  id,
  innerProps,
}: ContextModalProps<Article>) {
  return <></>;
}
