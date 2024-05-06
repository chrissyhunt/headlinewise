"use client";
import DataIntro from "@/content/data-intro.mdx";
import DataModels from "@/content/data-models.mdx";
import DataLanguage from "@/content/data-language.mdx";
import DataPolitics from "@/content/data-politics.mdx";
import { StackedBarChart } from "./StackedBarChart";
import {
  ModelAttributes,
  SourceModelAttributes,
} from "@/utils/report-data-reducers";
import { GroupedBarChartWidget } from "./GroupedBarChartWidget";
import { DataTable } from "./DataTable";
import { StackedBarChartWidget } from "./StackedBarChartWidget";

interface DataContentProps {
  models: string[];
  modelAttributes: ModelAttributes;
  sourceAttributes: SourceModelAttributes;
  sources: string[];
  languageKeys: string[];
  languageMaxCount: number;
  politicsKeys: string[];
  politicsMaxCount: number;
}

export const DataContent = ({
  models,
  modelAttributes,
  sourceAttributes,
  sources,
  languageKeys,
  languageMaxCount,
  politicsKeys,
  politicsMaxCount,
}: DataContentProps) => {
  const proseClasses =
    "prose prose-md md:prose-xl prose-gray prose-headings:font-serif prose-headings:font-normal prose-li:marker:text-inherit";
  return (
    <div className="mt-36 md:mt-48 mb-24 px-8 space-y-24 flex flex-col items-center w-full">
      <section className={`${proseClasses}`}>
        <DataIntro />
      </section>
      <section className="w-full flex flex-col items-center space-y-12">
        <div className={proseClasses}>
          <DataModels />
        </div>
        <div className="w-3/4">
          <StackedBarChartWidget
            models={models}
            modelAttributes={modelAttributes}
          />
        </div>
      </section>
      <section className="w-full flex flex-col items-center space-y-12">
        <div className={proseClasses}>
          <DataLanguage />
        </div>
        <div className="w-3/4">
          <GroupedBarChartWidget
            data={sourceAttributes}
            attributeParentKey="language"
            bars={models}
            sources={sources}
            categories={languageKeys}
            max={languageMaxCount}
          />
        </div>
      </section>
      <section className="w-full flex flex-col items-center space-y-12">
        <div className={proseClasses}>
          <DataPolitics />
        </div>
        <div className="w-3/4">
          <GroupedBarChartWidget
            data={sourceAttributes}
            attributeParentKey="political_bias"
            bars={models}
            sources={sources}
            categories={politicsKeys}
            max={politicsMaxCount}
          />
        </div>
      </section>
    </div>
  );
};
