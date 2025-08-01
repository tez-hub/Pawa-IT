// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Send, Bot, User, BarChart3, LineChart, PieChart } from "lucide-react";
// import { ChatMessage } from "./ChatMessage";
// import { ChartDisplay } from "./ChartDisplay";

// interface ChatAreaProps {
//   selectedFile: any;
// }

// interface Message {
//   id: string;
//   type: 'user' | 'ai';
//   content: string;
//   timestamp: Date;
//   chartData?: any;
//   chartType?: 'line' | 'bar' | 'pie';
// }

// export const ChatArea = ({ selectedFile }: ChatAreaProps) => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const scrollAreaRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (scrollAreaRef.current) {
//       scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!input.trim() || !selectedFile) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       type: 'user',
//       content: input.trim(),
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInput("");
//     setIsLoading(true);

//     // Simulate AI response
//     setTimeout(() => {
//       const responses = [
//         {
//           content: "Based on your data analysis, I can see some interesting trends. The revenue has grown by 23% over the last quarter.",
//           chartType: 'line' as const,
//           chartData: {
//             labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//             datasets: [{
//               label: 'Revenue',
//               data: [12000, 19000, 15000, 25000, 22000, 30000],
//               borderColor: 'hsl(var(--primary))',
//               backgroundColor: 'hsl(var(--primary) / 0.1)',
//               tension: 0.4
//             }]
//           }
//         },
//         {
//           content: "Here's the breakdown of your sales by region. The West region shows the strongest performance.",
//           chartType: 'bar' as const,
//           chartData: {
//             labels: ['North', 'South', 'East', 'West'],
//             datasets: [{
//               label: 'Sales',
//               data: [45000, 32000, 28000, 52000],
//               backgroundColor: [
//                 'hsl(var(--primary))',
//                 'hsl(var(--accent))',
//                 'hsl(var(--success))',
//                 'hsl(var(--warning))'
//               ]
//             }]
//           }
//         },
//         {
//           content: "The customer satisfaction distribution shows that 68% of customers are highly satisfied.",
//           chartType: 'pie' as const,
//           chartData: {
//             labels: ['Highly Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'],
//             datasets: [{
//               data: [68, 22, 7, 3],
//               backgroundColor: [
//                 'hsl(var(--success))',
//                 'hsl(var(--primary))',
//                 'hsl(var(--warning))',
//                 'hsl(var(--destructive))'
//               ]
//             }]
//           }
//         }
//       ];

//       const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
//       const aiMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         type: 'ai',
//         content: randomResponse.content,
//         timestamp: new Date(),
//         chartData: randomResponse.chartData,
//         chartType: randomResponse.chartType
//       };

//       setMessages(prev => [...prev, aiMessage]);
//       setIsLoading(false);
//     }, 2000);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Header */}
//       <div className="border-b border-border p-4">
//         <div className="flex items-center gap-3">
//           <Bot className="h-6 w-6 text-primary" />
//           <div>
//             <h2 className="font-semibold">DataSage AI Assistant</h2>
//             <p className="text-sm text-muted-foreground">
//               {selectedFile 
//                 ? `Analyzing: ${selectedFile.name}`
//                 : "Select a file to start analyzing"
//               }
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Messages */}
//       <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
//         <div className="space-y-4 max-w-4xl mx-auto">
//           {messages.length === 0 && (
//             <motion.div 
//               className="text-center py-12"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <Bot className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
//               <h3 className="text-lg font-semibold mb-2">Ready to analyze your data</h3>
//               <p className="text-muted-foreground mb-6">
//                 {selectedFile 
//                   ? "Ask me anything about your data - trends, insights, or specific questions."
//                   : "Upload a file first, then ask me questions about your data."
//                 }
//               </p>
              
//               {selectedFile && (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
//                   <Card className="p-4 text-center hover:bg-card-hover cursor-pointer">
//                     <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
//                     <p className="text-sm font-medium">Show trends</p>
//                   </Card>
//                   <Card className="p-4 text-center hover:bg-card-hover cursor-pointer">
//                     <LineChart className="h-8 w-8 mx-auto mb-2 text-accent" />
//                     <p className="text-sm font-medium">Compare data</p>
//                   </Card>
//                   <Card className="p-4 text-center hover:bg-card-hover cursor-pointer">
//                     <PieChart className="h-8 w-8 mx-auto mb-2 text-success" />
//                     <p className="text-sm font-medium">Summarize</p>
//                   </Card>
//                 </div>
//               )}
//             </motion.div>
//           )}

//           <AnimatePresence>
//             {messages.map((message) => (
//               <ChatMessage key={message.id} message={message} />
//             ))}
//           </AnimatePresence>

