import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import {
  Avatar,
  Box,
  Card,
  Group,
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
  isPublished,
  withAuthor = false,
  authorId,
}: ArticleCardProps) {
  const link = isPublished
    ? `/article/${title?.toLowerCase().replaceAll(" ", "-")}`
    : "#";
  return (
    <Card sx={{ background: "transparent", overflow: "visible" }} p={0} pb="md">
      <Stack spacing={0}>
        <NextLink href={link}>
          <AspectRatio ratio={16 / 10} mx="auto">
            <img
              style={{
                objectFit: "cover",
                height: "100%",
                borderRadius: 12,
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
              }}
              alt={title}
              src={imageUrl}
            />
          </AspectRatio>
        </NextLink>

        <Text weight={700} size={"lg"} mt={16}>
          {title}
        </Text>
        <Text color={"dimmed"} weight={"bold"} size={"sm"} mt={8}>
          {slug}
        </Text>
        {author && withAuthor && (
          <Group spacing={14} mt={16} align={"center"}>
            <Avatar //@ts-ignore
              radius={"50%"}
              size={"sm"}
              src={author.image}
            ></Avatar>
            <Group align={"center"} spacing={10} position={"center"}>
              <Text size={14} color={"dimmed"} weight="normal">
                By{" "}
                <Link passHref href={`/profile/${authorId}`}>
                  <Text
                    component={NextLink}
                    variant="link"
                    sx={{ display: "inline", color: "#111" }}
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
        )}
      </Stack>
    </Card>
  );
}

export interface ArticleCardProps extends Partial<Article> {
  author?: User;
  withAuthor?: boolean;
}
