const mocks = [
	{
		id: '1',
		userId: '1',
		createdAt: new Date(),
		lastUpdated: new Date(),
		cost: 40.4
	},
	{
		id: '2',
		userId: '1',
		createdAt: new Date(),
		lastUpdated: new Date(),
		cost: 433.4
	},
	{
		id: '3',
		userId: '1',
		createdAt: new Date(),
		lastUpdated: new Date(),
		cost: 500
	}
];

const expenses = async (_, args, ctx, info) => {
	return mocks;
};

module.exports = {
	Query: {
		expenses
	}
};
