export interface ApiState<RS, E> {
    loading: boolean;
    success: boolean;
    error?: E;
    data?: RS;
}

export const INITIAL_STATE = {
    loading: false,
    success: false,
    error: undefined,
    data: undefined
};
