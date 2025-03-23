const formatMap = {
  esm: {
    file: 'dist/es/index.js',
    format: 'esm',
  },
  cjs: {
    file: 'dist/lib/index.js',
    format: 'cjs',
  }
}
const createConfig = output => {
  return {
    input: 'src/index.js',
    output,
    plugins: [],
    external: ['vue'],
  }
}
const config = Object.values(formatMap).values.map(output => createConfig(output))
module.export = config
// pnpm add @rollup/plugin-json @rollup/plugin-terser @rollup/plugin-node-resolve @rollup/plugin-babel rollup-plugin-vue @rollup/plugin-strip -D -w