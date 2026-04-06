"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AlgorithmConfig } from "@/lib/registry";
import type { Dataset, DatasetSample } from "@/lib/datasets";
import { getAlgorithmModule } from "@/lib/algorithms";
import type { TrainResult, PredictionResult } from "@/lib/algorithms";
import type {
  RegressionMetrics,
  ClassificationMetrics,
  ClusteringMetrics,
  GenerativeMetrics,
  TrainingHistory,
} from "@/components/shared/MetricsPanel";
import { getVisualization } from "@/components/visualizations";
import DatasetTable from "@/components/shared/DatasetTable";
import ImageGrid from "@/components/shared/ImageGrid";
import ImageSelector from "@/components/shared/ImageSelector";
import { PixelImage } from "@/components/shared/ImageGrid";
import HyperparameterPanel from "@/components/shared/HyperparameterPanel";
import TrainButton from "@/components/shared/TrainButton";
import PredictButton from "@/components/shared/PredictButton";
import MetricsPanel from "@/components/shared/MetricsPanel";
import PredictionForm from "@/components/shared/PredictionForm";
import BrowserFrame from "@/components/shared/BrowserFrame";
import { getMathContent } from "@/lib/math-content";
import { getCodeContent } from "@/lib/code-content";

interface Props {
  algorithm: AlgorithmConfig;
}

