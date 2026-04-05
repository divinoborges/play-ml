"use client";

import React, { useState } from "react";
import * as d3 from "d3";
import { useD3 } from "./useD3";

interface TreeNode {
  id: number;
  label: string;
  gini: number;
  isLeaf: boolean;
  className?: string;
  color?: string;
  children?: [TreeNode, TreeNode];
}

const sampleTree: TreeNode = {
  id: 0,
  label: "Age ≤ 30",
  gini: 0.48,
  isLeaf: false,
  children: [
    {
      id: 1,
      label: "Income ≤ 50k",
      gini: 0.38,
      isLeaf: false,
      children: [
        {
          id: 3,
          label: "No",
          gini: 0.0,
          isLeaf: true,
          className: "No",
          color: "#F87171",
        },
        {
          id: 4,
          label: "Edu ≤ BSc",
          gini: 0.32,
          isLeaf: false,
          children: [
            {
              id: 7,
              label: "No",
              gini: 0.0,
              isLeaf: true,
              className: "No",
              color: "#F87171",
            },
            {
              id: 8,
              label: "Yes",
              gini: 0.0,
              isLeaf: true,
              className: "Yes",
              color: "#10B981",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Credit ≤ Fair",
      gini: 0.42,
      isLeaf: false,
      children: [
        {
          id: 5,
          label: "Yes",
          gini: 0.0,
          isLeaf: true,
          className: "Yes",
          color: "#10B981",
        },
        {
          id: 6,
          label: "Yes",
          gini: 0.0,
          isLeaf: true,
          className: "Yes",
          color: "#10B981",
        },
      ],
    },
  ],
};

export default function DecisionTreeViz() {
  const [animSpeed, setAnimSpeed] = useState(300);

  const width = 300;
  const height = 250;
  const margin = { top: 15, right: 10, bottom: 10, left: 10 };

  const ref = useD3(
    (svg) => {
      const innerW = width - margin.left - margin.right;
      const innerH = height - margin.top - margin.bottom;

      const g = svg
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Flatten tree into nodes and links
      type FlatNode = {
        node: TreeNode;
        x: number;
        y: number;
        depth: number;
        index: number;
      };
      type FlatLink = { source: FlatNode; target: FlatNode; index: number };

      const nodes: FlatNode[] = [];
      const links: FlatLink[] = [];
      let nodeIndex = 0;

      function layout(
        treeNode: TreeNode,
        x: number,
        y: number,
        spread: number,
        depth: number,
        parent?: FlatNode
      ) {
        const flat: FlatNode = {
          node: treeNode,
          x,
          y,
          depth,
          index: nodeIndex++,
        };
        nodes.push(flat);
        if (parent) {
          links.push({
            source: parent,
            target: flat,
            index: links.length,
          });
        }
        if (treeNode.children) {
          layout(
            treeNode.children[0],
            x - spread,
            y + innerH / 3.5,
            spread / 2,
            depth + 1,
            flat
          );
          layout(
            treeNode.children[1],
            x + spread,
            y + innerH / 3.5,
            spread / 2,
            depth + 1,
            flat
          );
        }
      }

      layout(sampleTree, innerW / 2, 15, innerW / 4.5, 0);

      // Draw links
      links.forEach((link) => {
        g.append("line")
          .attr("x1", link.source.x)
          .attr("y1", link.source.y)
          .attr("x2", link.source.x)
          .attr("y2", link.source.y)
          .attr("stroke", "#CBD5E1")
          .attr("stroke-width", 1.5)
          .transition()
          .delay(link.target.index * animSpeed)
          .duration(animSpeed)
          .attr("x2", link.target.x)
          .attr("y2", link.target.y);
      });

      // Draw nodes
      nodes.forEach((n) => {
        const nodeG = g
          .append("g")
          .attr("transform", `translate(${n.x},${n.y})`)
          .attr("opacity", 0);

        nodeG
          .transition()
          .delay(n.index * animSpeed)
          .duration(animSpeed)
          .attr("opacity", 1);

        if (n.node.isLeaf) {
          nodeG
            .append("rect")
            .attr("x", -22)
            .attr("y", -10)
            .attr("width", 44)
            .attr("height", 20)
            .attr("rx", 4)
            .attr("fill", n.node.color || "#E5E7EB")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1);

          nodeG
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", 4)
            .attr("font-size", "8px")
            .attr("fill", "#fff")
            .attr("font-weight", "bold")
            .text(n.node.label);
        } else {
          nodeG
            .append("rect")
            .attr("x", -32)
            .attr("y", -12)
            .attr("width", 64)
            .attr("height", 24)
            .attr("rx", 4)
            .attr("fill", "#EFF6FF")
            .attr("stroke", "#3B82F6")
            .attr("stroke-width", 1);

          nodeG
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", 3)
            .attr("font-size", "7px")
            .attr("fill", "#1E3A5F")
            .text(n.node.label);

          nodeG
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", 22)
            .attr("font-size", "6px")
            .attr("fill", "#9CA3AF")
            .text(`Gini: ${n.node.gini.toFixed(2)}`);
        }
      });
    },
    [animSpeed]
  );

  return (
    <div className="w-full">
      <svg ref={ref} className="w-full h-auto" />
      <div className="flex items-center gap-2 mt-2 px-2">
        <label className="text-xs text-gray-600">Speed:</label>
        <input
          type="range"
          min="100"
          max="600"
          step="50"
          value={animSpeed}
          onChange={(e) => setAnimSpeed(parseInt(e.target.value))}
          className="flex-1 h-1.5 accent-blue-500"
        />
        <span className="text-xs font-mono text-gray-700 w-12">
          {animSpeed}ms
        </span>
      </div>
    </div>
  );
}
