export type Config = {
    [key: string]: string | number;
};

export type RequestOptions = {
    fullUrl?: string;
    method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    uri?: string;
    data?: Record<string, any>;
    signal?: AbortSignal;
    withCredentials?: boolean;
};