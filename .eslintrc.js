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
	overrides: [
		{
			files: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)'],
			env: {
				jest: true,
			},
			extends: ['plugin:jest/recommended'],
			plugins: ['jest'],
			rules: {
				'jest/no-disabled-tests': 'warn',
				'jest/no-focused-tests': 'error',
				'jest/no-identical-title': 'error',
				'jest/prefer-to-have-length': 'warn',
				'jest/valid-expect': 'error',
			},
		},
	],
};
