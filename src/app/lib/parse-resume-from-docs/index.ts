import axios from 'axios';
import mammoth from 'mammoth';
import { uploadText } from "api/upload";
import { Resume } from "lib/redux/types";
import { getResume } from "api/getResume";

export const parseResumeFromDocx = async (fileUrl: string) => {
    // Step 1. Read a docx resume file into text items to prepare for processing
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });

    // Extract the raw text content using mammoth.
    const result = await mammoth.extractRawText({ arrayBuffer: response.data });

    console.log()
  
    const docx_text = result.value
    console.log(docx_text)
  
    const resume = await uploadText(docx_text)
    // console.log("Upload done | Getting resume back...")
    // const resume = await getResume(docx_text)
    console.log("Resume:", resume)
  
    return resume
  };
  