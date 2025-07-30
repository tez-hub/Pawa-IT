// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { FileText, Calendar, HardDrive } from "lucide-react";

// interface FilePreviewProps {
//   file: any;
// }

// export const FilePreview = ({ file }: FilePreviewProps) => {
//   const mockData = [
//     { id: 1, name: "John Doe", revenue: 50000, region: "North", date: "2024-01-15" },
//     { id: 2, name: "Jane Smith", revenue: 75000, region: "South", date: "2024-01-16" },
//     { id: 3, name: "Bob Johnson", revenue: 60000, region: "East", date: "2024-01-17" },
//     { id: 4, name: "Alice Brown", revenue: 85000, region: "West", date: "2024-01-18" },
//     { id: 5, name: "Charlie Wilson", revenue: 70000, region: "North", date: "2024-01-19" },
//   ];

//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const getFileTypeColor = (type: string) => {
//     if (type.includes('csv') || type.includes('spreadsheet')) return 'bg-green-100 text-green-800';
//     if (type.includes('pdf')) return 'bg-red-100 text-red-800';
//     return 'bg-blue-100 text-blue-800';
//   };

//   return (
//     <motion.div 
//       className="h-full p-4 space-y-4"
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* File Info */}
//       <Card>
//         <CardHeader className="pb-3">
//           <CardTitle className="text-lg flex items-center gap-2">
//             <FileText className="h-5 w-5" />
//             File Details
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           <div>
//             <p className="font-medium truncate" title={file.name}>
//               {file.name}
//             </p>
//             <Badge variant="secondary" className={getFileTypeColor(file.type)}>
//               {file.type.split('/').pop()?.toUpperCase()}
//             </Badge>
//           </div>
          
//           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//             <HardDrive className="h-4 w-4" />
//             <span>{formatFileSize(file.size)}</span>
//           </div>
          
//           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//             <Calendar className="h-4 w-4" />
//             <span>Uploaded {file.uploadedAt.toLocaleDateString()}</span>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Data Preview */}
//       <Card className="flex-1">
//         <CardHeader className="pb-3">
//           <CardTitle className="text-lg">Data Preview</CardTitle>
//           <p className="text-sm text-muted-foreground">
//             First 5 rows of your data
//           </p>
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto">
//             <table className="data-table w-full text-sm">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Revenue</th>
//                   <th>Region</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {mockData.map((row, index) => (
//                   <motion.tr
//                     key={row.id}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3, delay: index * 0.1 }}
//                   >
//                     <td>{row.id}</td>
//                     <td>{row.name}</td>
//                     <td>${row.revenue.toLocaleString()}</td>
//                     <td>
//                       <Badge variant="outline">{row.region}</Badge>
//                     </td>
//                     <td>{row.date}</td>
//                   </motion.tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//           <div className="mt-4 p-3 bg-muted rounded-lg">
//             <p className="text-sm text-muted-foreground">
//               <strong>5 rows</strong> shown out of estimated <strong>1,247 rows</strong>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };



import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, HardDrive } from "lucide-react";

interface FilePreviewProps {
  file: {
    name: string;
    size: number;
    type: string;
    uploadedAt: Date;
    data: {
      preview: Record<string, any>[];
    };
  };
}

export const FilePreview = ({ file }: FilePreviewProps) => {
  const preview = file.data?.preview || [];

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeColor = (type: string) => {
    if (type.includes('csv') || type.includes('spreadsheet')) return 'bg-green-100 text-green-800';
    if (type.includes('pdf')) return 'bg-red-100 text-red-800';
    return 'bg-blue-100 text-blue-800';
  };

  const columns = preview.length > 0 ? Object.keys(preview[0]) : [];

  return (
    <motion.div 
      className="h-full p-4 space-y-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* File Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            File Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="font-medium truncate" title={file.name}>
              {file.name}
            </p>
            <Badge variant="secondary" className={getFileTypeColor(file.type)}>
              {file.type.split('/').pop()?.toUpperCase()}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <HardDrive className="h-4 w-4" />
            <span>{formatFileSize(file.size)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Uploaded {new Date(file.uploadedAt).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Data Preview */}
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Data Preview</CardTitle>
          <p className="text-sm text-muted-foreground">
            First {preview.length} row{preview.length !== 1 ? 's' : ''} of your data
          </p>
        </CardHeader>
        <CardContent>
          {preview.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border">
                <thead className="bg-gray-100">
                  <tr>
                    {columns.map((col) => (
                      <th key={col} className="px-3 py-2 border">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      {columns.map((col) => (
                        <td key={col} className="px-3 py-2 border whitespace-nowrap">
                          {row[col] ?? "-"}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No preview available.</div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
