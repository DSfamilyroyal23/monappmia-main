import React from 'react';
import { Conversation, User } from '../types';

interface ConversationListProps {
    conversations: Conversation[];
    currentUser: User;
    selectedConversationId: string | null;
    onSelectConversation: (id: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ conversations, currentUser, selectedConversationId, onSelectConversation }) => {
    return (
        <div className="w-1/3 border-r border-border/50 flex flex-col">
            <div className="p-4 border-b border-border/50">
                <h2 className="text-xl font-bold text-foreground">Conversations</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                {conversations.map(conv => {
                    const otherParticipant = conv.participants.find(p => p.id !== currentUser.id);
                    const lastMessage = conv.messages[conv.messages.length - 1];
                    const isSelected = conv.id === selectedConversationId;

                    return (
                        <div
                            key={conv.id}
                            onClick={() => onSelectConversation(conv.id)}
                            className={`p-4 flex items-center gap-3 cursor-pointer transition-colors duration-200 ${isSelected ? 'bg-primary/10' : 'hover:bg-secondary/50'}`}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${isSelected ? 'bg-gradient-primary' : 'bg-secondary'}`}>
                                {otherParticipant?.avatarInitials}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <h3 className={`font-semibold ${isSelected ? 'text-primary' : 'text-foreground'}`}>{otherParticipant?.name}</h3>
                                <p className="text-sm text-muted-foreground truncate">{lastMessage?.text || 'Aucun message'}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ConversationList;