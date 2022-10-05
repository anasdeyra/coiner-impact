// Button.stories.ts|tsx

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import UserCard, { UserCardProps } from "./UserCard";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "UserCard",
  component: UserCard,
} as ComponentMeta<typeof UserCard>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof UserCard> = (args: UserCardProps) => (
  <UserCard {...args} />
);

export const Default = Template.bind({});

Default.args = {
  profileImage:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  name: "Anas Deyra",
  type: "Author",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
};
