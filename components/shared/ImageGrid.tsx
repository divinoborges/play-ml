"use client";

import { useTranslations } from "next-intl";
import type { DatasetSample } from "@/lib/datasets";

interface ImageGridProps {
  trainData: DatasetSample[];
  testData: DatasetSample[];
  target: string;
  imageSize: number;
}

function PixelImage({
  pixels,
  size,
  displaySize = 80,
}: {
  pixels: number[];
  size: number;
  displaySize?: number;
}) {
  const pixelSize = displaySize / size;

  return (
    <div
      className="rounded-lg overflow-hidden border-2 border-black/20"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, ${pixelSize}px)`,
        width: displaySize,
        height: displaySize,
      }}
    >
      {pixels.map((value, i) => (
        <div
          key={i}
          style={{
            width: pixelSize,
            height: pixelSize,
            backgroundColor: `rgb(${value},${value},${value})`,
          }}
        />
      ))}
    </div>
  );
}

export { PixelImage };

export default function ImageGrid({
  trainData,
  testData,
  target,
  imageSize,
}: ImageGridProps) {
  const t = useTranslations("data");

  return (
    <div className="space-y-8">
      {/* Training images */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-heading text-lg font-bold text-black uppercase">
            {t("trainData")}
          </h3>
          <span className="font-body text-sm text-black/70">
            {trainData.length} {t("samples")}
          </span>
        </div>
        <div className="flex flex-wrap gap-4">
          {trainData.map((sample, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <PixelImage
                pixels={sample.pixels as unknown as number[]}
                size={imageSize}
              />
              <span className="font-heading text-xs font-bold text-black uppercase">
                {String(sample[target])}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Test images */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-heading text-lg font-bold text-black uppercase">
            {t("testData")}
          </h3>
          <span className="font-body text-sm text-black/70">
            {testData.length} {t("samples")}
          </span>
        </div>
        <div className="flex flex-wrap gap-4">
          {testData.map((sample, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <PixelImage
                pixels={sample.pixels as unknown as number[]}
                size={imageSize}
              />
              <span className="font-heading text-xs font-bold text-black uppercase">
                {String(sample[target])}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