export default function AlgorithmPageClient({ algorithm }: Props) {
  const t = useTranslations();
  const slug = algorithm.slug;

  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [hyperparams, setHyperparams] = useState<Record<string, number | string>>(() => {
    const defaults: Record<string, number | string> = {};
    algorithm.hyperparameters.forEach((h) => {
      defaults[h.key] = h.default;
    });
    return defaults;
  });
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [trainResult, setTrainResult] = useState<TrainResult | null>(null);
  const [predictionInputs, setPredictionInputs] = useState<Record<string, string>>({});
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [mathExpanded, setMathExpanded] = useState(false);
  const [codeExpanded, setCodeExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${algorithm.datasetPath}`)
      .then((r) => r.json())
      .then(setDataset)
      .catch(console.error);
  }, [algorithm.datasetPath]);

  const handleTrain = useCallback(async () => {
    if (!dataset) return;
    const mod = getAlgorithmModule(slug);
    if (!mod) return;

    setIsTraining(true);
    setProgress(0);
    setPrediction(null);

    try {
      const result = await mod.train(
        dataset.trainData,
        dataset.features,
        dataset.target,
        hyperparams,
        (p) => setProgress(p),
      );

      const testMetrics = mod.evaluate(
        result.model,
        dataset.testData,
        dataset.features,
        dataset.target,
      );

      setTrainResult({ ...result, metrics: testMetrics });
    } catch (err) {
      console.error("Training failed:", err);
    } finally {
      setIsTraining(false);
    }
  }, [dataset, slug, hyperparams]);

  const handlePredict = useCallback(() => {
    if (!trainResult?.model || !dataset) return;
    const mod = getAlgorithmModule(slug);
    if (!mod) return;

    setIsPredicting(true);
    try {
      const input: Record<string, number> = {};
      dataset.features.forEach((f) => {
        input[f] = Number(predictionInputs[f] || 0);
      });
      const result = mod.predict(trainResult.model, input, dataset.features);
      setPrediction(result);
    } finally {
      setIsPredicting(false);
    }
  }, [trainResult, dataset, slug, predictionInputs]);

  const handleUseSample = useCallback(
    (sample: DatasetSample) => {
      if (!dataset) return;
      const inputs: Record<string, string> = {};
      dataset.features.forEach((f) => {
        inputs[f] = String(sample[f]);
      });
      setPredictionInputs(inputs);
    },
    [dataset],
  );

  if (!dataset) {
    return (
      <div className="bg-sand px-4 py-16 text-center font-heading text-black/50">
        Loading dataset...
      </div>
    );
  }

  const Viz = getVisualization(slug);

  return (
    <div>
      {/* Back nav */}
      <div className="bg-black px-4 sm:px-6 lg:px-8 py-3">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center font-heading text-sm font-bold text-white/70 hover:text-yellow-pop uppercase"
          >
            ← {t("common.backToCatalog")}
          </Link>
        </div>
      </div>

      {/* Section 1: Real-World Context — BLACK */}
      <section className="bg-black px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-4xl">
          <div
            className="inline-flex items-center rounded-full px-4 py-1.5 font-heading text-xs font-bold text-black mb-6"
            style={{ backgroundColor: algorithm.color }}
          >
            {t(`categories.${algorithm.category}`)}
          </div>
          <h1 className="font-heading text-display-lg uppercase tracking-tight text-white mb-2">
            {t(`algorithms.${slug}.name`)}
          </h1>
          <h2 className="font-heading text-display-sm text-yellow-pop mb-6">
            {t(`algorithms.${slug}.contextTitle`)}
          </h2>
          <p className="font-body text-base text-white/80 leading-relaxed mb-8">
            {t(`algorithms.${slug}.contextDescription`)}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(["contextExtra1", "contextExtra2", "contextExtra3", "contextExtra4", "contextExtra5", "contextExtra6"] as const).map(
              (key) => (
                <div
                  key={key}
                  className="rounded-2xl border-2 border-white/30 p-4 font-body text-sm text-white/70"
                >
                  {t(`algorithms.${slug}.${key}`)}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Section 2: Dataset — GREEN PASTEL */}
      <section className="bg-green-pastel px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-display-sm uppercase text-black mb-6">
            {t("sections.dataset")}
          </h2>
          {slug === "cnn" && dataset.metadata && "imageSize" in dataset.metadata ? (
            <ImageGrid
              trainData={dataset.trainData}
              testData={dataset.testData}
              target={dataset.target}
              imageSize={(dataset.metadata as Record<string, unknown>).imageSize as number}
            />
          ) : (
            <DatasetTable
              dataset={dataset}
              onSampleSelect={trainResult ? handleUseSample : undefined}
            />
          )}
        </div>
      </section>

      {/* Section 3: How It Works — SAND LIGHT */}
      <section className="bg-sand-light px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-display-sm uppercase text-black mb-6">
            {t("sections.howItWorks")}
          </h2>
          {Viz ? (
            <BrowserFrame url={`playml.app/${slug}/visualization`}>
              <Viz />
            </BrowserFrame>
          ) : (
            <div className="rounded-2xl border-2 border-black bg-white p-8 text-center font-body text-black/50">
              Visualization not available.
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setMathExpanded(!mathExpanded)}
              className="rounded-full border-2 border-black bg-white px-4 py-1.5 font-heading text-xs font-bold text-black uppercase hover:bg-black hover:text-white transition-colors"
            >
              {t("actions.seeTheMath")} {mathExpanded ? "▲" : "▼"}
            </button>
            <button
              onClick={() => setCodeExpanded(!codeExpanded)}
              className="rounded-full border-2 border-black bg-white px-4 py-1.5 font-heading text-xs font-bold text-black uppercase hover:bg-black hover:text-white transition-colors"
            >
              {t("actions.seeTheCode")} {codeExpanded ? "▲" : "▼"}
            </button>
          </div>
          {mathExpanded && (
            <div className="mt-3 rounded-2xl border-2 border-black bg-white p-6 font-body text-sm text-black/70">
              {getMathContent(slug)}
            </div>
          )}
          {codeExpanded && (
            <div className="mt-3 rounded-2xl border-2 border-black bg-white p-6 relative">
              <button
                onClick={() => {
                  const code = getCodeContent(slug);
                  if (code) {
                    navigator.clipboard.writeText(code);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }
                }}
                className="absolute top-4 right-4 rounded-full border-2 border-black bg-sand px-3 py-1 font-heading text-xs font-bold text-black uppercase hover:bg-black hover:text-white transition-colors"
              >
                {copied ? t("actions.copied") : t("actions.copy")}
              </button>
              <pre className="overflow-x-auto font-mono text-sm text-black/80 leading-relaxed">
                <code>{getCodeContent(slug)}</code>
              </pre>
            </div>
          )}
        </div>
      </section>

      {/* Section 4: Training — SAND */}
      <section className="bg-sand px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-display-sm uppercase text-black mb-6">
            {t("sections.training")}
          </h2>
          <div className="space-y-6">
            <HyperparameterPanel
              config={algorithm.hyperparameters}
              values={hyperparams}
              onChange={(key, value) =>
                setHyperparams((prev) => ({ ...prev, [key]: value }))
              }
            />
            <TrainButton
              onClick={handleTrain}
              isTraining={isTraining}
              progress={progress}
              isDone={!!trainResult}
            />
            {trainResult && (
              <>
                <MetricsPanel
                  algorithmType={algorithm.algorithmType}
                  metrics={trainResult.metrics as RegressionMetrics | ClassificationMetrics | ClusteringMetrics | GenerativeMetrics}
                  trainingTime={trainResult.trainingTime}
                  history={trainResult.history as TrainingHistory | undefined}
                />
                <Link
                  href={`/metrics#${algorithm.algorithmType}`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-1.5 font-heading text-xs font-bold text-black uppercase hover:bg-black hover:text-white transition-colors"
                >
                  {t("actions.understandingMetrics")} →
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Section 5: Prediction / Generation — ORANGE POP */}
      <section className="bg-orange-pop px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-display-sm uppercase text-black mb-6">
            {algorithm.algorithmType === "generative" ? t("sections.generateSamples") : t("sections.prediction")}
          </h2>
          <div className="space-y-6">
            {algorithm.algorithmType !== "generative" && (
              <div className="rounded-2xl border-2 border-black bg-white p-6">
                {slug === "cnn" && dataset.metadata && "imageSize" in dataset.metadata ? (
                  <ImageSelector
                    samples={dataset.testData}
                    target={dataset.target}
                    imageSize={(dataset.metadata as Record<string, unknown>).imageSize as number}
                    selectedIndex={selectedImageIndex}
                    onSelect={(index, sample) => {
                      setSelectedImageIndex(index);
                      handleUseSample(sample);
                    }}
                  />
                ) : (
                  <PredictionForm
                    dataset={dataset}
                    values={predictionInputs}
                    onChange={(key, value) =>
                      setPredictionInputs((prev) => ({ ...prev, [key]: value }))
                    }
                    onUseSample={handleUseSample}
                  />
                )}
              </div>
            )}
            <div className="flex items-center gap-4">
              <PredictButton
                onClick={handlePredict}
                disabled={!trainResult}
                isPredicting={isPredicting}
              />
              {!trainResult && (
                <p className="font-body text-sm text-black/60">{t("actions.trainFirst")}</p>
              )}
            </div>
            {prediction && algorithm.algorithmType === "generative" ? (
              <div className="rounded-3xl border-3 border-black bg-sand p-8">
                <p className="font-heading text-xs font-bold text-black uppercase mb-4">
                  {t("sections.generatedSamples")}
                </p>
                <GeneratedSamplesPlot
                  realData={dataset.trainData.map((r) => [Number(r.x), Number(r.y)] as [number, number])}
                  generatedData={(() => {
                    try {
                      return JSON.parse(String(prediction.value)).map((p: {x: number; y: number}) => [p.x, p.y] as [number, number]);
                    } catch {
                      return [];
                    }
                  })()}
                />
              </div>
            ) : prediction ? (
              <div className="rounded-3xl border-3 border-black bg-sand p-8">
                <div className={slug === "cnn" && selectedImageIndex !== null ? "flex gap-6 items-start" : ""}>
                  {slug === "cnn" && selectedImageIndex !== null && dataset.metadata && "imageSize" in dataset.metadata && (
                    <div className="flex-shrink-0">
                      <PixelImage
                        pixels={dataset.testData[selectedImageIndex].pixels as unknown as number[]}
                        size={(dataset.metadata as Record<string, unknown>).imageSize as number}
                        displaySize={128}
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-heading text-xs font-bold text-black uppercase mb-2">
                      {algorithm.algorithmType === "clustering" ? t("sections.clusterAssignment") : t("sections.prediction")}
                    </p>
                    <p className="font-heading text-display-md text-black">
                      {String(prediction.value)}
                    </p>
                    {prediction.probabilities && (
                      <div className="mt-4 space-y-2">
                        {Object.entries(prediction.probabilities).map(
                          ([cls, prob]) => (
                            <div key={cls} className="flex items-center gap-3">
                              <span className="font-heading text-sm font-bold text-black w-12">
                                {cls}:
                              </span>
                              <div className="flex-1 h-3 rounded-full border-2 border-black bg-white overflow-hidden">
                                <div
                                  className="h-full bg-blue-electric"
                                  style={{ width: `${prob * 100}%` }}
                                />
                              </div>
                              <span className="font-heading text-sm font-bold text-black w-14 text-right">
                                {(prob * 100).toFixed(1)}%
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

    </div>
  );
}

function GeneratedSamplesPlot({
  realData,
  generatedData,
}: {
  realData: [number, number][];
  generatedData: [number, number][];
}) {
  const allPoints = [...realData, ...generatedData];
  const xs = allPoints.map((p) => p[0]);
  const ys = allPoints.map((p) => p[1]);
  const xMin = Math.min(...xs) - 1;
  const xMax = Math.max(...xs) + 1;
  const yMin = Math.min(...ys) - 1;
  const yMax = Math.max(...ys) + 1;

  const w = 300;
  const h = 300;
  const pad = 30;

  const scaleX = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * (w - 2 * pad);
  const scaleY = (y: number) => h - pad - ((y - yMin) / (yMax - yMin)) * (h - 2 * pad);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-sm border-2 border-black rounded-2xl bg-white">
        {realData.map(([x, y], i) => (
          <circle key={`r${i}`} cx={scaleX(x)} cy={scaleY(y)} r={3} fill="#3B82F6" opacity={0.5} />
        ))}
        {generatedData.map(([x, y], i) => (
          <circle key={`g${i}`} cx={scaleX(x)} cy={scaleY(y)} r={3} fill="#F59E0B" opacity={0.7} />
        ))}
      </svg>
      <div className="flex gap-4 mt-2 font-heading text-xs font-bold text-black">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-blue-electric inline-block" /> Real
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" /> Generated
        </span>
      </div>
    </div>
  );
}
