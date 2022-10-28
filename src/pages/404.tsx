import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
  Image,
} from "@mantine/core";
import { NextLink } from "@mantine/next";

const useStyles = createStyles((theme) => ({
  root: {
    paddingBottom: 80,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
  img: {
    maxWidth: 700,
    margin: "auto",
  },
}));

export default function _404() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Group position="center">
        <Button
          component={NextLink}
          href={"/"}
          color={"dark"}
          variant="subtle"
          size="md"
        >
          Take me back to home page
        </Button>
      </Group>
      <Image className={classes.img} src={"/404.svg"} />
    </Container>
  );
}
