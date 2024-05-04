import { Database } from "@/database.types";
import { getAnalysisData } from "@/lib/supabase/get-analysis-data";
import { ModelBarChart } from "./ModelBarChart";
import {
  attributesPerModel,
  attributesPerSource,
} from "@/utils/report-data-reducers";

export default async function DataPage() {
  const analyses = await getAnalysisData();
  const modelAttributes = analyses.reduce(attributesPerModel, {});
  const models = Object.keys(modelAttributes);
  const sourceAttributes = analyses.reduce(attributesPerSource, {});
  // console.log(modelAttributes);
  console.log(sourceAttributes);
  return (
    <div className="mt-36 md:mt-48 mb-24 px-8 flex justify-center">
      <section className="prose prose-md md:prose-xl prose-gray prose-headings:font-serif prose-headings:font-normal prose-li:marker:text-inherit">
        <h1>Data</h1>
        <p>
          In an effort to understand the quality of analysis produced by the
          generative AI models used in this project, this page presents an
          aggregate view of analysis data. The reports below are updated daily
          as new analyses are generated and reviewed.
        </p>
        <h2>Analysis Quality by Model</h2>
        <div className="w-full">
          <ModelBarChart
            data={models.map((m) => ({
              name: m,
              approved: modelAttributes[m].approved,
              rejected: modelAttributes[m].rejected,
              needs_review: modelAttributes[m].needs_review,
            }))}
          />
        </div>

        <h2>Analysis by Media Source</h2>
      </section>
    </div>
  );
}
