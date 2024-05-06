import { Database } from "@/database.types";
import { getAnalysisData } from "@/lib/supabase/get-analysis-data";
import { ModelBarChart } from "./ModelBarChart";
import {
  attributesPerModel,
  attributesPerSourceModel,
  uniqueLanguageKeys,
} from "@/utils/report-data-reducers";
import { SourceLanguageChartPicker } from "./SourceLanguageChartPicker";
import { SourceLanguageBarChart } from "./SourceLanguageBarChart";

export default async function DataPage() {
  const proseClasses =
    "prose prose-md md:prose-xl prose-gray prose-headings:font-serif prose-headings:font-normal prose-li:marker:text-inherit";
  const analyses = await getAnalysisData();
  const modelAttributes = analyses.reduce(attributesPerModel, {});
  const models = Object.keys(modelAttributes);
  const sourceAttributes = analyses.reduce(attributesPerSourceModel, {});
  const languageKeys = Array.from(
    analyses.reduce(uniqueLanguageKeys, new Set())
  ).sort((a, b) => a.localeCompare(b));
  const sources = Object.keys(sourceAttributes).sort((a, b) =>
    a.localeCompare(b)
  );
  const sourceMaxCount = Math.max(
    ...sources.map((s) => sourceAttributes[s].count)
  );

  return (
    <div className="mt-36 md:mt-48 mb-24 px-8 space-y-24 flex flex-col items-center w-full">
      <section className={`${proseClasses}`}>
        <h1>Data</h1>
        <p>
          In an effort to understand the quality of analysis produced by the
          generative AI models used in this project, this page presents an
          aggregate view of analysis data. The reports below are updated daily
          as new analyses are generated and reviewed.
        </p>
      </section>
      <section className="w-full flex flex-col items-center space-y-8">
        <div className={proseClasses}>
          <h2>Analysis Quality by Model</h2>
          <p>
            All generated analyses are displayed to users, but are also reviewed
            by me periodically and marked &apos;approved&apos; or
            &apos;rejected.&apos;
          </p>
        </div>
        <div className="w-3/4">
          <ModelBarChart
            data={models.map((m) => ({
              name: m,
              approved: modelAttributes[m].approved,
              rejected: modelAttributes[m].rejected,
              needs_review: modelAttributes[m].needs_review,
            }))}
          />
        </div>
      </section>
      <section className="w-full flex flex-col items-center space-y-8">
        <div className={proseClasses}>
          <h2>Language Analysis by Media Source</h2>
          <p>Lorem ipsum</p>
        </div>
        <div className="w-3/4">
          <SourceLanguageBarChart
            data={sourceAttributes}
            models={models}
            sources={sources}
            languageKeys={languageKeys}
            max={sourceMaxCount}
          />
        </div>
      </section>
      <section className="w-full flex flex-col items-center space-y-8">
        <div className={proseClasses}>
          <h2>Political Analysis by Media Source</h2>
          <p>Lorem ipsum</p>
        </div>
        <div className="w-3/4"></div>
      </section>
    </div>
  );
}
