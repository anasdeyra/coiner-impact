import { TOPICS } from "@const";
import { Button, createStyles } from "@mantine/core";
import { ReactNode } from "react";

const useStyles = createStyles((t) => ({}));

export default function TopicsFilter({ setTopic, topic }: Props) {
  const { classes } = useStyles();
  return (
    <>
      <Topic
        onClick={() => {
          setTopic(undefined);
        }}
        isActive={typeof topic === "undefined"}
      >
        All
      </Topic>
      {TOPICS.map((t) => (
        <Topic
          onClick={() => {
            setTopic(t);
          }}
          isActive={topic === t}
          key={t}
        >
          {t}
        </Topic>
      ))}
    </>
  );
}

function Topic({
  isActive = false,
  children,
  onClick,
}: {
  isActive?: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      color={"dark"}
      variant={isActive ? "filled" : "outline"}
      radius={"xl"}
      onClick={onClick}
      sx={{ textTransform: "uppercase" }}
    >
      {children}
    </Button>
  );
}

interface Props {
  topic?: string;
  setTopic: any;
}
