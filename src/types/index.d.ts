declare namespace Api {
    export interface Error {
        error: boolean;
        message: string;
    }
    export interface FieldsValidationError {
        error: boolean;
        message: string;
        fields: InvalidField[];
    }
    export interface InvalidField {
        name: string;
        message: string;
    }
    export interface MrAuthSessionCreateRequestBody {
        email: string;
        password: string;
    }
    export interface MrAuthSessionCreateResponse {
        item: MrAuthSessionCreateResponseItem;
    }
    export interface MrAuthSessionCreateResponseItem {
        id: number;
        tokenJWT: string;
        createdAt: string; // date-time
        updatedAt: string; // date-time
    }
    export interface MrPanelUserCreateRequest {
        user: MrPanelUserCreateRequestUser;
    }
    export interface MrPanelUserCreateRequestUser {
        email: string;
        password: string;
        passwordConfirmation: string;
    }
    export interface MrPanelUserCreateResponse {
        item: MrPanelUserCreateResponseItem;
    }
    export interface MrPanelUserCreateResponseItem {
        id: number;
        email: string;
        createdAt: string; // date-time
        updatedAt: string; // date-time
    }
    export interface MrPanelUserIndexRequestQuery {
        page?: null | number;
        perPage?: null | number;
    }
    export interface MrPanelUserIndexResponse {
        items: MrPanelUserIndexResponseItem[];
        itemsTotalCount: number;
        perPage: number;
        page: number;
    }
    export interface MrPanelUserIndexResponseItem {
        id: number;
        email: string;
        createdAt: string; // date-time
        updatedAt: string; // date-time
    }
    export interface MrSession {
        id: number;
        token: string;
        tokenJWT: string;
        createdAt: string; // date-time
        updatedAt: string; // date-time
    }
    export interface MrUser {
        id: number;
        email: string;
        password: string;
        createdAt: string; // date-time
        updatedAt: string; // date-time
    }
}
