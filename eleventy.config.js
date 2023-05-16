const eleventySass = require('eleventy-sass');
const faviconsPlugin = require("eleventy-plugin-gen-favicons");
const postcss = require("postcss");
const cssnano = require("cssnano");

const postcssProcessor = postcss([cssnano]);

const sassConfig = {
  sass: {
    loadPaths: ["node_modules"],
    includes: "_includes/stylesheets/",
    postcss: postcssProcessor,
    sourceMap: true,
  }
}

const eleventySEO = require("eleventy-plugin-seo");
const seoConfig = require("./src/_data/seo.json");
/**
 * 
 * @param {*} eleventyConfig 
 * @returns 
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventySass, sassConfig);
  eleventyConfig.addPlugin(eleventySEO, seoConfig);
  eleventyConfig.addPlugin(faviconsPlugin, {});
  // year shortcode
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addPassthroughCopy("static");

  const options = {
    dir: {
      input: "src"
    }
  }
  return options;
};