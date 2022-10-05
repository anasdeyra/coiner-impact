import { Paper, Button, Text, Grid } from "@mantine/core";
import Link from "next/link";
import { ArticleCardProps } from "./ArticleCard";

export default function ArticleOfTheDay({
  title,
  image,
  link,
  slug,
}: ArticleCardProps) {
  return (
    <Paper radius={"lg"} p={0} sx={{ background: "#111", maxWidth: 800 }}>
      <Grid columns={100} p={0}>
        <Grid.Col p={"xl"} span={55}>
          <Text weight={"bold"} size={32} color="white">
            {title}
          </Text>
          <Text mb={48} mt={16} weight={"bold"} size={18} color={"#dadada"}>
            {slug}
          </Text>

          <Link passHref href={link}>
            <Button
              radius={"xl"}
              component="a"
              variant="white"
              color={"dark"}
              size="lg"
            >
              Read now
            </Button>
          </Link>
        </Grid.Col>
        <Grid.Col
          span={45}
          sx={(t) => ({
            backgroundImage: `url('${image}')`,
            backgroundSize: "cover",
            borderRadius: `0 ${t.radius.lg}px  ${t.radius.lg}px 0`,
          })}
        />
      </Grid>
    </Paper>
  );
}
