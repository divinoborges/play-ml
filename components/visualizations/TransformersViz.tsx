"use client";

import React, { useState } from "react";
import * as d3 from "d3";
import { useD3 } from "./useD3";

const tokens = ["The", "cat", "sat", "on", "the", "mat"];

// Simulated attention weights (rows attend to columns)
const attentionMatrix: number[][] = [
  [0.15, 0.05, 0.05, 0.05, 0.60, 0.10], // "The" attends strongly to "the"
  [0.10, 0.30, 0.05, 0.05, 0.05, 0.45], // "cat" attends to "mat"
  [0.05, 0.40, 0.15, 0.10, 0.05, 0.25], // "sat" attends to "cat"
  [0.05, 0.05, 0.30, 0.20, 0.05, 0.35], // "on" attends to "sat" and "mat"
  [0.50, 0.05, 0.05, 0.05, 0.25, 0.10], // "the" attends to "The"
  [0.05, 0.35, 0.15, 0.20, 0.05, 0.20], // "mat" attends to "cat"
];

export default function TransformersViz() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [headIndex, setHeadIndex] = useState(0);

  // Simulate multiple attention heads by permuting weights
  const getAttention = (head: number): number[][] => {
    if (head === 0) return attentionMatrix;
    // Rotate attention patterns for different heads
    return attentionMatrix.map((row) => {
      const shifted = [...row];
      for (let i = 0; i < head; i++) {
        shifted.push(shifted.shift()!);
      }
      // Renormalize
      const sum = shifted.reduce((a, b) => a + b, 0);
      return shifted.map((v) => v / sum);
    });
  };

  const currentAttention = getAttention(headIndex);

  const width = 300;
  const height = 250;

  const ref = useD3(
    (svg) => {
      svg.attr("viewBox", `0 0 ${width} ${height}`);

      const heatmapX = 45;
      const heatmapY = 30;
      const cellSize = 22;
      const n = tokens.length;

      // Title
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", 14)
        .attr("text-anchor", "middle")
        .attr("font-size", "9px")
        .attr("fill", "#6B7280")
        .text(`Self-Attention — Head ${headIndex + 1}`);

      // Column labels (keys)
      tokens.forEach((token, i) => {
        svg
          .append("text")
          .attr("x", heatmapX + i * cellSize + cellSize / 2)
          .attr("y", heatmapY - 4)
          .attr("text-anchor", "middle")
          .attr("font-size", "7px")
          .attr("fill", hoveredCol === i ? "#8B5CF6" : "#64748B")
          .attr("font-weight", hoveredCol === i ? "bold" : "normal")
          .text(token);
      });

      // Row labels (queries)
      tokens.forEach((token, i) => {
        svg
          .append("text")
          .attr("x", heatmapX - 4)
          .attr("y", heatmapY + i * cellSize + cellSize / 2 + 3)
          .attr("text-anchor", "end")
          .attr("font-size", "7px")
          .attr("fill", hoveredRow === i ? "#8B5CF6" : "#64748B")
          .attr("font-weight", hoveredRow === i ? "bold" : "normal")
          .text(token);
      });

      // Heatmap cells
      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          const val = currentAttention[r][c];
          const isHighlighted =
            hoveredRow === r || hoveredCol === c;
          const isExact = hoveredRow === r && hoveredCol === c;

          svg
            .append("rect")
            .attr("x", heatmapX + c * cellSize)
            .attr("y", heatmapY + r * cellSize)
            .attr("width", cellSize - 1)
            .attr("height", cellSize - 1)
            .attr("fill", d3.interpolatePurples(val))
            .attr("stroke", isExact ? "#F59E0B" : isHighlighted ? "#C4B5FD" : "#F8FAFC")
            .attr("stroke-width", isExact ? 2 : isHighlighted ? 1 : 0.5)
            .attr("rx", 1)
            .attr("data-row", r)
            .attr("data-col", c)
            .style("cursor", "pointer");

          // Value text
          svg
            .append("text")
            .attr("x", heatmapX + c * cellSize + cellSize / 2)
            .attr("y", heatmapY + r * cellSize + cellSize / 2 + 3)
            .attr("text-anchor", "middle")
            .attr("font-size", "6px")
            .attr("fill", val > 0.3 ? "#fff" : "#374151")
            .attr("pointer-events", "none")
            .text(val.toFixed(2));
        }
      }

      // Invisible overlay rects for hover events
      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          svg
            .append("rect")
            .attr("x", heatmapX + c * cellSize)
            .attr("y", heatmapY + r * cellSize)
            .attr("width", cellSize - 1)
            .attr("height", cellSize - 1)
            .attr("fill", "transparent")
            .style("cursor", "pointer")
            .on("mouseenter", () => {
              setHoveredRow(r);
              setHoveredCol(c);
            })
            .on("mouseleave", () => {
              setHoveredRow(null);
              setHoveredCol(null);
            });
        }
      }

      // Simplified encoder block diagram
      const blockX = 195;
      const blockY = 35;
      const blockW = 90;

      const blocks = [
        { label: "Input Embed", color: "#E2E8F0", h: 18 },
        { label: "+ Pos Encoding", color: "#DBEAFE", h: 18 },
        { label: "Multi-Head Attn", color: "#8B5CF6", h: 22 },
        { label: "Add & Norm", color: "#FDE68A", h: 16 },
        { label: "Feed Forward", color: "#10B981", h: 22 },
        { label: "Add & Norm", color: "#FDE68A", h: 16 },
        { label: "Output", color: "#E2E8F0", h: 18 },
      ];

      let by = blockY;
      blocks.forEach((block, i) => {
        const isAttn = block.label === "Multi-Head Attn";

        svg
          .append("rect")
          .attr("x", blockX)
          .attr("y", by)
          .attr("width", blockW)
          .attr("height", block.h)
          .attr("rx", 3)
          .attr("fill", isAttn ? block.color : block.color)
          .attr("stroke", isAttn ? "#7C3AED" : "#CBD5E1")
          .attr("stroke-width", isAttn ? 2 : 0.5)
          .attr("opacity", isAttn ? 1 : 0.8);

        svg
          .append("text")
          .attr("x", blockX + blockW / 2)
          .attr("y", by + block.h / 2 + 3)
          .attr("text-anchor", "middle")
          .attr("font-size", "6px")
          .attr("fill", isAttn || block.label === "Feed Forward" ? "#fff" : "#374151")
          .attr("font-weight", isAttn ? "bold" : "normal")
          .text(block.label);

        if (i < blocks.length - 1) {
          svg
            .append("line")
            .attr("x1", blockX + blockW / 2)
            .attr("y1", by + block.h)
            .attr("x2", blockX + blockW / 2)
            .attr("y2", by + block.h + 4)
            .attr("stroke", "#CBD5E1")
            .attr("stroke-width", 1);
        }

        by += block.h + 4;
      });

      // Encoder label
      svg
        .append("text")
        .attr("x", blockX + blockW / 2)
        .attr("y", blockY - 6)
        .attr("text-anchor", "middle")
        .attr("font-size", "7px")
        .attr("fill", "#64748B")
        .attr("font-weight", "bold")
        .text("Encoder Block");

      // Hover info
      if (hoveredRow !== null && hoveredCol !== null) {
        const val = currentAttention[hoveredRow][hoveredCol];
        svg
          .append("text")
          .attr("x", heatmapX + (n * cellSize) / 2)
          .attr("y", heatmapY + n * cellSize + 14)
          .attr("text-anchor", "middle")
          .attr("font-size", "8px")
          .attr("fill", "#8B5CF6")
          .text(
            `"${tokens[hoveredRow]}" → "${tokens[hoveredCol]}": ${val.toFixed(2)}`
          );
      } else {
        svg
          .append("text")
          .attr("x", heatmapX + (n * cellSize) / 2)
          .attr("y", heatmapY + n * cellSize + 14)
          .attr("text-anchor", "middle")
          .attr("font-size", "7px")
          .attr("fill", "#9CA3AF")
          .text("Hover cells to inspect attention");
      }
    },
    [hoveredRow, hoveredCol, headIndex]
  );

  return (
    <div className="w-full">
      <svg ref={ref} className="w-full h-auto" />
      <div className="flex items-center gap-2 mt-2 px-2">
        <label className="text-xs text-gray-600">Attention head:</label>
        <input
          type="range"
          min="0"
          max="3"
          step="1"
          value={headIndex}
          onChange={(e) => setHeadIndex(parseInt(e.target.value))}
          className="flex-1 h-1.5 accent-purple-500"
        />
        <span className="text-xs font-mono text-gray-700 w-10">
          Head {headIndex + 1}
        </span>
      </div>
    </div>
  );
}
