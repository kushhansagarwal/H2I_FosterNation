import { json } from '@sveltejs/kit';

export interface Option {
	option: string;
	image?: string;
	question?: string;
	result?: Result;
	options?: Option[];
}

export interface Question {
	question: string;
	image?: string;
	options: Option[];
}

export interface Result {
	result: string;
	description: string;
	solution: string[];
}

const secondKey: Question = {
	question: 'What type of assistance are you looking for?',
	options: [
		{
			option: 'Education',
			question: 'What aspect of education do you need help with?',
			options: [
				{
					option: 'College applications',
					question:
						'Do you need help with finding the right college or with the application process?',
					options: [
						{
							option: 'Finding the right college',
							result: {
								result: 'Program: College Guidance',
								description:
									'Our College Guidance program can help you research and select the best college for your needs.',
								solution: [
									'Visit our College Guidance page for more information.',
									'https://www.fosternation.org/college-guidance'
								]
							}
						},
						{
							option: 'Application process',
							result: {
								result: 'Service: Application Assistance',
								description:
									'Our Application Assistance service provides help with filling out college applications and writing essays.',
								solution: [
									'Visit our Application Assistance page for more details.',
									'https://www.fosternation.org/application-assistance'
								]
							}
						}
					]
				},
				{
					option: 'Scholarships and financial aid',
					result: {
						result: 'Resource: Scholarships',
						description: 'Find scholarships and financial aid options tailored for foster youth.',
						solution: [
							'Check out our Scholarships page.',
							'https://www.fosternation.org/scholarships'
						]
					}
				},
				{
					option: 'Tutoring',
					result: {
						result: 'Service: Tutoring',
						description:
							'Our Tutoring program offers academic support to help you succeed in your studies.',
						solution: [
							'Learn more about our Tutoring services.',
							'https://www.fosternation.org/tutoring'
						]
					}
				}
			]
		},
		{
			option: 'Career',
			question: 'What type of career support do you need?',
			options: [
				{
					option: 'Career counseling',
					result: {
						result: 'Program: Career Counseling',
						description:
							'Our Career Counseling program provides guidance on career paths and job opportunities.',
						solution: [
							'Explore our Career Counseling program.',
							'https://www.fosternation.org/career-counseling'
						]
					}
				},
				{
					option: 'Job search assistance',
					result: {
						result: 'Service: Job Search Assistance',
						description: 'We offer resources and support to help you find and apply for jobs.',
						solution: [
							'Visit our Job Search Assistance page.',
							'https://www.fosternation.org/job-search'
						]
					}
				},
				{
					option: 'Resume writing',
					result: {
						result: 'Service: Resume Writing',
						description: 'Get help crafting a professional resume to improve your job prospects.',
						solution: [
							'Learn more about our Resume Writing service.',
							'https://www.fosternation.org/resume-writing'
						]
					}
				}
			]
		},
		{
			option: 'Housing',
			question: 'What type of housing support do you need?',
			options: [
				{
					option: 'Finding housing',
					result: {
						result: 'Resource: Housing Assistance',
						description: 'We provide resources to help you find stable and affordable housing.',
						solution: [
							'Check out our Housing Assistance page.',
							'https://www.fosternation.org/housing-assistance'
						]
					}
				},
				{
					option: 'Rent assistance',
					result: {
						result: 'Program: Rent Assistance',
						description: 'Our Rent Assistance program can help you cover rental costs.',
						solution: [
							'Learn more about our Rent Assistance program.',
							'https://www.fosternation.org/rent-assistance'
						]
					}
				}
			]
		},
		{
			option: 'Mental Health',
			question: 'What type of mental health support do you need?',
			options: [
				{
					option: 'Counseling services',
					result: {
						result: 'Service: Counseling',
						description:
							'We offer counseling services to support your mental health and well-being.',
						solution: [
							'Explore our Counseling services.',
							'https://www.fosternation.org/counseling'
						]
					}
				},
				{
					option: 'Support groups',
					result: {
						result: 'Program: Support Groups',
						description: 'Join our support groups to connect with others and share experiences.',
						solution: [
							'Learn more about our Support Groups.',
							'https://www.fosternation.org/support-groups'
						]
					}
				}
			]
		},
		{
			option: 'General Questions',
			question: 'What kind of general assistance do you need?',
			options: [
				{
					option: 'Website Navigation',
					question: 'Are you looking for specific information on our website?',
					options: [
						{
							option: 'Yes',
							result: {
								result: 'Navigation Assistance',
								description:
									'Please use the search bar or browse through our sections to find what you need.',
								solution: ['Visit our search page.', 'https://www.fosternation.org/search']
							}
						},
						{
							option: 'No',
							result: {
								result: 'Contact Us',
								description: 'If you need further assistance, please contact us directly.',
								solution: ['Visit our Contact Us page.', 'https://www.fosternation.org/contact']
							}
						}
					]
				},
				{
					option: 'External Resources',
					result: {
						result: 'External Help',
						description:
							"If our website doesn't have the resources you need, here are some external links that might help.",
						solution: [
							'Visit our External Resources page.',
							'https://www.fosternation.org/external-resources'
						]
					}
				}
			]
		}
	]
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	let { route } = await request.json();
	console.log(route);

	// route = ['Streaks/scratches across the image', 'Colorful random strips', 'CinseStill'];

	var response = secondKey;
	for (var routeItem of route) {
		response = response.options.find((option) => option.option === routeItem);
	}

	return json({ response });
}
