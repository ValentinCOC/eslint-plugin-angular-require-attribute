import {
    requireAttributeRule,
    RULE_NAME as requireAttributeRuleName
} from "./require-attribute.rule";

const rules = {
    [requireAttributeRuleName]: requireAttributeRule,
}

export { rules };