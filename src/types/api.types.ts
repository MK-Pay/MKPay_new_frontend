export interface ApiResponse<T = any> {
    success?: boolean;
    data?: T;
    token?: T;
    message?: string;
}

export type ObjLiteral = Record<string, unknown>;

export type StringMap = Record<string, string>;

export type PrimitiveMap = Record<string, string | number | boolean>;

export type MutableStringObject = {
    [key: string]: string;
};

export type MutableMixedObject = {
    // [key: string]: undefined;
    // [key: string]: any;
    [key: string | number]: any;
};

export interface MutableHeaders extends MutableMixedObject {
    [key: string | number]: any;
}

export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    statusCode: number;
}

export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}
