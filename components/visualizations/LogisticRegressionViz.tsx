"use client";

import React, { useState } from "react";
import * as d3 from "d3";
import { useD3 } from "./useD3";

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

export default function LogisticRegressionViz() {
  const [threshold, setThreshold] = useState(0.5);

  const width = 300;
  const height = 250;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  const ref = useD3(
    (svg) => {
      const innerW = width - margin.left - margin.right;
      const innerH = height - margin.top - margin.bottom;

      const xScale = d3.scaleLinear().domain([-6, 6]).range([0, innerW]);
      const yScale = d3.scaleLinear().domain([0, 1]).range([innerH, 0]);

      const g = svg
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Region fills
      const thresholdX = Math.log(threshold / (1 - Math.max(threshold, 0.001)));
      const clampedTX = Math.max(-6, Math.min(6, thresholdX));

      // Below threshold region
      g.append("rect")
        .attr("x", 0)
        .attr("y", yScale(threshold))
        .attr("width", innerW)
        .attr("height", innerH - yScale(threshold))
        .attr("fill", "#FEE2E2")
        .attr("opacity", 0.5);

      // Above threshold region
      g.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", innerW)
        .attr("height", yScale(threshold))
        .attr("fill", "#D1FAE5")
        .attr("opacity", 0.5);

      // Axes
      g.append("g")
        .attr("transform", `translate(0,${innerH})`)
        .call(d3.axisBottom(xScale).ticks(6))
        .selectAll("text")
        .style("font-size", "9px");

      g.append("g")
        .call(d3.axisLeft(yScale).ticks(5))
        .selectAll("text")
        .style("font-size", "9px");

      // Sigmoid curve
      const curvePoints: [number, number][] = [];
      for (let x = -6; x <= 6; x += 0.1) {
        curvePoints.push([x, sigmoid(x)]);
      }

      const line = d3
        .line<[number, number]>()
        .x((d) => xScale(d[0]))
        .y((d) => yScale(d[1]))
        .curve(d3.curveBasis);

      g.append("path")
        .datum(curvePoints)
        .attr("fill", "none")
        .attr("stroke", "#8B5CF6")
        .attr("stroke-width", 2.5)
        .attr("d", line);

      // Threshold horizontal line
      g.append("line")
        .attr("x1", 0)
        .attr("y1", yScale(threshold))
        .attr("x2", innerW)
        .attr("y2", yScale(threshold))
        .attr("stroke", "#EF4444")
        .attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "5,3");

      // Threshold vertical line
      if (clampedTX > -6 && clampedTX < 6) {
        g.append("line")
          .attr("x1", xScale(clampedTX))
          .attr("y1", 0)
          .attr("x2", xScale(clampedTX))
          .attr("y2", innerH)
          .attr("stroke", "#EF4444")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "3,3")
          .attr("opacity", 0.5);
      }

      // Threshold label
      g.append("text")
        .attr("x", innerW - 5)
        .attr("y", yScale(threshold) - 5)
        .attr("text-anchor", "end")
        .attr("font-size", "9px")
        .attr("fill", "#EF4444")
        .text(`threshold = ${threshold.toFixed(2)}`);

      // Class labels
      g.append("text")
        .attr("x", 5)
        .attr("y", yScale(threshold) + 14)
        .attr("font-size", "9px")
        .attr("fill", "#DC2626")
        .text("Class 0");

      g.append("text")
        .attr("x", 5)
        .attr("y", yScale(threshold) - 6)
        .attr("font-size", "9px")
        .attr("fill", "#059669")
        .text("Class 1");

      // Sample classified points
      const samplePoints = [
        -4.5, -3.2, -2.0, -1.0, 0, 0.5, 1.5, 2.5, 3.5, 5.0,
      ];
      samplePoints.forEach((x) => {
        const y = sigmoid(x);
        g.append("circle")
          .attr("cx", xScale(x))
          .attr("cy", yScale(y))
          .attr("r", 3.5)
          .attr("fill", y >= threshold ? "#10B981" : "#EF4444")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1);
      });
    },
    [threshold]
  );

  return (
    <div className="w-full">
      <svg ref={ref} className="w-full h-auto" />
      <div className="flex items-center gap-2 mt-2 px-2">
        <label className="text-xs text-gray-600">Threshold:</label>
        <input
          type="range"
          min="0.05"
          max="0.95"
          step="0.05"
          value={threshold}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          className="flex-1 h-1.5 accent-purple-500"
        />
        <span className="text-xs font-mono text-gray-700 w-8">
          {threshold.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
