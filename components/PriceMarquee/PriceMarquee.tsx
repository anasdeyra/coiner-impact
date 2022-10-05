import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Avatar, Group, Text, Stack, Divider } from "@mantine/core";
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

  const getPrices = async () => {
    const percentagesResponse: { priceChangePercent: string }[] = await (
      await fetch(url2)
    ).json();
    const pricesResponse: { symbol: string; price: string }[] = await (
      await fetch(url)
    ).json();

    const x = percentagesResponse.map(({ priceChangePercent }, i) => ({
      percentage: priceChangePercent,
      symbol: pricesResponse[i].symbol,
      price: pricesResponse[i].price,
    }));

    x && setPrices(x);
  };

  useEffect(() => {
    getPrices();

    setInterval(getPrices, 60000);
  }, []);
  if (prices.length > 0)
    return (
      <Marquee
        style={{
          borderRadius: "32px",
          overflow: "hidden",
          border: "1px solid #F5F5F5",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <Group spacing={0}>
          {prices.map((props, i) => (
            <>
              <PriceComponent key={i} {...props} />
              <Divider orientation="vertical" color={"#f5f5f5"} />
            </>
          ))}
        </Group>
      </Marquee>
    );
  return <></>;
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
    <Group px={16} py={8}>
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
      <Stack align={"end"} spacing={0}>
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
