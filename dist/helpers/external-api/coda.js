"use strict";
/* eslint-disable */
/**
 * @file TypeScript SDK for Coda API. This file is autogenerated from the API's OpenAPI specification,
 * available at https://coda.io/developers/apis/v1
 *
 * Version: v1
 * Hash: d7c3f53287ba26554cc58614e4870ec5bfd5328139ef564e67517bd0411267a6
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
require("es6-promise/auto");
require("isomorphic-fetch");
const url_1 = require("../url");
class Client {
    constructor(protocolAndHost, apiKey, userAgent = 'Coda-Typescript-API-Client') {
        this.protocolAndHost = protocolAndHost;
        this.apiKey = apiKey;
        this.userAgent = userAgent;
    }
    listCategories(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/categories`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    listDocs(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const { pageToken } = allParams, rest = __rest(allParams, ["pageToken"]);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs`, pageToken ? { pageToken } : rest);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    createDoc(params = {}, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'POST',
                body: JSON.stringify(payload),
            });
            return response.json();
        });
    }
    getDoc(docId, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    deleteDoc(docId, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'DELETE',
            });
            return response.json();
        });
    }
    getAclMetadata(docId, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/acl/metadata`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    getAclPermissions(docId, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/acl/permissions`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    shareDoc(docId, params = {}, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/acl/permissions`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'POST',
                body: JSON.stringify(payload),
            });
            return response.json();
        });
    }
    deletePermission(docId, permissionId, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/acl/permissions/${permissionId}`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'DELETE',
            });
            return response.json();
        });
    }
    publishDoc(docId, params = {}, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/publish`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'PUT',
                body: JSON.stringify(payload),
            });
            return response.json();
        });
    }
    unpublishDoc(docId, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/publish`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'DELETE',
            });
            return response.json();
        });
    }
    listPages(docId, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const { pageToken } = allParams, rest = __rest(allParams, ["pageToken"]);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/pages`, pageToken ? { pageToken } : rest);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    getPage(docId, pageIdOrName, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/pages/${pageIdOrName}`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    updatePage(docId, pageIdOrName, params = {}, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/pages/${pageIdOrName}`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'PUT',
                body: JSON.stringify(payload),
            });
            return response.json();
        });
    }
    listTables(docId, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const { pageToken } = allParams, rest = __rest(allParams, ["pageToken"]);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/tables`, pageToken ? { pageToken } : rest);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    getTable(docId, tableIdOrName, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/tables/${tableIdOrName}`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    listColumns(docId, tableIdOrName, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const { pageToken } = allParams, rest = __rest(allParams, ["pageToken"]);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/tables/${tableIdOrName}/columns`, pageToken ? { pageToken } : rest);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    listRows(docId, tableIdOrName, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const { pageToken } = allParams, rest = __rest(allParams, ["pageToken"]);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/tables/${tableIdOrName}/rows`, pageToken ? { pageToken } : rest);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    upsertRows(docId, tableIdOrName, params = {}, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/tables/${tableIdOrName}/rows`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'POST',
                body: JSON.stringify(payload),
            });
            return response.json();
        });
    }
    deleteRows(docId, tableIdOrName, params = {}, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/tables/${tableIdOrName}/rows`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'DELETE',
                body: JSON.stringify(payload),
            });
            return response.json();
        });
    }
    getRow(docId, tableIdOrName, rowIdOrName, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/tables/${tableIdOrName}/rows/${rowIdOrName}`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    updateRow(docId, tableIdOrName, rowIdOrName, params = {}, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/tables/${tableIdOrName}/rows/${rowIdOrName}`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'PUT',
                body: JSON.stringify(payload),
            });
            return response.json();
        });
    }
    deleteRow(docId, tableIdOrName, rowIdOrName, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/tables/${tableIdOrName}/rows/${rowIdOrName}`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'DELETE',
            });
            return response.json();
        });
    }
    pushButton(docId, tableIdOrName, rowIdOrName, columnIdOrName, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/tables/${tableIdOrName}/rows/${rowIdOrName}/buttons/${columnIdOrName}`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'POST',
            });
            return response.json();
        });
    }
    getColumn(docId, tableIdOrName, columnIdOrName, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/tables/${tableIdOrName}/columns/${columnIdOrName}`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    listFormulas(docId, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const { pageToken } = allParams, rest = __rest(allParams, ["pageToken"]);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/formulas`, pageToken ? { pageToken } : rest);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    getFormula(docId, formulaIdOrName, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/formulas/${formulaIdOrName}`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    listControls(docId, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const { pageToken } = allParams, rest = __rest(allParams, ["pageToken"]);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/controls`, pageToken ? { pageToken } : rest);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    getControl(docId, controlIdOrName, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/docs/${docId}/controls/${controlIdOrName}`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    whoami(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/whoami`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    resolveBrowserLink(url, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign(Object.assign({}, params), { url });
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/resolveBrowserLink`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    getMutationStatus(requestId, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/mutationStatus/${requestId}`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    listDocAnalytics(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const { pageToken } = allParams, rest = __rest(allParams, ["pageToken"]);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/analytics/docs`, pageToken ? { pageToken } : rest);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    listWorkspaceMembers(workspaceId, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const { pageToken } = allParams, rest = __rest(allParams, ["pageToken"]);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/workspaces/${workspaceId}/users`, pageToken ? { pageToken } : rest);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    changeUserRole(workspaceId, params = {}, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/workspaces/${workspaceId}/users/role`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'POST',
                body: JSON.stringify(payload),
            });
            return response.json();
        });
    }
    listWorkspaceRoleActivity(workspaceId, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const { pageToken } = allParams, rest = __rest(allParams, ["pageToken"]);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/workspaces/${workspaceId}/roles`, pageToken ? { pageToken } : rest);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'GET',
            });
            return response.json();
        });
    }
    createPack(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/packs`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'POST',
            });
            return response.json();
        });
    }
    registerPackVersion(packId, packVersion, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/packs/${packId}/versions/${packVersion}/register`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'POST',
            });
            return response.json();
        });
    }
    packVersionUploadComplete(packId, packVersion, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const allParams = Object.assign({}, params);
            const codaUrl = url_1.withQueryParams(`${this.protocolAndHost}/apis/v1/packs/${packId}/versions/${packVersion}/uploadComplete`, allParams);
            const response = yield fetch(codaUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': this.userAgent,
                },
                method: 'POST',
            });
            return response.json();
        });
    }
}
exports.Client = Client;