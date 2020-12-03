const glob = require("glob");
const fs = require("fs");

/*
  Server side render Stencil web components
*/
exports.onPostBuild = async ({}, pluginOptions) => {
  const stencil = require(pluginOptions.module + "/hydrate");

console.log(pluginOptions.module);

  const files = glob.sync("public/**/*.html");
  const renderToStringOptions = pluginOptions.renderToStringOptions
    ? pluginOptions.renderToStringOptions
    : {};

  return Promise.all(
    files.map(async (file) => {
      try {
        const html = fs.readFileSync(file, "utf8");
        const result = await stencil.renderToString(
          html,
          renderToStringOptions
        );

        if (result.html === null) {

          if (result.diagnostics) {
            throw new Error(`${result.diagnostics[0].header}: ${result.diagnostics[0].messageText}`);
          } else {
            throw new Error(
              "An unexpected error occured whilst executing stencil.renderToString()"
            );
          }
        }

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