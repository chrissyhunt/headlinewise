import { getAnalysisData } from "@/lib/supabase/get-analysis-data";
import {
  attributesPerModel,
  attributesPerSourceModel,
  uniqueLanguageKeys,
} from "@/utils/report-data-reducers";
import { DataContent } from "../../../components/DataContent";

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

  const politicsMaxCount = Math.max(
    ...sources
      .map((source) => {
        return models.map((model) => {
          return politicsKeys.map((key) => {
            return sourceAttributes[source].political_bias[model]?.[key] || 0;
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
      politicsKeys={politicsKeys}
      politicsMaxCount={politicsMaxCount}
    />
  );
}
