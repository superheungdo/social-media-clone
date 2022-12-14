import React from "react";
import "./TrendCard.css";

import { trends } from "../../data/trendData.js";

const TrendCard = () => {
  return (
    <div className="TrendCard">
      <h3>Trends for you</h3>

      {trends.map((trend) => {
        return (
          <div key={trend.id} className="trend">
            <span>#{trend.name}</span>
            <span>{trend.shares}k shares</span>
          </div>
        );
      })}
    </div>
  );
};

export default TrendCard;
