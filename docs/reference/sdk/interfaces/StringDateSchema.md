---
title: "StringDateSchema"
---
# Interface: StringDateSchema

A schema representing a return value or object property that is provided as a string,
which Coda should interpret as a date. Coda is able to flexibly parse a number of formal
and informal string representations of dates. For maximum accuracy, consider using an
ISO 8601 date string (e.g. 2021-10-29): https://en.wikipedia.org/wiki/ISO_8601.

## Hierarchy

- `BaseStringSchema`<[`Date`](../enums/ValueHintType.md#date)\>

  ↳ **`StringDateSchema`**

## Properties

### codaType

• **codaType**: [`Date`](../enums/ValueHintType.md#date)

Instructs Coda to render this value as a date.

#### Overrides

BaseStringSchema.codaType

#### Defined in

[schema.ts:498](https://github.com/coda/packs-sdk/blob/main/schema.ts#L498)

___

### description

• `Optional` **description**: `string`

A explanation of this object schema property shown to the user in the UI.

If your pack has an object schema with many properties, it may be useful to
explain the purpose or contents of any property that is not self-evident.

#### Inherited from

BaseStringSchema.description

#### Defined in

[schema.ts:207](https://github.com/coda/packs-sdk/blob/main/schema.ts#L207)

___

### format

• `Optional` **format**: `string`

A Moment date format string, such as 'MMM D, YYYY', that corresponds to a supported Coda date column format,
used when rendering the value.

Only applies when this is used as a sync table property.

#### Defined in

[schema.ts:505](https://github.com/coda/packs-sdk/blob/main/schema.ts#L505)

___

### type

• **type**: [`String`](../enums/ValueType.md#string)

Identifies this schema as a string.

#### Inherited from

BaseStringSchema.type

#### Defined in

[schema.ts:610](https://github.com/coda/packs-sdk/blob/main/schema.ts#L610)
