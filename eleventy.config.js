const sass = require('eleventy-sass');
const postcss = require("postcss");
const cssnano = require("cssnano");

/**
 * 
 * @param {*} eleventyConfig 
 * @returns 
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(sass, {
    sass: {
      loadPaths: ["node_modules"],
      includes: "_includes/stylesheets/"
    },
    postcss: postcss([cssnano])
  });

  const options = {
    dir: {
      input: "src"
    }
  }
  return options;
};