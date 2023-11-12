// ES Module syntax
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import customPrefixer from './postcss-custom-prefixer.js';

export default {
  plugins: [
    tailwindcss,
    autoprefixer//,
    //customPrefixer({ 'prefix': 'twwd', exclude: ['App.css', 'index.css'] })
    // other plugins you might want to use
  ],
};
