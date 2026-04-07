import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: './src/js/main.js',
      name: 'Jauntyslider',
      formats: ['umd'],
      fileName: () => 'js/jauntyslider.min.js',
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.names.some((n) =>
            n.includes('jauntyslider.css')
          )) {
            return 'css/jauntyslider.min.css';
          }

          return '[name][extname]';
        }
      }
    }
  }
});