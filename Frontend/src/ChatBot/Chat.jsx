import ChatMessageBox from "./ChatMessageBox.jsx";
import {useEffect, useRef, useState} from "react";
import Messages from "./Messages.jsx";

import ai from "../Utils/gemini.js";

const Chat = ({handleChatDisplay}) => {
    const [chatHistory, setChatHistory] = useState([{role: "model" , text: "Hi! How can i help?"}]);
    const chatBodyRef = useRef();

    const generateBotReplies = async (history) => {
        const updateHistory= (text) => {
            setChatHistory(prev=> [...prev.filter(msg => msg.text !== "Analyzing...." ), {role:"model" , text}]);
        }

        // Gemini API requires the first message to be from the 'user' role
        const apiHistory = history[0]?.role === "model" ? history.slice(1) : history;
        const formattedHistory = apiHistory.map(({ role, text }) => ({ role, parts: [{ text }] }));

        try {
            const currentDate = new Date().toDateString();
            const systemInstruction = `You are KrishiMitra, an intelligent agricultural assistant. Today's date is ${currentDate}. Answer concisely and accurately. Ensure your responses are formatted cleanly using simple spacing and bullet points. Avoid using markdown bold (**) since the UI does not render it.`;

            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: formattedHistory,
                config: {
                    systemInstruction: systemInstruction,
                }
            });

            const apiResponse = response.text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
            updateHistory(apiResponse);

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behavior: "smooth"});
    },[chatHistory])

    return (
        <div className="w-[22em] h-[32em] flex flex-col bg-white shadow-lg rounded-lg border ">

            <div className="h-[3em] text-black shadow-[0px_50px_100px_50px_rgba(0,_0,_0,_0.1)] flex justify-between items-center px-4 font-semibold rounded-t-lg">
                AI ChatBot
                <img src="https://www.svgrepo.com/show/506172/cross.svg"
                     className="w-5 h-5 cursor-pointer"
                     onClick={() => handleChatDisplay(false)} // Close on Click
                     alt="Close" />
            </div>

            {/* Chat Body */}
            <div ref={chatBodyRef} className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-200" >

                {chatHistory.map((chat,index) => (
                    <Messages chat={chat} key={index} />
                ))}

            </div>

            {/* Input Field */}
            <ChatMessageBox chatHistory={chatHistory}
                            setChatHistory={setChatHistory}
                            generateBotReplies={generateBotReplies} />
        </div>
    );
};

export default Chat;
