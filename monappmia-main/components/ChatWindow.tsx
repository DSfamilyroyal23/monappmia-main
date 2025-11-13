import React, { useState, useRef, useEffect } from 'react';
import { Conversation, User, Message } from '../types';
import { SendIcon, MessageIcon } from './icons';

interface ChatWindowProps {
    conversation: Conversation | null;
    currentUser: User;
    onSendMessage: (text: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, currentUser, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation?.messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSendMessage(newMessage);
        setNewMessage('');
    };
    
    if (!conversation) {
        return (
            <div className="w-2/3 flex flex-col items-center justify-center text-muted-foreground">
                <MessageIcon />
                <h2 className="text-xl mt-4">Sélectionnez une conversation</h2>
                <p className="text-sm">Choisissez une conversation dans la liste pour commencer à discuter.</p>
            </div>
        );
    }
    
    const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id);

    return (
        <div className="w-2/3 flex flex-col h-full">
            <div className="p-4 border-b border-border/50 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {otherParticipant?.avatarInitials}
                </div>
                <h2 className="text-lg font-bold text-foreground">{otherParticipant?.name}</h2>
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {conversation.messages.map(message => {
                    const isCurrentUser = message.senderId === currentUser.id;
                    return (
                        <div key={message.id} className={`flex items-end gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                            {!isCurrentUser && (
                                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                                    {otherParticipant?.avatarInitials}
                                </div>
                            )}
                            <div className={`max-w-md p-3 rounded-2xl ${isCurrentUser ? 'bg-gradient-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-secondary-foreground rounded-bl-none'}`}>
                                <p>{message.text}</p>
                                <div className={`text-xs mt-1 ${isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'} text-right`}>
                                    {message.timestamp}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-border/50">
                <form onSubmit={handleSubmit} className="flex items-center gap-3">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Écrivez votre message..."
                        className="flex-1 bg-card border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    />
                    <button type="submit" className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center transition-all duration-200 hover:shadow-glow flex-shrink-0">
                        <SendIcon />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatWindow;