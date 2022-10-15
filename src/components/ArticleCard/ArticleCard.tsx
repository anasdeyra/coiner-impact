import AuthorCredits from "../AuthorCredits/AuthorCredits";

import {
  Avatar,
  Box,
  Card,
  Group,
  Stack,
  Text,
  AspectRatio,
} from "@mantine/core";
import React from "react";
import { Article, User } from "@prisma/client";
import { NextLink } from "@mantine/next";

export default function ArticleCard({
  author,
  imageUrl,
  publishedAt,
  slug,
  title,
  isPublished,
  withAuthor = false,
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
          <AuthorCredits publishedAt={publishedAt ?? "now"} author={author} />
        )}
      </Stack>
    </Card>
  );
}

export interface ArticleCardProps extends Partial<Article> {
  author?: User;
  withAuthor?: boolean;
}
