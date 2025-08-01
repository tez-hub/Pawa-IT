import { motion } from "framer-motion";
import { User, Bot } from "lucide-react";
import { ChartDisplay } from "./ChartDisplay";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  chartData?: any;
  chartType?: 'line' | 'bar' | 'pie';
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.type === 'user';

  console.log(message);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-muted text-muted-foreground'
      }`}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      <div className={`flex-1 max-w-3xl ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`chat-message ${isUser ? 'chat-user' : 'chat-ai'}`}>
          {/* {!message.chartData && !message.chartType && (
           <p className="text-sm leading-relaxed">{message.content}</p>
          )} */}

          {!message.chartData && !message.chartType && (() => {
            try {
              const cleaned = message.content
                .replace(/^```json/, '')
                .replace(/```$/, '')
                .trim();
              const parsed = JSON.parse(cleaned);
              return <p className="text-sm leading-relaxed">{parsed.summary}</p>;
            } catch (err) {
              return <p className="text-sm leading-relaxed">{message.content}</p>;
            }
          })()}

          

          {message.chartData && message.chartType && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4"
            >
              <ChartDisplay 
                data={message.chartData} 
                type={message.chartType} 
              />
            </motion.div>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground mt-1">
          {message.timestamp.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </motion.div>
  );
};