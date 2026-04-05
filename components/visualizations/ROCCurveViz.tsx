"use client";

import React, { useState } from "react";
import * as d3 from "d3";
import { useD3 } from "./useD3";

// Pre-computed example ROC curve for a decent classifier (AUC ≈ 0.85)
const rocPoints = [
  { fpr: 0, tpr: 0, threshold: 1.0 },
  { fpr: 0.02, tpr: 0.18, threshold: 0.9 },
  { fpr: 0.05, tpr: 0.38, threshold: 0.8 },
  { fpr: 0.08, tpr: 0.52, threshold: 0.7 },
  { fpr: 0.12, tpr: 0.65, threshold: 0.6 },
  { fpr: 0.18, tpr: 0.75, threshold: 0.5 },
  { fpr: 0.25, tpr: 0.82, threshold: 0.4 },
  { fpr: 0.35, tpr: 0.88, threshold: 0.3 },
  { fpr: 0.50, tpr: 0.93, threshold: 0.2 },
  { fpr: 0.70, tpr: 0.97, threshold: 0.1 },
  { fpr: 1.0, tpr: 1.0, threshold: 0.0 },
];

export default function ROCCurveViz() {
  const [selectedIdx, setSelectedIdx] = useState(5); // default threshold 0.5

  const width = 320;
  const height = 280;
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };

  const ref = useD3(
    (svg) => {
      const innerW = width - margin.left - margin.right;
      const innerH = height - margin.top - margin.bottom;

      const xScale = d3.scaleLinear().domain([0, 1]).range([0, innerW]);
      const yScale = d3.scaleLinear().domain([0, 1]).range([innerH, 0]);

      const g = svg
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Grid lines
      g.append("g")
        .attr("class", "grid")
        .selectAll("line")
        .data([0.25, 0.5, 0.75])
        .join("line")
        .attr("x1", (d) => xScale(d))
        .attr("x2", (d) => xScale(d))
        .attr("y1", 0)
        .attr("y2", innerH)
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.06)
        .attr("stroke-dasharray", "2,4");

      g.append("g")
        .selectAll("line")
        .data([0.25, 0.5, 0.75])
        .join("line")
        .attr("x1", 0)
        .attr("x2", innerW)
        .attr("y1", (d) => yScale(d))
        .attr("y2", (d) => yScale(d))
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.06)
        .attr("stroke-dasharray", "2,4");

      // Axes
      g.append("g")
        .attr("transform", `translate(0,${innerH})`)
        .call(d3.axisBottom(xScale).ticks(5).tickFormat(d3.format(".1f")))
        .call((g) => g.select(".domain").attr("stroke", "#000").attr("stroke-width", 2))
        .call((g) => g.selectAll(".tick text").attr("font-family", "'Space Mono', monospace").attr("font-size", "10px"));

      g.append("g")
        .call(d3.axisLeft(yScale).ticks(5).tickFormat(d3.format(".1f")))
        .call((g) => g.select(".domain").attr("stroke", "#000").attr("stroke-width", 2))
        .call((g) => g.selectAll(".tick text").attr("font-family", "'Space Mono', monospace").attr("font-size", "10px"));

      // Axis labels
      g.append("text")
        .attr("x", innerW / 2)
        .attr("y", innerH + 32)
        .attr("text-anchor", "middle")
        .attr("font-family", "'Space Mono', monospace")
        .attr("font-size", "10px")
        .attr("font-weight", "bold")
        .text("FPR");

      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerH / 2)
        .attr("y", -38)
        .attr("text-anchor", "middle")
        .attr("font-family", "'Space Mono', monospace")
        .attr("font-size", "10px")
        .attr("font-weight", "bold")
        .text("TPR");

      // Diagonal baseline (random classifier)
      g.append("line")
        .attr("x1", xScale(0))
        .attr("y1", yScale(0))
        .attr("x2", xScale(1))
        .attr("y2", yScale(1))
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.25)
        .attr("stroke-dasharray", "6,4")
        .attr("stroke-width", 1.5);

      // AUC shaded area
      const areaGen = d3
        .area<(typeof rocPoints)[0]>()
        .x((d) => xScale(d.fpr))
        .y0(innerH)
        .y1((d) => yScale(d.tpr))
        .curve(d3.curveMonotoneX);

      g.append("path")
        .datum(rocPoints)
        .attr("d", areaGen)
        .attr("fill", "#3B82F6")
        .attr("fill-opacity", 0.12);

      // ROC curve line
      const lineGen = d3
        .line<(typeof rocPoints)[0]>()
        .x((d) => xScale(d.fpr))
        .y((d) => yScale(d.tpr))
        .curve(d3.curveMonotoneX);

      g.append("path")
        .datum(rocPoints)
        .attr("d", lineGen)
        .attr("fill", "none")
        .attr("stroke", "#3B82F6")
        .attr("stroke-width", 3);

      // Curve points
      g.selectAll("circle.roc-point")
        .data(rocPoints)
        .join("circle")
        .attr("class", "roc-point")
        .attr("cx", (d) => xScale(d.fpr))
        .attr("cy", (d) => yScale(d.tpr))
        .attr("r", (_, i) => (i === selectedIdx ? 7 : 3))
        .attr("fill", (_, i) => (i === selectedIdx ? "#F97316" : "#3B82F6"))
        .attr("stroke", (_, i) => (i === selectedIdx ? "#000" : "none"))
        .attr("stroke-width", (_, i) => (i === selectedIdx ? 2 : 0))
        .style("cursor", "pointer");

      // Selected point crosshairs
      const sel = rocPoints[selectedIdx];
      g.append("line")
        .attr("x1", xScale(sel.fpr))
        .attr("x2", xScale(sel.fpr))
        .attr("y1", yScale(sel.tpr))
        .attr("y2", innerH)
        .attr("stroke", "#F97316")
        .attr("stroke-dasharray", "4,3")
        .attr("stroke-width", 1.5)
        .attr("stroke-opacity", 0.6);

      g.append("line")
        .attr("x1", 0)
        .attr("x2", xScale(sel.fpr))
        .attr("y1", yScale(sel.tpr))
        .attr("y2", yScale(sel.tpr))
        .attr("stroke", "#F97316")
        .attr("stroke-dasharray", "4,3")
        .attr("stroke-width", 1.5)
        .attr("stroke-opacity", 0.6);

      // AUC label
      g.append("text")
        .attr("x", xScale(0.55))
        .attr("y", yScale(0.25))
        .attr("text-anchor", "middle")
        .attr("font-family", "'Space Mono', monospace")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("fill", "#3B82F6")
        .attr("fill-opacity", 0.6)
        .text("AUC ≈ 0.85");
    },
    [selectedIdx],
  );

  const sel = rocPoints[selectedIdx];

  return (
    <div>
      <svg ref={ref} className="w-full" viewBox={`0 0 ${width} ${height}`} />

      {/* Threshold slider */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-3">
          <label className="font-heading text-xs font-bold uppercase text-black/60 whitespace-nowrap">
            Threshold
          </label>
          <input
            type="range"
            min={0}
            max={rocPoints.length - 1}
            step={1}
            value={selectedIdx}
            onChange={(e) => setSelectedIdx(Number(e.target.value))}
            className="flex-1 accent-orange-pop"
          />
          <span className="font-heading text-sm font-bold text-black w-10 text-right">
            {sel.threshold.toFixed(1)}
          </span>
        </div>
        <div className="flex gap-6 font-body text-sm text-black/70">
          <span>
            <span className="font-heading text-xs font-bold uppercase text-black/50">TPR: </span>
            {sel.tpr.toFixed(2)}
          </span>
          <span>
            <span className="font-heading text-xs font-bold uppercase text-black/50">FPR: </span>
            {sel.fpr.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
