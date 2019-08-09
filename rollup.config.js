import cleanup from 'rollup-plugin-cleanup'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    file: 'gas/index.js',
    format: 'cjs'
  },
  treeshake: false,
  plugins: [
    resolve(),
    commonjs(),
    cleanup()
  ]
};
