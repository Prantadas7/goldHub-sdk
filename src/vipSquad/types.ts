export type Config = {
    [key: string]: string | number | Array<string>;
};

export type RequestOptions = {
    fullUrl?: string;
    method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    uri?: string;
    data?: Record<string, any>;
    signal?: AbortSignal;
    withCredentials?: boolean;
    headers?: object
};

export interface AccessTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    created_at: number;
};