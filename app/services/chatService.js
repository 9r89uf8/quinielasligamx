import { useStore } from '../store/store'; // Ensure you import the correct store



export const fetchMessages = async (formData) => {
    const setConversationHistory = useStore.getState().setConversationHistory;
    const setMessageSent = useStore.getState().setMessageSent;

    try {
        setMessageSent(true)
        const response = await fetch(`/api/chat/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            const data = await response.json();
            setConversationHistory(data);
            setMessageSent(false)
            return data;
        } else {
            setMessageSent(false)
            throw new Error('Failed to fetch the latest jornada');
        }
    } catch (error) {
        setMessageSent(false)
        console.error(error.message);
        return null;
    }
};


export const sendChatPrompt = async (formData) => {
    const setConversationHistory = useStore.getState().setConversationHistory;
    const setMessageSent = useStore.getState().setMessageSent;

    try {
        setMessageSent(true)
        const response = await fetch('/api/chat/prompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            const data = await response.json();
            setConversationHistory(data.conversationHistory);
            setMessageSent(false)
            return data.assistantMessage.content;
        } else {
            setMessageSent(false)
            throw new Error('Failed to fetch the latest jornada');
        }
    } catch (error) {
        setMessageSent(false)
        console.error('Error fetching the latest jornada:', error);
        return null;
    }
};
