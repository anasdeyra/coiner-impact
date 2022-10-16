import { Topic } from "@prisma/client";
import { MdDashboard, MdExplore, MdCreate, MdSettings } from "react-icons/md";

export const NAVICONS = [
  { Icon: MdDashboard, link: "/" },
  { Icon: MdExplore, link: "/explore" },
  { Icon: MdCreate, link: "/write" },
  { Icon: MdSettings, link: "/settings" },
];

export const SEO = {
  title: "Coiner impact",
  description: "Coiner impact is the web3 tech magazine",
  image:
    "https://media.sketchfab.com/models/2bda6b05667f4685bc2aa9dc56b70d32/thumbnails/d2f1cedab0314c8da4b5ec216ccb1584/1024x576.jpeg",
  twitterhandler: "@coiner_impact",
  website: "dev-impact.vercel.app",
};

export const TOPICS = [
  Topic.blockcain,
  Topic.crypto,
  Topic.cyber,
  Topic.nft,
  Topic.web3,
];

export const COPYRIGHT = "© 2022 Coiner impact. All rights reserved.";
