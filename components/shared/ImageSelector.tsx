"use client";

import { useTranslations } from "next-intl";
import type { DatasetSample } from "@/lib/datasets";
import { PixelImage } from "./ImageGrid";

interface ImageSelectorProps {
  samples: DatasetSample[];
  target: string;
  imageSize: number;
  selectedIndex: number | null;
  onSelect: (index: number, sample: DatasetSample) => void;
}

export default function ImageSelector({
  samples,
  target,
  imageSize,
  selectedIndex,
  onSelect,
}: ImageSelectorProps) {
  const t = useTranslations("data");

  return (
    <div>
      <p className="font-heading text-xs font-bold text-black uppercase mb-3">
        {t("selectImage")}:
      </p>
      <div className="flex flex-wrap gap-4">
        {samples.map((sample, i) => (
          <button
            key={i}
            onClick={() => onSelect(i, sample)}
            className={`flex flex-col items-center gap-2 rounded-2xl p-3 transition-all ${
              selectedIndex === i
                ? "bg-black ring-4 ring-yellow-pop"
                : "bg-sand hover:bg-sand-light border-2 border-black/20 hover:border-black"
            }`}
          >
            <PixelImage
              pixels={sample.pixels as unknown as number[]}
              size={imageSize}
            />
            <span
              className={`font-heading text-xs font-bold uppercase ${
                selectedIndex === i ? "text-yellow-pop" : "text-black"
              }`}
            >
              {String(sample[target])}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
