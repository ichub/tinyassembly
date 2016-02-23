(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./logger":3,"./registers":6}],2:[function(require,module,exports){
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
        key: "run",
        value: function run() {
            this._cpu.run();
        }
    }, {
        key: "cpu",
        get: function get() {
            return this._cpu;
        }
    }]);

    return Computer;
}();

exports.Computer = Computer;
},{"./cpu":1,"./ram":4}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
    function Logger() {
        _classCallCheck(this, Logger);
    }

    _createClass(Logger, null, [{
        key: "log",
        value: function log(value) {
            console.log(value);
        }
    }]);

    return Logger;
}();

exports.Logger = Logger;
},{}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var register_1 = require("./register");

var RAM = function () {
    function RAM() {
        _classCallCheck(this, RAM);

        this._memory = Array.from(new Array(RAM.size), function () {
            return 0;
        });
    }

    _createClass(RAM, [{
        key: "getCellValue",
        value: function getCellValue(index) {
            return this._memory[index];
        }
    }, {
        key: "setCellValue",
        value: function setCellValue(index, value) {
            this._memory[index] = value;
        }
    }], [{
        key: "size",
        get: function get() {
            return Math.pow(2, 10);
        }
    }, {
        key: "memoryCellSize",
        get: function get() {
            return register_1.Register.maxValue;
        }
    }]);

    return RAM;
}();

exports.RAM = RAM;
},{"./register":5}],5:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Register = function () {
    function Register() {
        _classCallCheck(this, Register);

        this._value = 0;
    }

    _createClass(Register, [{
        key: "incrementAndReturn",
        value: function incrementAndReturn() {
            this._value += 1;
            this.ensureOverflow();
            return this._value;
        }
    }, {
        key: "ensureOverflow",
        value: function ensureOverflow() {
            this._value = Math.abs(this._value) % (Register.maxValue + 1);
        }
    }, {
        key: "value",
        get: function get() {
            return this._value;
        }
    }], [{
        key: "maxValue",
        get: function get() {
            return Math.pow(2, 16) - 1;
        }
    }]);

    return Register;
}();

exports.Register = Register;
},{}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var register_1 = require("./register");

var Registers = function () {
    function Registers() {
        _classCallCheck(this, Registers);

        this._A = new register_1.Register();
        this._B = new register_1.Register();
        this._C = new register_1.Register();
        this._D = new register_1.Register();
        this._E = new register_1.Register();
        this._F = new register_1.Register();
        this._G = new register_1.Register();
        this._IP = new register_1.Register();
    }

    _createClass(Registers, [{
        key: "A",
        get: function get() {
            return this._A;
        }
    }, {
        key: "B",
        get: function get() {
            return this._B;
        }
    }, {
        key: "C",
        get: function get() {
            return this._C;
        }
    }, {
        key: "D",
        get: function get() {
            return this._D;
        }
    }, {
        key: "E",
        get: function get() {
            return this._E;
        }
    }, {
        key: "F",
        get: function get() {
            return this._F;
        }
    }, {
        key: "G",
        get: function get() {
            return this._G;
        }
    }, {
        key: "IP",
        get: function get() {
            return this._IP;
        }
    }]);

    return Registers;
}();

exports.Registers = Registers;
},{"./register":5}]},{},[2])