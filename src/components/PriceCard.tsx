import React from "react";
import CardItem from "./CardItem";

function PriceCard() {
  return (
    <div className="py-32 grid grid-cols-1 xl:grid-cols-3 items-center container mx-auto gap-10 xl:gap-0">
      <CardItem
        detail={["Free 1 EA Key", "Free 30 Day/Key"]}
        price={2190}
        name="Beginner"
      />

      <CardItem
        detail={["Free 3 EA Key", "Free 30 Day/Key"]}
        price={6490}
        name="Intermediate"
        pop={true}
      />
      <CardItem
        detail={["Free 5 EA Key", "Free 30 Day/Key"]}
        price={10000}
        name="Professional"
      />
    </div>
  );
}

export default PriceCard;
