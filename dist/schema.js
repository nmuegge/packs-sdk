"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeReferenceSchemaFromObjectSchema = exports.normalizeSchema = exports.normalizeSchemaKey = exports.makeObjectSchema = exports.PlaceholderIdentityPackId = exports.makeSchema = exports.generateSchema = exports.isArray = exports.isObject = exports.makeAttributionNode = exports.AttributionNodeType = exports.SimpleStringHintValueTypes = exports.DurationUnit = exports.LinkDisplayType = exports.EmailDisplayType = exports.ScaleIconSet = exports.CurrencyFormat = exports.ObjectHintValueTypes = exports.BooleanHintValueTypes = exports.NumberHintValueTypes = exports.StringHintValueTypes = exports.ValueHintType = exports.ValueType = void 0;
const ensure_1 = require("./helpers/ensure");
const ensure_2 = require("./helpers/ensure");
const ensure_3 = require("./helpers/ensure");
const migration_1 = require("./helpers/migration");
const pascalcase_1 = __importDefault(require("pascalcase"));
// Defines a subset of the JSON Object schema for use in annotating API results.
// http://json-schema.org/latest/json-schema-core.html#rfc.section.8.2
/**
 * The set of primitive value types that can be used as return values for formulas
 * or in object schemas.
 */
var ValueType;
(function (ValueType) {
    /**
     * Indicates a JavaScript boolean (true/false) should be returned.
     */
    ValueType["Boolean"] = "boolean";
    /**
     * Indicates a JavaScript number should be returned.
     */
    ValueType["Number"] = "number";
    /**
     * Indicates a JavaScript string should be returned.
     */
    ValueType["String"] = "string";
    /**
     * Indicates a JavaScript array should be returned. The schema of the array items must also be specified.
     */
    ValueType["Array"] = "array";
    /**
     * Indicates a JavaScript object should be returned. The schema of each object property must also be specified.
     */
    ValueType["Object"] = "object";
})(ValueType = exports.ValueType || (exports.ValueType = {}));
/**
 * Synthetic types that instruct Coda how to coerce values from primitives at ingestion time.
 */
