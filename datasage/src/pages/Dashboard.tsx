import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ChatArea } from "@/components/dashboard/ChatArea";
import { FilePreview } from "@/components/dashboard/FilePreview";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar onFileSelect={setSelectedFile} selectedFile={selectedFile} />
        
        <div className="flex-1 flex flex-col lg:flex-row">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ChatArea selectedFile={selectedFile} />
          </motion.div>
          
          {selectedFile && (
            <motion.div 
              className="lg:w-96 border-l border-border"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FilePreview file={selectedFile} />
            </motion.div>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;