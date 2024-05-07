"use client";
import DataIntro from "@/content/data-intro.mdx";
import DataModels from "@/content/data-models.mdx";
import DataLanguage from "@/content/data-language.mdx";
import DataPolitics from "@/content/data-politics.mdx";
import {
  ModelAttributes,
  SourceModelAttributes,
} from "@/utils/report-data-reducers";
import { GroupedBarChartWidget } from "./GroupedBarChartWidget";
import { StackedBarChartWidget } from "./StackedBarChartWidget";

const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="w-full flex flex-col items-center space-y-12">
    {children}
  </section>
);

const DataArea = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full md:w-3/4">{children}</div>
);

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
    <div className="mt-36 md:mt-48 mb-24 px-8 space-y-14 md:space-y-24 flex flex-col items-center w-full">
      <section className={`${proseClasses}`}>
        <DataIntro />
      </section>
      <Section>
        <div className={proseClasses}>
          <DataModels />
        </div>
        <DataArea>
          <StackedBarChartWidget
            models={models}
            modelAttributes={modelAttributes}
          />
        </DataArea>
      </Section>
      <Section>
        <div className={proseClasses}>
          <DataLanguage />
        </div>
        <DataArea>
          <GroupedBarChartWidget
            data={sourceAttributes}
            attributeParentKey="language"
            bars={models}
            sources={sources}
            categories={languageKeys}
            max={languageMaxCount}
          />
        </DataArea>
      </Section>
      <Section>
        <div className={proseClasses}>
          <DataPolitics />
        </div>
        <DataArea>
          <GroupedBarChartWidget
            data={sourceAttributes}
            attributeParentKey="political_bias"
            bars={models}
            sources={sources}
            categories={politicsKeys}
            max={politicsMaxCount}
          />
        </DataArea>
      </Section>
    </div>
  );
};
