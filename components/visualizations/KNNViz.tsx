"use client";

import React, { useState } from "react";
import * as d3 from "d3";
import { useD3 } from "./useD3";

interface DataPoint {
  x: number;
  y: number;
  cls: 0 | 1;
}

const sampleData: DataPoint[] = [
  { x: 30, y: 40, cls: 0 },
  { x: 50, y: 30, cls: 0 },
  { x: 40, y: 60, cls: 0 },
  { x: 60, y: 50, cls: 0 },
  { x: 25, y: 55, cls: 0 },
  { x: 45, y: 35, cls: 0 },
  { x: 35, y: 25, cls: 0 },
  { x: 55, y: 45, cls: 0 },
  { x: 150, y: 160, cls: 1 },
  { x: 170, y: 140, cls: 1 },
  { x: 160, y: 180, cls: 1 },
  { x: 180, y: 170, cls: 1 },
  { x: 140, y: 150, cls: 1 },
  { x: 190, y: 155, cls: 1 },
  { x: 165, y: 190, cls: 1 },
  { x: 100, y: 100, cls: 0 },
  { x: 110, y: 120, cls: 1 },
  { x: 90, y: 110, cls: 0 },
  { x: 120, y: 90, cls: 1 },
  { x: 80, y: 80, cls: 0 },
];

export default function KNNViz() {
  const [k, setK] = useState(3);
  const [queryPoint] = useState({ x: 105, y: 105 });

  const width = 300;
  const height = 250;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  const ref = useD3(
    (svg) => {
      const innerW = width - margin.left - margin.right;
      const innerH = height - margin.top - margin.bottom;

      const xScale = d3.scaleLinear().domain([0, 220]).range([0, innerW]);
      const yScale = d3.scaleLinear().domain([0, 220]).range([innerH, 0]);

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

      // Compute distances
      const distances = sampleData
        .map((p, i) => ({
          index: i,
          point: p,
          dist: Math.sqrt(
            (p.x - queryPoint.x) ** 2 + (p.y - queryPoint.y) ** 2
          ),
        }))
        .sort((a, b) => a.dist - b.dist);

      const neighbors = distances.slice(0, k);
      const maxNeighborDist = neighbors[neighbors.length - 1].dist;

      // K-radius circle
      const radiusPx = xScale(maxNeighborDist) - xScale(0);
      g.append("circle")
        .attr("cx", xScale(queryPoint.x))
        .attr("cy", yScale(queryPoint.y))
        .attr("r", 0)
        .attr("fill", "#8B5CF6")
        .attr("fill-opacity", 0.08)
        .attr("stroke", "#8B5CF6")
        .attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "4,3")
        .transition()
        .duration(500)
        .attr("r", radiusPx);

      // Lines from query to neighbors
      neighbors.forEach((n) => {
        g.append("line")
          .attr("x1", xScale(queryPoint.x))
          .attr("y1", yScale(queryPoint.y))
          .attr("x2", xScale(queryPoint.x))
          .attr("y2", yScale(queryPoint.y))
          .attr("stroke", "#C4B5FD")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "2,2")
          .transition()
          .duration(400)
          .attr("x2", xScale(n.point.x))
          .attr("y2", yScale(n.point.y));
      });

      // Data points
      const neighborIndices = new Set(neighbors.map((n) => n.index));

      sampleData.forEach((p, i) => {
        const isNeighbor = neighborIndices.has(i);
        g.append("circle")
          .attr("cx", xScale(p.x))
          .attr("cy", yScale(p.y))
          .attr("r", isNeighbor ? 5 : 3.5)
          .attr("fill", p.cls === 0 ? "#3B82F6" : "#10B981")
          .attr("stroke", isNeighbor ? "#1E1B4B" : "#fff")
          .attr("stroke-width", isNeighbor ? 2 : 1)
          .attr("opacity", isNeighbor ? 1 : 0.7);
      });

      // Query point
      g.append("circle")
        .attr("cx", xScale(queryPoint.x))
        .attr("cy", yScale(queryPoint.y))
        .attr("r", 6)
        .attr("fill", "#F59E0B")
        .attr("stroke", "#92400E")
        .attr("stroke-width", 2);

      g.append("text")
        .attr("x", xScale(queryPoint.x) + 10)
        .attr("y", yScale(queryPoint.y) - 8)
        .attr("font-size", "8px")
        .attr("fill", "#92400E")
        .text("query");

      // Vote result
      const class0Count = neighbors.filter((n) => n.point.cls === 0).length;
      const class1Count = k - class0Count;
      const predicted = class0Count >= class1Count ? 0 : 1;

      g.append("text")
        .attr("x", innerW - 5)
        .attr("y", 12)
        .attr("text-anchor", "end")
        .attr("font-size", "9px")
        .attr("fill", predicted === 0 ? "#3B82F6" : "#10B981")
        .attr("font-weight", "bold")
        .text(
          `Vote: Class ${predicted} (${class0Count}:${class1Count})`
        );
    },
    [k, queryPoint]
  );

  return (
    <div className="w-full">
      <svg ref={ref} className="w-full h-auto" />
      <div className="flex items-center gap-2 mt-2 px-2">
        <label className="text-xs text-gray-600">K:</label>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={k}
          onChange={(e) => setK(parseInt(e.target.value))}
          className="flex-1 h-1.5 accent-purple-500"
        />
        <span className="text-xs font-mono text-gray-700 w-6">{k}</span>
      </div>
    </div>
  );
}
