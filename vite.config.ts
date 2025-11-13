import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
    // Carrega o arquivo env baseado em `mode` no diretório de trabalho atual.
    // Defina o terceiro parâmetro como '' para carregar todos os ambientes, independentemente do
    // Prefixo `VITE_`.
    const env = loadEnv(mode, process.cwd(), '');

    const watcher = {
        awaitWriteFinish: true,

        // Arquivos ignorados
        ignored: [
            'node_modules',
            '.git',
            'public',
            'no-commit',
            //
        ],
    };

    const configBase = {
        plugins: [
            vue(),
            tailwindcss(),
            //
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
                '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
                '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
                '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
                '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
                '@composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
                '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
                '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
                '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
                '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
                '@public': fileURLToPath(new URL('./public', import.meta.url)),
            },
        },

        define: {
            // Provide an explicit app-level constant derived from an env var.
            __APP_ENV__: JSON.stringify(env.APP_ENV),
        },
    };

    if (command === 'serve') {
        return {
            ...configBase,
            // Example: use an env var to set the dev server port conditionally.
            server: {
                port: env.APP_PORT ? Number(env.APP_PORT) : 5173,
                watcher: watcher,
            },
        };
    }

    return {
        ...configBase,
    };
});