var ValueHintType;
(function (ValueHintType) {
    /**
     * Indicates to interpret the value as a date (e.g. March 3, 2021).
     */
    ValueHintType["Date"] = "date";
    /**
     * Indicates to interpret the value as a time (e.g. 5:24pm).
     */
    ValueHintType["Time"] = "time";
    /**
     * Indicates to interpret the value as a datetime (e.g. March 3, 2021 at 5:24pm).
     */
    ValueHintType["DateTime"] = "datetime";
    /**
     * Indicates to interpret the value as a duration (e.g. 3 hours).
     */
    ValueHintType["Duration"] = "duration";
    /**
     * Indicates to interpret the value as an email address (e.g. joe@foo.com).
     */
    ValueHintType["Email"] = "email";
    /**
     * Indicates to interpret and render the value as a Coda person reference. The provided value should be
     * an object whose `id` property is an email address, which Coda will try to resolve to a user
     * and render an @-reference to the user.
     *
     * @example
     * ```
     * makeObjectSchema({
     *   type: ValueType.Object,
     *   codaType: ValueHintType.Person,
     *   id: 'email',
     *   primary: 'name',
     *   properties: {
     *     email: {type: ValueType.String, required: true},
     *     name: {type: ValueType.String, required: true},
     *   },
     * });
     * ```
     */
    ValueHintType["Person"] = "person";
    /**
     * Indicates to interpret and render the value as a percentage.
     */
    ValueHintType["Percent"] = "percent";
    /**
     * Indicates to interpret and render the value as a currency value.
     */
    ValueHintType["Currency"] = "currency";
    /**
     * Indicates to interpret and render the value as an image. The provided value should be a URL that
     * points to an image. Coda will hotlink to the image when rendering it a doc.
     *
     * Using {@link ImageAttachment} is recommended instead, so that the image is always accessible
     * and won't appear as broken if the source image is later deleted.
     */
    ValueHintType["ImageReference"] = "image";
    /**
     * Indicates to interpret and render the value as an image. The provided value should be a URL that
     * points to an image. Coda will ingest the image and host it from Coda infrastructure.
     */
    ValueHintType["ImageAttachment"] = "imageAttachment";
    /**
     * Indicates to interpret and render the value as a URL link.
     */
    ValueHintType["Url"] = "url";
    /**
     * Indicates to interpret a text value as Markdown, which will be converted and rendered as Coda rich text.
     */
    ValueHintType["Markdown"] = "markdown";
    /**
     * Indicates to interpret a text value as HTML, which will be converted and rendered as Coda rich text.
     */
    ValueHintType["Html"] = "html";
    /**
     * Indicates to interpret and render a value as an embed. The provided value should be a URL pointing
     * to an embeddable web page.
     */
    ValueHintType["Embed"] = "embed";
    /**
     * Indicates to interpret and render the value as a Coda @-reference to a table row. The provided value should
     * be an object whose `id` value matches the id of some row in a sync table. The schema where this hint type is
     * used must specify an identity that specifies the desired sync table.
     *
     * Normally a reference schema is constructed from the schema object being referenced using the helper
     * {@link makeReferenceSchemaFromObjectSchema}.
     *
     * @example
     * ```
     * makeObjectSchema({
     *   type: ValueType.Object,
     *   codaType: ValueHintType.Reference,
     *   identity: {
     *     name: "SomeSyncTableIdentity"
     *   },
     *   id: 'identifier',
     *   primary: 'name',
     *   properties: {
     *     identifier: {type: ValueType.Number, required: true},
     *     name: {type: ValueType.String, required: true},
     *   },
     * });
     * ```
     */
    ValueHintType["Reference"] = "reference";
    /**
     * Indicates to interpret and render a value as a file attachment. The provided value should be a URL
     * pointing to a file of a Coda-supported type. Coda will ingest the file and host it from Coda infrastructure.
     */
    ValueHintType["Attachment"] = "attachment";
    /**
     * Indicates to render a numeric value as a slider UI component.
     */
    ValueHintType["Slider"] = "slider";
    /**
     * Indicates to render a numeric value as a scale UI component (e.g. a star rating).
     */
    ValueHintType["Scale"] = "scale";
    /**
     * Indicates to render a boolean value as a toggle.
     */
    ValueHintType["Toggle"] = "toggle";
})(ValueHintType = exports.ValueHintType || (exports.ValueHintType = {}));
exports.StringHintValueTypes = [
    ValueHintType.Attachment,
    ValueHintType.Date,
    ValueHintType.Time,
    ValueHintType.DateTime,
    ValueHintType.Duration,
    ValueHintType.Email,
    ValueHintType.Embed,
    ValueHintType.Html,
    ValueHintType.ImageReference,
    ValueHintType.ImageAttachment,
    ValueHintType.Markdown,
    ValueHintType.Url,
];
exports.NumberHintValueTypes = [
    ValueHintType.Date,
    ValueHintType.Time,
    ValueHintType.DateTime,
    ValueHintType.Percent,
    ValueHintType.Currency,
    ValueHintType.Slider,
    ValueHintType.Scale,
];
exports.BooleanHintValueTypes = [ValueHintType.Toggle];
exports.ObjectHintValueTypes = [ValueHintType.Person, ValueHintType.Reference];
/**
 * Enumeration of formats supported by schemas that use {@link ValueHintType.Currency}.
 *
 * These affect how a numeric value is rendered in docs.
 */
var CurrencyFormat;
(function (CurrencyFormat) {
    /**
     * Indicates the value should be rendered as a number with a currency symbol as a prefix, e.g. `$2.50`.
     */
    CurrencyFormat["Currency"] = "currency";
    /**
     * Indicates the value should be rendered as a number with a currency symbol as a prefix, but padded
     * to allow the numeric values to line up vertically, e.g.
     *
     * ```
     * $       2.50
     * $      29.99
     * ```
     */
    CurrencyFormat["Accounting"] = "accounting";
    /**
     * Indicates the value should be rendered as a number without a currency symbol, e.g. `2.50`.
     */
    CurrencyFormat["Financial"] = "financial";
})(CurrencyFormat = exports.CurrencyFormat || (exports.CurrencyFormat = {}));
/**
 * Icons that can be used with a {@link ScaleSchema}.
 *
 * For example, to render a star rating, use a {@link ScaleSchema} with `icon: coda.ScaleIconSet.Star`.
 */
