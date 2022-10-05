// Button.stories.ts|tsx

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import MainUser from "./MainUser";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "MainUser",
  component: MainUser,
} as ComponentMeta<typeof MainUser>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof MainUser> = () => <MainUser />;

export const Default = Template.bind({});
