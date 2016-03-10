import {RAM} from "./RAM";

export class TextInitializer {
    public initText(ram:RAM) {
        const firstVisibleAsciiChar = 33;

        let addr = ram.setMemory(
            RAM.staticRange.low + 33 * TextInitializer.charSize, [
                5, 5,
                0, 0, 1, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 1, 0, 0,
            ]);
    }

    public static get charSize() {
        return 2 + 5 * 5;
    }
}