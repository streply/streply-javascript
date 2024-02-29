//@ts-expect-error fix types
import Streply, { UserConfig } from '@streply/browser';
import {App} from "vue";

const init = (app: App, options: UserConfig) => {
    //@ts-expect-error fix types
    Streply.Init(options, { technology: 'js/vue' });

    app.config.errorHandler = (error) => {
        //@ts-expect-error fix types
        Streply.API.Send('error', error.message, {}, Streply.Level["Normal"], undefined, undefined, error.name);
    };
}

export { init, Streply };