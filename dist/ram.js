"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RAM = function () {
    function RAM() {
        _classCallCheck(this, RAM);

        this._memory = Array.from(new Array(RAM.size), function () {
            return 0;
        });
    }

    _createClass(RAM, [{
        key: "memory",
        get: function get() {
            return this._memory;
        }
    }], [{
        key: "size",
        get: function get() {
            return Math.pow(2, 10);
        }
    }]);

    return RAM;
}();

exports.RAM = RAM;