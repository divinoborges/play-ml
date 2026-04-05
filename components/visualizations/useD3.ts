"use client";
import { useRef, useEffect } from "react";
import * as d3 from "d3";

export function useD3(
  renderFn: (
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>
  ) => void,
  deps: unknown[]
) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    renderFn(svg);
    return () => {
      svg.selectAll("*").remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
