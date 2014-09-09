/** @jsx React.DOM */
'use strict';

var React = require('react');

/**
 * Create a label from a key.
 *
 * @param {string}
 * @return {string}
 */
function createLabel (key) {
  return key.replace(/_/g, ' ');
}

// ----
// General table presentation component

module.exports = React.createClass({
  displayName: 'PlainTable',

  statics: {
    createLabel: createLabel
  },

  propTypes: {
    rowIdKey: React.PropTypes.string.isRequired,
    schema: React.PropTypes.array.isRequired,
    rows: React.PropTypes.array
  },

  getDefaultProps: function () {
    return {
      rows: []
    };
  },

  // ----

  renderColumn: function (item) {
    var label = item.label;
    if (!label) { label = createLabel(item.key) };

    return <th key={item.key}>{label}</th>;
  },

  renderRow: function (item) {
    var rowKey = item[this.props.rowIdKey];
    var cells = this.props.schema.map(function (info) {
      var value = item[info.key];
      var key = rowKey + '-' + info.key;

      return <td key={key}>{value}</td>;
    });

    return (
      <tr key={rowKey}>
        {cells}
      </tr>
    );
  },

  render: function () {
    var columns = this.props.schema.map(this.renderColumn);
    var rows = this.props.rows.map(this.renderRow);

    return (
      <table className={this.props.className}>
        <thead>
          <tr>
            {columns}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});
