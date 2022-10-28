// Button.stories.ts|tsx

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Newsletter from "./Newsletter";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Newsletter",
  component: Newsletter,
} as ComponentMeta<typeof Newsletter>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Newsletter> = () => <Newsletter />;

export const Default = Template.bind({});
