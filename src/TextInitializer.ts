import {RAM} from "./RAM";

export class TextInitializer {
    public initText(ram:RAM) {
        // !
        let addr = ram.setMemory(
            RAM.staticRange.low + TextInitializer.firstVisibleCharCode * TextInitializer.charSize, [
                6, 8,
                0, 0, 1, 1, 0, 0,
                0, 0, 1, 1, 0, 0,
                0, 0, 1, 1, 0, 0,
                0, 0, 1, 1, 0, 0,
                0, 0, 1, 1, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 1, 1, 0, 0,
                0, 0, 1, 1, 0, 0,
            ]);

        // "
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 1, 1, 0, 1, 1,
                0, 1, 1, 0, 1, 1,
                0, 1, 1, 0, 1, 1,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
            ]);

        // #
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 1, 0, 0, 1, 0,
                0, 1, 0, 0, 1, 0,
                1, 1, 1, 1, 1, 1,
                0, 1, 0, 0, 1, 0,
                0, 1, 0, 0, 1, 0,
                1, 1, 1, 1, 1, 1,
                0, 1, 0, 0, 1, 0,
                0, 1, 0, 0, 1, 0,
            ]);

        // $
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 1, 0, 0, 0,
                0, 1, 1, 1, 1, 0,
                0, 1, 0, 0, 0, 0,
                0, 1, 1, 1, 1, 0,
                0, 0, 0, 0, 1, 0,
                0, 1, 1, 1, 1, 0,
                0, 0, 1, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
            ]);

        // %
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 1, 1, 0, 0, 0,
                0, 1, 1, 0, 1, 0,
                0, 0, 0, 1, 0, 0,
                0, 0, 1, 0, 0, 0,
                0, 1, 0, 1, 1, 0,
                0, 0, 0, 1, 1, 0,
                0, 0, 0, 0, 0, 0,
            ]);

        // &
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 1, 1, 0, 0,
                0, 1, 0, 0, 1, 0,
                0, 1, 0, 1, 0, 0,
                0, 0, 1, 1, 0, 1,
                0, 1, 0, 1, 0, 1,
                0, 1, 0, 0, 1, 0,
                0, 1, 0, 0, 1, 0,
                0, 0, 1, 1, 1, 0,
            ]);

        // '
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 1, 1, 0,
                0, 0, 0, 1, 1, 0,
                0, 0, 0, 1, 1, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
            ]);

        // (
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 1, 0, 0, 0,
                0, 1, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0,
                1, 0, 0, 0, 0, 0,
                0, 1, 0, 0, 0, 0,
                0, 0, 1, 0, 0, 0,
            ]);

        // )
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 1, 0, 0,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 1, 0, 0,
            ]);

        // *
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 1, 0, 0, 1, 0,
                0, 0, 1, 1, 0, 0,
                0, 1, 1, 1, 1, 0,
                0, 0, 1, 1, 0, 0,
                0, 1, 0, 0, 1, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
            ]);

        // +
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 0, 1, 1, 0, 0,
                0, 0, 1, 1, 0, 0,
                1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1,
                0, 0, 1, 1, 0, 0,
                0, 0, 1, 1, 0, 0,
                0, 0, 0, 0, 0, 0,
            ]);

        // ,
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 1, 1, 0, 0, 0,
                0, 1, 1, 0, 0, 0,
                0, 1, 1, 0, 0, 0,
                1, 1, 0, 0, 0, 0,
            ]);

        // -
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
            ]);

        // .
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 1, 1, 0, 0, 0,
                0, 1, 1, 0, 0, 0,
            ]);

        // /
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 1, 0, 0,
                0, 0, 0, 1, 0, 0,
                0, 0, 1, 0, 0, 0,
                0, 0, 1, 0, 0, 0,
                0, 1, 0, 0, 0, 0,
            ]);

        // 0
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 1, 1, 0, 0,
                0, 1, 0, 0, 1, 0,
                0, 1, 0, 0, 1, 0,
                0, 1, 0, 1, 1, 0,
                0, 1, 1, 0, 1, 0,
                0, 1, 0, 0, 1, 0,
                0, 1, 0, 0, 1, 0,
                0, 0, 1, 1, 0, 0,
            ]);

        // 1
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 1, 1, 0, 0,
                0, 0, 0, 1, 0, 0,
                0, 0, 0, 1, 0, 0,
                0, 0, 0, 1, 0, 0,
                0, 0, 0, 1, 0, 0,
                0, 0, 0, 1, 0, 0,
                0, 0, 0, 1, 0, 0,
                0, 0, 0, 1, 0, 0,
            ]);

        // 2
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 1, 1, 0, 0,
                0, 1, 0, 0, 1, 0,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 1, 0, 0,
                0, 0, 0, 1, 0, 0,
                0, 0, 1, 0, 0, 0,
                0, 1, 0, 0, 0, 0,
                0, 1, 1, 1, 1, 0,
            ]);

        // 3
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 1, 1, 1, 0, 0,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 0, 1, 0,
                0, 1, 1, 1, 0, 0,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 0, 1, 0,
                0, 1, 1, 1, 0, 0,
            ]);

        // 4
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 1, 0, 0, 1, 0,
                0, 1, 0, 0, 1, 0,
                0, 1, 0, 0, 1, 0,
                0, 1, 1, 1, 1, 0,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 0, 1, 0,
            ]);

        // 5
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 1, 1, 1, 1, 0,
                0, 1, 0, 0, 0, 0,
                0, 1, 0, 0, 0, 0,
                0, 1, 0, 0, 0, 0,
                0, 1, 1, 1, 1, 0,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 0, 1, 0,
                0, 1, 1, 1, 1, 0,
            ]);

        // 6
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 1, 0, 0, 0, 0,
                0, 1, 0, 0, 0, 0,
                0, 1, 0, 0, 0, 0,
                0, 1, 0, 0, 0, 0,
                0, 1, 1, 1, 1, 0,
                0, 1, 0, 0, 1, 0,
                0, 1, 0, 0, 1, 0,
                0, 1, 1, 1, 1, 0,
            ]);

        // 7
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 1, 1, 1, 1, 0,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 1, 0, 0,
                0, 0, 0, 1, 0, 0,
                0, 0, 1, 0, 0, 0,
                0, 0, 1, 0, 0, 0,
                0, 1, 0, 0, 0, 0,
                0, 1, 0, 0, 0, 0,
            ]);

        // 8
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 1, 1, 0, 0,
                0, 1, 0, 0, 1, 0,
                0, 1, 0, 0, 1, 0,
                0, 0, 1, 1, 0, 0,
                0, 1, 0, 0, 1, 0,
                0, 1, 0, 0, 1, 0,
                0, 1, 0, 0, 1, 0,
                0, 0, 1, 1, 0, 0,
            ]);

        // 9
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 1, 1, 0, 0,
                0, 1, 0, 0, 1, 0,
                0, 1, 0, 0, 1, 0,
                0, 0, 1, 1, 1, 0,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 0, 1, 0,
            ]);

        // :
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 0, 1, 1, 0, 0,
                0, 0, 1, 1, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 1, 1, 0, 0,
                0, 0, 1, 1, 0, 0,
                0, 0, 0, 0, 0, 0,
            ]);

        // ;
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 0, 1, 1, 0, 0,
                0, 0, 1, 1, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 1, 1, 0, 0,
                0, 0, 1, 1, 0, 0,
                0, 1, 1, 0, 0, 0,
            ]);

        // <
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 1, 0, 0,
                0, 0, 1, 0, 0, 0,
                0, 1, 0, 0, 0, 0,
                0, 0, 1, 0, 0, 0,
                0, 0, 0, 1, 0, 0,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 0, 0, 0,
            ]);

        // =
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 1, 1, 1, 1, 0,
                0, 0, 0, 0, 0, 0,
                0, 1, 1, 1, 1, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
            ]);

        // >
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 1, 0, 0, 0,
                0, 0, 0, 1, 0, 0,
                0, 0, 0, 0, 1, 0,
                0, 0, 0, 1, 0, 0,
                0, 0, 1, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
            ]);

        // ?
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 1, 0, 0,
                0, 0, 1, 0, 1, 0,
                0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 1,
                0, 0, 0, 1, 1, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 1, 0, 0,
            ]);

        // @
        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 1, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 1,
                1, 0, 1, 1, 0, 1,
                1, 1, 0, 1, 0, 1,
                1, 1, 0, 1, 0, 1,
                1, 0, 1, 1, 0, 1,
                1, 0, 0, 0, 1, 0,
                0, 1, 0, 0, 0, 0,
            ]);

        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
            ]);

        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
            ]);

        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
            ]);

        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
            ]);

        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
            ]);

        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
            ]);

        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
            ]);

        addr = ram.setMemory(
            addr, [
                6, 8,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
            ]);
    }

    public static get charSize() {
        return 2 + TextInitializer.charWidth * TextInitializer.charHeight;
    }

    public static get charWidth() {
        return 6;
    }

    public static get charHeight() {
        return 8;
    }

    public static get firstVisibleCharCode() {
        return 33;
    }
}
