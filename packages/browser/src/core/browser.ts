import {ErrorMessage, StreplyInterface} from "../types";
import md5 from 'crypto-js/md5';
import packageJson from '../../package.json';

export const Streply: StreplyInterface = {
    Level: {Critical: 'critical', High: 'high', Normal: 'normal', Low: 'low'},

    __server: '',
    __token: '',
    __projectId: '',
    __apiClientTechnology: 'js/browser',
    __apiClientVersion: packageJson.version,
    __startTime: null,
    __config: {'user': null, 'debug': false},

    Config: {
        Release: function (release: string) {
            Streply.__config['release'] = release
        },
        Environment: function (environment: string) {
            Streply.__config['environment'] = environment
        },
        Debug: function (isDebug: boolean) {
            Streply.__config['debug'] = isDebug
        }
    },

    Debug: function (message: ErrorMessage, type?: string) {
        let func = console.log;

        if (typeof type !== 'undefined') {
            switch (type) {
                case 'error':
                    func = console.error;
                    break;
                case 'warn':
                    func = console.warn;
                    break;
            }
        }

        if (Streply.__config['debug']) {
            if (typeof message === 'object') {
                func(message);
            } else {
                func('Streply: ' + message);
            }
        }
    },

    User: function (userId: string, userName?: string, params?: Record<string, string>) {
        if (!userName) {
            userName = userId
        }
        if (!params) {
            params = {}
        }

        Streply.__config['user'] = {userId, userName, params};
    },

    Errors: {
        Handler: function () {
            window.addEventListener("error", (ErrorEvent) => {
                Streply.API.Send('error', ErrorEvent.message, {}, Streply.Level["Normal"], ErrorEvent.filename, ErrorEvent.lineno, ErrorEvent.error.name);
            });
        }
    },

    Helpers: {
        Storage: function (name: string, value: string, expire: number) {
            const storage = localStorage.getItem(name);

            if (storage) {
                const json = JSON.parse(storage);

                if (json !== null) {
                    if (typeof json.value !== 'undefined') {
                        if (new Date(json.expire).getTime() >= new Date().getTime()) {
                            return json.value;
                        }

                        localStorage.removeItem(name);
                    }
                }
            }

            const expireDate = new Date();
            expireDate.setTime(expireDate.getTime() + (60 * 1000 * expire));

            localStorage.setItem(name, JSON.stringify({
                'expire': expireDate,
                'value': value
            }));

            return value;
        },
        Hash: function (input: string) {
            return md5(input).toString();
        },
        Salt: function makeid(length: number) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            let result = '';
            while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return result;
        },
        generateRandomId: function () {
            const __hash = Streply.Helpers.Hash(Streply.__config['public_key'] + '.' + Streply.Helpers.Salt(16) + '.' + Math.floor(Date.now() / 1000));
            return 'js_' + __hash.substring(3, 32);
        },
        parseParams: function (params: Record<string, string>) {
            const __params = [];
            for (const paramName in params) {
                __params.push({'name': paramName, 'value': params[paramName] || ''})
            }
            return __params;
        },
        microTime: function () {
            return (Date.now ? Date.now() : new Date().getTime()) / 1000;
        }
    },

    Session: {
        __traceId: null,
        __traceUniqueId: 0,
        Initialize: function () {
            Streply.Session.__traceId = Streply.Helpers.generateRandomId()
        },
        increaseTraceUniqueId: function () {
            ++Streply.Session.__traceUniqueId;
        },
        traceId: function () {
            return Streply.Session.__traceId
        },
        traceUniqueId: function () {
            return Streply.Session.traceId() + '_' + Streply.Session.__traceUniqueId
        },
        sessionId: function () {
            return Streply.Helpers.Storage('streamly_session_id_6', Streply.Helpers.generateRandomId(), 60)
        },
        userId: function () {
            return Streply.Helpers.Storage('streamly_user_id_6', Streply.Helpers.generateRandomId(), 60 * 24 * 365)
        },
    },

    Request: {
        __url: null,
        __date: new Date(),

        date: function () {
            const date = Streply.Request.__date;

            const [month, day, year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()];
            const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];

            const dates = [year, month, day, hour, minutes, seconds];

            const formatted = dates.map((date) => {
                const dateStr = date.toString();
                if (dateStr.length === 1) {
                    return '0' + dateStr;
                }

                return dateStr;
            });

            return formatted[0] + '/' + formatted[1] + '/' + formatted[2] + ' ' + formatted[3] + ':' + formatted[4] + ':' + formatted[5];
        },
        port: function () {
            if(Streply.Request.__url === null) {
                return '';
            }

            if(Streply.Request) {
                if (Streply.Request.__url.port.length === 0) {
                    return 80;
                }

                return Streply.Request.__url.port || '';
            }

            return '';
        },
        dateTimeZone: function () {
            return Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        URL: function () {
            if(Streply.Request.__url === null) {
                return '';
            }

            return Streply.Request.__url.href || '';
        },
        scheme: function () {
            if(Streply.Request.__url === null) {
                return '';
            }

            return Streply.Request.__url.protocol || ''
        },
        userAgent: function () {
            return window.navigator.userAgent || ''
        }
    },

    API: {
        Send: function (type: string, message: string, params: Record<string, string>, level?: string, fileName?: string | null, lineNumber?: number | null, exceptionName?: string | null) {
            if (typeof fileName === 'undefined') {
                fileName = null
            }
            if (typeof lineNumber === 'undefined') {
                lineNumber = null
            }
            if (typeof level === 'undefined') {
                level = Streply.Level["Normal"]
            }
            if (typeof exceptionName === 'undefined') {
                exceptionName = null
            }

            let levelKey = '';

            if (level) {
                levelKey = level.charAt(0).toUpperCase() + level.slice(1);
            }

            if (typeof Streply.Level[levelKey] === 'undefined') {
                Streply.Debug(level + ' is an invalid level', 'error');
                return;
            }

            if (type !== 'error' && type !== 'activity' && type !== 'log') {
                Streply.Debug('Type is invalid', 'error');
                return;
            }

            Streply.Debug('Event=' + type + '; Message=' + message + '; Level=' + level);
            Streply.Debug('Params: ');
            Streply.Debug(params);

            const xHttp = new XMLHttpRequest();
            xHttp.open("POST", Streply.__server, true);
            xHttp.setRequestHeader('Token', Streply.__token);
            xHttp.setRequestHeader('ProjectId', Streply.__projectId);
            xHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

            xHttp.onreadystatechange = function () {
                Streply.Debug('readyState: ' + xHttp.readyState);
                Streply.Debug('responseText: ' + xHttp.responseText);
            }

            xHttp.send(JSON.stringify({
                eventType: 'event',
                projectId: Streply.__projectId,
                status: 0,
                type: type,
                message: message,
                params: Streply.Helpers.parseParams(params),
                level: level,
                file: fileName,
                line: lineNumber,
                user: Streply.__config['user'],
                httpStatusCode: 200,
                traceId: Streply.Session.traceId(),
                traceUniqueId: Streply.Session.traceUniqueId(),
                sessionId: Streply.Session.sessionId(),
                userId: Streply.Session.userId(),
                date: Streply.Request.date(),
                dateTimeZone: Streply.Request.dateTimeZone(),
                technology: Streply.__apiClientTechnology,
                technologyVersion: '',
                apiClientVersion: Streply.__apiClientVersion,
                release: Streply.__config['release'],
                environment: Streply.__config['environment'],
                requestUserAgent: Streply.Request.userAgent(),
                requestPort: Streply.Request.port(),
                requestScheme: Streply.Request.scheme(),
                url: Streply.Request.URL(),
                time: Streply.Helpers.microTime(),
                startTime: Streply.__startTime,
                loadTime: Streply.Helpers.microTime() - (Streply.__startTime || 0),
                exceptionName: exceptionName
            }));

            Streply.Session.increaseTraceUniqueId();
        }
    },

    Log: function (message: string, params: Record<string, string>, level: string) {
        Streply.API.Send('log', message, params, level)
    },
    Activity: function (message: string, params: Record<string, string>) {
        Streply.API.Send('activity', message, params)
    },
    Error: function (message: string, params: Record<string, string>, level: string) {
        Streply.API.Send('error', message, params, level)
    },

    Exception: function (exception: unknown, params: Record<string, string>, level: string) {
        // @ts-expect-error - exception is not a string
        let fileName = exception.stack.split('at')[1].trim();

        const [lineColumn, lineNumber] = fileName.match(/(\d+):(\d+)/);

        fileName = fileName.replace(':' + lineColumn, '');

        // @ts-expect-error - exception is not a string
        Streply.API.Send('error', String(exception), params, level, fileName, lineNumber, exception.name);
    },

    init: (params) => {
        const [, token, server, projectId] = params.dsn
            .match(/https:\/\/([^@]+)@([^/]+)\/(\d+)/) || [];

        if (!token || !server || !projectId) {
            throw new Error('Invalid DSN');
        }

        Streply.__server = `https://${server}`;
        Streply.__token = token;
        Streply.__projectId = projectId;

        if (params.technology) {
            Streply.__apiClientTechnology = params.technology;
        }

        Streply.__startTime = Streply.Helpers.microTime();
        Streply.Session.Initialize();
        Streply.Errors.Handler();
    }
};