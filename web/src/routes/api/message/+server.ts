import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

type Message = {
	text: string;
};

export async function POST({ request }: { request: Request }) {
	const body = await request.json();
	const message: Message = body.message;

	if (!message) {
		return json({ error: 'No message provided' }, { status: 400 });
	}

	try {
		const openai = new OpenAI({
			apiKey: OPENAI_API_KEY
		});

		const response = await openai.chat.completions.create({
			messages: [{ role: 'user', content: message.text }],
			model: 'gpt-3.5-turbo'
		});

		if (response.choices[0]?.message?.content) {
			return json({ response: response.choices[0].message.content.trim() });
		} else {
			return json({ error: 'No content available in response' }, { status: 500 });
		}
	} catch (error: any) {
		return json({ error: error.message }, { status: 500 });
	}
}
