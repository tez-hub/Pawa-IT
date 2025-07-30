import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet, File, Trash2 } from "lucide-react";

interface FileListProps {
  files: any[];
  selectedFile: any;
  onFileSelect: (file: any) => void;
}

export const FileList = ({ files, selectedFile, onFileSelect }: FileListProps) => {
  const getFileIcon = (type: string) => {
    if (type.includes('csv') || type.includes('spreadsheet')) {
      return <FileSpreadsheet className="h-4 w-4 text-green-500" />;
    }
    if (type.includes('pdf')) {
      return <File className="h-4 w-4 text-red-500" />;
    }
    return <FileText className="h-4 w-4 text-blue-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (files.length === 0) {
    return (
      <motion.div 
        className="text-center py-8 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No files uploaded yet</p>
        <p className="text-xs">Upload your first file to get started</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-2">
      {files.map((file, index) => (
        <motion.div
          key={file.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card 
            className={`p-3 cursor-pointer transition-all hover:shadow-md ${
              selectedFile?.id === file.id 
                ? 'border-primary bg-primary/5 shadow-glow' 
                : 'hover:bg-card-hover'
            }`}
            onClick={() => onFileSelect(file)}
          >
            <div className="flex items-start gap-3">
              {getFileIcon(file.type)}
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" title={file.name}>
                  {file.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <span>{formatFileSize(file.size)}</span>
                  <span>•</span>
                  <span>{formatDate(file.uploadedAt)}</span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle file deletion
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};