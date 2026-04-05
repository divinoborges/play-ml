"use client";

import { useTranslations } from "next-intl";

interface TrainButtonProps {
  onClick: () => void;
  isTraining: boolean;
  progress?: number;
  isDone?: boolean;
}

export default function TrainButton({
  onClick,
  isTraining,
  progress,
  isDone,
}: TrainButtonProps) {
  const t = useTranslations("actions");

  return (
    <div className="flex flex-col items-start gap-3">
      <button
        onClick={onClick}
        disabled={isTraining}
        className={`rounded-full border-2 border-black px-8 py-3 font-heading text-base font-bold uppercase transition-colors ${
          isTraining
            ? "bg-black/40 text-white cursor-not-allowed"
            : isDone
              ? "bg-lime-pop text-black hover:bg-black hover:text-lime-pop"
              : "bg-yellow-pop text-black hover:bg-black hover:text-yellow-pop"
        }`}
      >
        {isTraining ? t("training") : isDone ? `✓ ${t("train")}` : t("train")}
      </button>
      {isTraining && progress !== undefined && (
        <div className="w-full max-w-xs">
          <div className="h-3 w-full rounded-full border-2 border-black bg-white overflow-hidden">
            <div
              className="h-full bg-magenta transition-all duration-300"
              style={{ width: `${Math.min(progress * 100, 100)}%` }}
            />
          </div>
          <p className="mt-1 font-heading text-xs font-bold text-black">
            {Math.round(progress * 100)}%
          </p>
        </div>
      )}
    </div>
  );
}
