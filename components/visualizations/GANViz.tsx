"use client";

import React, { useState } from "react";
import * as d3 from "d3";
import { useD3 } from "./useD3";

// Sample real ring distribution
const realPoints: [number, number][] = [];
for (let i = 0; i < 60; i++) {
  const angle = (2 * Math.PI * i) / 60;
  const r = 3 + (Math.sin(i * 7) * 0.3);
  realPoints.push([r * Math.cos(angle), r * Math.sin(angle)]);
}

// Simulate generator outputs at different training stages
function generateFakePoints(epoch: number): [number, number][] {
  const points: [number, number][] = [];
  const progress = Math.min(epoch / 10, 1);

  for (let i = 0; i < 40; i++) {
    if (progress < 0.1) {
      // Random noise
      points.push([(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8]);
    } else if (progress < 0.4) {
      // Starting to cluster toward center
      const spread = 4 * (1 - progress);
      const angle = Math.random() * 2 * Math.PI;
      const r = Math.random() * spread;
      points.push([r * Math.cos(angle), r * Math.sin(angle)]);
    } else {
      // Converging toward ring
      const angle = (2 * Math.PI * i) / 40 + (Math.random() - 0.5) * (1 - progress) * 2;
      const targetR = 3;
      const noise = (1 - progress) * 2;
      const r = targetR + (Math.random() - 0.5) * noise;
      points.push([r * Math.cos(angle), r * Math.sin(angle)]);
    }
  }
  return points;
}

// Simulated loss curves
const gLosses: number[] = [];
const dLosses: number[] = [];
for (let i = 0; i <= 12; i++) {
  gLosses.push(2.5 * Math.exp(-i * 0.15) + 0.7 + Math.sin(i * 0.5) * 0.15);
  dLosses.push(0.5 + 0.3 * Math.exp(-i * 0.1) + Math.sin(i * 0.7) * 0.1);
}

export default function GANViz() {
  const [epoch, setEpoch] = useState(6);
  const maxEpoch = 12;

  const width = 360;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  const ref = useD3(
    (svg) => {
      const innerW = width - margin.left - margin.right;
      const innerH = height - margin.top - margin.bottom;

      const g = svg
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // --- Scatter plot (top half) ---
      const scatterH = 140;
      const xScale = d3.scaleLinear().domain([-5, 5]).range([0, innerW]);
      const yScale = d3.scaleLinear().domain([-5, 5]).range([scatterH, 0]);

      // Title
      g.append("text")
        .attr("x", innerW / 2)
        .attr("y", 8)
        .attr("text-anchor", "middle")
        .attr("font-size", "9px")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .text("Real vs Generated Distribution");

      // Axes
      g.append("g")
        .attr("transform", `translate(0,${scatterH})`)
        .call(d3.axisBottom(xScale).ticks(5))
        .selectAll("text")
        .style("font-size", "7px");

      g.append("g")
        .call(d3.axisLeft(yScale).ticks(5))
        .selectAll("text")
        .style("font-size", "7px");

      // Real points
      realPoints.forEach(([x, y]) => {
        g.append("circle")
          .attr("cx", xScale(x))
          .attr("cy", yScale(y))
          .attr("r", 2.5)
          .attr("fill", "#3B82F6")
          .attr("opacity", 0.5);
      });

      // Generated points
      const fakePoints = generateFakePoints(epoch);
      fakePoints.forEach(([x, y]) => {
        g.append("circle")
          .attr("cx", xScale(x))
          .attr("cy", yScale(y))
          .attr("r", 2.5)
          .attr("fill", "#F59E0B")
          .attr("opacity", 0.7);
      });

      // Legend
      const legendX = innerW - 90;
      g.append("circle").attr("cx", legendX).attr("cy", 18).attr("r", 3).attr("fill", "#3B82F6");
      g.append("text").attr("x", legendX + 6).attr("y", 21).attr("font-size", "7px").attr("fill", "#374151").text("Real");
      g.append("circle").attr("cx", legendX + 40).attr("cy", 18).attr("r", 3).attr("fill", "#F59E0B");
      g.append("text").attr("x", legendX + 46).attr("y", 21).attr("font-size", "7px").attr("fill", "#374151").text("Generated");

      // Epoch label
      g.append("text")
        .attr("x", 5)
        .attr("y", 18)
        .attr("font-size", "8px")
        .attr("fill", "#6B7280")
        .text(`Epoch ${epoch * 50}`);

      // --- Loss chart (bottom half) ---
      const chartY = scatterH + 40;
      const chartH = innerH - chartY;
      const chartW = innerW;

      g.append("text")
        .attr("x", 0)
        .attr("y", chartY - 5)
        .attr("font-size", "8px")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .text("G/D Loss");

      const lxScale = d3.scaleLinear().domain([0, maxEpoch]).range([0, chartW]);
      const allLosses = [...gLosses.slice(0, epoch + 1), ...dLosses.slice(0, epoch + 1)];
      const lyScale = d3
        .scaleLinear()
        .domain([0, d3.max(allLosses)! * 1.1])
        .range([chartY + chartH, chartY]);

      g.append("g")
        .attr("transform", `translate(0,${chartY + chartH})`)
        .call(d3.axisBottom(lxScale).ticks(6).tickFormat((d) => `${Number(d) * 50}`))
        .selectAll("text")
        .style("font-size", "7px");

      g.append("g")
        .call(d3.axisLeft(lyScale).ticks(3))
        .selectAll("text")
        .style("font-size", "7px");

      // G loss line
      const gLine = d3.line<number>()
        .x((_, i) => lxScale(i))
        .y((d) => lyScale(d));

      if (epoch > 0) {
        g.append("path")
          .datum(gLosses.slice(0, epoch + 1))
          .attr("d", gLine)
          .attr("fill", "none")
          .attr("stroke", "#F59E0B")
          .attr("stroke-width", 1.5);

        g.append("path")
          .datum(dLosses.slice(0, epoch + 1))
          .attr("d", gLine)
          .attr("fill", "none")
          .attr("stroke", "#8B5CF6")
          .attr("stroke-width", 1.5);
      }

      // Loss legend
      g.append("line").attr("x1", chartW - 80).attr("y1", chartY + 5).attr("x2", chartW - 68).attr("y2", chartY + 5).attr("stroke", "#F59E0B").attr("stroke-width", 1.5);
      g.append("text").attr("x", chartW - 65).attr("y", chartY + 8).attr("font-size", "7px").attr("fill", "#374151").text("G Loss");
      g.append("line").attr("x1", chartW - 35).attr("y1", chartY + 5).attr("x2", chartW - 23).attr("y2", chartY + 5).attr("stroke", "#8B5CF6").attr("stroke-width", 1.5);
      g.append("text").attr("x", chartW - 20).attr("y", chartY + 8).attr("font-size", "7px").attr("fill", "#374151").text("D Loss");
    },
    [epoch]
  );

  return (
    <div className="w-full">
      <svg ref={ref} className="w-full h-auto" />
      <div className="flex items-center gap-2 mt-2 px-2">
        <label className="text-xs text-gray-600">Epoch:</label>
        <input
          type="range"
          min="0"
          max={maxEpoch}
          step="1"
          value={epoch}
          onChange={(e) => setEpoch(parseInt(e.target.value))}
          className="flex-1 h-1.5 accent-purple-500"
        />
        <span className="text-xs font-mono text-gray-700 w-10">
          {epoch * 50}
        </span>
      </div>
    </div>
  );
}
