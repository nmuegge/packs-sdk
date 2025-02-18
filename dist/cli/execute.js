"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleExecute = void 0;
const compile_1 = require("../testing/compile");
const execution_1 = require("../testing/execution");
const helpers_1 = require("./helpers");
const helpers_2 = require("./helpers");
async function handleExecute({ manifestPath, formulaName, params, fetch, vm, dynamicUrl, timerStrategy, }) {
    const fullManifestPath = (0, helpers_2.makeManifestFullPath)(manifestPath);
    const { bundlePath, bundleSourceMapPath } = await (0, compile_1.compilePackBundle)({
        manifestPath: fullManifestPath,
        minify: false,
        timerStrategy,
    });
    const manifest = await (0, helpers_1.importManifest)(bundlePath);
    await (0, execution_1.executeFormulaOrSyncFromCLI)({
        formulaName,
        params,
        manifest,
        manifestPath,
        vm,
        dynamicUrl,
        bundleSourceMapPath,
        bundlePath,
        contextOptions: { useRealFetcher: fetch },
    });
}
exports.handleExecute = handleExecute;
