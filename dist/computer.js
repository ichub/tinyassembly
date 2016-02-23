"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cpu_1 = require("./cpu");
var ram_1 = require("./ram");

var Computer = function () {
    function Computer() {
        _classCallCheck(this, Computer);

        this._ram = new ram_1.RAM();
        this._cpu = new cpu_1.CPU(this._ram);
    }

    _createClass(Computer, [{
        key: "cpu",
        get: function get() {
            return this._cpu;
        }
    }]);

    return Computer;
}();

exports.Computer = Computer;