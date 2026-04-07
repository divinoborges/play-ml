"use client";

import React from "react";
import * as d3 from "d3";
import { useD3 } from "./useD3";

// Illustrative two-class Gaussian distributions on a single feature.
// Values are fixed for clarity; this mirrors the synthetic spam dataset shipped with the page.
const HAM = { mu: 0.05, sigma: 0.05, color: "#10B981" };
const SPAM = { mu: 0.5, sigma: 0.25, color: "#F97316" };

function gaussian(x: number, mu: number, sigma: number): number {
  return (
    (1 / (sigma * Math.sqrt(2 * Math.PI))) *
    Math.exp(-0.5 * ((x - mu) / sigma) ** 2)
  );
}

export default function NaiveBayesViz() {
  const width = 360;
  const height = 260;
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };

  const ref = useD3((svg) => {
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const xs = d3.range(-0.1, 1.2, 0.01);
    const hamPts = xs.map((x) => [x, gaussian(x, HAM.mu, HAM.sigma)] as [number, number]);
    const spamPts = xs.map((x) => [x, gaussian(x, SPAM.mu, SPAM.sigma)] as [number, number]);

    const yMax = d3.max([...hamPts, ...spamPts], (d) => d[1]) ?? 1;

    const xScale = d3.scaleLinear().domain([-0.1, 1.2]).range([0, innerW]);
    const yScale = d3.scaleLinear().domain([0, yMax * 1.1]).range([innerH, 0]);

    svg.selectAll("*").remove();

    const g = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(xScale).ticks(6))
      .call((sel) =>
        sel
          .append("text")
          .attr("x", innerW / 2)
          .attr("y", 32)
          .attr("fill", "currentColor")
          .attr("text-anchor", "middle")
          .attr("font-size", 11)
          .text('word_freq("money")'),
      );

    g.append("g").call(d3.axisLeft(yScale).ticks(4));

    const line = d3
      .line<[number, number]>()
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[1]))
      .curve(d3.curveBasis);

    g.append("path")
      .datum(hamPts)
      .attr("fill", HAM.color)
      .attr("fill-opacity", 0.2)
      .attr("d", line);
    g.append("path")
      .datum(hamPts)
      .attr("fill", "none")
      .attr("stroke", HAM.color)
      .attr("stroke-width", 2.5)
      .attr("d", line);

    g.append("path")
      .datum(spamPts)
      .attr("fill", SPAM.color)
      .attr("fill-opacity", 0.2)
      .attr("d", line);
    g.append("path")
      .datum(spamPts)
      .attr("fill", "none")
      .attr("stroke", SPAM.color)
      .attr("stroke-width", 2.5)
      .attr("d", line);

    // Legend
    const legend = g.append("g").attr("transform", `translate(${innerW - 90}, 0)`);
    [
      { label: "ham", color: HAM.color, y: 0 },
      { label: "spam", color: SPAM.color, y: 16 },
    ].forEach((item) => {
      legend
        .append("rect")
        .attr("x", 0)
        .attr("y", item.y)
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", item.color);
      legend
        .append("text")
        .attr("x", 18)
        .attr("y", item.y + 10)
        .attr("font-size", 11)
        .attr("fill", "currentColor")
        .text(`P(x | ${item.label})`);
    });
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <svg ref={ref} className="w-full max-w-md" />
      <p className="mt-2 text-xs text-black/60 max-w-md text-center">
        Naive Bayes models each class with its own Gaussian distribution per feature. A new
        email is classified by comparing P(x | ham) vs P(x | spam), weighted by each class&rsquo;s
        prior probability.
      </p>
    </div>
  );
}
