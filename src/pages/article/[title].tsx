import { GetStaticPaths } from "next";
import prisma from "@db";
import { Article as Ar, User } from "@prisma/client";
import { Title, AspectRatio } from "@mantine/core";
import Content from "@/components/Content";

export default function Article({
  content,
  title,
  imageUrl,
}: Ar & { author: User }) {
  return (
    <>
      <Title order={1} size={32}>
        {title}
      </Title>
      <AspectRatio mb={32} mt={24} ratio={16 / 10}>
        <img
          style={{
            objectFit: "cover",
            height: "100%",
            borderRadius: 8,
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          }}
          src={imageUrl}
          alt={title}
        />
      </AspectRatio>
      <Content content={content} />
    </>
  );
}

export const getStaticProps = async (ctx: any) => {
  let title: string | undefined = ctx.params?.title;
  title = title?.replaceAll("-", " ");
  const article = await prisma.article.findFirst({
    where: { title, isPublished: true },
    include: { author: true },
  });

  return {
    props: { ...JSON.parse(JSON.stringify(article)) },
    // revalidate: 600, // ISG 10 mins
  };
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const titles = await prisma.article.findMany({ select: { title: true } });

  const paths = titles.map(({ title }) => ({
    params: { title: title.replaceAll(" ", "-") },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
