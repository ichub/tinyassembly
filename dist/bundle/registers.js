(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./register":2}],2:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Register = function Register() {
    _classCallCheck(this, Register);

    this.value = 0;
};

exports.Register = Register;
},{}]},{},[1])