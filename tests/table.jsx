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
