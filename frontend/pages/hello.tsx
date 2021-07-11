import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import EmojiButtons from "../components/emojiButton";

const ENDPOINT = "http://localhost:3000";

function App() {
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
            setResponse(data);
        });
    }, []);

    return (
        <>
            <p>
                It's <time dateTime={response}>{response}</time>
            </p>
            <EmojiButtons />
        </>
    );
}

export default App;