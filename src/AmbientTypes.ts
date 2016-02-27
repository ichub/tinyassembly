interface ArrayConstructor {
    from<T, U>(arr:Array<T>, transform:(val:T) => U);
}
