import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const { message } = req.body;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // TODO: Socket.io func

        await Promise.all([conversation.save(), newMessage.save()]);

        return res.status(200).send({
            message: "Message sent successfully!",
            newMessage,
        });

        // error
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) {
            return res.status(200).send({ messages: [] });
        }

        return res.status(200).send({
            message: "Messages retrieved successfully",
            messages: conversation.messages,
        });

        // error
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
