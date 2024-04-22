const { RuleTester } = require('eslint');
const rule = require('../src');

const ruleTester = new RuleTester();

ruleTester.run('angular-require-attribute', rule, {
    valid: [
        // Add valid test cases here if applicable
    ],
    invalid: [
        {
            code: ``,
            filename: 'test.html',
            errors: [
                {
                    message: "HTML tag 'h1' detected."
                },
                {
                    message: "HTML tag 'p' detected."
                },
            ],
        },
    ],
});