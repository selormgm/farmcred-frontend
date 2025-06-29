export function handlePrintPDF(transactions: any[]) {
  const appName = "FarmCred";
  const logoUrl = "/logo/farmcred-07.png";

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
           .header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
          .logo { height: 48px; }
        </style>
      </head>
      <body>
      <div class="header">
          <img src="${logoUrl}" class="logo" alt="Logo" />
        </div>
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


export function handlePrintTransfersPDF(transfers: any[]) {
  const appName = "FarmCred";
  const logoUrl = "/logo/farmcred-07.png";

  // Create a simple HTML table string for transfers
  const tableHeader = `<tr>
    <th>Transaction ID</th>
    <th>Date</th>
    <th>Reciepient/Sender</th>
    <th>Type</th>
    <th>Amount</th>
    <th>Status</th>
  </tr>`;
  const tableRows = transfers
    .map(
      (t) => `<tr>
        <td>${t.id}</td>
        <td>${new Date(t.date).toLocaleDateString()}</td>
        <td>${t.recipient_or_sender}</td>
        <td>${t.type}</td>
        <td>${t.amount}</td>
        <td>${t.status}</td>
      </tr>`
    )
    .join("");
  const htmlContent = `
    <html>
      <head>
        <title>Transfers</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #f4f4f4; }
           .header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
          .logo { height: 48px; }
        </style>
      </head>
      <body>
        <img src="${logoUrl}" class="logo" alt="Logo" />
        <h2>Transfers</h2>
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