//           {isLoading && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex items-center gap-3 chat-message chat-ai"
//             >
//               <Bot className="h-6 w-6" />
//               <div className="flex items-center gap-1">
//                 <div className="h-2 w-2 bg-primary rounded-full animate-bounce" />
//                 <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
//                 <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
//                 <span className="ml-2 text-sm text-muted-foreground">AI is analyzing...</span>
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </ScrollArea>

//       {/* Input */}
//       <div className="border-t border-border p-4">
//         <div className="max-w-4xl mx-auto">
//           <div className="flex gap-2">
//             <Input
//               placeholder={selectedFile ? "Ask about your data..." : "Select a file first..."}
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               disabled={!selectedFile || isLoading}
//               className="flex-1"
//             />
//             <Button 
//               onClick={handleSendMessage}
//               disabled={!selectedFile || !input.trim() || isLoading}
//               className="px-3"
//             >
//               <Send className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };





import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, BarChart3, LineChart, PieChart } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { ChartDisplay } from "./ChartDisplay";
import { parseChartFromText } from "@/lib/parseChatFromText";

interface ChatAreaProps {
  selectedFile: any;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  chartData?: any;
  chartType?: 'line' | 'bar' | 'pie';
}

export const ChatArea = ({ selectedFile }: ChatAreaProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);


  const handleSendMessage = async () => {
  if (!input.trim() || !selectedFile) return;

  // Add user's message to chat
  const userMessage: Message = {
    id: Date.now().toString(),
    type: 'user',
    content: input.trim(),
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  setInput("");
  setIsLoading(true);

  try {
    // Prepare form data as application/x-www-form-urlencoded
    const formData = new URLSearchParams();
    formData.append("file_id", selectedFile.id.toString());
    formData.append("question", input.trim());
    console.log("Sending question:", formData.toString());

    const token = JSON.parse(localStorage.getItem("user") || "{}")?.access_token;

    const response = await fetch("https://pawa-it-backend-two.onrender.com/queries/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || "Failed to get response from AI");
    }

    const data = await response.json();

    // const aiMessage: Message = {
    //   id: (Date.now() + 1).toString(),
    //   type: 'ai',
    //   content: data.response,
    //   timestamp: new Date(),
    //   chartData: data.chartData || null,
    //   chartType: data.chartType || undefined
    // };

    // const parsed = parseChartFromText(data.response);
    // console.log("Parsed chart data:", parsed);


    // setMessages(prev => [...prev, aiMessage]);

    const parsed = parseChartFromText(data.response);
    console.log("Parsed chart data:", parsed);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: parsed?.summary || data.response,
      timestamp: new Date(),
      chartData: parsed?.graphable ? {
        labels: parsed.labels,
        values: parsed.values
      } : null,
      chartType: parsed?.graphable ? parsed.graph_type : undefined
    };

    setMessages(prev => [...prev, aiMessage]);
  } catch (error: any) {
    console.error(error);
    const errorMessage: Message = {
      id: (Date.now() + 2).toString(),
      type: 'ai',
      content: error.message || "Something went wrong. Please try again.",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsLoading(false);
  }
};


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <img src="/robot.gif" className="h-6 w-6 text-primary" />
          <div>
            <h2 className="font-semibold">DataSage AI Assistant</h2>
            <p className="text-sm text-muted-foreground">
              {selectedFile
                ? `Analyzing: ${selectedFile.name}`
                : "Select a file to start analyzing"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img src="/robot.gif" className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Ready to analyze your data</h3>
              <p className="text-muted-foreground mb-6">
                {selectedFile
                  ? "Ask me anything about your data - trends, insights, or specific questions."
                  : "Upload a file first, then ask me questions about your data."}
              </p>

              {selectedFile && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <Card className="p-4 text-center hover:bg-card-hover cursor-pointer">
                    <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Show trends</p>
                  </Card>
                  <Card className="p-4 text-center hover:bg-card-hover cursor-pointer">
                    <LineChart className="h-8 w-8 mx-auto mb-2 text-accent" />
                    <p className="text-sm font-medium">Compare data</p>
                  </Card>
                  <Card className="p-4 text-center hover:bg-card-hover cursor-pointer">
                    <PieChart className="h-8 w-8 mx-auto mb-2 text-success" />
                    <p className="text-sm font-medium">Summarize</p>
                  </Card>
                </div>
              )}
            </motion.div>
          )}

          <AnimatePresence>
            {messages.map((message) => (
              <>
              <ChatMessage key={message.id} message={message} />
             {message.chartData && message.chartType && (
              <ChartDisplay data={message.chartData} type={message.chartType} />
            )}
              </>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 chat-message chat-ai"
            >
              <Bot className="h-6 w-6" />
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce" />
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="ml-2 text-sm text-muted-foreground">AI is analyzing...</span>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <Input
              placeholder={selectedFile ? "Ask about your data..." : "Select a file first..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!selectedFile || isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!selectedFile || !input.trim() || isLoading}
              className="px-3"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
