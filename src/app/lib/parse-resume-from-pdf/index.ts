import { readPdf } from "lib/parse-resume-from-pdf/read-pdf";
import { groupTextItemsIntoLines } from "lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "lib/parse-resume-from-pdf/extract-resume-from-sections";
import { uploadText } from "api/upload";
import { Resume } from "lib/redux/types";
import { getResume } from "api/getResume";

/**
 * Resume parser util that parses a resume from a resume pdf file
 *
 * Note: The parser algorithm only works for single column resume in English language
 */
export const parseResumeFromPdf = async (fileUrl: string) => {
  // Step 1. Read a pdf resume file into text items to prepare for processing
  const textItems = await readPdf(fileUrl);
  console.log()

  // Step 2. Group text items into lines
  const lines = groupTextItemsIntoLines(textItems);
  let pdf_text = ""
  // lines.forEach((line) => pdfLines.)
  lines.forEach((line) => {
    let line_text = ""
    line.forEach((words) => {
      line_text += (" " + words.text)
    })
    pdf_text += ("\n" + line_text)
  })
  console.log(pdf_text)

  await uploadText(pdf_text)
  console.log("Upload done | Getting resume back...")
  const resume = await getResume()
  console.log("Resume:", resume)

  return resume

  // // Step 3. Group lines into sections
  // const sections = groupLinesIntoSections(lines);

  // // Step 4. Extract resume from sections
  // const resume = extractResumeFromSections(sections);

  // return resume;
};
