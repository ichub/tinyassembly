export function instruction(one, two, three) {
    return function(target, key, descriptor) {
        console.log("instruction");
        target.initInstructions();
        console.log(target._instructions);
        console.log(arguments);
        return descriptor;
    }
}