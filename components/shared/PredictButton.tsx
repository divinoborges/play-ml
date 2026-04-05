"use client";

import { useTranslations } from "next-intl";

interface PredictButtonProps {
  onClick: () => void;
  disabled: boolean;
  isPredicting: boolean;
}

export default function PredictButton({
  onClick,
  disabled,
  isPredicting,
}: PredictButtonProps) {
  const t = useTranslations("actions");

  return (
    <button
      onClick={onClick}
      disabled={disabled || isPredicting}
      className={`rounded-full border-2 border-black px-8 py-3 font-heading text-base font-bold uppercase transition-colors ${
        disabled
          ? "bg-black/10 text-black/30 cursor-not-allowed border-black/30"
          : "bg-lime-pop text-black hover:bg-black hover:text-lime-pop"
      }`}
      title={disabled ? t("trainFirst") : undefined}
    >
      {isPredicting ? t("predicting") : t("predict")}
    </button>
  );
}
