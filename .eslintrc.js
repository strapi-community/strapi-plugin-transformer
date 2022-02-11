module.exports = {
	$schema: 'https://json.schemastore.org/eslintrc',
	env: {
		es6: true,
		node: true,
	},
	parserOptions: {
		ecmaVersion: 2018,
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
	},
	globals: {
		strapi: 'readonly',
	},
	extends: ['eslint:recommended', 'plugin:node/recommended', 'prettier'],
};
