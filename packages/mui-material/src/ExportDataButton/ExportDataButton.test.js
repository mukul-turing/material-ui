import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ExportDataButton from './ExportDataButton'; // Assuming this is where your component is located

function DummyTable() {
  // Dummy data for the table
  const tableData = [
    { dessert: 'Frozen yoghurt', calories: 159, fat: 6, carbs: 24, protein: 4 },
    { dessert: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4.3 },
    { dessert: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6 },
    { dessert: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { dessert: 'Marshmallow', calories: 318, fat: 0, carbs: 81, protein: 2 },
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Dessert</th>
          <th>Calories</th>
          <th>Fat</th>
          <th>Carbs</th>
          <th>Protein</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td>{row.dessert}</td>
            <td>{row.calories}</td>
            <td>{row.fat}</td>
            <td>{row.carbs}</td>
            <td>{row.protein}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
describe('ExportDataButton', () => {
  it('should export table data to CSV when button is clicked', async () => {
    const { getByText } = render(<DummyTable><ExportDataButton /></DummyTable>);
    
    // Simulate a click on the Export Data button
    fireEvent.click(getByText('Export Data'));
    // Simulate a click on the Export Data button
    fireEvent.click(getByText('Export Data'));
    
    // Check if a link with download attribute is created and its href starts with 'data:text/csv'
    const exportLink = document.querySelector('a[download="table_data.csv"]');
    expect(exportLink).toBeTruthy();
    expect(exportLink.getAttribute('href')).toStartWith('data:text/csv;charset=utf-8,\n');
  });
  
  it('should log an error if table is not found', () => {
    // Mock the console.error function to capture any errors
    const originalError = console.error;
    console.error = jest.fn();
    
    // Render the component with a non-existent tableRef
    render(<ExportDataButton />);
    
    // Check if an error is logged when button is clicked
    fireEvent.click(getByText('Export Data'));
    expect(console.error).toHaveBeenCalledWith('Table not found');
    
    // Restore the original console.error function
    console.error = originalError;
  });
});