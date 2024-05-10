"use client";
import DataIntro from "@/content/data-intro.mdx";
import DataModels from "@/content/data-models.mdx";
import DataLanguage from "@/content/data-language.mdx";
import DataPolitics from "@/content/data-politics.mdx";
import {
  ModelApprovalStatusCounts,
  SourceModelAttributes,
} from "@/utils/report-data-reducers";
import { FilterBarChartWidget } from "./FilterBarChartWidget";
import { ToggleBarChartWidget } from "./ToggleBarChartWidget";

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
  modelApprovalStatusCounts: ModelApprovalStatusCounts;
  sourceAttributes: SourceModelAttributes;
  sources: string[];
  sourceNames: { [key: string]: string };
  languageKeys: string[];
  languageMaxCount: number;
  politicsKeys: string[];
  politicsMaxCount: number;
}

export const DataContent = ({
  models,
  modelApprovalStatusCounts,
  sourceAttributes,
  sources,
  sourceNames,
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
          <ToggleBarChartWidget
            models={models}
            modelApprovalStatusCounts={modelApprovalStatusCounts}
            bars={["approved", "rejected", "needs_review"]}
            isStacked
            customCategoryLabel="Model"
          />
        </DataArea>
      </Section>
      <Section>
        <div className={proseClasses}>
          <DataLanguage />
        </div>
        <DataArea>
          <FilterBarChartWidget
            data={sourceAttributes}
            attributeParentKey="language"
            bars={models}
            sources={sources}
            sourceNames={sourceNames}
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
          <FilterBarChartWidget
            data={sourceAttributes}
            attributeParentKey="political_bias"
            bars={models}
            sources={sources}
            sourceNames={sourceNames}
            categories={politicsKeys}
            max={politicsMaxCount}
            isStacked
          />
        </DataArea>
      </Section>
    </div>
  );
};
