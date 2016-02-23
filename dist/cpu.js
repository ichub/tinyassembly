"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var registers_1 = require("./registers");
var logger_1 = require("./logger");

var CPU = function () {
    function CPU(ram) {
        _classCallCheck(this, CPU);

        this._stepInterval = 100;
        this._registers = new registers_1.Registers();
        this._ram = ram;
    }

    _createClass(CPU, [{
        key: "step",
        value: function step() {
            var currentInstructionIndex = this._registers.IP.value;
            this._registers.IP.incrementAndReturn();
            this.executeInstruction(this._ram.getCellValue(currentInstructionIndex));
        }
    }, {
        key: "run",
        value: function run() {
            var _this = this;

            setInterval(function () {
                _this.step();
            }, this._stepInterval);
        }
    }, {
        key: "executeInstruction",
        value: function executeInstruction(instruction) {
            logger_1.Logger.log("executing instruction " + instruction);
        }
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