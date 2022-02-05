import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh(), pluginRewriteAll()],
    build: {
        target: 'es2015',
    },
    define: {
        'process.env': {},
    },
});
