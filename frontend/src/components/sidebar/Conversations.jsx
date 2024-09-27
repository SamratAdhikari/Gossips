import useGetConversations from "../../hooks/useGetConversations.js";
import { getEmoji } from "../../utils/emojis.js";
import Conversation from "./Conversation.jsx";

const Conversations = () => {
    const { loading, conversations } = useGetConversations();

    return (
        <div className="py-2 flex flex-col overflow-auto">
            {/* {console.log(conversations)} */}
            {conversations.length === 0 ? (
                <p className="text-gray-500 mx-auto">No conversations found</p>
            ) : (
                conversations.map((conversation, idx) => (
                    <Conversation
                        key={conversation._id}
                        conversation={conversation}
                        emoji={getEmoji()}
                        lastIdx={idx === conversations.length - 1}
                    />
                ))
            )}
            {loading ? (
                <span className="loading loading-spinner mx-auto"></span>
            ) : null}
        </div>
    );
};

export default Conversations;
