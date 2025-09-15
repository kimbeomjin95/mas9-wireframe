import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isDev = command === 'serve';
  const isDemo = env.VITE_DEMO_MODE === 'true';

  return {
    plugins: [react()],
    base: isDev ? '/' : '/mas9-wireframe/',

    // Path alias 설정
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    build: {
      outDir: 'dist',
      sourcemap: !isDemo, // 데모 모드에서는 소스맵 생성하지 않음
      minify: 'esbuild', // terser 대신 esbuild 사용 (더 빠름)
      rollupOptions: {
        output: {
          manualChunks: {
            // 핵심 React 라이브러리
            vendor: ['react', 'react-dom'],

            // Material-UI 관련
            mui: ['@mui/material', '@emotion/react', '@emotion/styled'],

            // 아이콘 및 그래픽
            icons: ['lucide-react'],

            // 라우팅
            router: ['react-router-dom'],

            // 상태 관리
            state: ['zustand'],

            // API 관련
            api: ['@supabase/supabase-js'],

            // 공유 패키지들
            'shared-types': ['@mas9/shared-types'],
            'shared-utils': ['@mas9/shared-utils'],
            'shared-ui': ['@mas9/shared-ui'],
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },

      // 청크 크기 경고 임계값 (500KB)
      chunkSizeWarningLimit: 500,
    },

    // 개발 서버 설정
    server: {
      port: 3000,
      host: true,
      open: !isDemo, // 데모 모드가 아닐 때만 자동으로 브라우저 열기
    },

    // 미리보기 서버 설정
    preview: {
      port: 3000,
      host: true,
    },

    // 의존성 최적화
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        '@mui/material',
        'lucide-react',
        'zustand',
      ],
      exclude: ['@mas9/shared-types', '@mas9/shared-ui', '@mas9/shared-utils'],
      force: true, // 의존성 다시 빌드 강제
    },

    // 환경변수 설정
    define: {
      __VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
  };
});
