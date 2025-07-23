"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { generateFarmerInsights } from "@/lib/helper-logic";
import { FarmerLoans, FarmerOverview, Transaction, Transfer } from "@/lib/types";

interface FarmerInsightCardProps {
  overview: FarmerOverview;
  transactions: Transaction[];
  transfers: Transfer[];
}

export function FarmerInsightCard({ overview, transactions, transfers}: FarmerInsightCardProps) {
const insights = generateFarmerInsights(overview, transactions, transfers);

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
    <Card className="w-full dark:bg-card rounded-[12px] border border-[#eff3e4]">
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
            {insights.map((insight, index) => (
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
