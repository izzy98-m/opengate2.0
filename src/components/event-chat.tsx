
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, UserCircle } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';

interface Message {
    id: number;
    user: {
        name: string;
        avatar?: string;
    };
    text: string;
    isCurrentUser: boolean;
}

const initialMessages: Message[] = [
    { id: 1, user: { name: 'Alex', avatar: 'https://placehold.co/100x100.png' }, text: 'This is amazing! The energy is electric!', isCurrentUser: false },
    { id: 2, user: { name: 'Maria', avatar: 'https://placehold.co/100x100.png' }, text: 'I know, right? What a performance!', isCurrentUser: false },
    { id: 3, user: { name: 'You', avatar: '' }, text: 'So glad I came to this!', isCurrentUser: true },
];

export default function EventChat() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const message: Message = {
            id: messages.length + 1,
            user: { name: 'You' },
            text: newMessage,
            isCurrentUser: true,
        };

        setMessages([...messages, message]);
        setNewMessage('');
    };

    useEffect(() => {
        if (scrollAreaRef.current) {
             const scrollableView = scrollAreaRef.current.querySelector('div');
             if(scrollableView) {
                scrollableView.scrollTo({ top: scrollableView.scrollHeight });
             }
        }
    }, [messages]);

    return (
        <Card className="shadow-lg" id="event-chat">
            <CardHeader>
                <CardTitle>Live Event Chat</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col h-96">
                    <ScrollArea className="flex-grow pr-4" ref={scrollAreaRef}>
                        <div className="space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={cn("flex items-end gap-2", msg.isCurrentUser && 'flex-row-reverse')}>
                                    <Avatar className={cn(msg.isCurrentUser && "hidden")}>
                                        <AvatarImage src={msg.user.avatar} data-ai-hint="user avatar" />
                                        <AvatarFallback><UserCircle/></AvatarFallback>
                                    </Avatar>
                                    <div className={cn("rounded-lg px-4 py-2 max-w-xs lg:max-w-md", msg.isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-secondary')}>
                                        {!msg.isCurrentUser && <p className="text-xs font-semibold pb-1">{msg.user.name}</p>}
                                        <p>{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                    <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <Button type="submit">
                            <Send />
                            <span className="sr-only">Send Message</span>
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}

