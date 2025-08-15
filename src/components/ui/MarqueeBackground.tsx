"use client";

import { Marquee } from "@/components/ui/Marquee";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";

const marqueeItems = [
    {
      title: "Orange",
      img: "https://picsum.photos/id/1011/200/140",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "https://picsum.photos/id/1012/200/140",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "https://picsum.photos/id/1013/200/140",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "https://picsum.photos/id/1014/200/140",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "https://picsum.photos/id/1015/200/140",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "https://picsum.photos/id/1016/200/140",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "https://picsum.photos/id/1017/200/140",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "https://picsum.photos/id/1018/200/140",
      price: "$12.20",
    },
  ];

const firstRow = marqueeItems.slice(0, marqueeItems.length / 2);
const secondRow = marqueeItems.slice(marqueeItems.length / 2);

export function MarqueeBackground() {
  return (
    <div>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((item, index) => (
            <Card key={index} isPressable shadow="sm" onPress={() => console.log("item pressed")}>
              <CardBody className="overflow-visible p-0">
                <Image
                  alt={item.title}
                  className="w-full object-cover h-[140px]"
                  radius="lg"
                  shadow="sm"
                  src={item.img}
                  width="100%"
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.title}</b>
                <p className="text-default-500">{item.price}</p>
              </CardFooter>
            </Card>
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((item, index) => (
            <Card key={index} isPressable shadow="sm" onPress={() => console.log("item pressed")}>
              <CardBody className="overflow-visible p-0">
                <Image
                  alt={item.title}
                  className="w-full object-cover h-[140px]"
                  radius="lg"
                  shadow="sm"
                  src={item.img}
                  width="100%"
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.title}</b>
                <p className="text-default-500">{item.price}</p>
              </CardFooter>
            </Card>
        ))}
      </Marquee>
    </div>
  );
}
