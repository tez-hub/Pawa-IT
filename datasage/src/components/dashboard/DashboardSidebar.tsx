import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileUploadArea } from "./FileUploadArea";
import { FileList } from "./FileList";
import { BarChart, Upload, History, Settings } from "lucide-react";

// import gif from public folder


interface DashboardSidebarProps {
  onFileSelect: (file: any) => void;
  selectedFile: any;
}

export const DashboardSidebar = ({ onFileSelect, selectedFile }: DashboardSidebarProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);


  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}").access_token : "";
    console.log("Uploading file with token:", token);

    try {
      const res = await fetch("http://localhost:8000/files/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") || "{}").access_token}`,
        },
        body: formData,
      });

      const result = await res.json();

      const newFile = {
        id: result.file_id,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
        data: {
          preview: result.preview
        }
      };

      setUploadedFiles(prev => [newFile, ...prev]);
      onFileSelect(newFile);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };


  // const handleFileUpload = (file: any) => {
  //   const newFile = {
  //     id: Date.now(),
  //     name: file.name,
  //     size: file.size,
  //     type: file.type,
  //     uploadedAt: new Date(),
  //     data: file // In real app, this would be processed data
  //   };
    
  //   setUploadedFiles(prev => [newFile, ...prev]);
  //   onFileSelect(newFile);
  // };

  return (
    <Sidebar className="border-r border-border">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarHeader className="p-4 border-b border-border">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src="/analytics.gif" className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
            DataSage
          </h1>
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Data
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <FileUploadArea onFileUpload={handleFileUpload} />
            </SidebarGroupContent>
          </SidebarGroup>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Recent Files ({uploadedFiles.length})
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <FileList 
                files={uploadedFiles}
                selectedFile={selectedFile}
                onFileSelect={onFileSelect}
              />
            </SidebarGroupContent>
          </SidebarGroup>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-auto"
        >
          <Card className="p-4 bg-gradient-secondary">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Pro Tip</h3>
              <p className="text-xs text-muted-foreground">
                Upload CSV, Excel, or PDF files and ask questions in natural language to get instant insights.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </Card>
        </motion.div>
      </SidebarContent>
    </Sidebar>
  );
};