import cleanup from 'rollup-plugin-cleanup';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'index.js', // 入口文件
  output: [
    {
      file: './es/index.js',
      format: 'esm', // 将软件包保存为 ES 模块文件
      name: 'cssModuleVue',
    },
    {
      file: './dist/index.js',
      format: 'cjs', // CommonJS，适用于 Node 和 Browserify/Webpack
      name: 'cssModuleVue',
      exports: 'default',
    },
  ],
  watch: {
    // 配置监听处理
    exclude: 'node_modules/**',
  },
  plugins: [
    cleanup(),
    terser()
  ],
};
