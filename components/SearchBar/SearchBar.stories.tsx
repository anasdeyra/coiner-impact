// Button.stories.ts|tsx

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import SearchBar from "./SearchBar";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "SearchBar",
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar />;

export const Default = Template.bind({});
