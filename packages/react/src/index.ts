import Streply, { UserConfig } from '@streply/browser';

const init = (options: UserConfig) => {
    Streply.Init(options, { technology: 'js/react' });
}

export { init, Streply };
