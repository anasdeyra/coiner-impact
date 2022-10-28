import { FaFacebook, FaLinkedin, FaTwitter, FaLink } from "react-icons/fa";
import { ActionIcon } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import showNotification from "src/utils/showNotification";
import { NextLink } from "@mantine/next";

export default function ShareIcons({ link }: { link: string }) {
  const { copy, copied } = useClipboard();
  return (
    <>
      <ActionIcon
        onClick={() => {
          copy(link);
          showNotification({
            title: "link was copied to your clipboard",
            message: link,
          });
        }}
        variant="transparent"
      >
        <FaLink color="#111" size={18} />
      </ActionIcon>
      <ActionIcon
        component="a"
        href={`https://twitter.com/intent/tweet?url=${link}`}
        target={"_blank"}
        variant="transparent"
      >
        <FaTwitter color="#00acee" size={18} />
      </ActionIcon>
      <ActionIcon
        component={"a"}
        href={` https://www.linkedin.com/sharing/share-offsite/?url=${link}`}
        target="_blank"
        variant="transparent"
      >
        <FaLinkedin color="#0072b1" size={18} />
      </ActionIcon>
      <ActionIcon
        component="a"
        href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
        target="_blank"
        variant="transparent"
      >
        <FaFacebook color="#4267B2" size={18} />
      </ActionIcon>
    </>
  );
}
