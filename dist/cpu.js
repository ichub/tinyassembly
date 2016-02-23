"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CPU = function () {
    function CPU(ram) {
        _classCallCheck(this, CPU);

        this._ram = ram;
    }

    _createClass(CPU, [{
        key: "step",
        value: function step() {
            var currentInstruction = this._registers.IP.value;
        }
    }, {
        key: "executeInstruction",
        value: function executeInstruction(instruction) {}
    }, {
        key: "registers",
        get: function get() {
            return this._registers;
        }
    }]);

    return CPU;
}();

exports.CPU = CPU;
console.log("it works!");