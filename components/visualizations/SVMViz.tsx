"use client";

import React, { useState } from "react";
import * as d3 from "d3";
import { useD3 } from "./useD3";

interface DataPoint {
  x: number;
  y: number;
  cls: -1 | 1;
}

const sampleData: DataPoint[] = [
  // Class -1 (below)
  { x: 20, y: 30, cls: -1 },
  { x: 40, y: 20, cls: -1 },
  { x: 60, y: 40, cls: -1 },
  { x: 30, y: 50, cls: -1 },
  { x: 50, y: 35, cls: -1 },
  { x: 70, y: 55, cls: -1 },
  { x: 45, y: 15, cls: -1 },
  { x: 80, y: 45, cls: -1 },
  { x: 25, y: 10, cls: -1 },
  // Class +1 (above)
  { x: 60, y: 130, cls: 1 },
  { x: 80, y: 140, cls: 1 },
  { x: 100, y: 120, cls: 1 },
  { x: 120, y: 150, cls: 1 },
  { x: 140, y: 135, cls: 1 },
  { x: 90, y: 155, cls: 1 },
  { x: 110, y: 160, cls: 1 },
  { x: 130, y: 145, cls: 1 },
  { x: 70, y: 115, cls: 1 },
  // Support vectors (close to boundary)
  { x: 70, y: 70, cls: -1 },
  { x: 90, y: 95, cls: 1 },
  { x: 100, y: 80, cls: -1 },
];

export default function SVMViz() {
  const [cParam, setCParam] = useState(1.0);

  const width = 300;
  const height = 250;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  const ref = useD3(
    (svg) => {
      const innerW = width - margin.left - margin.right;
      const innerH = height - margin.top - margin.bottom;

      const xScale = d3.scaleLinear().domain([0, 170]).range([0, innerW]);
      const yScale = d3.scaleLinear().domain([0, 180]).range([innerH, 0]);

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

      // Decision boundary: y = 0.3x + 60 (roughly separating the data)
      const slope = 0.3;
      const intercept = 60;
      const marginWidth = 30 / cParam; // margin inversely proportional to C

      // Fill margin region
      const marginPoly = [
        { x: 0, y: slope * 0 + intercept + marginWidth },
        { x: 170, y: slope * 170 + intercept + marginWidth },
        { x: 170, y: slope * 170 + intercept - marginWidth },
        { x: 0, y: slope * 0 + intercept - marginWidth },
      ];

      g.append("polygon")
        .attr(
          "points",
          marginPoly
            .map((p) => `${xScale(p.x)},${yScale(p.y)}`)
            .join(" ")
        )
        .attr("fill", "#8B5CF6")
        .attr("fill-opacity", 0.1);

      // Decision boundary line
      g.append("line")
        .attr("x1", xScale(0))
        .attr("y1", yScale(slope * 0 + intercept))
        .attr("x2", xScale(170))
        .attr("y2", yScale(slope * 170 + intercept))
        .attr("stroke", "#8B5CF6")
        .attr("stroke-width", 2);

      // Margin lines
      g.append("line")
        .attr("x1", xScale(0))
        .attr("y1", yScale(slope * 0 + intercept + marginWidth))
        .attr("x2", xScale(170))
        .attr("y2", yScale(slope * 170 + intercept + marginWidth))
        .attr("stroke", "#8B5CF6")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4,3");

      g.append("line")
        .attr("x1", xScale(0))
        .attr("y1", yScale(slope * 0 + intercept - marginWidth))
        .attr("x2", xScale(170))
        .attr("y2", yScale(slope * 170 + intercept - marginWidth))
        .attr("stroke", "#8B5CF6")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4,3");

      // Identify support vectors: points within or near the margin
      const supportVectorIndices = new Set<number>();
      sampleData.forEach((p, i) => {
        const boundaryY = slope * p.x + intercept;
        const distToBoundary = Math.abs(p.y - boundaryY);
        if (distToBoundary <= marginWidth + 8) {
          supportVectorIndices.add(i);
        }
      });

      // Data points
      sampleData.forEach((p, i) => {
        const isSV = supportVectorIndices.has(i);
        g.append("circle")
          .attr("cx", xScale(p.x))
          .attr("cy", yScale(p.y))
          .attr("r", isSV ? 5 : 3.5)
          .attr("fill", p.cls === -1 ? "#3B82F6" : "#10B981")
          .attr("stroke", isSV ? "#1E1B4B" : "#fff")
          .attr("stroke-width", isSV ? 2 : 1)
          .attr("opacity", isSV ? 1 : 0.7);

        // Mark support vectors with a square outline
        if (isSV) {
          g.append("rect")
            .attr("x", xScale(p.x) - 8)
            .attr("y", yScale(p.y) - 8)
            .attr("width", 16)
            .attr("height", 16)
            .attr("fill", "none")
            .attr("stroke", "#F59E0B")
            .attr("stroke-width", 1.5)
            .attr("rx", 2);
        }
      });

      // Labels
      g.append("text")
        .attr("x", innerW - 5)
        .attr("y", 12)
        .attr("text-anchor", "end")
        .attr("font-size", "8px")
        .attr("fill", "#6B7280")
        .text(`C = ${cParam.toFixed(1)} | margin = ${(marginWidth * 2).toFixed(0)}`);

      g.append("text")
        .attr("x", innerW - 5)
        .attr("y", 24)
        .attr("text-anchor", "end")
        .attr("font-size", "7px")
        .attr("fill", "#F59E0B")
        .text(`■ support vectors: ${supportVectorIndices.size}`);
    },
    [cParam]
  );

  return (
    <div className="w-full">
      <svg ref={ref} className="w-full h-auto" />
      <div className="flex items-center gap-2 mt-2 px-2">
        <label className="text-xs text-gray-600">C param:</label>
        <input
          type="range"
          min="0.2"
          max="5"
          step="0.2"
          value={cParam}
          onChange={(e) => setCParam(parseFloat(e.target.value))}
          className="flex-1 h-1.5 accent-purple-500"
        />
        <span className="text-xs font-mono text-gray-700 w-8">
          {cParam.toFixed(1)}
        </span>
      </div>
    </div>
  );
}
