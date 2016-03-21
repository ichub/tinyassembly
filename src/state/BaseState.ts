export class BaseState<T extends BaseState> {
    public mutate(mutateFn:(state:T) => T):T {
        mutateFn(this);
        return this as T;
    }
}