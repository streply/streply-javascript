import Streply, { UserConfig } from '@streply/browser';

const init = (options: UserConfig) => {
    Streply.init({ technology: 'js/react', ...options });
}

export { init, Streply };
