import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, FileSpreadsheet, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FileUploadAreaProps {
  onFileUpload: (file: File) => void;
}

export const FileUploadArea = ({ onFileUpload }: FileUploadAreaProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onFileUpload(file);
    setIsUploading(false);
    
    toast({
      title: "File uploaded successfully",
      description: `${file.name} is ready for analysis`,
    });
  }, [onFileUpload, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    multiple: false
  });

  const getFileIcon = () => {
    if (isDragActive) return <Upload className="h-8 w-8 text-primary" />;
    return <FileText className="h-8 w-8 text-muted-foreground" />;
  };

  return (
    <div
      className={`upload-area ${isDragActive ? 'drag-over' : ''}`}
      {...getRootProps()}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full h-full"
      >
      <input {...getInputProps()} />
      
      {isUploading ? (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-muted-foreground">Uploading...</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <motion.div
            animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {getFileIcon()}
          </motion.div>
          
          <div className="text-center">
            <p className="text-sm font-medium mb-1">
              {isDragActive ? "Drop your file here" : "Drop files or click to upload"}
            </p>
            <p className="text-xs text-muted-foreground">
              Supports CSV, Excel, and PDF files
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <FileText className="h-3 w-3" />
            <FileSpreadsheet className="h-3 w-3" />
            <FileImage className="h-3 w-3" />
            <span>CSV, XLSX, PDF</span>
          </div>
        </div>
      )}
      </motion.div>
    </div>
  );
};