import { Topic } from "@prisma/client";
import { MdDashboard, MdExplore, MdCreate, MdSettings } from "react-icons/md";

export const NAVICONS = [
  { Icon: MdDashboard, link: "/" },
  { Icon: MdExplore, link: "/explore" },
  { Icon: MdCreate, link: "/write" },
  { Icon: MdSettings, link: "/settings" },
];

export const SEO = {
  title: "Coiner impact: Bitcoin, Ethereum, Crypto News and Price Data",
  description:
    "The source for the latest cryptocurrency, Bitcoin, Ethereum, XRP, blockchain, Defi, digital finance, and Web 3.0 news with analysis, video, and live price updates.",
  image: "/logo.png",
  twitterhandler: "@CoinerImpact",
  website: "coinerimpact.com",
};

export const TOPICS = [
  Topic.blockchain,
  Topic.crypto,
  Topic.cyber,
  Topic.nft,
  Topic.web3,
];

export const COPYRIGHT = "© 2022 Coiner impact. All rights reserved.";
