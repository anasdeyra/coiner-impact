import { GetStaticPaths } from "next";
import prisma from "@db";
import { Article as Ar, User } from "@prisma/client";
import { Title, AspectRatio, Space } from "@mantine/core";
import Content from "@/components/Content";
import AuthorCredits from "@/components/AuthorCredits/AuthorCredits";

export default function Article({
  content,
  title,
  imageUrl,
  author,
  publishedAt,
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
      {author && <AuthorCredits author={author} publishedAt={publishedAt} />}
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
  return {
    props: { ...JSON.parse(JSON.stringify(article)) },
    // revalidate: 600, // ISG 10 mins
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