var ScaleIconSet;
(function (ScaleIconSet) {
    ScaleIconSet["Star"] = "star";
    ScaleIconSet["Circle"] = "circle";
    ScaleIconSet["Fire"] = "fire";
    ScaleIconSet["Bug"] = "bug";
    ScaleIconSet["Diamond"] = "diamond";
    ScaleIconSet["Bell"] = "bell";
    ScaleIconSet["ThumbsUp"] = "thumbsup";
    ScaleIconSet["Heart"] = "heart";
    ScaleIconSet["Chili"] = "chili";
    ScaleIconSet["Smiley"] = "smiley";
    ScaleIconSet["Lightning"] = "lightning";
    ScaleIconSet["Currency"] = "currency";
    ScaleIconSet["Coffee"] = "coffee";
    ScaleIconSet["Person"] = "person";
    ScaleIconSet["Battery"] = "battery";
    ScaleIconSet["Cocktail"] = "cocktail";
    ScaleIconSet["Cloud"] = "cloud";
    ScaleIconSet["Sun"] = "sun";
    ScaleIconSet["Checkmark"] = "checkmark";
    ScaleIconSet["LightBulb"] = "lightbulb";
})(ScaleIconSet = exports.ScaleIconSet || (exports.ScaleIconSet = {}));
/**
 * Display types that can be used with an {@link EmailSchema}.
 */
var EmailDisplayType;
(function (EmailDisplayType) {
    /**
     * Display both icon and email (default).
     */
    EmailDisplayType["IconAndEmail"] = "iconAndEmail";
    /**
     * Display icon only.
     */
    EmailDisplayType["IconOnly"] = "iconOnly";
    /**
     * Display email address only.
     */
    EmailDisplayType["EmailOnly"] = "emailOnly";
})(EmailDisplayType = exports.EmailDisplayType || (exports.EmailDisplayType = {}));
/**
 * Display types that can be used with a {@link LinkSchema}.
 */
var LinkDisplayType;
(function (LinkDisplayType) {
    /**
     * Display icon only.
     */
    LinkDisplayType["IconOnly"] = "iconOnly";
    /**
     * Display URL.
     */
    LinkDisplayType["Url"] = "url";
    /**
     * Display web page title.
     */
    LinkDisplayType["Title"] = "title";
    /**
     * Display the referenced web page as a card.
     */
    LinkDisplayType["Card"] = "card";
    /**
     * Display the referenced web page as an embed.
     */
    LinkDisplayType["Embed"] = "embed";
})(LinkDisplayType = exports.LinkDisplayType || (exports.LinkDisplayType = {}));
/**
 * Enumeration of units supported by duration schemas. See {@link maxUnit}.
 */
var DurationUnit;
(function (DurationUnit) {
    /**
     * Indications a duration as a number of days.
     */
    DurationUnit["Days"] = "days";
    /**
     * Indications a duration as a number of hours.
     */
    DurationUnit["Hours"] = "hours";
    /**
     * Indications a duration as a number of minutes.
     */
    DurationUnit["Minutes"] = "minutes";
    /**
     * Indications a duration as a number of seconds.
     */
    DurationUnit["Seconds"] = "seconds";
})(DurationUnit = exports.DurationUnit || (exports.DurationUnit = {}));
/**
 * The subset of StringHintTypes that don't have specific schema attributes.
 */
exports.SimpleStringHintValueTypes = [
    ValueHintType.Attachment,
    ValueHintType.Html,
    ValueHintType.ImageReference,
    ValueHintType.ImageAttachment,
    ValueHintType.Markdown,
    ValueHintType.Url,
    ValueHintType.Email,
];
/**
 * The type of content in this attribution node.
 *
 * Multiple attribution nodes can be rendered all together, for example to have
 * attribution that contains both text and a logo image.
 */
var AttributionNodeType;
(function (AttributionNodeType) {
    /**
     * Text attribution content.
     */
    AttributionNodeType[AttributionNodeType["Text"] = 1] = "Text";
    /**
     * A hyperlink pointing to the data source.
     */
    AttributionNodeType[AttributionNodeType["Link"] = 2] = "Link";
    /**
     * An image, often a logo of the data source.
     */
    AttributionNodeType[AttributionNodeType["Image"] = 3] = "Image";
})(AttributionNodeType = exports.AttributionNodeType || (exports.AttributionNodeType = {}));
/**
 * A helper for constructing attribution text, links, or images that render along with a Pack value.
 *
 * Many APIs have licensing requirements that ask for specific attribution to be included
 * when using their data. For example, a stock photo API may require attribution text
 * and a logo.
 *
 * Any {@link IdentityDefinition} can include one or more attribution nodes that will be
 * rendered any time a value with that identity is rendered in a doc.
 */
