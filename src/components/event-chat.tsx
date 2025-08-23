
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, UserCircle, MessageSquarePlus } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface MessageUser {
    name: string;
    avatar?: string;
}

interface Message {
    id: number;
    user: MessageUser;
    text: string;
    isCurrentUser: boolean;
}

const initialMessages: Message[] = [
    { id: 1, user: { name: 'Alex', avatar: 'https://placehold.co/100x100.png' }, text: 'This is amazing! The energy is electric!', isCurrentUser: false },
    { id: 2, user: { name: 'Maria', avatar: 'https://placehold.co/100x100.png' }, text: 'I know, right? What a performance!', isCurrentUser: false },
    { id: 3, user: { name: 'You', avatar: '' }, text: 'So glad I came to this!', isCurrentUser: true },
];

const privateChatMessages = (userName: string): Message[] => [
    { id: 1, user: { name: userName }, text: 'Hey! Enjoying the show?', isCurrentUser: false },
    { id: 2, user: { name: 'You' }, text: 'Yeah, it\'s incredible!', isCurrentUser: true },
    { id: 3, user: { name: userName }, text: 'Awesome!', isCurrentUser: false },
];

export default function EventChat() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState<MessageUser | null>(null);
    const [privateMessage, setPrivateMessage] = useState('');
    
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
        <Dialog>
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
                                        {!msg.isCurrentUser ? (
                                             <DialogTrigger asChild onClick={() => setSelectedUser(msg.user)}>
                                                <Avatar className="cursor-pointer">
                                                    <AvatarImage src={msg.user.avatar} data-ai-hint="user avatar" />
                                                    <AvatarFallback><UserCircle/></AvatarFallback>
                                                </Avatar>
                                             </DialogTrigger>
                                        ) : (
                                             <Avatar className={cn("invisible")}>
                                                <AvatarFallback><UserCircle/></AvatarFallback>
                                            </Avatar>
                                        )}
                                       
                                        <div className={cn("rounded-lg px-4 py-2 max-w-xs lg:max-w-md", msg.isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-secondary')}>
                                            {!msg.isCurrentUser ? (
                                                <DialogTrigger asChild onClick={() => setSelectedUser(msg.user)}>
                                                    <p className="text-xs font-semibold pb-1 cursor-pointer hover:underline">{msg.user.name}</p>
                                                </DialogTrigger>
                                            ) : null}
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

            {selectedUser && (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                           <Avatar className="h-8 w-8">
                                <AvatarImage src={selectedUser.avatar} data-ai-hint="user avatar"/>
                                <AvatarFallback><UserCircle/></AvatarFallback>
                            </Avatar>
                            Chat with {selectedUser.name}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col h-80">
                         <ScrollArea className="flex-grow pr-4 -mr-4 mb-4">
                            <div className="space-y-4">
                                {privateChatMessages(selectedUser.name).map((msg) => (
                                    <div key={msg.id} className={cn("flex items-end gap-2", msg.isCurrentUser && 'flex-row-reverse')}>
                                        <Avatar className={cn("h-8 w-8", msg.isCurrentUser && "hidden")}>
                                            <AvatarImage src={msg.user.avatar} data-ai-hint="user avatar" />
                                            <AvatarFallback><UserCircle/></AvatarFallback>
                                        </Avatar>
                                        <div className={cn("rounded-lg px-3 py-2 max-w-xs text-sm", msg.isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-secondary')}>
                                            <p>{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                             </div>
                         </ScrollArea>
                         <form onSubmit={(e) => { e.preventDefault(); setPrivateMessage(''); }} className="flex gap-2">
                             <Input
                                value={privateMessage}
                                onChange={(e) => setPrivateMessage(e.target.value)}
                                placeholder={`Message ${selectedUser.name}...`}
                            />
                            <Button type="submit"><Send /><span className="sr-only">Send Message</span></Button>
                         </form>
                         <p className="text-xs text-center text-muted-foreground mt-2">
                            This is a demo. Messages are not actually sent.
                        </p>
                    </div>
                </DialogContent>
            )}
        </Dialog>
    );
}
