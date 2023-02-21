import { ApiState, INITIAL_STATE, NameError, NameRequest, NameResponse } from "../../../types";
import { createContext, useContext } from "react";

export interface UseNameContext {
    response?: ApiState<NameResponse, NameError>;
    setRequestData: (data: NameRequest) => void;
    invalidate: () => void;
}

export const nameContext = createContext<UseNameContext>({
    response: INITIAL_STATE,
    setRequestData: () => {},
    invalidate: () => {}
});

export const useNameContext = (): UseNameContext => {
    return useContext(nameContext);
};
