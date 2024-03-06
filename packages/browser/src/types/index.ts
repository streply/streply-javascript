export type ErrorMessage = string | object | string[];

export type StreplyInterface = {
    Level: Record<string, string>,
    __server: string,
    __token: string,
    __projectId: string,
    __apiClientTechnology: string,
    __apiClientVersion: string,
    __startTime: null | number,
    __config: Config,
    Config: SetConfig,
    Debug: Debug,
    User: unknown,
    Errors: Errors,
    Helpers: Helpers,
    Session: Session,
    Request: Request,
    API: API,
    Log: (message: string, params: Record<string, string>, level: string) => void,
    Activity: (message: string, params: Record<string, string>) => void,
    Error: (message: string, params: Record<string, string>, level: string) => void,
    Exception: (exception: unknown, params: Record<string, string>, level: string) => void,
    Init: (params: UserConfig, config: InitConfig) => void,
}

export type UserConfig = {
    dsn: string;
}

type InitConfig = {
    technology?: 'js/browser' | 'js/vue' | 'js/react',
}

export type Config = {
    user?: {
        userId: string,
        userName: string,
        params: Record<string, string>
    } | null,
    debug?: boolean,
    release?: string,
    environment?: string,
    public_key?: string,
}

export type SetConfig = {
    Release: (p: string) => void
    Environment: (p: string) => void
    Debug: (p: boolean) => void
}

type Helpers = {
    Hash: (p: string) => string
    Salt: (p: number) => string
    generateRandomId: () => string
    parseParams: (params: Record<string, string>) => { name: string, value: string }[]
    Storage: (name: string, value: string, expire: number) => string
    microTime: () => number
}

type Session = {
    __traceId: string | null,
    __traceUniqueId: number,
    Initialize: () => void
    increaseTraceUniqueId: () => void
    traceId: () => string | null
    traceUniqueId: () => string
    sessionId: () => string
    userId: () => string
}

type Request = {
    __url: URL,
    __date: Date,
    date: () => string
    port: () => number | string
    dateTimeZone: () => string
    URL: () => string
    scheme: () => string
    userAgent: () => string
}

type Debug = (message: ErrorMessage, type?: string) => void

type API = {
    Send: (type: string, message: string, params: Record<string, string>, level?: string, fileName?: string | null, lineNumber?: number | null, exceptionName?: string | null) => void,
}

type Errors = {
    Handler: () => void
}