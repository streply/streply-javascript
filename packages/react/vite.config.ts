import {resolve} from 'path'
import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        emptyOutDir: false,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            fileName: () => `react.mjs`,
        },
    },
    plugins: [
        dts({
            root: __dirname,
            tsconfigPath: resolve(__dirname, './tsconfig.json'),
        }),
    ]
});