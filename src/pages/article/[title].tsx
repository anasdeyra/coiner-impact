import { GetStaticPaths } from "next";
import prisma from "@db";
import { Article as Ar, User } from "@prisma/client";
import {
  Title,
  AspectRatio,
  Space,
  Text,
  MediaQuery,
  Group,
} from "@mantine/core";
import Content from "@/components/Content";
import AuthorCredits from "@/components/AuthorCredits/AuthorCredits";
import Head from "next/head";
import { SEO } from "@const";
import ShareIcons from "src/ShareIcons/ShareIcons";

export default function Article({
  content,
  title,
  imageUrl,
  author,
  slug,
  publishedAt,
  updatedAt,
}: Ar & { author: User }) {
  const link = `${SEO.website}/article/${title
    ?.toLowerCase()
    .replaceAll(" ", "-")}`;
  if (!content) return "dont forget to put something here";
  return (
    <>
      <Head>
        {/* basic OG */}
        <title>{SEO.title + " - " + title}</title>
        <meta name="description" content={slug} />
        <meta property="og:url" content={link} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={slug} />
        <meta property="og:image" content={imageUrl} />

        {/* article OG */}

        <meta property="og:type" content="article" />
        <meta
          property="article:published_time"
          content={publishedAt?.toString()}
        />
        <meta
          property="article:modified_time"
          content={updatedAt?.toString()}
        />
        {/* <meta property="article:author" content={title} /> */}
        {/* <meta property="article:section" content={topic} /> */}

        {/* twitter tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@coiner_impact" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={slug} />
        <meta name="twitter:creator" content="@coiner_impact" />
        <meta name="twitter:image" content={imageUrl} />
      </Head>

      <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
        <Title order={1} weight={800} size={48}>
          {title}
        </Title>
      </MediaQuery>
      <MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
        <Title order={1} weight={800} size={32}>
          {title}
        </Title>
      </MediaQuery>
      <Group mt={24} align={"center"}>
        <Text weight={"bold"}>Share:</Text>
        <Group spacing={"xs"}>
          <ShareIcons link={link} />
        </Group>
      </Group>
      <AspectRatio mb={32} mt={24} ratio={16 / 10}>
        <MediaQuery smallerThan={"lg"} styles={{ borderRadius: 14 }}>
          <MediaQuery largerThan={"lg"} styles={{ borderRadius: 20 }}>
            <img
              style={{
                objectFit: "cover",
                height: "100%",
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
              }}
              src={imageUrl}
              alt={title}
            />
          </MediaQuery>
        </MediaQuery>
      </AspectRatio>
      <AuthorCredits author={author} publishedAt={publishedAt} />
      <Space mt={16} />
      <Content content={content} />
    </>
  );
}

export const getStaticProps = async (ctx: any) => {
  let title: string | undefined = ctx.params?.title;
  title = title?.toLowerCase().replaceAll("-", " ");
  const article = await prisma.article.findFirst({
    where: { title, isPublished: true },
    include: { author: true },
  });
  if (!article) return { notFound: true };
  return {
    props: { ...JSON.parse(JSON.stringify(article)) },
    revalidate: 24 * 60 * 60, // ISG daily
  };
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const titles = await prisma.article.findMany({ select: { title: true } });

  const paths = titles.map(({ title }) => ({
    params: { title: title.toLowerCase().replaceAll(" ", "-") },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