function makeAttributionNode(node) {
    return node;
}
exports.makeAttributionNode = makeAttributionNode;
function isObject(val) {
    return Boolean(val && val.type === ValueType.Object);
}
exports.isObject = isObject;
function isArray(val) {
    return Boolean(val && val.type === ValueType.Array);
}
exports.isArray = isArray;
/**
 * Utility that examines a JavaScript value and attempts to infer a schema definition
 * that describes it.
 *
 * It is vastly preferable to define a schema manually. A clear and accurate schema is one of the
 * fundamentals of a good pack. However, for data that is truly dynamic for which a schema can't
 * be known in advance nor can a function be written to generate a dynamic schema from other
 * inputs, it may be useful to us this helper to sniff the return value and generate a basic
 * inferred schema from it.
 *
 * This utility does NOT attempt to determine {@link idProperty} or {@link displayProperty} attributes for
 * an object schema, those are left undefined.
 */
function generateSchema(obj) {
    if (Array.isArray(obj)) {
        if (obj.length === 0) {
            throw new Error('Must have representative value.');
        }
        return { type: ValueType.Array, items: generateSchema(obj[0]) };
    }
    if (typeof obj === 'object') {
        const properties = {};
        if (obj === null) {
            // Default nulls to string which is the least common denominator.
            return { type: ValueType.String };
        }
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                properties[key] = generateSchema(obj[key]);
            }
        }
        return { type: ValueType.Object, properties };
    }
    else if (typeof obj === 'string') {
        return { type: ValueType.String };
    }
    else if (typeof obj === 'boolean') {
        return { type: ValueType.Boolean };
    }
    else if (typeof obj === 'number') {
        return { type: ValueType.Number };
    }
    return (0, ensure_3.ensureUnreachable)(obj);
}
exports.generateSchema = generateSchema;
/**
 * A wrapper for creating any schema definition.
 *
 * If you are creating a schema for an object (as opposed to a scalar or array),
 * use the more specific {@link makeObjectSchema}.
 *
 * It is always recommended to use wrapper functions for creating top-level schema
 * objects rather than specifying object literals. Wrappers validate your schemas
 * at creation time, provide better TypeScript type inference, and can reduce
 * boilerplate.
 *
 * At this time, this wrapper provides only better TypeScript type inference,
 * but it may do validation in a future SDK version.
 *
 * @example
 * ```
 * coda.makeSchema({
 *   type: coda.ValueType.Array,
 *   items: {type: coda.ValueType.String},
 * });
 * ```
 */
function makeSchema(schema) {
    return schema;
}
exports.makeSchema = makeSchema;
exports.PlaceholderIdentityPackId = -1;
/**
 * A wrapper for creating a schema definition for an object value.
 *
 * It is always recommended to use wrapper functions for creating top-level schema
 * objects rather than specifying object literals. Wrappers validate your schemas
 * at creation time, provide better TypeScript type inference, and can reduce
 * boilerplate.
 *
 * @example
 * ```
 * coda.makeObjectSchema({
 *   id: "email",
 *   primary: "name",
 *   properties: {
 *     email: {type: coda.ValueType.String, required: true},
 *     name: {type: coda.ValueType.String, required: true},
 *   },
 * });
 * ```
 */
