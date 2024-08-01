import React from 'react';

const DisplayForm = ({ data }) => {
  console.log("data::", data);

  return (
    <>
      {data && (
        <div>
          <h3>Form Data</h3>
          <table border="1" cellPadding="5" cellSpacing="0">
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((key) => (
                <tr key={key}>
                  <td><strong>{key}</strong></td>
                  <td>{data[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default DisplayForm;
