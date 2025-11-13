export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
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
