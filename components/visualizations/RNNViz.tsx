"use client";

import React, { useState } from "react";
import * as d3 from "d3";
import { useD3 } from "./useD3";

// Sample sequence for visualization
const sampleSequence = [15.2, 16.1, 17.8, 20.3, 22.1, 24.5, 26.8, 28.2, 29.1, 28.5];
const predictedNext = 27.3;

export default function RNNViz() {
  const [activeStep, setActiveStep] = useState(4);

  const width = 360;
  const height = 280;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  const ref = useD3(
    (svg) => {
      const g = svg
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const innerW = width - margin.left - margin.right;
      const innerH = height - margin.top - margin.bottom;

      const stepsToShow = Math.min(6, sampleSequence.length);
      const cellW = 35;
      const cellH = 30;
      const gap = 10;
      const totalW = stepsToShow * (cellW + gap) - gap;
      const startX = (innerW - totalW) / 2;
      const cellY = 20;

      // Title
      g.append("text")
        .attr("x", innerW / 2)
        .attr("y", 8)
        .attr("text-anchor", "middle")
        .attr("font-size", "9px")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .text("Unrolled RNN — Hidden State Flow");

      // Draw RNN cells
      for (let t = 0; t < stepsToShow; t++) {
        const x = startX + t * (cellW + gap);
        const isActive = t <= activeStep;
        const isCurrent = t === activeStep;

        // Cell box
        g.append("rect")
          .attr("x", x)
          .attr("y", cellY)
          .attr("width", cellW)
          .attr("height", cellH)
          .attr("rx", 6)
          .attr("fill", isCurrent ? "#8B5CF6" : isActive ? "#C4B5FD" : "#E5E7EB")
          .attr("stroke", isCurrent ? "#5B21B6" : isActive ? "#8B5CF6" : "#9CA3AF")
          .attr("stroke-width", isCurrent ? 2 : 1);

        // h_t label
        g.append("text")
          .attr("x", x + cellW / 2)
          .attr("y", cellY + cellH / 2 + 3)
          .attr("text-anchor", "middle")
          .attr("font-size", "8px")
          .attr("fill", isCurrent ? "#fff" : isActive ? "#4C1D95" : "#6B7280")
          .attr("font-weight", "bold")
          .text(`h${t + 1}`);

        // Arrow between cells
        if (t < stepsToShow - 1) {
          const arrowX = x + cellW;
          const arrowY = cellY + cellH / 2;
          g.append("line")
            .attr("x1", arrowX + 1)
            .attr("y1", arrowY)
            .attr("x2", arrowX + gap - 1)
            .attr("y2", arrowY)
            .attr("stroke", isActive ? "#8B5CF6" : "#D1D5DB")
            .attr("stroke-width", 1.5)
            .attr("marker-end", "url(#arrowhead)");
        }

        // Input arrow (from below)
        const inputY = cellY + cellH + 25;
        g.append("line")
          .attr("x1", x + cellW / 2)
          .attr("y1", inputY)
          .attr("x2", x + cellW / 2)
          .attr("y2", cellY + cellH + 2)
          .attr("stroke", isActive ? "#F59E0B" : "#D1D5DB")
          .attr("stroke-width", 1);

        // Input value
        g.append("text")
          .attr("x", x + cellW / 2)
          .attr("y", inputY + 10)
          .attr("text-anchor", "middle")
          .attr("font-size", "7px")
          .attr("fill", isActive ? "#92400E" : "#9CA3AF")
          .text(`${sampleSequence[t]}°`);

        // x_t label
        g.append("text")
          .attr("x", x + cellW / 2)
          .attr("y", inputY + 20)
          .attr("text-anchor", "middle")
          .attr("font-size", "7px")
          .attr("fill", isActive ? "#B45309" : "#9CA3AF")
          .attr("font-weight", "bold")
          .text(`x${t + 1}`);

        // Hidden state heatmap (small bar below cell)
        const heatY = cellY - 10;
        const heatVal = isActive ? Math.abs(Math.sin((t + 1) * 0.8)) : 0;
        g.append("rect")
          .attr("x", x + 2)
          .attr("y", heatY)
          .attr("width", cellW - 4)
          .attr("height", 5)
          .attr("rx", 2)
          .attr("fill", isActive
            ? d3.interpolateViridis(heatVal)
            : "#E5E7EB"
          )
          .attr("opacity", 0.8);
      }

      // Output arrow from last active cell
      const lastActiveX = startX + activeStep * (cellW + gap);
      g.append("line")
        .attr("x1", lastActiveX + cellW / 2)
        .attr("y1", cellY - 12)
        .attr("x2", lastActiveX + cellW / 2)
        .attr("y2", cellY - 25)
        .attr("stroke", "#EF4444")
        .attr("stroke-width", 1.5);

      g.append("text")
        .attr("x", lastActiveX + cellW / 2)
        .attr("y", cellY - 28)
        .attr("text-anchor", "middle")
        .attr("font-size", "8px")
        .attr("fill", "#DC2626")
        .attr("font-weight", "bold")
        .text(`ŷ = ${predictedNext}°`);

      // Arrowhead marker
      svg
        .append("defs")
        .append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 8)
        .attr("refY", 5)
        .attr("markerWidth", 5)
        .attr("markerHeight", 5)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("fill", "#8B5CF6");

      // Mini line chart: actual vs predicted
      const chartY = 140;
      const chartH = 80;
      const chartW = innerW;

      g.append("text")
        .attr("x", 0)
        .attr("y", chartY - 5)
        .attr("font-size", "8px")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .text("Temperature Sequence");

      const xScale = d3
        .scaleLinear()
        .domain([0, sampleSequence.length])
        .range([0, chartW]);

      const allVals = [...sampleSequence, predictedNext];
      const yScale = d3
        .scaleLinear()
        .domain([d3.min(allVals)! - 2, d3.max(allVals)! + 2])
        .range([chartY + chartH, chartY]);

      // X axis
      g.append("g")
        .attr("transform", `translate(0,${chartY + chartH})`)
        .call(d3.axisBottom(xScale).ticks(sampleSequence.length).tickFormat((d) => `t${d}`))
        .selectAll("text")
        .style("font-size", "7px");

      // Y axis
      g.append("g")
        .call(d3.axisLeft(yScale).ticks(4).tickFormat((d) => `${d}°`))
        .selectAll("text")
        .style("font-size", "7px");

      // Actual line
      const line = d3
        .line<number>()
        .x((_, i) => xScale(i))
        .y((d) => yScale(d));

      g.append("path")
        .datum(sampleSequence)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "#3B82F6")
        .attr("stroke-width", 1.5);

      // Points
      sampleSequence.forEach((v, i) => {
        g.append("circle")
          .attr("cx", xScale(i))
          .attr("cy", yScale(v))
          .attr("r", i <= activeStep ? 3 : 2)
          .attr("fill", i <= activeStep ? "#3B82F6" : "#93C5FD")
          .attr("stroke", "#fff")
          .attr("stroke-width", 0.5);
      });

      // Predicted point
      g.append("circle")
        .attr("cx", xScale(sampleSequence.length))
        .attr("cy", yScale(predictedNext))
        .attr("r", 4)
        .attr("fill", "#EF4444")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1);

      // Dashed line to prediction
      g.append("line")
        .attr("x1", xScale(sampleSequence.length - 1))
        .attr("y1", yScale(sampleSequence[sampleSequence.length - 1]))
        .attr("x2", xScale(sampleSequence.length))
        .attr("y2", yScale(predictedNext))
        .attr("stroke", "#EF4444")
        .attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "4,3");

      // Legend
      g.append("circle")
        .attr("cx", chartW - 80)
        .attr("cy", chartY + 5)
        .attr("r", 3)
        .attr("fill", "#3B82F6");
      g.append("text")
        .attr("x", chartW - 74)
        .attr("y", chartY + 8)
        .attr("font-size", "7px")
        .attr("fill", "#374151")
        .text("Actual");

      g.append("circle")
        .attr("cx", chartW - 40)
        .attr("cy", chartY + 5)
        .attr("r", 3)
        .attr("fill", "#EF4444");
      g.append("text")
        .attr("x", chartW - 34)
        .attr("y", chartY + 8)
        .attr("font-size", "7px")
        .attr("fill", "#374151")
        .text("Predicted");
    },
    [activeStep]
  );

  return (
    <div className="w-full">
      <svg ref={ref} className="w-full h-auto" />
      <div className="flex items-center gap-2 mt-2 px-2">
        <label className="text-xs text-gray-600">Timestep:</label>
        <input
          type="range"
          min="0"
          max={sampleSequence.length - 1}
          step="1"
          value={activeStep}
          onChange={(e) => setActiveStep(parseInt(e.target.value))}
          className="flex-1 h-1.5 accent-purple-500"
        />
        <span className="text-xs font-mono text-gray-700 w-10">
          t{activeStep + 1}
        </span>
      </div>
    </div>
  );
}
