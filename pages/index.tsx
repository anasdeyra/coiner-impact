import { Container } from "@mantine/core";
import PriceMarquee from "../components/PriceMarquee/PriceMarquee";

const Home = () => {
  return (
    <Container size={"xl"} mt={48}>
      <PriceMarquee />
    </Container>
  );
};

export default Home;
