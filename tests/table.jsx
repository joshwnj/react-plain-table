/** @jsx React.DOM */

require('node-jsx').install();

var jsdom = require("jsdom");
var assert = require("assert");
var React = require("react/addons");
var TestUtils = React.addons.TestUtils;
var tape = require('tape');

var Table = require('../table.jsx');

function setupDom () {
  global.window = jsdom.jsdom().createWindow();
  global.document = window.document;
}

tape('Table: no rows', function (t) {
  setupDom();

  var schema = [];
  var rows = [];
  var component = TestUtils.renderIntoDocument(
    <Table rows={rows} rowIdKey="id" schema={schema} />
  );

  var rowElems = component.getDOMNode().querySelectorAll('table tbody tr');
  t.equal(
    rowElems.length,
    0,
    'Empty table has no row elements');

  t.end();
});

tape('Table: render rows', function (t) {
  setupDom();

  var schema = [];
  var rows = [
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' }
  ];
  var component = TestUtils.renderIntoDocument(
    <Table rows={rows} rowIdKey="id" schema={schema} />
  );

  var rowElems = component.getDOMNode().querySelectorAll('table tbody tr');
  t.equal(
    rowElems.length,
    2,
    'Table renders 1 row element per item');

  t.end();
});

tape('Table: heading labels', function (t) {
  t.plan(3);
  setupDom();

  var schema = [
    { key: 'type_of_thing' },
    { key: 'legs', label: 'Number of Legs' }
  ];

  var rows = [
    { type_of_thing: 'dog', legs: 4 },
    { type_of_thing: 'cat', legs: 4 },
    { type_of_thing: 'ant', legs: 6 }
  ];

  var handleClick = function (columnKey) {
    t.equal(columnKey, 'legs', 'Key of clicked column is sent to the callback');
  };

  var component = TestUtils.renderIntoDocument(
    <Table rows={rows} rowIdKey="type_of_thing" schema={schema} onHeadingClick={handleClick} />
  );

  var headingElems = component.getDOMNode().querySelectorAll('table thead th');
  t.equal(
    headingElems[0].innerHTML,
    'type of thing',
    'Guess the label (based on key) when not provided.');

  t.equal(
    headingElems[1].innerHTML,
    'Number of Legs',
    'Use the label when provided');

  // click the 'legs' column heading
  TestUtils.Simulate.click(headingElems[1]);
});
