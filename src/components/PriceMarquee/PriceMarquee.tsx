import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { SimpleGrid, Group, Text, Stack, Skeleton } from "@mantine/core";
import CoinNames from "./symbols.json";
import Image from "next/image";

export default function PriceMarquee({
  symbols = [
    "BTCUSDT",
    "ETHUSDT",
    "SHIBUSDT",
    "XRPUSDT",
    "SOLUSDT",
    "DOGEUSDT",
    "MATICUSDT",
    "BNBUSDT",
    "DAIUSDT",
  ],
}: {
  symbols?: string[];
}) {
  const [prices, setPrices] = useState<PriceComponentProps[]>([]);
  const url = `https://www.binance.com/api/v3/ticker/price?symbols=["${symbols.join(
    '","'
  )}"]`;

  const url2 = `https://www.binance.com/api/v3/ticker/24hr?symbols=["${symbols.join(
    '","'
  )}"]`;

  useEffect(() => {
    const getPrices = async () => {
      const percentagesResponse: { priceChangePercent: string }[] = await (
        await fetch(url2)
      ).json();
      const pricesResponse: { symbol: string; price: string }[] = await (
        await fetch(url)
      ).json();

      const formatedResponse = percentagesResponse.map(
        ({ priceChangePercent }, i) => ({
          percentage: priceChangePercent,
          symbol: pricesResponse[i].symbol,
          price: pricesResponse[i].price,
        })
      );

      formatedResponse && setPrices(formatedResponse);
    };
    getPrices();

    setInterval(getPrices, 60000);
  }, [url, url2]);
  if (prices.length > 0)
    return (
      <Marquee
        style={{
          borderRadius: "32px",
          overflow: "hidden",
          border: "1px solid #F5F5F5",
          background: "white",
        }}
        gradientWidth={0}
      >
        <SimpleGrid cols={9} spacing={0}>
          {prices.map((props, i) => (
            <PriceComponent key={i} {...props} />
          ))}
        </SimpleGrid>
      </Marquee>
    );
  return <Skeleton radius={"xl"} height={38} animate />;
}

function PriceComponent({ price, symbol, percentage }: PriceComponentProps) {
  const realPercentage = Number(percentage);
  const percentageDisplay =
    realPercentage > 0 ? (
      <Text size={10} color="green" weight={"bold"}>
        {(realPercentage / 100).toLocaleString("en-EN", {
          style: "percent",
          maximumFractionDigits: 2,
        })}
      </Text>
    ) : (
      <Text size={10} color="red" weight={"bold"}>
        {(realPercentage / 100).toLocaleString("en-EN", {
          style: "percent",
          maximumFractionDigits: 2,
        })}
      </Text>
    );

  return (
    <Group sx={{ borderLeft: "1px solid #f5f5f5" }} px={8} py={2}>
      <Image
        style={{ borderRadius: "50%" }}
        src={`/coins/${symbol}.png`} // @ts-ignore
        alt={CoinNames[symbol]}
        width="24"
        height="24"
      />
      <Stack spacing={0}>
        <Text size={12} weight={"bold"}>
          {
            // @ts-ignore
            CoinNames[symbol]
          }
        </Text>
        <Text size={10} color={"dimmed"} weight="bold">
          {symbol.slice(0, -4)}
        </Text>
      </Stack>
      <Stack sx={{ flexGrow: 1 }} align={"end"} spacing={0}>
        <Text size={10} weight={"bold"}>
          {Number(price).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 3,
          })}
        </Text>
        {percentageDisplay}
      </Stack>
    </Group>
  );
}

interface PriceComponentProps {
  symbol: string;
  price: string;
  percentage: string;
}
