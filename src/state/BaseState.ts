export class BaseState<T extends BaseState<any>> {
    public mutate(mutateFn:(state:T) => void):T {
        mutateFn((this as any) as T);
        return (this as any) as T;
    }
}