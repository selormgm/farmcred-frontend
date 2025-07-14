// lib/utils/exportToCSV.ts
export function exportToCSV(data: any[], filename = "investments.csv") {
  if (!data || data.length === 0) return;

  const keys = Object.keys(data[0]);
  const csvRows = [
    keys.join(","), // header row
    ...data.map((row) =>
      keys.map((k) => `"${row[k] ?? ""}"`).join(",")
    ),
  ];

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
