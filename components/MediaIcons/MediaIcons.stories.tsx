// Button.stories.ts|tsx

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import MediaIcons from "./MediaIcons";
import { Group } from "@mantine/core";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "MediaIcons",
  component: MediaIcons,
} as ComponentMeta<typeof MediaIcons>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof MediaIcons> = () => (
  <Group>
    <MediaIcons />
  </Group>
);

export const Default = Template.bind({});