function makeObjectSchema(schemaDef) {
    const schema = { ...schemaDef, type: ValueType.Object };
    validateObjectSchema(schema);
    // TODO(jonathan): Enable after existing packs go through the v2 upload flow.
    // if (schema.identity) {
    //   schema.identity = {...schema.identity, packId: PlaceholderIdentityPackId};
    // }
    return schema;
}
exports.makeObjectSchema = makeObjectSchema;
function validateObjectSchema(schema) {
    if (schema.codaType === ValueHintType.Reference) {
        const { id, identity, primary } = (0, migration_1.objectSchemaHelper)(schema);
        checkRequiredFieldInObjectSchema(id, 'id', schema.codaType);
        checkRequiredFieldInObjectSchema(identity, 'identity', schema.codaType);
        checkRequiredFieldInObjectSchema(primary, 'primary', schema.codaType);
        checkSchemaPropertyIsRequired((0, ensure_2.ensureExists)(id), schema);
        checkSchemaPropertyIsRequired((0, ensure_2.ensureExists)(primary), schema);
    }
    if (schema.codaType === ValueHintType.Person) {
        const { id } = (0, migration_1.objectSchemaHelper)(schema);
        checkRequiredFieldInObjectSchema(id, 'id', schema.codaType);
        checkSchemaPropertyIsRequired((0, ensure_2.ensureExists)(id), schema);
    }
    for (const [_propertyKey, propertySchema] of Object.entries(schema.properties)) {
        if (propertySchema.type === ValueType.Object) {
            validateObjectSchema(propertySchema);
        }
    }
}
function checkRequiredFieldInObjectSchema(field, fieldName, codaType) {
    (0, ensure_2.ensureExists)(field, `Objects with codaType "${codaType}" require a "${fieldName}" property in the schema definition.`);
}
function checkSchemaPropertyIsRequired(field, schema) {
    const { properties, codaType } = schema;
    (0, ensure_1.assertCondition)(properties[field].required, `Field "${field}" must be marked as required in schema with codaType "${codaType}".`);
}
function normalizeSchemaKey(key) {
    // Colons cause problems in our formula handling.
    return (0, pascalcase_1.default)(key).replace(/:/g, '_');
}
exports.normalizeSchemaKey = normalizeSchemaKey;
function normalizeSchema(schema) {
    if (isArray(schema)) {
        return {
            type: ValueType.Array,
            items: normalizeSchema(schema.items),
        };
    }
    else if (isObject(schema)) {
        const normalized = {};
        const { id, primary, featured, idProperty, displayProperty, featuredProperties } = schema;
        for (const key of Object.keys(schema.properties)) {
            const normalizedKey = normalizeSchemaKey(key);
            const props = schema.properties[key];
            const { required, fromKey } = props;
            normalized[normalizedKey] = Object.assign(normalizeSchema(props), {
                required,
                fromKey: fromKey || (normalizedKey !== key ? key : undefined),
            });
        }
        const normalizedSchema = {
            type: ValueType.Object,
            id: id ? normalizeSchemaKey(id) : undefined,
            featured: featured ? featured.map(normalizeSchemaKey) : undefined,
            primary: primary ? normalizeSchemaKey(primary) : undefined,
            idProperty: idProperty ? normalizeSchemaKey(idProperty) : undefined,
            featuredProperties: featuredProperties ? featuredProperties.map(normalizeSchemaKey) : undefined,
            displayProperty: displayProperty ? normalizeSchemaKey(displayProperty) : undefined,
            properties: normalized,
            identity: schema.identity,
            codaType: schema.codaType,
            description: schema.description,
            attribution: schema.attribution,
            includeUnknownProperties: schema.includeUnknownProperties,
        };
        return normalizedSchema;
    }
    return schema;
}
exports.normalizeSchema = normalizeSchema;
/**
 * Convenience for creating a reference object schema from an existing schema for the
 * object. Copies over the identity, id, and primary from the schema, and the subset of
 * properties indicated by the id and primary.
 * A reference schema can always be defined directly, but if you already have an object
 * schema it provides better code reuse to derive a reference schema instead.
 */
function makeReferenceSchemaFromObjectSchema(schema, identityName) {
    const { type, id, primary, identity, properties } = (0, migration_1.objectSchemaHelper)(schema);
    (0, ensure_2.ensureExists)(identity || identityName, 'Source schema must have an identity field, or you must provide an identity name for the reference.');
    const validId = (0, ensure_2.ensureExists)(id);
    const referenceProperties = { [validId]: properties[validId] };
    if (primary && primary !== id) {
        referenceProperties[primary] = properties[primary];
    }
    return makeObjectSchema({
        codaType: ValueHintType.Reference,
        type,
        idProperty: id,
        identity: identity || { name: (0, ensure_2.ensureExists)(identityName) },
        displayProperty: primary,
        properties: referenceProperties,
    });
}
exports.makeReferenceSchemaFromObjectSchema = makeReferenceSchemaFromObjectSchema;
