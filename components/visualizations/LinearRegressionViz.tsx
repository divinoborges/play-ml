"use client";

import React, { useState } from "react";
import * as d3 from "d3";
import { useD3 } from "./useD3";

interface Point {
  x: number;
  y: number;
}

const defaultData: Point[] = [
  { x: 10, y: 25 },
  { x: 30, y: 50 },
  { x: 50, y: 65 },
  { x: 70, y: 90 },
  { x: 90, y: 100 },
  { x: 120, y: 130 },
  { x: 140, y: 145 },
  { x: 160, y: 170 },
  { x: 180, y: 180 },
  { x: 200, y: 210 },
  { x: 220, y: 195 },
  { x: 240, y: 230 },
  { x: 55, y: 80 },
  { x: 100, y: 115 },
  { x: 175, y: 160 },
];

interface LinearRegressionVizProps {
  data?: Point[];
}

function linearRegression(points: Point[]) {
  const n = points.length;
  const sumX = d3.sum(points, (d) => d.x);
  const sumY = d3.sum(points, (d) => d.y);
  const sumXY = d3.sum(points, (d) => d.x * d.y);
  const sumX2 = d3.sum(points, (d) => d.x * d.x);
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}

export default function LinearRegressionViz({
  data = defaultData,
}: LinearRegressionVizProps) {
  const [showResiduals, setShowResiduals] = useState(true);

  const width = 300;
  const height = 250;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  const ref = useD3(
    (svg) => {
      const innerW = width - margin.left - margin.right;
      const innerH = height - margin.top - margin.bottom;

      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.x)! * 1.1])
        .range([0, innerW]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.y)! * 1.1])
        .range([innerH, 0]);

      const g = svg
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Axes
      g.append("g")
        .attr("transform", `translate(0,${innerH})`)
        .call(d3.axisBottom(xScale).ticks(5))
        .selectAll("text")
        .style("font-size", "9px");

      g.append("g")
        .call(d3.axisLeft(yScale).ticks(5))
        .selectAll("text")
        .style("font-size", "9px");

      const { slope, intercept } = linearRegression(data);

      // Residual lines
      if (showResiduals) {
        g.selectAll(".residual")
          .data(data)
          .enter()
          .append("line")
          .attr("class", "residual")
          .attr("x1", (d) => xScale(d.x))
          .attr("y1", (d) => yScale(d.y))
          .attr("x2", (d) => xScale(d.x))
          .attr("y2", (d) => yScale(slope * d.x + intercept))
          .attr("stroke", "#F87171")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "3,3")
          .attr("opacity", 0)
          .transition()
          .delay(800)
          .duration(400)
          .attr("opacity", 0.7);
      }

      // Regression line (animated)
      const xMin = 0;
      const xMax = d3.max(data, (d) => d.x)! * 1.1;
      const lineData = [
        { x: xMin, y: slope * xMin + intercept },
        { x: xMax, y: slope * xMax + intercept },
      ];

      const line = g
        .append("line")
        .attr("x1", xScale(lineData[0].x))
        .attr("y1", yScale(lineData[0].y))
        .attr("x2", xScale(lineData[0].x))
        .attr("y2", yScale(lineData[0].y))
        .attr("stroke", "#F59E0B")
        .attr("stroke-width", 2);

      line
        .transition()
        .duration(700)
        .attr("x2", xScale(lineData[1].x))
        .attr("y2", yScale(lineData[1].y));

      // Data points
      g.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", (d) => xScale(d.x))
        .attr("cy", (d) => yScale(d.y))
        .attr("r", 0)
        .attr("fill", "#3B82F6")
        .attr("opacity", 0.8)
        .transition()
        .delay((_, i) => i * 40)
        .duration(300)
        .attr("r", 4);

      // Equation label
      g.append("text")
        .attr("x", innerW - 5)
        .attr("y", 15)
        .attr("text-anchor", "end")
        .attr("font-size", "10px")
        .attr("fill", "#6B7280")
        .text(`y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`);
    },
    [data, showResiduals]
  );

  return (
    <div className="w-full">
      <svg ref={ref} className="w-full h-auto" />
      <div className="flex items-center gap-2 mt-2 px-2">
        <label className="text-xs text-gray-600 flex items-center gap-1 cursor-pointer">
          <input
            type="checkbox"
            checked={showResiduals}
            onChange={(e) => setShowResiduals(e.target.checked)}
            className="rounded"
          />
          Show residuals
        </label>
      </div>
    </div>
  );
}
