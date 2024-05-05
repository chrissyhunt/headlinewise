import { Database } from "@/database.types";

export type Analysis = Database["public"]["Tables"]["analysis"]["Row"] & {
  articles?: { source: string | null } | null;
};

export interface Attributes {
  [model: string]: {
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

interface SourceModelAttributes {
  [source: string]: {
    language: {
      [model: string]: {
        [key: string]: number;
      };
    };
    political_bias: {
      [model: string]: {
        [key: string]: number;
      };
    };
    count: number;
  };
}

export const attributesPerSourceModel = (
  acc: SourceModelAttributes,
  curr: Analysis
) => {
  const source = curr.articles?.source as string;
  if (!acc[source]) {
    acc[source] = {
      language: {},
      political_bias: {},
      count: 0,
    };
  }
  if (!acc[source].language[curr.model as string]) {
    acc[source].language[curr.model as string] = {};
  }
  if (!acc[source].political_bias[curr.model as string]) {
    acc[source].political_bias[curr.model as string] = {};
  }
  const language = curr.language?.split(",").map((l) => l.trim());
  const political_bias = curr.political_bias as string;

  language?.forEach((l) => {
    if (!acc[source].language[curr.model as string][l]) {
      acc[source].language[curr.model as string][l] = 0;
    }
    acc[source].language[curr.model as string][l] += 1;
  });

  if (!acc[source].political_bias[curr.model as string][political_bias]) {
    acc[source].political_bias[curr.model as string][political_bias] = 0;
  }
  acc[source].political_bias[curr.model as string][political_bias] += 1;

  acc[source].count += 1;

  return acc;
};

export const uniqueLanguageKeys = (acc: Set<string>, curr: Analysis) => {
  const language = curr.language?.split(",").map((l) => l.trim());
  language?.forEach((l) => acc.add(l));
  return acc;
};
