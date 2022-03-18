'use strict';

const dataWithRelationsDataKey = {
	attribute: {
		initial: {
			id: 1,
			attributes: {
				title: 'Lorem',
				createdAt: '2022-02-14T02:58:35.291Z',
				updatedAt: '2022-02-16T01:25:00.014Z',
				publishedAt: '2022-02-16T01:25:00.012Z',
			},
		},
		expect: {
			id: 1,
			title: 'Lorem',
			createdAt: '2022-02-14T02:58:35.291Z',
			updatedAt: '2022-02-16T01:25:00.014Z',
			publishedAt: '2022-02-16T01:25:00.012Z',
		},
	},
	arrayWithAttributes: {
		initial: [
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
		expect: [
			{
				id: 1,
				title: 'Lorem',
				createdAt: '2022-02-17T00:07:40.318Z',
				updatedAt: '2022-02-17T04:59:39.055Z',
				publishedAt: '2022-02-17T00:07:42.124Z',
			},
			{
				id: 2,
				title: 'Ispum',
				createdAt: '2022-02-17T01:50:14.909Z',
				updatedAt: '2022-02-18T01:12:39.781Z',
				publishedAt: '2022-02-18T01:12:39.779Z',
			},
		],
	},
	dataObject: {
		initial: {
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
		expect: {
			id: 1,
			title: 'Lorem',
			createdAt: '2022-02-17T00:29:00.833Z',
			updatedAt: '2022-02-17T00:29:03.988Z',
			publishedAt: '2022-02-17T00:29:03.986Z',
			singleRelation: {
				data: {
					id: 1,
					title: 'Ipsum',
					createdAt: '2022-02-15T03:45:32.669Z',
					updatedAt: '2022-02-17T00:30:02.573Z',
					publishedAt: '2022-02-17T00:07:49.491Z',
				},
			},
		},
	},
	dataArray: {
		initial: {
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
								test: null,
							},
						},
						{
							id: 3,
							attributes: {
								title: 'Dolor',
								createdAt: '2022-02-17T00:29:16.890Z',
								updatedAt: '2022-02-18T00:56:28.909Z',
								publishedAt: '2022-02-17T00:29:17.874Z',
								test: '2022-02-03T05:00:00.000Z',
							},
						},
					],
				},
			},
		},
		expect: {
			id: 1,
			title: 'Lorem',
			createdAt: '2022-02-15T03:45:32.669Z',
			updatedAt: '2022-02-17T00:30:02.573Z',
			publishedAt: '2022-02-17T00:07:49.491Z',
			manyRelation: {
				data: [
					{
						id: 2,
						title: 'Ipsum',
						createdAt: '2022-02-14T02:57:55.918Z',
						updatedAt: '2022-02-17T00:09:17.360Z',
						publishedAt: '2022-02-17T00:09:13.399Z',
						test: null,
					},
					{
						id: 3,
						title: 'Dolor',
						createdAt: '2022-02-17T00:29:16.890Z',
						updatedAt: '2022-02-18T00:56:28.909Z',
						publishedAt: '2022-02-17T00:29:17.874Z',
						test: '2022-02-03T05:00:00.000Z',
					},
				],
			},
		},
	},
	id: {
		initial: {
			id: 1,
			attributes: {
				title: 'Lorem',
				createdAt: '2022-02-17T00:29:16.890Z',
				updatedAt: '2022-02-18T00:56:28.909Z',
				publishedAt: '2022-02-17T00:29:17.874Z',
				test: '2022-02-03T05:00:00.000Z',
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
		expect: {
			id: 1,
			title: 'Lorem',
			createdAt: '2022-02-17T00:29:16.890Z',
			updatedAt: '2022-02-18T00:56:28.909Z',
			publishedAt: '2022-02-17T00:29:17.874Z',
			test: '2022-02-03T05:00:00.000Z',
			singleComponent: {
				id: 2,
				title: 'Ipsum',
				singleRelation: {
					data: {
						id: 3,
						title: 'Dolor',
					},
				},
			},
		},
	},
	arrayWithIds: {
		initial: {
			id: 1,
			attributes: {
				title: 'Lorem',
				createdAt: '2022-02-17T00:29:16.890Z',
				updatedAt: '2022-02-18T00:56:28.909Z',
				publishedAt: '2022-02-17T00:29:17.874Z',
				test: '2022-02-03T05:00:00.000Z',
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
		expect: {
			id: 1,
			title: 'Lorem',
			createdAt: '2022-02-17T00:29:16.890Z',
			updatedAt: '2022-02-18T00:56:28.909Z',
			publishedAt: '2022-02-17T00:29:17.874Z',
			test: '2022-02-03T05:00:00.000Z',
			repeatableComponent: [
				{
					id: 2,
					title: 'Ipsum',
					singleRelation: {
						data: {
							id: 3,
							title: 'Dolor',
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
								title: 'Amet',
							},
							{
								id: 6,
								title: 'consectetur',
							},
						],
					},
				},
			],
		},
	},
	provider: {
		initial: {
			id: 1,
			attributes: {
				title: 'Lorem',
				createdAt: '2022-02-17T01:50:38.599Z',
				updatedAt: '2022-02-18T02:05:56.635Z',
				publishedAt: '2022-02-18T02:05:56.628Z',
				singleMedia: {
					id: 2,
					provider: 'local',
				},
			},
		},
		expect: {
			id: 1,
			title: 'Lorem',
			createdAt: '2022-02-17T01:50:38.599Z',
			updatedAt: '2022-02-18T02:05:56.635Z',
			publishedAt: '2022-02-18T02:05:56.628Z',
			singleMedia: {
				id: 2,
				provider: 'local',
			},
		},
	},
	arrayWithProviders: {
		initial: {
			id: 1,
			attributes: {
				title: 'Lorem',
				createdAt: '2022-02-17T01:50:38.599Z',
				updatedAt: '2022-02-18T02:05:56.635Z',
				publishedAt: '2022-02-18T02:05:56.628Z',
				singleMedia: [
					{ id: 2, provider: 'local' },
					{ id: 3, provider: 'local' },
				],
			},
		},
		expect: {
			id: 1,
			title: 'Lorem',
			createdAt: '2022-02-17T01:50:38.599Z',
			updatedAt: '2022-02-18T02:05:56.635Z',
			publishedAt: '2022-02-18T02:05:56.628Z',
			singleMedia: [
				{ id: 2, provider: 'local' },
				{ id: 3, provider: 'local' },
			],
		},
	},
};

const dataWithoutRelationsDataKey = {
	attribute: {
		initial: {
			id: 1,
			attributes: {
				title: 'Lorem',
				createdAt: '2022-02-14T02:58:35.291Z',
				updatedAt: '2022-02-16T01:25:00.014Z',
				publishedAt: '2022-02-16T01:25:00.012Z',
			},
		},
		expect: {
			id: 1,
			title: 'Lorem',
			createdAt: '2022-02-14T02:58:35.291Z',
			updatedAt: '2022-02-16T01:25:00.014Z',
			publishedAt: '2022-02-16T01:25:00.012Z',
		},
	},
	arrayWithAttributes: {
		initial: [
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
		expect: [
			{
				id: 1,
				title: 'Lorem',
				createdAt: '2022-02-17T00:07:40.318Z',
				updatedAt: '2022-02-17T04:59:39.055Z',
				publishedAt: '2022-02-17T00:07:42.124Z',
			},
			{
				id: 2,
				title: 'Ispum',
				createdAt: '2022-02-17T01:50:14.909Z',
				updatedAt: '2022-02-18T01:12:39.781Z',
				publishedAt: '2022-02-18T01:12:39.779Z',
			},
		],
	},
	dataObject: {
		initial: {
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
		expect: {
			id: 1,
			title: 'Lorem',
			createdAt: '2022-02-17T00:29:00.833Z',
			updatedAt: '2022-02-17T00:29:03.988Z',
			publishedAt: '2022-02-17T00:29:03.986Z',
			singleRelation: {
				id: 1,
				title: 'Ipsum',
				createdAt: '2022-02-15T03:45:32.669Z',
				updatedAt: '2022-02-17T00:30:02.573Z',
				publishedAt: '2022-02-17T00:07:49.491Z',
			},
		},
	},
	dataArray: {
		initial: {
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
								test: null,
							},
						},
						{
							id: 3,
							attributes: {
								title: 'Dolor',
								createdAt: '2022-02-17T00:29:16.890Z',
								updatedAt: '2022-02-18T00:56:28.909Z',
								publishedAt: '2022-02-17T00:29:17.874Z',
								test: '2022-02-03T05:00:00.000Z',
							},
						},
					],
				},
			},
		},
		expect: {
			id: 1,
			title: 'Lorem',
			createdAt: '2022-02-15T03:45:32.669Z',
			updatedAt: '2022-02-17T00:30:02.573Z',
			publishedAt: '2022-02-17T00:07:49.491Z',
			manyRelation: [
				{
					id: 2,
					title: 'Ipsum',
					createdAt: '2022-02-14T02:57:55.918Z',
					updatedAt: '2022-02-17T00:09:17.360Z',
					publishedAt: '2022-02-17T00:09:13.399Z',
					test: null,
				},
				{
					id: 3,
					title: 'Dolor',
					createdAt: '2022-02-17T00:29:16.890Z',
					updatedAt: '2022-02-18T00:56:28.909Z',
					publishedAt: '2022-02-17T00:29:17.874Z',
					test: '2022-02-03T05:00:00.000Z',
				},
			],
		},
	},
	id: {
		initial: {
			id: 1,
			attributes: {
				title: 'Lorem',
				createdAt: '2022-02-17T00:29:16.890Z',
				updatedAt: '2022-02-18T00:56:28.909Z',
				publishedAt: '2022-02-17T00:29:17.874Z',
				test: '2022-02-03T05:00:00.000Z',
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
		expect: {
			id: 1,
			title: 'Lorem',
			createdAt: '2022-02-17T00:29:16.890Z',
			updatedAt: '2022-02-18T00:56:28.909Z',
			publishedAt: '2022-02-17T00:29:17.874Z',
			test: '2022-02-03T05:00:00.000Z',
			singleComponent: {
				id: 2,
				title: 'Ipsum',
				singleRelation: {
					id: 3,
					title: 'Dolor',
				},
			},
		},
	},
	arrayWithIds: {
		initial: {
			id: 1,
			attributes: {
				title: 'Lorem',
				createdAt: '2022-02-17T00:29:16.890Z',
				updatedAt: '2022-02-18T00:56:28.909Z',
				publishedAt: '2022-02-17T00:29:17.874Z',
				test: '2022-02-03T05:00:00.000Z',
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
		expect: {
			id: 1,
			title: 'Lorem',
			createdAt: '2022-02-17T00:29:16.890Z',
			updatedAt: '2022-02-18T00:56:28.909Z',
			publishedAt: '2022-02-17T00:29:17.874Z',
			test: '2022-02-03T05:00:00.000Z',
			repeatableComponent: [
				{
					id: 2,
					title: 'Ipsum',
					singleRelation: {
						id: 3,
						title: 'Dolor',
					},
				},
				{
					id: 4,
					title: 'Sat',
					manyRelation: [
						{
							id: 5,
							title: 'Amet',
						},
						{
							id: 6,
							title: 'consectetur',
						},
					],
				},
			],
		},
	},
	provider: {
		initial: {
			id: 1,
			attributes: {
				title: 'Lorem',
				createdAt: '2022-02-17T01:50:38.599Z',
				updatedAt: '2022-02-18T02:05:56.635Z',
				publishedAt: '2022-02-18T02:05:56.628Z',
				singleMedia: {
					id: 2,
					provider: 'local',
				},
			},
		},
		expect: {
			id: 1,
			title: 'Lorem',
			createdAt: '2022-02-17T01:50:38.599Z',
			updatedAt: '2022-02-18T02:05:56.635Z',
			publishedAt: '2022-02-18T02:05:56.628Z',
			singleMedia: {
				id: 2,
				provider: 'local',
			},
		},
	},
	arrayWithProviders: {
		initial: {
			id: 1,
			attributes: {
				title: 'Lorem',
				createdAt: '2022-02-17T01:50:38.599Z',
				updatedAt: '2022-02-18T02:05:56.635Z',
				publishedAt: '2022-02-18T02:05:56.628Z',
				singleMedia: [
					{ id: 2, provider: 'local' },
					{ id: 3, provider: 'local' },
				],
			},
		},
		expect: {
			id: 1,
			title: 'Lorem',
			createdAt: '2022-02-17T01:50:38.599Z',
			updatedAt: '2022-02-18T02:05:56.635Z',
			publishedAt: '2022-02-18T02:05:56.628Z',
			singleMedia: [
				{ id: 2, provider: 'local' },
				{ id: 3, provider: 'local' },
			],
		},
	},
};

module.exports = {
	dataWithRelationsDataKey,
	dataWithoutRelationsDataKey,
};
