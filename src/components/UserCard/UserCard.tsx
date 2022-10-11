import { Avatar, Box, Button, Group, Paper, Stack, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

export default function UserCard({
  name,
  profileImage,
  type,
  description,
  id,
}: UserCardProps) {
  return (
    <Paper m={0} sx={{ width: 276 }} radius={"lg"} p={24} shadow={"sm"}>
      <Stack spacing={0} align={"center"}>
        <Avatar
          sx={{ width: 96, height: 96 }}
          // @ts-ignore: Unreachable code error
          radius={"50%"}
          size={"xl"}
          src={profileImage}
        />
        <Group spacing={10} position={"center"} mt={24}>
          <Text size={16} color={"#111"} weight={700}>
            {name}
          </Text>{" "}
          <Box
            sx={{
              borderRadius: "50%",
              background: "#9e9e9e",
              width: "6px",
              height: "6px",
            }}
          />
          <Text size={14} weight={700} color={"#9e9e9e"}>
            {type}
          </Text>
        </Group>
        <Text align="center" color={"#9e9e9e"} size={14} weight={700} mt={8}>
          {description}
        </Text>

        <Link href={`/profile/${id}`} passHref>
          <Button
            component="a"
            mt={32}
            sx={{
              width: "80%",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
            radius={"xl"}
            color={"dark"}
          >
            View profile
          </Button>
        </Link>
      </Stack>
    </Paper>
  );
}

export interface UserCardProps {
  name: string;
  profileImage: string;
  type: string;
  description: string;
  id?: string;
}
