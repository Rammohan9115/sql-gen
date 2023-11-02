import React, { useState } from 'react';

const FormComponent = () => {
  const initialColumnData = {
    columnName: '',
    type: 'varchar',
    length: '',
    primaryKey: false,
  };

  const [tableName, setTableName] = useState('');
  const [columnData, setColumnData] = useState(initialColumnData);
  const [columnList, setColumnList] = useState([]);
  const [sqlQuery, setSqlQuery] = useState('');
  const [tableQueries, setTableQueries] = useState({});
  const [selectQuery, setSelectQuery] = useState('');
  const [updateQuery, setUpdateQuery] = useState('');

  const handleTableChange = (e) => {
    setTableName(e.target.value);
    setColumnList([]); // Clear the columnList when the table name changes
  };

  const handleColumnChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setColumnData({
      ...columnData,
      [name]: newValue,
    });
  };

  const generateInsertQuery = (tableName, columns) => {
    const sampleValues = {
      varchar: "'Sample Value'",
      INT: 123,
      Date: "'2023-01-01'",
    };

    const insertValues = columns
      .map((column) => sampleValues[column.type])
      .join(', ');

    return `INSERT INTO ${tableName} VALUES (${insertValues});`;
  };

  const generateSelectQuery = (tableName, columns) => {
    // Generate a SELECT query with random columns
    const randomColumns = columns.map((column) => column.columnName).join(', ');
    return `SELECT ${randomColumns} FROM ${tableName};`;
  };

  const generateUpdateQuery = (tableName, columns) => {
    // Generate an UPDATE query with random column values
    const setClause = columns
      .map((column) => `${column.columnName} = 'New Value'`)
      .join(', ');
    return `UPDATE ${tableName} SET ${setClause} WHERE condition;`;
  };

  const handleAddColumn = () => {
    setColumnList([...columnList, { ...columnData }]);
    setColumnData(initialColumnData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build the CREATE TABLE SQL query string
    const columnsSQL = columnList.map((column) => {
      return `${column.columnName} ${column.type}${column.length ? `(${column.length})` : ''}${column.primaryKey ? ' PRIMARY KEY' : ''}`;
    });
    const createTableQuery = `CREATE TABLE ${tableName} (${columnsSQL.join(', ')});`;

    // Generate the INSERT query
    const insertQuery = generateInsertQuery(tableName, columnList);

    // Store the SQL queries in the tableQueries object using the table name as the key
    setTableQueries({
      ...tableQueries,
      [tableName]: {
        createTable: createTableQuery,
        insert: insertQuery,
      },
    });

    setSqlQuery(createTableQuery);
  };

  const handleGenerateSelectQuery = () => {
    if (columnList.length > 0) {
      const selectQuery = generateSelectQuery(tableName, columnList);
      setSelectQuery(selectQuery);
    }
  };

  const handleGenerateUpdateQuery = () => {
    if (columnList.length > 0) {
      const updateQuery = generateUpdateQuery(tableName, columnList);
      setUpdateQuery(updateQuery);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-10 p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="tableName" className="block font-bold  text-black">Table Name:</label>
          <input
            type="text"
            id="tableName"
            name="tableName"
            value={tableName}
            onChange={handleTableChange}
            className="border border-gray-300 rounded px-3 py-2 w-full text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="columnName" className="block font-bold  text-black">Column Name:</label>
          <input
            type="text"
            id="columnName"
            name="columnName"
            value={columnData.columnName}
            onChange={handleColumnChange}
            className="border border-gray-300 rounded px-3 py-2 w-full  text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block font-bold  text-black">Type:</label>
          <select
            id="type"
            name="type"
            value={columnData.type}
            onChange={handleColumnChange}
            className="border border-gray-300 rounded px-3 py-2 w-full  text-black"
          >
            <option value="varchar">varchar</option>
            <option value="INT">INT</option>
            <option value="Date">Date</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="length" className="block font-bold  text-black">Length:</label>
          <input
            type="text"
            id="length"
            name="length"
            value={columnData.length}
            onChange={handleColumnChange}
            className="border border-gray-300 rounded px-3 py-2 w-full  text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="primaryKey" className="block font-bold  text-black">
            Primary Key:
          </label>
          <input
            type="checkbox"
            id="primaryKey"
            name="primaryKey"
            checked={columnData.primaryKey}
            onChange={handleColumnChange}
            className="mr-2"
          />
          <span className="text-gray-700">Is it a primary key?</span>
        </div>
        <button
          type="button"
          onClick={handleAddColumn}
          className="bg-blue-500 text-white px-4 py-2 rounded hover-bg-blue-600"
        >
          Add Column
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover-bg-blue-600 ml-2"
        >
          Submit
        </button>
      </form>
      {columnList.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold  text-black">Added Columns:</h2>
          <ul className=' text-black'>
            {columnList.map((column, index) => (
              <li key={index}>
                <strong>Name:</strong> {column.columnName}, <strong>Type:</strong> {column.type}, <strong>Length:</strong> {column.length}, <strong>Primary Key:</strong> {column.primaryKey ? 'Yes' : 'No'}
              </li>
            ))}
          </ul>
        </div>
      )}
      {sqlQuery && (
        <div className="mt-4">
          <h2 className="text-xl font-bold text-black">Generated SQL Queries:</h2>
          <pre className="bg-gray-200 p-2 rounded text-black">
            {sqlQuery}
          </pre>
          {tableQueries[tableName] && (
            <pre className="bg-gray-200 p-2 rounded text-black">
              {tableQueries[tableName].insert}
            </pre>
          )}
        </div>
      )}
      {selectQuery && (
        <div className="mt-4">
          <h2 className="text-xl font-bold text-black">Generated SELECT Query:</h2>
          <pre className="bg-gray-200 p-2 rounded text-black">
            {selectQuery}
          </pre>
        </div>
      )}
      {updateQuery && (
        <div className="mt-4">
          <h2 className="text-xl font-bold text-black">Generated UPDATE Query:</h2>
          <pre className="bg-gray-200 p-2 rounded text-black">
            {updateQuery}
          </pre>
        </div>
      )}
      {Object.keys(tableQueries).length > 0 && (
        <div className="mt-4 text-black">
          <h2 className="text-xl font-bold text-black">Generated SQL Queries for Different Tables:</h2>
          {Object.entries(tableQueries).map(([table, queries], index) => (
            <div key={index}>
              <strong className='text-black'>Table Name:</strong> {table}
              <div className="mt-2 text-black">
                <strong>Create Table Query:</strong>
                <pre className="bg-gray-200 p-2 rounded text-black">
                  {queries.createTable}
                </pre>
              </div>
              <div className="mt-2">
                <strong className='text-black'>Insert Query:</strong>
                <pre className="bg-gray-200 p-2 rounded text-black">
                  {queries.insert}
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={handleGenerateSelectQuery}
        className="bg-green-500 text-white px-4 py-2 rounded hover-bg-green-600 mt-4"
      >
        Generate SELECT Query
      </button>
      <button
        onClick={handleGenerateUpdateQuery}
        className="bg-orange-500 text-white px-4 py-2 rounded hover-bg-orange-600 ml-2 mt-4"
      >
        Generate UPDATE Query
      </button>
    </div>
  );
};

export default FormComponent;
