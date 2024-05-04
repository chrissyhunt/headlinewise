import { Database } from "@/database.types";

export type Analysis = Database["public"]["Tables"]["analysis"]["Row"] & {
  articles?: { source: string | null } | null;
};

export interface Attributes {
  [key: string]: {
    language: {
      [key: string]: number;
    };
    political_bias: {
      [key: string]: number;
    };
    approved: number;
    rejected: number;
    needs_review: number;
  };
}

export const attributesPerModel = (acc: Attributes, curr: Analysis) => {
  const model = curr.model as string;
  if (!acc[model]) {
    acc[model] = {
      language: {},
      political_bias: {},
      approved: 0,
      rejected: 0,
      needs_review: 0,
    };
  }
  const language = curr.language?.split(",").map((l) => l.trim());
  const political_bias = curr.political_bias as string;
  const approved_status = curr.approved;

  language?.forEach((l) => {
    if (!acc[model].language[l]) {
      acc[model].language[l] = 0;
    }
    acc[model].language[l] += 1;
  });

  if (!acc[model].political_bias[political_bias]) {
    acc[model].political_bias[political_bias] = 0;
  }
  acc[model].political_bias[political_bias] += 1;

  if (approved_status === true) {
    acc[model].approved += 1;
  } else if (approved_status === false) {
    acc[model].rejected += 1;
  } else {
    acc[model].needs_review += 1;
  }

  return acc;
};

export const attributesPerSource = (acc: Attributes, curr: Analysis) => {
  const source = curr.articles?.source as string;
  if (!acc[source]) {
    acc[source] = {
      language: {},
      political_bias: {},
      approved: 0,
      rejected: 0,
      needs_review: 0,
    };
  }
  const language = curr.language?.split(",").map((l) => l.trim());
  const political_bias = curr.political_bias as string;
  const approved_status = curr.approved;

  language?.forEach((l) => {
    if (!acc[source].language[l]) {
      acc[source].language[l] = 0;
    }
    acc[source].language[l] += 1;
  });

  if (!acc[source].political_bias[political_bias]) {
    acc[source].political_bias[political_bias] = 0;
  }
  acc[source].political_bias[political_bias] += 1;

  if (approved_status === true) {
    acc[source].approved += 1;
  } else if (approved_status === false) {
    acc[source].rejected += 1;
  } else {
    acc[source].needs_review += 1;
  }

  return acc;
};
