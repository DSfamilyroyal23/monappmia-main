import React, { useState, useMemo } from 'react';
import { User, Conversation } from '../types';
import { CONVERSATIONS_DATA } from '../constants';
import ConversationList from '../components/ConversationList';
import ChatWindow from '../components/ChatWindow';
import { MessageIcon } from '../components/icons';

interface MessagesPageProps {
    user: User;
}

const MessagesPage: React.FC<MessagesPageProps> = ({ user }) => {
    const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS_DATA);
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

    const userConversations = useMemo(() => {
        return conversations.filter(c => c.participants.some(p => p.id === user.id));
    }, [conversations, user.id]);

    const selectedConversation = useMemo(() => {
        return userConversations.find(c => c.id === selectedConversationId) || null;
    }, [userConversations, selectedConversationId]);

    const handleSendMessage = (text: string) => {
        if (!selectedConversationId || !text.trim()) return;

        const newMessage = {
            id: `msg-${Date.now()}`,
            text,
            timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            senderId: user.id,
        };

        setConversations(prev =>
            prev.map(conv =>
                conv.id === selectedConversationId
                    ? { ...conv, messages: [...conv.messages, newMessage] }
                    : conv
            )
        );
    };
    
    // Select the first conversation by default
    useState(() => {
       if(userConversations.length > 0) {
           setSelectedConversationId(userConversations[0].id)
       }
    });

    return (
        <div className="glass-card rounded-2xl border border-border/50 shadow-card w-full h-[calc(100vh-10rem)] flex animate-fade-in">
            <ConversationList
                conversations={userConversations}
                currentUser={user}
                selectedConversationId={selectedConversationId}
                onSelectConversation={setSelectedConversationId}
            />
            <ChatWindow
                conversation={selectedConversation}
                currentUser={user}
                onSendMessage={handleSendMessage}
            />
        </div>
    );
};

export default MessagesPage;