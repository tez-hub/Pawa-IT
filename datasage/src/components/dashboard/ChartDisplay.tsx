// import { 
//   LineChart, 
//   Line, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   Legend, 
//   BarChart, 
//   Bar, 
//   PieChart, 
//   Pie, 
//   Cell, 
//   ResponsiveContainer 
// } from 'recharts';
// import { Card } from '@/components/ui/card';

// interface ChartDisplayProps {
//   data: any;
//   type: 'line' | 'bar' | 'pie';
// }

// export const ChartDisplay = ({ data, type }: ChartDisplayProps) => {
//   const renderChart = () => {
//     switch (type) {
//       case 'line':
//         return (
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={data.labels.map((label: string, index: number) => ({
//               name: label,
//               value: data.datasets[0].data[index]
//             }))}>
//               <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//               <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
//               <YAxis stroke="hsl(var(--muted-foreground))" />
//               <Tooltip 
//                 contentStyle={{
//                   backgroundColor: 'hsl(var(--card))',
//                   border: '1px solid hsl(var(--border))',
//                   borderRadius: '8px'
//                 }}
//               />
//               <Legend />
//               <Line 
//                 type="monotone" 
//                 dataKey="value" 
//                 stroke="hsl(var(--primary))" 
//                 strokeWidth={3}
//                 dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
//                 activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         );

//       case 'bar':
//         return (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={data.labels.map((label: string, index: number) => ({
//               name: label,
//               value: data.datasets[0].data[index]
//             }))}>
//               <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//               <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
//               <YAxis stroke="hsl(var(--muted-foreground))" />
//               <Tooltip 
//                 contentStyle={{
//                   backgroundColor: 'hsl(var(--card))',
//                   border: '1px solid hsl(var(--border))',
//                   borderRadius: '8px'
//                 }}
//               />
//               <Legend />
//               <Bar 
//                 dataKey="value" 
//                 fill="hsl(var(--primary))"
//                 radius={[4, 4, 0, 0]}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         );

//       case 'pie':
//         const pieData = data.labels.map((label: string, index: number) => ({
//           name: label,
//           value: data.datasets[0].data[index]
//         }));
        
//         return (
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell 
//                     key={`cell-${index}`} 
//                     fill={data.datasets[0].backgroundColor[index] || `hsl(var(--primary))`} 
//                   />
//                 ))}
//               </Pie>
//               <Tooltip 
//                 contentStyle={{
//                   backgroundColor: 'hsl(var(--card))',
//                   border: '1px solid hsl(var(--border))',
//                   borderRadius: '8px'
//                 }}
//               />
//             </PieChart>
//           </ResponsiveContainer>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <Card className="p-4 bg-gradient-secondary">
//       <div className="mb-3">
//         <h4 className="text-sm font-semibold text-muted-foreground">
//           Data Visualization
//         </h4>
//       </div>
//       {renderChart()}
//     </Card>
//   );
// };











import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar,
  PieChart, Pie, Cell,
  ResponsiveContainer 
} from 'recharts';
import { Card } from '@/components/ui/card';

interface ChartDisplayProps {
  data: {
    labels: string[];
    values: number[];
    backgroundColor?: string[];
  };
  type: 'line' | 'bar' | 'pie';
}

export const ChartDisplay = ({ data, type }: ChartDisplayProps) => {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: data.values[index]
  }));

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar 
                dataKey="value" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={data.backgroundColor?.[index] || `hsl(var(--primary))`} 
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="p-4 bg-gradient-secondary mt-4">
      <div className="mb-3">
        <h4 className="text-sm font-semibold text-muted-foreground">
          Data Visualization
        </h4>
      </div>
      {renderChart()}
    </Card>
  );
};
