"use client";

import React, { useState } from "react";
import * as d3 from "d3";
import { useD3 } from "./useD3";

interface DataPoint {
  x: number;
  y: number;
  cluster: number;
}

// Sample data with 3 natural clusters
const sampleData: DataPoint[] = [
  // Cluster 0 — bottom-left (budget)
  { x: 20, y: 15, cluster: 0 },
  { x: 30, y: 25, cluster: 0 },
  { x: 25, y: 20, cluster: 0 },
  { x: 35, y: 18, cluster: 0 },
  { x: 15, y: 30, cluster: 0 },
  { x: 28, y: 22, cluster: 0 },
  { x: 18, y: 28, cluster: 0 },
  // Cluster 1 — top-right (luxury)
  { x: 170, y: 160, cluster: 1 },
  { x: 180, y: 175, cluster: 1 },
  { x: 165, y: 185, cluster: 1 },
  { x: 190, y: 170, cluster: 1 },
  { x: 175, y: 190, cluster: 1 },
  { x: 185, y: 165, cluster: 1 },
  { x: 160, y: 180, cluster: 1 },
  // Cluster 2 — middle-top (loyal)
  { x: 90, y: 150, cluster: 2 },
  { x: 100, y: 140, cluster: 2 },
  { x: 85, y: 160, cluster: 2 },
  { x: 110, y: 145, cluster: 2 },
  { x: 95, y: 155, cluster: 2 },
  { x: 105, y: 135, cluster: 2 },
  { x: 80, y: 148, cluster: 2 },
];

const clusterColors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

// Simulate K-Means iterations
function runKMeans(data: DataPoint[], k: number, maxIter: number) {
  const points = data.map((d) => [d.x, d.y]);

  // Fixed initial centroids (spread out for demo)
  let centroids = [
    [50, 180],
    [180, 30],
    [100, 100],
  ].slice(0, k);

  const history: { centroids: number[][]; assignments: number[] }[] = [];

  for (let iter = 0; iter < maxIter; iter++) {
    // Assign
    const assignments = points.map((p) => {
      let minD = Infinity;
      let minC = 0;
      centroids.forEach((c, ci) => {
        const d = Math.sqrt((p[0] - c[0]) ** 2 + (p[1] - c[1]) ** 2);
        if (d < minD) {
          minD = d;
          minC = ci;
        }
      });
      return minC;
    });

    history.push({
      centroids: centroids.map((c) => [...c]),
      assignments: [...assignments],
    });

    // Update centroids
    const newCentroids = centroids.map((_, ci) => {
      const members = points.filter((_, i) => assignments[i] === ci);
      if (members.length === 0) return centroids[ci];
      return [
        members.reduce((s, m) => s + m[0], 0) / members.length,
        members.reduce((s, m) => s + m[1], 0) / members.length,
      ];
    });

    // Check convergence
    let maxShift = 0;
    for (let c = 0; c < k; c++) {
      const dx = centroids[c][0] - newCentroids[c][0];
      const dy = centroids[c][1] - newCentroids[c][1];
      maxShift = Math.max(maxShift, Math.sqrt(dx * dx + dy * dy));
    }
    centroids = newCentroids;
    if (maxShift < 0.5) break;
  }

  return history;
}

export default function KMeansViz() {
  const [iteration, setIteration] = useState(0);
  const k = 3;
  const history = runKMeans(sampleData, k, 15);
  const maxIter = history.length - 1;

  const width = 300;
  const height = 250;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  const ref = useD3(
    (svg) => {
      const innerW = width - margin.left - margin.right;
      const innerH = height - margin.top - margin.bottom;

      const xScale = d3.scaleLinear().domain([0, 210]).range([0, innerW]);
      const yScale = d3.scaleLinear().domain([0, 210]).range([innerH, 0]);

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

      const step = Math.min(iteration, maxIter);
      const { centroids, assignments } = history[step];

      // Draw Voronoi regions (background)
      const voronoiPoints = centroids.map((c) => [
        xScale(c[0]),
        yScale(c[1]),
      ] as [number, number]);

      if (voronoiPoints.length >= 2) {
        const delaunay = d3.Delaunay.from(voronoiPoints);
        const voronoi = delaunay.voronoi([0, 0, innerW, innerH]);
        for (let i = 0; i < centroids.length; i++) {
          const cell = voronoi.cellPolygon(i);
          if (cell) {
            g.append("path")
              .attr("d", d3.line()(cell as [number, number][]) ?? "")
              .attr("fill", clusterColors[i])
              .attr("fill-opacity", 0.08)
              .attr("stroke", clusterColors[i])
              .attr("stroke-opacity", 0.3)
              .attr("stroke-width", 1)
              .attr("stroke-dasharray", "4,3");
          }
        }
      }

      // Data points
      sampleData.forEach((p, i) => {
        const cluster = assignments[i];
        g.append("circle")
          .attr("cx", xScale(p.x))
          .attr("cy", yScale(p.y))
          .attr("r", 4)
          .attr("fill", clusterColors[cluster])
          .attr("stroke", "#fff")
          .attr("stroke-width", 1)
          .attr("opacity", 0.85);
      });

      // Centroids
      centroids.forEach((c, ci) => {
        g.append("circle")
          .attr("cx", xScale(c[0]))
          .attr("cy", yScale(c[1]))
          .attr("r", 7)
          .attr("fill", clusterColors[ci])
          .attr("stroke", "#000")
          .attr("stroke-width", 2);

        g.append("text")
          .attr("x", xScale(c[0]))
          .attr("y", yScale(c[1]) - 10)
          .attr("text-anchor", "middle")
          .attr("font-size", "8px")
          .attr("fill", "#000")
          .attr("font-weight", "bold")
          .text(`C${ci + 1}`);
      });

      // Iteration label
      g.append("text")
        .attr("x", innerW - 5)
        .attr("y", 12)
        .attr("text-anchor", "end")
        .attr("font-size", "9px")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .text(`Iteration ${step + 1}/${history.length}`);
    },
    [iteration]
  );

  return (
    <div className="w-full">
      <svg ref={ref} className="w-full h-auto" />
      <div className="flex items-center gap-2 mt-2 px-2">
        <label className="text-xs text-gray-600">Step:</label>
        <input
          type="range"
          min="0"
          max={maxIter}
          step="1"
          value={iteration}
          onChange={(e) => setIteration(parseInt(e.target.value))}
          className="flex-1 h-1.5 accent-amber-500"
        />
        <span className="text-xs font-mono text-gray-700 w-10">
          {iteration + 1}/{history.length}
        </span>
      </div>
    </div>
  );
}
