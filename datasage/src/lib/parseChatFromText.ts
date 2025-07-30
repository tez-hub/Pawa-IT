// export function parseChartFromText(text: string): {
//   chartData: any[] | null;
//   chartType: 'bar' | 'line' | 'pie' | null;
// } {
//   const lines = text.trim().split('\n');

//   // Look for headers
//   const headerIndex = lines.findIndex(line => line.includes('|') && line.includes('-'));
//   if (headerIndex < 1) return { chartData: null, chartType: null };

//   const headers = lines[headerIndex - 1].split('|').map(h => h.trim());
//   const dataLines = lines.slice(headerIndex + 1).filter(l => l.includes('|'));

//   const chartData = dataLines.map(line => {
//     const values = line.split('|').map(v => v.trim());
//     const obj: Record<string, string | number> = {};
//     headers.forEach((header, i) => {
//       const val = values[i];
//       obj[header] = isNaN(Number(val)) ? val : Number(val);
//     });
//     return obj;
//   });

//   // Guess chart type
//   const chartType = /bar chart/i.test(text)
//     ? 'bar'
//     : /line chart/i.test(text)
//     ? 'line'
//     : /pie chart/i.test(text)
//     ? 'pie'
//     : 'bar'; // default fallback

//   return {
//     chartData,
//     chartType,
//   };
// }




// export function parseChartFromText(text: string): {
//   chartType: string | null;
//   chartData: { name: string; value: number }[] | null;
// } {
//   const chartData: { name: string; value: number }[] = [];

//   // Regex to match bullet points like: * **Coca Cola:** 120
//   const regex = /\*\s+\*\*(.+?)\*\*:\s+(\d+)/g;
//   let match;

//   while ((match = regex.exec(text)) !== null) {
//     const name = match[1].trim();
//     const value = parseInt(match[2]);
//     if (!isNaN(value)) {
//       chartData.push({ name, value });
//     }
//   }

//   if (chartData.length > 0) {
//     return {
//       chartType: "bar", // You can later enhance this to detect pie/line/etc.
//       chartData,
//     };
//   }

//   return { chartType: null, chartData: null };
// }








// export function parseChartFromText(text: string): {
//   chartType: string | null;
//   chartData: { name: string; value: number }[] | null;
// } {
//   const chartData: { name: string; value: number }[] = [];

//   // Pattern 1: Markdown bullets like * **Coca Cola:** 120
//   const bulletRegex = /\*\s+\*\*(.+?)\*\*:\s+(\d+)/g;
//   let match;
//   while ((match = bulletRegex.exec(text)) !== null) {
//     const name = match[1].trim();
//     const value = parseInt(match[2]);
//     if (!isNaN(value)) chartData.push({ name, value });
//   }

//   // Pattern 2: Inline format like Coca Cola (120), Pepsi (95)
//   const inlineRegex = /([\w\s]+)\s*\((\d+)\)/g;
//   while ((match = inlineRegex.exec(text)) !== null) {
//     const name = match[1].trim();
//     const value = parseInt(match[2]);
//     if (!isNaN(value)) chartData.push({ name, value });
//   }

//   if (chartData.length > 0) {
//     return {
//       chartType: "bar",
//       chartData,
//     };
//   }

//   return { chartType: null, chartData: null };
// }




export function parseChartFromText(text: string) {
  try {
    const match = text.match(/\{[\s\S]*?\}/);
    if (!match) return null;

    const json = JSON.parse(match[0]);
    if (!json.graphable) return null;

    return json;
  } catch (err) {
    console.error("Failed to parse chart JSON:", err);
    return null;
  }
}
