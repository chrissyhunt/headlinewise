"use client";
import DataIntro from "@/content/data-intro.mdx";
import DataModels from "@/content/data-models.mdx";
import DataLanguage from "@/content/data-language.mdx";
import DataPolitics from "@/content/data-politics.mdx";
import { ModelBarChart } from "./ModelBarChart";
import {
  ModelAttributes,
  SourceModelAttributes,
} from "@/utils/report-data-reducers";
import { SourceLanguageBarChart } from "./SourceLanguageBarChart";

interface DataContentProps {
  models: string[];
  modelAttributes: ModelAttributes;
  sourceAttributes: SourceModelAttributes;
  sources: string[];
  languageKeys: string[];
  languageMaxCount: number;
}

export const DataContent = ({
  models,
  modelAttributes,
  sourceAttributes,
  sources,
  languageKeys,
  languageMaxCount,
}: DataContentProps) => {
  const proseClasses =
    "prose prose-md md:prose-xl prose-gray prose-headings:font-serif prose-headings:font-normal prose-li:marker:text-inherit";
  return (
    <div className="mt-36 md:mt-48 mb-24 px-8 space-y-24 flex flex-col items-center w-full">
      <section className={`${proseClasses}`}>
        <DataIntro />
      </section>
      <section className="w-full flex flex-col items-center space-y-8">
        <div className={proseClasses}>
          <DataModels />
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
          <DataLanguage />
        </div>
        <div className="w-3/4">
          <SourceLanguageBarChart
            data={sourceAttributes}
            models={models}
            sources={sources}
            languageKeys={languageKeys}
            max={languageMaxCount}
          />
        </div>
      </section>
      <section className="w-full flex flex-col items-center space-y-8">
        <div className={proseClasses}>
          <DataPolitics />
        </div>
        <div className="w-3/4"></div>
      </section>
    </div>
  );
};
