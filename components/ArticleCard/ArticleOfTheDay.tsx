import { Card, Image, Button, Text, SimpleGrid, Box } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { ArticleCardProps } from "./ArticleCard";
import { useElementSize } from "@mantine/hooks";

export default function ArticleOfTheDay({
  title,
  image,
  link,
  slug,
  small = false,
}: ArticleCardProps & { small?: boolean }) {
  const { ref, height } = useElementSize();
  if (small)
    return (
      <Card radius={20} sx={{ backgroundColor: "#111", overflow: "visible" }}>
        <Card.Section component={NextLink} href={link}>
          <Image
            styles={(t) => ({
              image: {
                borderRadius: `${t.radius.lg}px ${t.radius.lg}px 0 0 `,
              },
            })}
            src={image}
            alt="article of the day"
            height={200}
          />
        </Card.Section>

        <Text color={"white"} weight={"bold"} size={20} mt="md">
          {title}
        </Text>
        <Text mt="xs" color={"#d9d9d9"} weight="bold" size={14}>
          {slug}
        </Text>
        <Button
          component={NextLink}
          href={link}
          mt={24}
          size="md"
          sx={{ fontWeight: "bold" }}
          radius={"xl"}
          variant="white"
          color={"dark"}
        >
          Read now
        </Button>
      </Card>
    );
  else
    return (
      <Card radius={20} sx={{ backgroundColor: "#111", overflow: "visible" }}>
        <Card.Section>
          <SimpleGrid ref={ref} cols={2}>
            <Box p={"xl"}>
              <Text color={"white"} weight={"bold"} size={36}>
                {title}
              </Text>
              <Text mt={16} color={"#d9d9d9"} weight="bold" size={20}>
                {slug}
              </Text>
              <Button
                component={NextLink}
                href={link}
                mt={48}
                size="lg"
                sx={{ fontWeight: "bold" }}
                radius={"xl"}
                variant="white"
                color={"dark"}
              >
                Read now
              </Button>
            </Box>
            <Image
              // @ts-ignore
              styles={(t) => ({
                image: {
                  borderRadius: `0 ${t.radius.lg}px ${t.radius.lg}px 0 `,
                },
              })}
              src={image}
              alt="article of the day"
              height={height}
            />
          </SimpleGrid>
        </Card.Section>
      </Card>
    );
}
