"use client";

import React, { useState } from "react";
import * as d3 from "d3";
import { useD3 } from "./useD3";

// Simple 8x8 input pattern (cross shape)
const inputGrid: number[][] = [
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
];

function convolve(
  grid: number[][],
  kernel: number[][]
): number[][] {
  const rows = grid.length;
  const cols = grid[0].length;
  const kSize = kernel.length;
  const outRows = rows - kSize + 1;
  const outCols = cols - kSize + 1;
  const out: number[][] = [];
  for (let r = 0; r < outRows; r++) {
    out[r] = [];
    for (let c = 0; c < outCols; c++) {
      let sum = 0;
      for (let kr = 0; kr < kSize; kr++) {
        for (let kc = 0; kc < kSize; kc++) {
          sum += grid[r + kr][c + kc] * kernel[kr][kc];
        }
      }
      out[r][c] = Math.max(0, sum); // ReLU
    }
  }
  return out;
}

// Max pooling 2x2
function maxPool(grid: number[][]): number[][] {
  const rows = grid.length;
  const cols = grid[0].length;
  const out: number[][] = [];
  for (let r = 0; r < rows - 1; r += 2) {
    const row: number[] = [];
    for (let c = 0; c < cols - 1; c += 2) {
      row.push(
        Math.max(grid[r][c], grid[r][c + 1], grid[r + 1][c], grid[r + 1][c + 1])
      );
    }
    out.push(row);
  }
  return out;
}

const edgeKernel = [
  [-1, -1, -1],
  [-1, 8, -1],
  [-1, -1, -1],
];

const blurKernel = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
];

