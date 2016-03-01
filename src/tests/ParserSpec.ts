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
            TokenType.InstructionSeparator,
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
            TokenType.InstructionSeparator,
            TokenType.InstructionName,
            TokenType.RegisterReference,
            TokenType.RegisterReference,
            TokenType.InstructionSeparator,
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
            TokenType.InstructionSeparator,
            TokenType.InstructionName,
            TokenType.RegisterReference,
            TokenType.RegisterReference,
            TokenType.InstructionSeparator,
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
            TokenType.InstructionSeparator,
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
});