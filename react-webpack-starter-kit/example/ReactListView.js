'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _ListHeader = require('./lib/ListHeader');

var _ListHeader2 = _interopRequireDefault(_ListHeader);

var _ListItems = require('./lib/ListItems');

var _ListItems2 = _interopRequireDefault(_ListItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactListView = function (_Component) {
  _inherits(ReactListView, _Component);

  function ReactListView(props) {
    _classCallCheck(this, ReactListView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactListView).call(this, props));

    _this.state = {
      events: ['scroll', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll', 'resize', 'touchmove', 'touchend'],
      _firstChildWrapper: '',
      _headerFixedPosition: '',
      _instances: {}
    };
    return _this;
  }

  _createClass(ReactListView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initStickyHeaders();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this2 = this;

      // unRegister events listeners with the listview div
      this.state.events.forEach(function (type) {
        if (window.addEventListener) {
          (0, _reactDom.findDOMNode)(_this2.refs.listview).removeEventListener(type, _this2.onScroll.bind(_this2), false);
        } else {
          (0, _reactDom.findDOMNode)(_this2.refs.listview).attachEvent('on' + type, _this2.onScroll.bind(_this2), false);
        }
      });
    }
  }, {
    key: 'refsToArray',
    value: function refsToArray(ctx, prefix) {
      var results = [];
      for (var i = 0;; i++) {
        var ref = ctx.refs[prefix + '-' + String(i)];
        if (ref) results.push(ref);else return results;
      }
    }
  }, {
    key: 'initStickyHeaders',
    value: function initStickyHeaders() {
      var _this3 = this;

      var listHeaders = this.refsToArray(this, 'ListHeader');
      var _originalPositions = listHeaders.map(function (l) {
        var headerAndPosInfo = {
          headerObj: l,
          originalPosition: l.refs.header.getBoundingClientRect().top
        };
        return headerAndPosInfo;
      });

      this.setState({
        _instances: Object.assign(this.state._instances, { _originalPositions: _originalPositions }),
        _firstChildWrapper: listHeaders[0].refs.followWrap,
        _headerFixedPosition: listHeaders[0].refs.header.getBoundingClientRect().top
      });

      // Register events listeners with the listview div
      this.state.events.forEach(function (type) {
        if (window.addEventListener) {
          (0, _reactDom.findDOMNode)(_this3.refs.listview).addEventListener(type, _this3.onScroll.bind(_this3), false);
        } else {
          (0, _reactDom.findDOMNode)(_this3.refs.listview).attachEvent('on' + type, _this3.onScroll.bind(_this3), false);
        }
      });
    }
  }, {
    key: 'onScroll',
    value: function onScroll() {
      var _this4 = this;

      // update current header positions and apply fixed positions to the top one
      var currentWindowScrollTop = 2 * this.state._headerFixedPosition - this.state._firstChildWrapper.getBoundingClientRect().top;
      this.state._instances._originalPositions.forEach(function (c, index) {
        var currentNode = c.headerObj.refs.header;
        var currentHeaderHeight = parseInt(currentNode.style.height, 10);
        var nextNode = void 0,
            topPos = null;
        var ignoreCheck = false;
        if (index < _this4.state._instances._originalPositions.length - 1) {
          nextNode = _this4.state._instances._originalPositions[index + 1];
        }
        if (nextNode) {
          topPos = -(currentWindowScrollTop + (index + 2) * currentHeaderHeight - nextNode.originalPosition - _this4.state._headerFixedPosition);
        }
        if (index == 0) {
          if (currentWindowScrollTop == c.originalPosition) {
            currentNode.style.position = '';
            ignoreCheck = true;
          }
        }
        if (!ignoreCheck && c.originalPosition < currentWindowScrollTop + _this4.state._headerFixedPosition + currentHeaderHeight * index) {
          Object.assign(currentNode.style, _this4.props.styles.fixedPosition);
          // apply top value
          currentNode.style.top = _this4.state._headerFixedPosition + 'px';
          if (currentWindowScrollTop + (index + 2) * currentHeaderHeight > nextNode.originalPosition) {
            currentNode.style.position = 'absolute';
            currentNode.style.top = topPos + 'px';
          }
        } else {
          currentNode.style.position = '';
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var data = _props.data;
      var headerAttName = _props.headerAttName;
      var itemsAttName = _props.itemsAttName;
      var _props$styles = this.props.styles;
      var outerDiv = _props$styles.outerDiv;
      var ul = _props$styles.ul;
      var listHeader = _props$styles.listHeader;
      var listItems = _props$styles.listItems;
      var li = _props$styles.li;

      var _refi = 0;
      var makeRef = function makeRef() {
        return 'ListHeader-' + _refi++;
      };

      return _react2.default.createElement(
        'div',
        { ref: 'listview', style: outerDiv },
        _react2.default.createElement(
          'ul',
          { style: ul },
          Object.keys(data).map(function (k) {
            var header = data[k][headerAttName];
            var items = data[k][itemsAttName];
            return _react2.default.createElement(
              'li',
              { li: li, key: k },
              _react2.default.createElement(_ListHeader2.default, {
                ref: makeRef(),
                header: header,
                styles: listHeader
              }),
              _react2.default.createElement(_ListItems2.default, {
                items: items,
                styles: listItems
              })
            );
          })
        )
      );
    }
  }]);

  return ReactListView;
}(_react.Component);

ReactListView.propTypes = {
  data: _react.PropTypes.array.isRequired,
  headerAttName: _react.PropTypes.string.isRequired,
  itemsAttName: _react.PropTypes.string.isRequired,
  styles: _react.PropTypes.object.isRequired,
  events: _react.PropTypes.array,
  _positionMap: _react.PropTypes.object,
  _topPos: _react.PropTypes.string,
  _topWrapper: _react.PropTypes.object
};
exports.default = ReactListView;
//# sourceMappingURL=ReactListView.js.map