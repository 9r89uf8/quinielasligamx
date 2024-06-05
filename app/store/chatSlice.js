// store/chatSlice.js
export const createChatSlice = (set) => ({
    conversationHistory: [],
    messageSent: false,
    setConversationHistory: (conversationHistory) => set({ conversationHistory }),
    setMessageSent: (messageSent) => set({ messageSent }),
});
