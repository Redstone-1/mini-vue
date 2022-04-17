import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';


export default {
  input: './src/index.js',
  output: {
    file: 'dist/mini-vue/vue.js',
    name: 'Vue', // 打包后全局变量的名字
    format: 'umd', // 统一模块规范
    sourcemap: true, // 开启源码调试
  },
  plugins: [
    babel({
      exclude: 'node_mudules/**', // babel 执行时忽略 node_mudules 下的所有文件
    }),
    process.env.ENV === 'development' && serve({
      open: true,
      openPage: '/public/index.html',
      port: 3000,
      contentBase: '',
    })
  ]
}
