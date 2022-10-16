import { TOPICS } from "@const";
import { Button, createStyles } from "@mantine/core";
import { ReactNode } from "react";

const useStyles = createStyles((t) => ({}));

export default function TopicsFilter() {
  const { classes } = useStyles();
  return (
    <>
      <Topic isActive>All</Topic>
      {TOPICS.map((topic) => (
        <Topic>{topic}</Topic>
      ))}
    </>
  );
}

function Topic({
  isActive = false,
  children,
}: {
  isActive?: boolean;
  children: ReactNode;
}) {
  return (
    <Button
      color={"dark"}
      variant={isActive ? "filled" : "outline"}
      radius={"xl"}
    >
      {children}
    </Button>
  );
}
