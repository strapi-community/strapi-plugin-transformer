'use strict';

module.exports = {
	attribute: {
		id: 1,
		attributes: {
			title: 'Lorem',
			createdAt: '2022-02-14T02:58:35.291Z',
			updatedAt: '2022-02-16T01:25:00.014Z',
			publishedAt: '2022-02-16T01:25:00.012Z',
		},
	},
	arrayWithAttributes: [
		{
			id: 1,
			attributes: {
				title: 'Lorem',
				createdAt: '2022-02-17T00:07:40.318Z',
				updatedAt: '2022-02-17T04:59:39.055Z',
				publishedAt: '2022-02-17T00:07:42.124Z',
			},
		},
		{
			id: 2,
			attributes: {
				title: 'Ispum',
				createdAt: '2022-02-17T01:50:14.909Z',
				updatedAt: '2022-02-18T01:12:39.781Z',
				publishedAt: '2022-02-18T01:12:39.779Z',
			},
		},
	],
	dataObject: {
		id: 1,
		attributes: {
			title: 'Lorem',
			createdAt: '2022-02-17T00:29:00.833Z',
			updatedAt: '2022-02-17T00:29:03.988Z',
			publishedAt: '2022-02-17T00:29:03.986Z',
			singleRelation: {
				data: {
					id: 1,
					attributes: {
						title: 'Ipsum',
						createdAt: '2022-02-15T03:45:32.669Z',
						updatedAt: '2022-02-17T00:30:02.573Z',
						publishedAt: '2022-02-17T00:07:49.491Z',
					},
				},
			},
		},
	},
	dataArray: {
		id: 1,
		attributes: {
			title: 'Lorem',
			createdAt: '2022-02-15T03:45:32.669Z',
			updatedAt: '2022-02-17T00:30:02.573Z',
			publishedAt: '2022-02-17T00:07:49.491Z',
			manyRelation: {
				data: [
					{
						id: 2,
						attributes: {
							title: 'Ipsum',
							createdAt: '2022-02-14T02:57:55.918Z',
							updatedAt: '2022-02-17T00:09:17.360Z',
							publishedAt: '2022-02-17T00:09:13.399Z',
						},
					},
					{
						id: 3,
						attributes: {
							title: 'Dolor',
							createdAt: '2022-02-17T00:29:16.890Z',
							updatedAt: '2022-02-18T00:56:28.909Z',
							publishedAt: '2022-02-17T00:29:17.874Z',
						},
					},
				],
			},
		},
	},
	dataWithNull: {
		id: 1,
		attributes: {
			title: 'Lorem',
			createdAt: '2022-02-17T00:29:00.833Z',
			updatedAt: '2022-02-17T00:29:03.988Z',
			publishedAt: '2022-02-17T00:29:03.986Z',
			singleRelation: {
				data: null,
			},
		},
	},
	dataWithEmptyArray: {
		id: 1,
		attributes: {
			title: 'Lorem',
			createdAt: '2022-02-15T03:45:32.669Z',
			updatedAt: '2022-02-17T00:30:02.573Z',
			publishedAt: '2022-02-17T00:07:49.491Z',
			manyRelation: {
				data: [],
			},
		},
	},
	id: {
		id: 1,
		attributes: {
			title: 'Lorem',
			createdAt: '2022-02-17T00:29:16.890Z',
			updatedAt: '2022-02-18T00:56:28.909Z',
			publishedAt: '2022-02-17T00:29:17.874Z',
			singleComponent: {
				id: 2,
				title: 'Ipsum',
				singleRelation: {
					data: {
						id: 3,
						attributes: {
							title: 'Dolor',
						},
					},
				},
			},
		},
	},
	arrayWithIds: {
		id: 1,
		attributes: {
			title: 'Lorem',
			createdAt: '2022-02-17T00:29:16.890Z',
			updatedAt: '2022-02-18T00:56:28.909Z',
			publishedAt: '2022-02-17T00:29:17.874Z',
			repeatableComponent: [
				{
					id: 2,
					title: 'Ipsum',
					singleRelation: {
						data: {
							id: 3,
							attributes: {
								title: 'Dolor',
							},
						},
					},
				},
				{
					id: 4,
					title: 'Sat',
					manyRelation: {
						data: [
							{
								id: 5,
								attributes: {
									title: 'Amet',
								},
							},
							{
								id: 6,
								attributes: {
									title: 'consectetur',
								},
							},
						],
					},
				},
			],
		},
	},
	provider: {
		id: 1,
		attributes: {
			title: 'Lorem',
			createdAt: '2022-02-17T01:50:38.599Z',
			updatedAt: '2022-02-18T02:05:56.635Z',
			publishedAt: '2022-02-18T02:05:56.628Z',
			singleMedia: {
				data: {
					id: 2,
					attributes: {
						provider: 'local',
					},
				},
			},
		},
	},
	arrayWithProviders: {
		id: 1,
		attributes: {
			title: 'Lorem',
			createdAt: '2022-02-17T01:50:38.599Z',
			updatedAt: '2022-02-18T02:05:56.635Z',
			publishedAt: '2022-02-18T02:05:56.628Z',
			multiMedia: {
				data: [
					{
						id: 2,
						attributes: {
							provider: 'local',
						},
					},
					{
						id: 3,
						attributes: {
							provider: 'local',
						},
					},
				],
			},
		},
	},
};
