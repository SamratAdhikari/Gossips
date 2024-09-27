import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../store/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!search) return;

        if (search.length < 3) {
            return toast.error("Term must be at least 3 characters.");
        }

        const conversation = conversations.find((c) =>
            c.username.toLowerCase().includes(search.toLowerCase())
        );

        if (conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        } else {
            toast.error("User not found");
        }
    };

    return (
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="input input-bordered rounded-full"
            />

            <button
                className="btn btn-circle bg-blue-950 text-white"
                type="submit"
            >
                <IoSearchSharp />
            </button>
        </form>
    );
};

export default SearchInput;
