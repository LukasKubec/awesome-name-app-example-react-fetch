import { useState } from "react";
import axios from "axios";
import { ApiState, INITIAL_STATE } from "../../../types";

type Method<RQ> = {
    method: "GET" | "POST";
    data?: RQ;
};

export interface FetchParams<RQ, E> {
    url: string;
    method: Method<RQ>;
    genericTypeError: E;
}

interface UseAxios<RQ, RS, E> {
    apiState: ApiState<RS, E>;
    fetchData: (data: FetchParams<RQ, E>) => Promise<void>;
    invalidateState: () => void;
}

export const useAxios = <RQ, RS, E>(genericResponseTypeGuard: (response: RS | unknown) => response is RS): UseAxios<RQ, RS, E> => {
    const [response, setResponse] = useState<ApiState<RS, E>>(INITIAL_STATE);

    const invalidateState = () => {
        setResponse(INITIAL_STATE);
    }

    const fetchData = async ({ url, method, genericTypeError }: FetchParams<RQ, E>) => {
        try {
            setResponse({
                loading: true,
                success: false,
                error: undefined,
                data: undefined
            });
            const response = await axios.request({
                url,
                method: method.method,
                data: method.method === "POST" ? method.data : undefined,
                params: method.method === "GET" ? method.data : undefined
            });
            if(genericResponseTypeGuard(response.data)) {
                setResponse({
                    loading: false,
                    success: true,
                    error: undefined,
                    data: response.data
                });
            } else {
                setResponse({
                    loading: false,
                    success: false,
                    error: genericTypeError,
                    data: undefined
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResponse({
                    loading: false,
                    success: false,
                    error: error.response?.data,
                    data: undefined
                });
            }
        }
    };

    return {
        apiState: response,
        fetchData,
        invalidateState
    };
};
