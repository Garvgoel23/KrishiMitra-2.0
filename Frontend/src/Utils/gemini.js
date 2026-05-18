import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: "AIzaSyAUNDvQPZ7zbY8nXzB-69UDD04k3ZrAHYk"});

export default ai;

// const testRun=async ()=>{
//     const prompt="hello gemini "
//     const result = await model.generateContent(prompt);
//     console.log(result.response.text());
// }
// testRun();
// console.log(import.meta.env)


