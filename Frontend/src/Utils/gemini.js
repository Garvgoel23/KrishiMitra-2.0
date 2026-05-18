import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY});

export default ai;

// const testRun=async ()=>{
//     const prompt="hello gemini "
//     const result = await model.generateContent(prompt);
//     console.log(result.response.text());
// }
// testRun();
// console.log(import.meta.env)


