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
    <Group noWrap spacing={14} align={"center"}>
      <Avatar //@ts-ignore
        radius={"50%"}
        component={NextLink}
        href="#"
        size={"sm"}
        src={author.image}
        alt={author.name || "profile picture"}
      />

      <Group align={"center"} spacing={0} position={"center"}>
        <Text size={14} color={"dimmed"} weight="normal">
          By{" "}
          <Link passHref href={`#`}>
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
              {author.name && author.name?.length > 17
                ? author.name?.slice(0, 17) + "..."
                : author.name}
            </Text>
          </Link>{" "}
        </Text>
        <Text size={14} color={"dimmed"} weight="normal">
          <span
            style={{
              display: "inline-block",
              margin: "0 4px",
            }}
          >
            &bull;
          </span>
          {dayjs(publishedAt).fromNow()}
        </Text>
      </Group>
    </Group>
  );
}
