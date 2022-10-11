import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import React from "react";

export default function Article() {
  return <div>Article</div>;
}

export const getStaticProps: GetServerSideProps = async (ctx) => {
  const { title } = ctx.query;
  return {
    props: {},
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