export default function CNNViz() {
  const [kernelPos, setKernelPos] = useState(0);

  const width = 300;
  const height = 250;

  // Compute feature maps
  const featureMap1 = convolve(inputGrid, edgeKernel);
  const featureMap2 = convolve(inputGrid, blurKernel);
  const pooled1 = maxPool(featureMap1);

  const maxVal1 = Math.max(...featureMap1.flat(), 1);
  const maxVal2 = Math.max(...featureMap2.flat(), 1);
  const maxValPool = Math.max(...pooled1.flat(), 1);

  // Kernel position for animation
  const maxKernelPos = (8 - 3 + 1) * (8 - 3 + 1) - 1;
  const kernelRow = Math.floor(kernelPos / (8 - 3 + 1));
  const kernelCol = kernelPos % (8 - 3 + 1);

  const ref = useD3(
    (svg) => {
      svg.attr("viewBox", `0 0 ${width} ${height}`);

      const cellSize = 10;
      const smallCell = 8;
      const tinyCell = 10;

      // Layer positions
      const inputX = 10;
      const inputY = 30;
      const feat1X = 110;
      const feat1Y = 20;
      const feat2X = 110;
      const feat2Y = 85;
      const poolX = 205;
      const poolY = 35;

      // Title
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", 14)
        .attr("text-anchor", "middle")
        .attr("font-size", "9px")
        .attr("fill", "#6B7280")
        .text("CNN: Conv → ReLU → Pool");

      // Draw input grid
      const inputG = svg.append("g");
      inputG
        .append("text")
        .attr("x", inputX + (cellSize * 8) / 2)
        .attr("y", inputY - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "7px")
        .attr("fill", "#64748B")
        .text("Input 8×8");

      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          inputG
            .append("rect")
            .attr("x", inputX + c * cellSize)
            .attr("y", inputY + r * cellSize)
            .attr("width", cellSize - 1)
            .attr("height", cellSize - 1)
            .attr("fill", inputGrid[r][c] ? "#3B82F6" : "#F1F5F9")
            .attr("stroke", "#E2E8F0")
            .attr("stroke-width", 0.5);
        }
      }

      // Kernel overlay on input
      inputG
        .append("rect")
        .attr("x", inputX + kernelCol * cellSize - 1)
        .attr("y", inputY + kernelRow * cellSize - 1)
        .attr("width", cellSize * 3 + 1)
        .attr("height", cellSize * 3 + 1)
        .attr("fill", "none")
        .attr("stroke", "#F59E0B")
        .attr("stroke-width", 2)
        .attr("rx", 1);

      // Arrow from input to feature maps
      svg
        .append("line")
        .attr("x1", inputX + 8 * cellSize + 5)
        .attr("y1", inputY + 40)
        .attr("x2", feat1X - 5)
        .attr("y2", feat1Y + 20)
        .attr("stroke", "#CBD5E1")
        .attr("stroke-width", 1)
        .attr("marker-end", "url(#cnn-arrow)");

      svg
        .append("line")
        .attr("x1", inputX + 8 * cellSize + 5)
        .attr("y1", inputY + 40)
        .attr("x2", feat2X - 5)
        .attr("y2", feat2Y + 20)
        .attr("stroke", "#CBD5E1")
        .attr("stroke-width", 1)
        .attr("marker-end", "url(#cnn-arrow)");

      // Arrow marker
      svg
        .append("defs")
        .append("marker")
        .attr("id", "cnn-arrow")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 9)
        .attr("refY", 5)
        .attr("markerWidth", 5)
        .attr("markerHeight", 5)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("fill", "#CBD5E1");

      // Feature map 1 (edge detection)
      const feat1G = svg.append("g");
      feat1G
        .append("text")
        .attr("x", feat1X + (smallCell * 6) / 2)
        .attr("y", feat1Y - 3)
        .attr("text-anchor", "middle")
        .attr("font-size", "6px")
        .attr("fill", "#64748B")
        .text("Edge 6×6");

      for (let r = 0; r < featureMap1.length; r++) {
        for (let c = 0; c < featureMap1[0].length; c++) {
          const val = featureMap1[r][c] / maxVal1;
          feat1G
            .append("rect")
            .attr("x", feat1X + c * smallCell)
            .attr("y", feat1Y + r * smallCell)
            .attr("width", smallCell - 1)
            .attr("height", smallCell - 1)
            .attr("fill", d3.interpolateBlues(val))
            .attr("stroke", "#E2E8F0")
            .attr("stroke-width", 0.3);
        }
      }

      // Highlight current output cell in feature map
      if (kernelRow < featureMap1.length && kernelCol < featureMap1[0].length) {
        feat1G
          .append("rect")
          .attr("x", feat1X + kernelCol * smallCell - 1)
          .attr("y", feat1Y + kernelRow * smallCell - 1)
          .attr("width", smallCell + 1)
          .attr("height", smallCell + 1)
          .attr("fill", "none")
          .attr("stroke", "#F59E0B")
          .attr("stroke-width", 1.5);
      }

      // Feature map 2 (blur)
      const feat2G = svg.append("g");
      feat2G
        .append("text")
        .attr("x", feat2X + (smallCell * 6) / 2)
        .attr("y", feat2Y - 3)
        .attr("text-anchor", "middle")
        .attr("font-size", "6px")
        .attr("fill", "#64748B")
        .text("Blur 6×6");

      for (let r = 0; r < featureMap2.length; r++) {
        for (let c = 0; c < featureMap2[0].length; c++) {
          const val = featureMap2[r][c] / maxVal2;
          feat2G
            .append("rect")
            .attr("x", feat2X + c * smallCell)
            .attr("y", feat2Y + r * smallCell)
            .attr("width", smallCell - 1)
            .attr("height", smallCell - 1)
            .attr("fill", d3.interpolateGreens(val))
            .attr("stroke", "#E2E8F0")
            .attr("stroke-width", 0.3);
        }
      }

      // Arrow to pooled
      svg
        .append("line")
        .attr("x1", feat1X + 6 * smallCell + 5)
        .attr("y1", feat1Y + 25)
        .attr("x2", poolX - 5)
        .attr("y2", poolY + 15)
        .attr("stroke", "#CBD5E1")
        .attr("stroke-width", 1)
        .attr("marker-end", "url(#cnn-arrow)");

      // Pooled output
      const poolG = svg.append("g");
      poolG
        .append("text")
        .attr("x", poolX + (tinyCell * 3) / 2)
        .attr("y", poolY - 3)
        .attr("text-anchor", "middle")
        .attr("font-size", "6px")
        .attr("fill", "#64748B")
        .text("Pool 3×3");

      for (let r = 0; r < pooled1.length; r++) {
        for (let c = 0; c < pooled1[0].length; c++) {
          const val = pooled1[r][c] / maxValPool;
          poolG
            .append("rect")
            .attr("x", poolX + c * tinyCell)
            .attr("y", poolY + r * tinyCell)
            .attr("width", tinyCell - 1)
            .attr("height", tinyCell - 1)
            .attr("fill", d3.interpolatePurples(val))
            .attr("stroke", "#E2E8F0")
            .attr("stroke-width", 0.3);
        }
      }

      // Kernel display
      const kernelX = 10;
      const kernelY = 140;
      svg
        .append("text")
        .attr("x", kernelX)
        .attr("y", kernelY)
        .attr("font-size", "7px")
        .attr("fill", "#64748B")
        .text("Edge Kernel 3×3:");

      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const kx = kernelX + c * 22;
          const ky = kernelY + 5 + r * 14;
          svg
            .append("rect")
            .attr("x", kx)
            .attr("y", ky)
            .attr("width", 20)
            .attr("height", 12)
            .attr("fill", edgeKernel[r][c] > 0 ? "#DBEAFE" : "#FEE2E2")
            .attr("stroke", "#E2E8F0")
            .attr("stroke-width", 0.5)
            .attr("rx", 1);
          svg
            .append("text")
            .attr("x", kx + 10)
            .attr("y", ky + 9)
            .attr("text-anchor", "middle")
            .attr("font-size", "7px")
            .attr("fill", "#374151")
            .text(edgeKernel[r][c].toString());
        }
      }

      // Layer architecture diagram
      const archY = 210;
      const layers = [
        { label: "Input", w: 30, color: "#3B82F6" },
        { label: "Conv", w: 25, color: "#8B5CF6" },
        { label: "ReLU", w: 25, color: "#F59E0B" },
        { label: "Pool", w: 25, color: "#10B981" },
        { label: "FC", w: 20, color: "#EF4444" },
      ];
      let lx = 85;
      layers.forEach((layer, i) => {
        svg
          .append("rect")
          .attr("x", lx)
          .attr("y", archY)
          .attr("width", layer.w)
          .attr("height", 16)
          .attr("rx", 3)
          .attr("fill", layer.color)
          .attr("opacity", 0.8);
        svg
          .append("text")
          .attr("x", lx + layer.w / 2)
          .attr("y", archY + 11)
          .attr("text-anchor", "middle")
          .attr("font-size", "6px")
          .attr("fill", "#fff")
          .attr("font-weight", "bold")
          .text(layer.label);
        if (i < layers.length - 1) {
          svg
            .append("line")
            .attr("x1", lx + layer.w + 1)
            .attr("y1", archY + 8)
            .attr("x2", lx + layer.w + 7)
            .attr("y2", archY + 8)
            .attr("stroke", "#CBD5E1")
            .attr("stroke-width", 1)
            .attr("marker-end", "url(#cnn-arrow)");
        }
        lx += layer.w + 8;
      });
    },
    [kernelPos]
  );

  return (
    <div className="w-full">
      <svg ref={ref} className="w-full h-auto" />
      <div className="flex items-center gap-2 mt-2 px-2">
        <label className="text-xs text-gray-600">Kernel position:</label>
        <input
          type="range"
          min="0"
          max={maxKernelPos}
          step="1"
          value={kernelPos}
          onChange={(e) => setKernelPos(parseInt(e.target.value))}
          className="flex-1 h-1.5 accent-amber-500"
        />
        <span className="text-xs font-mono text-gray-700 w-12">
          ({kernelRow},{kernelCol})
        </span>
      </div>
    </div>
  );
}
