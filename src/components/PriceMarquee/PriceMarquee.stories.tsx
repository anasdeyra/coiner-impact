// Button.stories.ts|tsx

import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import PriceMarquee from "./PriceMarquee";
import { Group } from "@mantine/core";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "PriceMarquee",
  component: PriceMarquee,
} as ComponentMeta<typeof PriceMarquee>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof PriceMarquee> = (args) => (
  <Group spacing={"xs"}>
    <PriceMarquee symbols={args.symbols} />
  </Group>
);

export const Default = Template.bind({});

Default.args = { symbols: ["BTCUSDT", "ETHUSDT"] };
