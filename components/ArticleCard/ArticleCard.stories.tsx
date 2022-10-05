// Button.stories.ts|tsx

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ArticleCard, { ArticleCardProps } from "./ArticleCard";
import ArticleOfTheDay from "./ArticleOfTheDay";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "ArticleCard",
  component: ArticleCard,
} as ComponentMeta<typeof ArticleCard>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ArticleCard> = (
  args: ArticleCardProps
) => <ArticleCard {...args} />;

const ARGS = {
  image:
    "https://images.unsplash.com/photo-1642388691919-231d16e51e7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bmZ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  title: "The tech giant Meta announces its new NFT collection",
  slug: "On the 21st of september Marck zuckerburg him self stated that this is a big leap into the future",
  author: {
    description: "",
    name: "Anas Deyra",
    profileImage:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    type: "author",
    id: "69",
  },
  link: "https://images.unsplash.com/photo-1642388691919-231d16e51e7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bmZ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
};

export const Default = Template.bind({});
export const AotD = () => <ArticleOfTheDay {...ARGS} />;

Default.args = ARGS;
