import { ActionIcon } from "@mantine/core";
import { NextLink } from "@mantine/next";
import {
  FaFacebookSquare as FaFacebook,
  FaInstagram,
  FaDiscord,
  FaTiktok,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

export default function MediaIcons() {
  return (
    <>
      {MEDIAS.map(({ Icon, link, color }, i) => (
        <NextLink key={i} target="_blank" href={link}>
          <ActionIcon variant="light" radius={"xl"}>
            <Icon size={16} color={color} />
          </ActionIcon>
        </NextLink>
      ))}
    </>
  );
}

const MEDIAS = [
  {
    link: "https://www.youtube.com/channel/UCFtmHT5RXkuckRqCVgHgdOQ",
    Icon: FaYoutube,
    color: "#f00",
  },
  {
    link: "https://twitter.com/CoinerImpact",
    Icon: FaTwitter,
    color: "#00acee",
  },
  {
    link: "https://www.linkedin.com/company/coiner-impact/",
    Icon: FaLinkedin,
    color: "#0072b1",
  },
  {
    link: "https://www.instagram.com/coinerimpact1/",
    Icon: FaInstagram,
    color: "#FF4370",
  },
  {
    link: "https://www.tiktok.com/@coinerimpact",
    Icon: FaTiktok,
    color: "#000",
  },
  { link: "#", Icon: FaDiscord, color: "#7289da" },
  {
    link: "https://www.facebook.com/CoinerImpact/",
    Icon: FaFacebook,
    color: "#4267B2",
  },
];
