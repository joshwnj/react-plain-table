React Plain Table
====

[![Build Status](https://secure.travis-ci.org/joshwnj/react-plain-table.png)](http://travis-ci.org/joshwnj/react-plain-table)

General-purpose table presentation component for React.

Install
----

`npm install react-plain-table`

Example
----

```
function render () {
  var Table = require('react-plain-table');

  var schema = [
    { key: 'type' },
    { key: 'legs', label: 'Number of Legs' }
  ];

  var rows = [
    { type: 'dog', legs: 4 },
    { type: 'cat', legs: 4 },
    { type: 'ant', legs: 6 }
  ];

  var handleClick = function (columnKey) {
    console.log('column clicked:', columnKey);
  };

  return (
    <Table
      className="my-table"
      schema={schema}
      rows={rows}
      rowIdKey="type"
      onHeadingClick={handleClick} />
  );
}
```

Props
----

- `schema`: array of objects to describe the table columns.
- `rows`: array of table row data, where each item is an object containing the key-values defined in `schema`.
- `rowIdKey`: specify which field within a row should be considered the unique identifier (used as a react-key).
- `onHeadingClick` (optional): callback when a column heading is clicked.  Callback has 1 argument, `columnKey`.

Schema
----

Schema items have the following fields:

- `key`: maps this column to a key in the table row data.
- `label` (optional): Text to display as the column heading. If omitted the schema `key` is used, replacing underscores with spaces.

License
----

MIT
