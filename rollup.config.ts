import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { join } from 'path';
import filesize from 'rollup-plugin-filesize';
import typescript from 'rollup-plugin-typescript2';

import { devDependencies, main, module, peerDependencies } from './package.json';

export default {
  input: join(__dirname, 'src', 'index.ts'),
  output: [
    {
      file: join(__dirname, main),
      format: 'cjs',
      sourcemap: true
    },
    {
      file: join(__dirname, module),
      format: 'es',
      sourcemap: true
    }
  ],
  external: [
    ...Object.keys(peerDependencies),
    ...Object.keys(devDependencies)
  ],
  plugins: [
    resolve(),
    typescript({
      useTsconfigDeclarationDir: true
    }),
    commonjs(),
    filesize()
  ]
};
