import * as React from 'react';
import Button from '../Button';

function ExportDataButton() {
  const tableToCSV = (tableRef) => {
    // Select the table element using its ref
    const table = tableRef.current;

    if (!table) {
      console.error('Table not found');
      return '';
    }

    // Array to hold rows
    const rows = [];

    // Iterate over each row in the table
    table.querySelectorAll('tr').forEach((row) => {
      const rowData = [];

      // Iterate over each cell in the row
      row.querySelectorAll('th, td').forEach((cell) => {
        // Extract text content from the cell
        const cellText = cell.textContent.trim();

        // Push cell text to the row data array
        rowData.push(cellText || (row.querySelector('th') ? cellText : ''));
      });

      // Push row data to the rows array
      rows.push(rowData.join(','));
    });
    const csvString = rows.join('\n');
    const csvContent = `data:text/csv;charset=utf-8,\n${csvString}`;


    const encodedCSVString = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedCSVString);
    link.setAttribute('download', 'table_data.csv');
    document.body.appendChild(link);
    link.click();
    return '';
  }
  return (
    <Button variant="contained" color="primary" onClick={tableToCSV}>
      Export Data
    </Button>
  );
};

export default ExportDataButton;