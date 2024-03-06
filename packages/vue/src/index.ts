import Streply, { UserConfig } from '@streply/browser';
import {App} from "vue";

const init = (app: App, options: UserConfig) => {
    Streply.Init(options, { technology: 'js/vue' });

    app.config.errorHandler = (error) => {
        const { message, name } = error as Error;

        Streply.API.Send('error', message, {}, Streply.Level["Normal"], undefined, undefined, name);
    };
}

export { init, Streply };