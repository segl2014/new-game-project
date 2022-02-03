import React from "react";
import { Card } from "antd";
import image1 from "./images/clubs.jpg";
import image2 from "./images/diamond.jpg";
import image3 from "./images/hearts.jpg";
import image4 from "./images/spades.jpg";

export default function PlayingCard({
  option = "0",
  width = "150px",
  height = "150px",
}) {
  return (
    <Card
      style={{ width: width, height: height }}
      className="m-1 p-0"
      bodyStyle={{ padding: "0px" }}
    >
      {option === "0" && <img src={image1} alt="..." width="100%" />}
      {option === "1" && <img src={image2} alt="..." width="100%" />}
      {option === "2" && <img src={image3} alt="..." width="100%" />}
      {option === "3" && <img src={image4} alt="..." width="100%" />}
    </Card>
  );
}
