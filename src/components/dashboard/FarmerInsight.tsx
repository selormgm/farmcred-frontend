"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  BadgeDollarSign,
  PiggyBank,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const farmerInsights = [
  {
    icon: BadgeDollarSign,
    title: "Week 4 Peak Income",
    message: "You earned the most during Week 4 — great job!",
  },
  {
    icon: TrendingDown,
    title: "Lower Expenses",
    message: "Your expenses dropped 15% last week. Keep it up!",
  },
  {
    icon: TrendingUp,
    title: "Transfers Up",
    message: "You've received 12% more transfers this month.",
  },
  {
    icon: PiggyBank,
    title: "Savings Boost",
    message: "Your average balance is growing steadily.",
  },
  {
    icon: ArrowUpRight,
    title: "Income Trending Up",
    message: "Your income has been increasing week over week.",
  },
];

export function FarmerInsightCard() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Card className="w-full bg-[#eff3e4] dark:bg-card rounded-[12px] border">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-[#158f20]">
          Quick Insights
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col px-2 relative">
        <Carousel
          plugins={[
            Autoplay({
              delay: 8000,
            }),
          ]}
          setApi={setApi}
          className="w-full h-full"
        >
          <CarouselContent>
            {farmerInsights.map((insight, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="flex flex-col h-full justify-center items-center gap-3 text-center px-4">
                  <insight.icon className="w-20 h-20 text-[#158f20]" />
                  <p className="text-base font-semibold text-[#157148]">
                    {insight.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {insight.message}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>

        <div className="text-muted-foreground pt-3 text-center text-xs">
          Slide {current} of {count}
        </div>
      </CardContent>
    </Card>
  );
}
