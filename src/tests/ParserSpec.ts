import {Parser} from "../Parser";
import {InstructionSet} from "../InstructionSet";
import {TokenType} from "../TokenType";

describe("parser", function () {
    const parser = new Parser(new InstructionSet());

    it("should parse a single line", function () {
        const stream = parser.parse("ADD 100 %A");

        const types = stream.tokens.map(token => token.type);
        const values = stream.tokens.map(token => token.value);

        expect(types).toEqual([
            TokenType.Begin,
            TokenType.InstructionName,
            TokenType.NumberLiteral,
            TokenType.RegisterReference,
            TokenType.LineEnding,
            TokenType.End]);

        expect(values).toEqual([
            jasmine.anything(),
            "ADD",
            "100",
            "%A",
            jasmine.anything(),
            jasmine.anything()]);
    });

    it("should parse multiple lines", function () {
        const stream = parser.parse("ADD 100 %A\nLOAD %B %C");

        const types = stream.tokens.map(token => token.type);
        const values = stream.tokens.map(token => token.value);

        expect(types).toEqual([
            TokenType.Begin,
            TokenType.InstructionName,
            TokenType.NumberLiteral,
            TokenType.RegisterReference,
            TokenType.LineEnding,
            TokenType.InstructionName,
            TokenType.RegisterReference,
            TokenType.RegisterReference,
            TokenType.LineEnding,
            TokenType.End]);

        expect(values).toEqual([
            jasmine.anything(),
            "ADD",
            "100",
            "%A",
            jasmine.anything(),
            "LOAD",
            "%B",
            "%C",
            jasmine.anything(),
            jasmine.anything()]);
    });

    it("should ignore irregular whitespace", function () {
        const stream = parser.parse("    ADD     100  %A     \n LOAD   %B %C ");

        const types = stream.tokens.map(token => token.type);
        const values = stream.tokens.map(token => token.value);

        expect(types).toEqual([
            TokenType.Begin,
            TokenType.InstructionName,
            TokenType.NumberLiteral,
            TokenType.RegisterReference,
            TokenType.LineEnding,
            TokenType.InstructionName,
            TokenType.RegisterReference,
            TokenType.RegisterReference,
            TokenType.LineEnding,
            TokenType.End]);

        expect(values).toEqual([
            jasmine.anything(),
            "ADD",
            "100",
            "%A",
            jasmine.anything(),
            "LOAD",
            "%B",
            "%C",
            jasmine.anything(),
            jasmine.anything()]);
    });

    it("should handle unknown patterns", function () {
        const stream = parser.parse("LOAD &*( % %A -100 0");

        const types = stream.tokens.map(token => token.type);
        const values = stream.tokens.map(token => token.value);

        expect(types).toEqual([
            TokenType.Begin,
            TokenType.InstructionName,
            TokenType.Unknown,
            TokenType.Unknown,
            TokenType.RegisterReference,
            TokenType.Unknown,
            TokenType.NumberLiteral,
            TokenType.LineEnding,
            TokenType.End]);

        expect(values).toEqual([
            jasmine.anything(),
            "LOAD",
            "&*(",
            "%",
            "%A",
            "-100",
            "0",
            jasmine.anything(),
            jasmine.anything()
        ])
    });

    it("should parse empty programs", function () {
        const stream = parser.parse("");

        const types = stream.tokens.map(token => token.type);
        const values = stream.tokens.map(token => token.value);

        expect(types).toEqual([TokenType.Begin, TokenType.End]);
        expect(values).toEqual([jasmine.anything(), jasmine.anything()]);
    });

    it("should parse labels", function () {
        const stream = parser.parse("HALT\n label:  \n HALT");

        const types = stream.tokens.map(token => token.type);
        const values = stream.tokens.map(token => token.value);

        expect(types).toEqual([
            TokenType.Begin,
            TokenType.InstructionName,
            TokenType.LineEnding,
            TokenType.Label,
            TokenType.LineEnding,
            TokenType.InstructionName,
            TokenType.LineEnding,
            TokenType.End]);

        expect(values).toEqual([
            jasmine.anything(),
            "HALT",
            jasmine.anything(),
            "label",
            jasmine.anything(),
            "HALT",
            jasmine.anything(),
            jasmine.anything()
        ]);
    });
});