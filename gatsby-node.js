const glob = require("glob");
const fs = require("fs");

/*
  Server side render Stencil web components
*/
exports.onPostBuild = async ({}, pluginOptions) => {
  const stencil = require(pluginOptions.module + "/hydrate");
  const files = glob.sync("public/**/*.html");
  return Promise.all(
    files.map(async file => {
      try {
        const html = fs.readFileSync(file, "utf8");
        const result = await stencil.renderToString(html, {
          prettyHtml: true
        });
        fs.writeFileSync(file, result.html);
        return result;
      } catch (e) {
        // Ignore error where path is a directory
        if (e.code === "EISDIR") {
          return;
        }

        throw e;
      }
    })
  );
};
