import { nodeResolve } from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import strip from '@rollup/plugin-strip';
import json from '@rollup/plugin-json';

const pkg = require('./package.json');
const { name, version, description, author, license } = pkg;
const banner = `/*!
* ${name} v${version}
* ${description}
* (c) ${new Date().getFullYear()} ${author}
* Released under the ${license} License.
*/`

const formatMap = {
  esm: {
    file: 'dist/es/index.js',
    format: 'esm',
    banner,
  },
  cjs: {
    file: 'dist/lib/index.js',
    format: 'cjs',
    banner,
  }
}
const createConfig = output => {
  return {
    input: 'src/index.js',
    output,
    plugins: [
      nodeResolve(),
      babel({
        babelrc: false,
        exclude: 'node_modules/**', // 只转译我们的源代码
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: ['> 1%', 'last 2 versions', 'ie >= 11']
              }
            }
          ]
        ],
      }),
      vue(),
      commonjs(),
      terser(),
      strip({
        labels: ['unittest'],
      }),
      json(),
    ],
    external: ['vue', 'xe-utils'],
  }
}
const config = Object.values(formatMap).map(output => createConfig(output))
module.exports = config
