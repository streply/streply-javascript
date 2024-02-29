import {resolve} from 'path'
import {defineConfig} from 'vite'

export default defineConfig({
    build: {
        target: 'esnext',
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'browser',
            fileName: (format) => `browser.${format}.js`,
        },
    }
});