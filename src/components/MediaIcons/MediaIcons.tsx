import { ActionIcon } from "@mantine/core";
import Link from "next/link";
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
        <Link key={i} passHref href={link}>
          <ActionIcon variant="light" radius={"xl"}>
            <Icon size={16} color={color} />
          </ActionIcon>
        </Link>
      ))}
    </>
  );
}

const MEDIAS = [
  { link: "#", Icon: FaYoutube, color: "#f00" },
  { link: "#", Icon: FaTwitter, color: "#00acee" },
  { link: "#", Icon: FaLinkedin, color: "#0072b1" },
  { link: "#", Icon: FaInstagram, color: "#FF4370" },
  { link: "#", Icon: FaTiktok, color: "#000" },
  { link: "#", Icon: FaDiscord, color: "#7289da" },
  { link: "#", Icon: FaFacebook, color: "#4267B2" },
];
