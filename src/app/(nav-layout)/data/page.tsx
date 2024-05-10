import { getAnalysisData } from "@/lib/supabase/get-analysis-data";
import {
  statusCountsPerModel,
  attributesPerSourceModel,
  uniqueLanguageKeys,
} from "@/utils/report-data";
import { DataContent } from "../../../components/DataContent";
import { getSources } from "@/lib/supabase/get-sources";

export default async function DataPage() {
  const analyses = await getAnalysisData();
  const allSources = await getSources();
  const modelApprovalStatusCounts = analyses.reduce(statusCountsPerModel, {});
  const models = Object.keys(modelApprovalStatusCounts).sort((a, b) =>
    a.localeCompare(b)
  );
  const sourceAttributes = analyses.reduce(attributesPerSourceModel, {});
  const languageKeys = Array.from(
    analyses.reduce(uniqueLanguageKeys, new Set())
  ).sort((a, b) => a.localeCompare(b));
  const politicsKeys = [
    "very left-leaning",
    "slightly left-leaning",
    "neutral",
    "slightly right-leaning",
    "very right-leaning",
  ];
  const sources = Object.keys(sourceAttributes).sort((a, b) =>
    a.localeCompare(b)
  );
  const sourceNames = sources.reduce(
    (acc: { [key: string]: string }, sourceId: string) => {
      acc[sourceId] =
        allSources.find((source) => source.id === sourceId)?.name || "";
      return acc;
    },
    {}
  );

  const languageMaxCount = Math.max(
    ...sources
      .map((source) => {
        return models.map((model) => {
          return languageKeys.map((key) => {
            return sourceAttributes[source].language[model]?.[key] || 0;
          });
        });
      })
      .flat(3)
  );

  return (
    <DataContent
      models={models}
      modelApprovalStatusCounts={modelApprovalStatusCounts}
      sourceAttributes={sourceAttributes}
      sources={sources}
      sourceNames={sourceNames}
      languageKeys={languageKeys}
      languageMaxCount={languageMaxCount}
      politicsKeys={politicsKeys}
    />
  );
}
