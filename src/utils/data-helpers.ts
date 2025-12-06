import type { ApiResponse, MutableMixedObject } from '@/types/api.types';
import type { AuthResponse } from '@/types/auth.types';

export const getEnvName = function (defaultEnv: string = 'production'): string {
    return String(import.meta.env.VITE_APP_ENV || defaultEnv);
};

export const envIs = function (envName: string[] | string | null | undefined) {
    envName = envName || 'NO_ONE';
    envName = Array.isArray(envName) ? envName : [envName];

    return envName.includes(getEnvName());
};

export const isDev = function () {
    return envIs(['development', 'dev']);
};

export const isProd = function () {
    return envIs(['production', 'prod']);
};

export const isObject = (value: unknown): boolean => {
    return Object.prototype.toString.call(value) === '[object Object]';
};

export const ifObjectOr = (value: unknown, defaultValue: any = {}): any => {
    return isObject(value) ? value : defaultValue;
};

export const isArray = (value: unknown): boolean => {
    return Array.isArray(value);
};

export const isArrayOr = (value: unknown, defaultValue: any[] = []): any => {
    return isArray(value) ? value : defaultValue;
};

export const ifArrayOr = (value: unknown, defaultValue: any[] = []): any => {
    return isArray(value) ? value : defaultValue;
};

export const getTokenFromResponse = function (
    response: ApiResponse<AuthResponse> | AuthResponse | MutableMixedObject | null | any,
    key: string = 'token'
): string | null {
    if (typeof response === 'string') {
        return response;
    }

    if (!response || !['string', 'object'].includes(typeof response)) {
        return null;
    }

    if (typeof response !== 'object') {
        return String(response)?.trim() || null;
    }

    key = (key || '')?.trim();

    response = ifObjectOr(response);

    if ('data' in response) {
        response = {
            ...response,
            ...ifObjectOr(response.data),
        };
    }

    response.token = ifObjectOr(response?.response, response)?.token || null;
    response.refresh_token = ifObjectOr(response?.response, response)?.refresh_token || null;

    delete response.response;

    if (!key || typeof key !== 'string') {
        return null;
    }

    if (key in response) {
        return response[key];
    }

    if ('data' in response) {
        return String(key in response?.data ? response?.data[key] : response?.data)?.trim() || null;
    }

    if (typeof key === 'string') {
        String(key in response ? (response as any)[key] : response)?.trim() || null;
    }

    return null;
};

export const getArrayDataFromResponse = (response: any) => {
    if (isArray(response)) {
        return response;
    }

    if (!isObject(response)) {
        return [];
    }

    if ('data' in response) {
        return 'data' in ifObjectOr(response.data)
            ? isArrayOr(ifObjectOr(response.data)?.data)
            : isArrayOr(response.data);
    }

    return response;
};
