'use strict';

module.exports = {
	// Indicates which provider should be used to instrument code for coverage
	coverageProvider: 'v8',

	// The glob patterns Jest uses to detect test files
	testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)'],
};
