'use client'
import DataIntro from '@/content/data-intro.mdx'
import DataModels from '@/content/data-models.mdx'
import DataLanguage from '@/content/data-language.mdx'
import DataPolitics from '@/content/data-politics.mdx'
import {
  ModelApprovalStatusCounts,
  SourceModelAttributes,
} from '@/utils/report-data'
import { FilterBarChartWidget } from '@/components/charts/FilterBarChartWidget'
import { ModelReviewDataViz } from '@/components/ModelReviewDataViz'

interface SectionProps {
  children: React.ReactNode
}

const Section = ({ children }: SectionProps) => (
  <section className="flex w-full flex-col items-center space-y-12">
    {children}
  </section>
)

interface DataAreaProps {
  children: React.ReactNode
}

const DataArea = ({ children }: DataAreaProps) => (
  <div className="w-full md:w-3/4">{children}</div>
)

interface DataContentProps {
  models: string[]
  modelApprovalStatusCounts: ModelApprovalStatusCounts
  sourceAttributes: SourceModelAttributes
  sources: string[]
  sourceNames: { [key: string]: string }
  languageKeys: string[]
  languageMaxCount: number
  politicsKeys: string[]
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
}: DataContentProps) => {
  const proseClasses =
    'prose prose-md md:prose-xl prose-gray prose-headings:font-serif prose-headings:font-normal prose-li:marker:text-inherit'
  return (
    <div className="mb-24 mt-36 flex w-full flex-col items-center space-y-14 px-8 md:mt-48 md:space-y-24">
      <section className={`${proseClasses}`}>
        <DataIntro />
      </section>
      <Section>
        <div className={proseClasses}>
          <DataModels />
        </div>
        <DataArea>
          <ModelReviewDataViz
            models={models}
            modelApprovalStatusCounts={modelApprovalStatusCounts}
            bars={['approved', 'rejected', 'needs_review']}
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
            isStacked
          />
        </DataArea>
      </Section>
    </div>
  )
}
