"use client";

import type { HyperparameterConfig } from "@/lib/registry";

interface HyperparameterPanelProps {
  config: HyperparameterConfig[];
  values: Record<string, number | string>;
  onChange: (key: string, value: number | string) => void;
}

export default function HyperparameterPanel({
  config,
  values,
  onChange,
}: HyperparameterPanelProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl border-2 border-black bg-sand p-6">
      {config.map((param) => (
        <div key={param.key}>
          <label className="flex items-center justify-between font-heading text-sm font-bold text-black mb-2">
            <span>{param.label}</span>
            <span className="inline-flex items-center justify-center rounded-full bg-yellow-pop px-3 py-0.5 font-heading text-xs font-bold text-black">
              {values[param.key] ?? param.default}
            </span>
          </label>
          {param.type === "slider" ? (
            <input
              type="range"
              min={param.min}
              max={param.max}
              step={param.step}
              value={Number(values[param.key] ?? param.default)}
              onChange={(e) => onChange(param.key, Number(e.target.value))}
              className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer accent-black"
            />
          ) : (
            <select
              value={String(values[param.key] ?? param.default)}
              onChange={(e) => onChange(param.key, e.target.value)}
              className="w-full rounded-full border-2 border-black bg-white px-4 py-1.5 font-body text-sm text-black"
            >
              {param.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
}
