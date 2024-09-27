import { useEffect } from "react";
import MessageInput from "./MessageInput.jsx";
import Messages from "./Messages.jsx";
import WelcomeScreen from "./WelcomeScreen.jsx";
import useConversation from "../../store/useConversation.js";

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        // cleanup function (unmount)
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        <div className="md:min-w-[450px] flex flex-col">
            {!selectedConversation ? (
                <WelcomeScreen />
            ) : (
                <>
                    <div className="bg-blue-950 px-4 py-2 mb-2">
                        <span className="text-gray-300 font-bold text-lg">
                            {selectedConversation.username}
                        </span>
                    </div>

                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    );
};

export default MessageContainer;
