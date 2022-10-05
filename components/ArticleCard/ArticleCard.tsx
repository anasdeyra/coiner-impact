import {
  Avatar,
  Box,
  Card,
  Group,
  Image,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import Link from "next/link";
import React from "react";
import { UserCardProps } from "../UserCard/UserCard";

export default function ArticleCard({
  slug,
  author,
  title,
  image,
  link,
}: ArticleCardProps) {
  return (
    <Card
      sx={{ maxWidth: 400, background: "transparent" }}
      radius={"lg"}
      p={0}
      pb="md"
    >
      <Stack spacing={0}>
        <Paper radius={"lg"} shadow={"md"}>
          <Link href={link}>
            <Image radius={"lg"} src={image} />
          </Link>
        </Paper>

        <Text weight={700} size={"lg"} mt={"md"}>
          {title}
        </Text>
        <Text color={"dimmed"} weight={"bold"} size={"sm"} mt={4}>
          {slug}
        </Text>
        <Group spacing={14} mt={16} align={"center"}>
          <Avatar //@ts-ignore
            radius={"50%"}
            size={"sm"}
            src={author.profileImage}
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
                background: "#9e9e9e",
                width: "6px",
                height: "6px",
              }}
            />
            <Text size={14} color={"dimmed"} weight="normal">
              31 mins ago
            </Text>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}

export interface ArticleCardProps {
  image: string;
  title: string;
  slug: string;
  author: UserCardProps;
  link: string;
}
