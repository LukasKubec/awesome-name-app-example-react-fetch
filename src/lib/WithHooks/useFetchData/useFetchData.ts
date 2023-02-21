import { useEffect, useState } from "react";
import { ApiState, INITIAL_STATE, NameRequest } from "../../../types";
import axios from "axios";

interface UseFetchData<RS, E> {
    loading: boolean;
    success: boolean;
    error?: E;
    data?: RS;
    handleSetData: (data: NameRequest) => void;
    invalidDate: () => void;
}

interface UseFetchDataProps<RS, E> {
    url?: string;
    genericResponseTypeGuard: (response: RS | unknown) => response is RS;
    genericErrorType: E;
}

const DEFAULT_URL = "https://api.agify.io";

// TODO: add type guards / type predicates
export const useFetchData = <RS, E>({ url = DEFAULT_URL, genericResponseTypeGuard, genericErrorType }: UseFetchDataProps<RS, E>): UseFetchData<RS, E> => {
    const [response, setResponse] = useState<ApiState<RS, E>>(INITIAL_STATE);
    const [data, setData] = useState<NameRequest | undefined>(undefined);

    const handleSetData = (data: NameRequest) => {
        setData(data);
    };

    const invalidDate = () => {
        setData(undefined);
        setResponse(INITIAL_STATE);
    };

    useEffect(() => {
        if (data) {
            (async () => {
                try {
                    setResponse({
                        loading: true,
                        success: false,
                        error: undefined,
                        data: undefined
                    });
                    const response = await axios.request({
                        url,
                        method: "GET",
                        params: data
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
                            error: genericErrorType,
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
            })();
        }
    }, [data]);

    return {
        loading: response.loading,
        success: response.success,
        error: response.error,
        data: response.data,
        handleSetData,
        invalidDate
    };
};
