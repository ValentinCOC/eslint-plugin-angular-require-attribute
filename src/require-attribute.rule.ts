import {ESLintUtils} from "@typescript-eslint/utils";
import type { TSESLint } from "@typescript-eslint/utils";
import type {
    TmplAstElement,
} from "@angular-eslint/bundled-angular-compiler";
import { ensureTemplateParser } from "@angular-eslint/utils";

export const RULE_NAME = 'angular-require-attribute';

const createRule = ESLintUtils.RuleCreator(
    (): string =>
        `https://github.com/ValentinCOC/eslint-plugin-angular-require-attribute/tree/main`,
);

export const requireAttributeRule = createRule({
    name: RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
          description: 'Define an attribute and HTML tags that need to have that attribute.'
        },
        schema: [
            {
                type: 'object',
                properties: {
                    attribute: {
                        type: 'string',
                        description: 'A single string attribute'
                    },
                    tags: {
                        type: 'array',
                        items: {
                            type: 'string'
                        },
                        description: 'A list of strings where tags should be defined'
                    }
                },
                required: ['attribute', 'tags']
            }
        ],
        messages: {
            missingAttributeOnTag: "`{{prop}}`",
        }
    },
    defaultOptions: [
        {
        variables: "implicit",
        properties: "explicit",
        templateReferences: "implicit",
        }
    ],
    create: ruleImpl,
});

function ruleImpl(
    context: Readonly<any>,
    options: Readonly<any>,
): TSESLint.RuleListener {

    ensureTemplateParser(context);

    // Extract rule options
    const { attribute, tags } = options[0];

    return {
        ["Element,Element$1"](node: TmplAstElement): void {
            // Check if the current element is one of the specified tags
            if (tags.includes(node.name)) {
                // Check if the required attribute is present
                const hasAttribute = node.attributes.some(attr => attr.name === attribute);
                if (!hasAttribute) {
                    // Report the missing attribute
                    context.report({
                        node,
                        messageId: 'missingAttributeOnTag',
                        data: { prop: attribute },
                    });
                }
            }
        },
    };
}