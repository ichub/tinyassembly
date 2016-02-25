export function toHex(num:number, desiredLength:number):string {
    let converted = num.toString(16);

    while (converted.length < desiredLength) {
        converted = "0" + converted;
    }

    return "0x" + converted;
}

export function listToHex(nums:number[], desiredLength:number):string[] {
    return nums.map(function (num) {
        return toHex(num, desiredLength);
    });
}

export function clamp(value:number, max: number) {
    while (value < 0) {
        value += max + 1;
    }

    return value % (max + 1);
}