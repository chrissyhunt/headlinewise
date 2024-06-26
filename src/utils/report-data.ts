import { Database } from "@/database.types";

export type Analysis = Database["public"]["Tables"]["analysis"]["Row"] & {
  articles?: { source: string | null } | null;
};

export interface ModelApprovalStatusCounts {
  [model: string]: {
    approved: number;
    rejected: number;
    needs_review: number;
  };
}

export const statusCountsPerModel = (
  acc: ModelApprovalStatusCounts,
  curr: Analysis
) => {
  const model = curr.model as string;
  if (!acc[model]) {
    acc[model] = {
      approved: 0,
      rejected: 0,
      needs_review: 0,
    };
  }

  const approved_status = curr.approved;

  if (approved_status === true) {
    acc[model].approved += 1;
  } else if (approved_status === false) {
    acc[model].rejected += 1;
  } else {
    acc[model].needs_review += 1;
  }

  return acc;
};

export interface SourceModelAttributes {
  [source: string]: {
    [attributeType: string]: {
      [model: string]: {
        [key: string]: number;
      };
    };
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

  return acc;
};

export const uniqueLanguageKeys = (acc: Set<string>, curr: Analysis) => {
  const language = curr.language?.split(",").map((l) => l.trim());
  language?.forEach((l) => acc.add(l));
  return acc;
};
