const eleventySass = require('eleventy-sass');
const faviconsPlugin = require("eleventy-plugin-gen-favicons");
const postcss = require("postcss");
const cssnano = require("cssnano");

const postcssProcessor = postcss([cssnano]);

const sassConfig = {
  sass: {
    loadPaths: ["node_modules"],
    includes: "_includes/stylesheets/",
    output: "_site/assets/",
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

  // static dir
  eleventyConfig.addPassthroughCopy({"src/_assets": "/assets"});
  // scrollspy
  eleventyConfig.addPassthroughCopy({"node_modules/simple-scrollspy/demo/dist/simple-scrollspy.min.js": "/scripts/simple-scrollspy.min.js"});

  // sections
  eleventyConfig.addCollection("sections", function(collection) {
		return collection.getAllSorted().filter(function(item) {
			return item.inputPath.match(/^\.\/src\/sections\//) !== null;
		}).sort(function(a, b) {
			return b.data.order - a.data.order;
		});
	});

  const options = {
    dir: {
      input: "src"
    }
  }
  return options;
};