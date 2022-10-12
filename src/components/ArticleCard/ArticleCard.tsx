import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import {
  Avatar,
  Box,
  Card,
  Group,
  Image,
  Stack,
  Text,
  AspectRatio,
} from "@mantine/core";
import Link from "next/link";
import React from "react";
import { Article, User } from "@prisma/client";
import { NextLink } from "@mantine/next";

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
        <NextLink href={link}>
          <AspectRatio ratio={16 / 10} m={0}>
            <Image radius={"md"} src={imageUrl} />
          </AspectRatio>
        </NextLink>

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
