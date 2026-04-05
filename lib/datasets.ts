export interface DatasetSample {
  [key: string]: number | string;
}

export interface Dataset {
  features: string[];
  target: string;
  trainData: DatasetSample[];
  testData: DatasetSample[];
  metadata: {
    description: string;
    featureDescriptions: Record<string, string>;
  };
}

export async function loadDataset(path: string): Promise<Dataset> {
  const response = await fetch(path);
  return response.json();
}
