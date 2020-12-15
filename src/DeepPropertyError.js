class DeepPropertyError extends Error {
	constructor(message) {
		super(message);
		this.name = 'DeepPropertyError';
	}
};

module.exports = DeepPropertyError;