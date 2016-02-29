import {Parser} from "../Parser";
import {InstructionSet} from "../InstructionSet";
import {TokenType} from "../TokenType";

describe("parser", function () {
    const parser = new Parser(new InstructionSet());

    it("should parse", function () {
        const stream = parser.parse("ADD 100 %A");

        const types = stream.tokens.map(token => token.type);
        const values = stream.tokens.map(token => token.value);

        expect(types).toEqual([
            TokenType.InstructionName,
            TokenType.NumberLiteral,
            TokenType.RegisterReference,
            TokenType.InstructionSeparator]);

        expect(values).toEqual(["ADD", "100", "%A", jasmine.anything()])
    });
});