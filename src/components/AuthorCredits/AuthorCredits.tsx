import { NextLink } from "@mantine/next";
import { Group, Text, Box, Avatar } from "@mantine/core";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { User } from "@prisma/client";

dayjs.extend(relativeTime);

export default function AuthorCredits({
  author,
  publishedAt,
}: {
  author: User;
  publishedAt: Date | string;
}) {
  return (
    <Group spacing={14} align={"center"}>
      <Avatar //@ts-ignore
        radius={"50%"}
        size={"sm"}
        src={author.image}
      />

      <Group align={"center"} spacing={10} position={"center"}>
        <Text size={14} color={"dimmed"} weight="normal">
          By{" "}
          <Link passHref href={`/profile/${author.id}`}>
            <Text
              component={NextLink}
              variant="link"
              sx={{
                display: "inline",
                color: "#111",
              }}
              weight={700}
              href="#"
            >
              {author.name}
            </Text>
          </Link>
        </Text>
        <Box
          sx={{
            borderRadius: "50%",
            background: "#868E96",
            width: "6px",
            height: "6px",
          }}
        />
        <Text size={14} color={"dimmed"} weight="normal">
          {dayjs(publishedAt).fromNow()}
        </Text>
      </Group>
    </Group>
  );
}
