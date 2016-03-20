export function ignoreCaseEquals(lhs:string, rhs:string):boolean {
    return lhs.toLowerCase() === rhs.toLowerCase();
}

export function isNullOrWhitespace(str:string) {
    return typeof str === "undefined" || str === null || /^\s+$/.test(str);
}
