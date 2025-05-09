
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, MinusSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type Message = {
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! I'm the Fortress Computing assistant. How can I help you with our IT services today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      if (isMinimized) {
        setIsMinimized(false);
      } else {
        setIsOpen(false);
      }
    }
  };
  
  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    const userMessage = {
      text: message,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      setMessages(prev => [...prev, {
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
      }]);
    }, 1000);
  };
  
  const getBotResponse = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('pricing') || lowerCaseMessage.includes('cost')) {
      return 'Our pricing varies depending on the specific needs of your project. Would you like to speak to our sales team for a personalized quote?';
    } else if (lowerCaseMessage.includes('service') || lowerCaseMessage.includes('offering')) {
      return 'We offer a wide range of IT services including fullstack development, AI/ML solutions, silicon engineering, and financial technology consulting. Which specific area are you interested in?';
    } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('speak') || lowerCaseMessage.includes('talk')) {
      return 'You can contact our team by filling out the contact form on our website, or I can have someone reach out to you directly. Would you like to leave your email?';
    } else if (lowerCaseMessage.includes('fullstack') || lowerCaseMessage.includes('web') || lowerCaseMessage.includes('app')) {
      return 'Our fullstack development team creates robust web and mobile applications using modern technologies. We have expertise in React, Angular, Node.js, and various other frameworks.';
    } else if (lowerCaseMessage.includes('ai') || lowerCaseMessage.includes('machine learning') || lowerCaseMessage.includes('ml')) {
      return 'Our AI/ML team specializes in natural language processing, computer vision, predictive analytics, and custom machine learning solutions for businesses across industries.';
    } else if (lowerCaseMessage.includes('silicon') || lowerCaseMessage.includes('hardware') || lowerCaseMessage.includes('chip')) {
      return 'Our silicon engineering team works on custom chip design, FPGA programming, and hardware optimization for high-performance computing needs.';
    } else if (lowerCaseMessage.includes('fintech') || lowerCaseMessage.includes('financial')) {
      return 'Our financial technology team creates secure, compliant solutions for payment processing, cryptocurrency integration, and financial data analytics.';
    } else {
      return "Thanks for reaching out! I'm not sure I fully understand your question. Could you provide more details about what specific service or information you're looking for?";
    }
  };
  
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Button */}
      <Button 
        onClick={toggleChat}
        className="h-14 w-14 rounded-full bg-primary shadow-lg hover:bg-primary/90 transition-all"
        aria-label="Open chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
      
      {/* Chat Window */}
      {isOpen && (
        <div 
          className={cn(
            "absolute bottom-16 right-0 w-80 sm:w-96 bg-card shadow-xl rounded-lg transition-all duration-300 ease-in-out border",
            isMinimized ? "h-16" : "h-[500px]"
          )}
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between bg-primary text-primary-foreground p-3 rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-medium">Fortress Computing Assistant</h3>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={minimizeChat} 
                className="h-7 w-7 hover:bg-primary-foreground/10 text-primary-foreground"
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                <MinusSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Chat Body */}
          {!isMinimized && (
            <>
              <div className="p-3 h-[380px] overflow-y-auto bg-card">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "mb-3 max-w-[80%] p-3 rounded-lg",
                      msg.isUser 
                        ? "ml-auto bg-primary text-primary-foreground" 
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs mt-1 opacity-70 text-right">{formatTime(msg.timestamp)}</p>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={message.trim() === ''}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
