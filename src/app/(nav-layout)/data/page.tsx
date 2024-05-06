import { getAnalysisData } from "@/lib/supabase/get-analysis-data";
import {
  attributesPerModel,
  attributesPerSourceModel,
  uniqueLanguageKeys,
} from "@/utils/report-data-reducers";
import { DataContent } from "./DataContent";

export default async function DataPage() {
  const analyses = await getAnalysisData();
  const modelAttributes = analyses.reduce(attributesPerModel, {});
  const models = Object.keys(modelAttributes).sort((a, b) =>
    a.localeCompare(b)
  );
  const sourceAttributes = analyses.reduce(attributesPerSourceModel, {});
  const languageKeys = Array.from(
    analyses.reduce(uniqueLanguageKeys, new Set())
  ).sort((a, b) => a.localeCompare(b));
  const sources = Object.keys(sourceAttributes).sort((a, b) =>
    a.localeCompare(b)
  );

  const languageMaxCount = Math.max(
    ...sources
      .map((s) => {
        return models.map((m) => {
          return languageKeys.map((l) => {
            return sourceAttributes[s].language[m]?.[l] || 0;
          });
        });
      })
      .flat(3)
  );

  return (
    <DataContent
      models={models}
      modelAttributes={modelAttributes}
      sourceAttributes={sourceAttributes}
      sources={sources}
      languageKeys={languageKeys}
      languageMaxCount={languageMaxCount}
    />
  );
}
