import { useEffect, useState } from "react";
import { ApiState, INITIAL_STATE, NameRequest } from "../../../types";
import axios from "axios";

interface UseFetchNameData<RS, E> {
    loading: boolean;
    success: boolean;
    error?: E;
    data?: RS;
    handleSetData: (data: NameRequest) => void;
    invalidDate: () => void;
}

const url = "https://api.agify.io";

export const useFetchNameData = <RS, E>(): UseFetchNameData<RS, E> => {
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
                    setResponse({
                        loading: false,
                        success: true,
                        error: undefined,
                        data: response.data
                    });
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