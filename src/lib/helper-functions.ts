export function handlePrintPDF(transactions: any[]) {
  // Create a simple HTML table string
  const tableHeader = `<tr>
    <th>Name</th>
    <th>Date</th>
    <th>Category</th>
    <th>Status</th>
    <th>Amount</th>
  </tr>`;
  const tableRows = transactions
    .map(
      (t) => `<tr>
        <td>${t.name}</td>
        <td>${new Date(t.date).toLocaleDateString()}</td>
        <td>${t.category}</td>
        <td>${t.status}</td>
        <td>${t.amount}</td>
      </tr>`
    )
    .join("");
  const htmlContent = `
    <html>
      <head>
        <title>Transactions</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #f4f4f4; }
        </style>
      </head>
      <body>
        <h2>Transactions</h2>
        <table>
          ${tableHeader}
          ${tableRows}
        </table>
      </body>
    </html>
  `;

  // Open a new window and print
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }
}