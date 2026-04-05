"use client";

import React, { useState, useCallback } from "react";
import * as d3 from "d3";
import { useD3 } from "./useD3";

interface MiniTree {
  id: number;
  vote: "A" | "B";
  confidence: number;
  splits: string[];
}

function generateTrees(numTrees: number, seed: number): MiniTree[] {
  const rng = d3.randomLcg(seed);
  const rand = d3.randomUniform.source(rng)(0, 1);
  return Array.from({ length: numTrees }, (_, i) => {
    const r = rand();
    return {
      id: i,
      vote: r > 0.45 ? "A" : "B",
      confidence: 0.6 + rand() * 0.35,
      splits: [
        ["x₁ ≤ 3", "x₂ > 5", "x₃ ≤ 1"][Math.floor(rand() * 3)],
        ["x₂ ≤ 7", "x₁ > 2", "x₃ > 4"][Math.floor(rand() * 3)],
      ],
    };
  });
}

export default function RandomForestViz() {
  const [numTrees, setNumTrees] = useState(5);
  const [animKey, setAnimKey] = useState(0);

  const trees = generateTrees(numTrees, animKey);
  const votesA = trees.filter((t) => t.vote === "A").length;
  const votesB = numTrees - votesA;
  const winner = votesA >= votesB ? "A" : "B";

  const width = 300;
  const height = 250;

  const rerun = useCallback(() => setAnimKey((k) => k + 1), []);

  const ref = useD3(
    (svg) => {
      svg.attr("viewBox", `0 0 ${width} ${height}`);

      const treeWidth = (width - 20) / numTrees;
      const treeAreaTop = 15;
      const treeAreaHeight = 140;
      const voteAreaY = 170;

      // Title
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", 12)
        .attr("text-anchor", "middle")
        .attr("font-size", "9px")
        .attr("fill", "#6B7280")
        .text(`Random Forest — ${numTrees} trees`);

      trees.forEach((tree, i) => {
        const cx = 10 + treeWidth * i + treeWidth / 2;
        const treeG = svg.append("g").attr("opacity", 0);

        treeG
          .transition()
          .delay(i * 200)
          .duration(300)
          .attr("opacity", 1);

        // Mini tree box
        treeG
          .append("rect")
          .attr("x", cx - treeWidth / 2 + 3)
          .attr("y", treeAreaTop + 5)
          .attr("width", treeWidth - 6)
          .attr("height", treeAreaHeight - 20)
          .attr("rx", 4)
          .attr("fill", "#F8FAFC")
          .attr("stroke", "#E2E8F0")
          .attr("stroke-width", 1);

        // Tree label
        treeG
          .append("text")
          .attr("x", cx)
          .attr("y", treeAreaTop + 22)
          .attr("text-anchor", "middle")
          .attr("font-size", "7px")
          .attr("fill", "#64748B")
          .attr("font-weight", "bold")
          .text(`T${i + 1}`);

        // Mini tree structure (simplified)
        const rootY = treeAreaTop + 38;
        // Root node
        treeG
          .append("circle")
          .attr("cx", cx)
          .attr("cy", rootY)
          .attr("r", 4)
          .attr("fill", "#CBD5E1");

        // Split label
        treeG
          .append("text")
          .attr("x", cx)
          .attr("y", rootY + 12)
          .attr("text-anchor", "middle")
          .attr("font-size", "5px")
          .attr("fill", "#94A3B8")
          .text(tree.splits[0]);

        // Branches
        const branchSpread = treeWidth / 5;
        [-1, 1].forEach((dir) => {
          treeG
            .append("line")
            .attr("x1", cx)
            .attr("y1", rootY + 4)
            .attr("x2", cx + dir * branchSpread)
            .attr("y2", rootY + 24)
            .attr("stroke", "#CBD5E1")
            .attr("stroke-width", 1);

          treeG
            .append("circle")
            .attr("cx", cx + dir * branchSpread)
            .attr("cy", rootY + 26)
            .attr("r", 3)
            .attr("fill", dir === -1 ? "#3B82F6" : "#10B981");
        });

        // Second split label
        treeG
          .append("text")
          .attr("x", cx)
          .attr("y", rootY + 42)
          .attr("text-anchor", "middle")
          .attr("font-size", "5px")
          .attr("fill", "#94A3B8")
          .text(tree.splits[1]);

        // Vote arrow
        const voteColor = tree.vote === "A" ? "#3B82F6" : "#10B981";

        const arrowG = svg.append("g").attr("opacity", 0);
        arrowG
          .transition()
          .delay(numTrees * 200 + i * 150)
          .duration(300)
          .attr("opacity", 1);

        arrowG
          .append("line")
          .attr("x1", cx)
          .attr("y1", treeAreaTop + treeAreaHeight - 10)
          .attr("x2", cx)
          .attr("y2", voteAreaY - 5)
          .attr("stroke", voteColor)
          .attr("stroke-width", 1.5)
          .attr("marker-end", "url(#arrowhead)");

        // Vote box
        arrowG
          .append("rect")
          .attr("x", cx - 10)
          .attr("y", voteAreaY - 2)
          .attr("width", 20)
          .attr("height", 16)
          .attr("rx", 3)
          .attr("fill", voteColor);

        arrowG
          .append("text")
          .attr("x", cx)
          .attr("y", voteAreaY + 10)
          .attr("text-anchor", "middle")
          .attr("font-size", "8px")
          .attr("fill", "#fff")
          .attr("font-weight", "bold")
          .text(tree.vote);
      });

      // Arrow marker
      svg
        .append("defs")
        .append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 9)
        .attr("refY", 5)
        .attr("markerWidth", 5)
        .attr("markerHeight", 5)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("fill", "#94A3B8");

      // Aggregate result
      const resultG = svg.append("g").attr("opacity", 0);
      resultG
        .transition()
        .delay(numTrees * 200 + numTrees * 150 + 200)
        .duration(400)
        .attr("opacity", 1);

      resultG
        .append("rect")
        .attr("x", width / 2 - 55)
        .attr("y", 210)
        .attr("width", 110)
        .attr("height", 24)
        .attr("rx", 6)
        .attr("fill", winner === "A" ? "#3B82F6" : "#10B981")
        .attr("stroke", winner === "A" ? "#1D4ED8" : "#059669")
        .attr("stroke-width", 1);

      resultG
        .append("text")
        .attr("x", width / 2)
        .attr("y", 226)
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .attr("fill", "#fff")
        .attr("font-weight", "bold")
        .text(`Result: ${winner} (${votesA}A : ${votesB}B)`);
    },
    [numTrees, animKey]
  );

  return (
    <div className="w-full">
      <svg ref={ref} className="w-full h-auto" />
      <div className="flex items-center gap-2 mt-2 px-2">
        <label className="text-xs text-gray-600">Trees:</label>
        <input
          type="range"
          min="3"
          max="5"
          step="1"
          value={numTrees}
          onChange={(e) => setNumTrees(parseInt(e.target.value))}
          className="flex-1 h-1.5 accent-green-500"
        />
        <span className="text-xs font-mono text-gray-700 w-4">{numTrees}</span>
        <button
          onClick={rerun}
          className="text-xs px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
        >
          Re-vote
        </button>
      </div>
    </div>
  );
}
