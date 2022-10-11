import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import {
  Avatar,
  Box,
  Card,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  AspectRatio,
} from "@mantine/core";
import Link from "next/link";
import React from "react";
import { UserCardProps } from "../UserCard/UserCard";
import { Article, User } from "@prisma/client";

dayjs.extend(relativeTime);

export default function ArticleCard({
  author,
  imageUrl,
  publishedAt,
  slug,
  title,
}: ArticleCardProps) {
  const link = `/article/${title.toLowerCase().replaceAll(" ", "-")}`;
  return (
    <Card sx={{ background: "transparent" }} radius={"lg"} p={0} pb="md">
      <Stack spacing={0}>
        <Link href={link}>
          <AspectRatio
            sx={{
              overflow: "hidden",
              borderRadius: 16,
              width: "100%",
            }}
            ratio={16 / 10}
            m={0}
          >
            <Image src={imageUrl} />
          </AspectRatio>
        </Link>

        <Text weight={700} size={"lg"} mt={16}>
          {title}
        </Text>
        <Text color={"dimmed"} weight={"bold"} size={"sm"} mt={8}>
          {slug}
        </Text>
        <Group spacing={14} mt={16} align={"center"}>
          <Avatar //@ts-ignore
            radius={"50%"}
            size={"sm"}
            src={author.image}
          ></Avatar>
          <Group align={"center"} spacing={10} position={"center"}>
            <Text size={14} color={"dimmed"} weight="normal">
              By{" "}
              <Link passHref href={`/profile/${author.id}`}>
                <Text
                  component="a"
                  variant="link"
                  sx={{ display: "inline", color: "#111" }}
                  weight={700}
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
      </Stack>
    </Card>
  );
}

export interface ArticleCardProps extends Article {
  author: User;
}
