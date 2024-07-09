import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emojis";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="w-70 h-screen bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg flex flex-col border-r border-gray-300">
      <div className="flex-1 overflow-y-auto font-bold scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {conversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations.length - 1}
          />
        ))}

        {loading && <span className="loading loading-spinner mx-auto"></span>}
      </div>
    </div>
  );
};

export default Conversations;
