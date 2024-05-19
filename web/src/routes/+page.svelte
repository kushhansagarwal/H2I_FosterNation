<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import logo from '$lib/assets/logo.png';

	export let data;
	const supportAgentCanonicalName = 'FosterNation Support';

	const supportPhoto = logo;
	let userPhoto =
		'https://lh3.googleusercontent.com/ogw/AF2bZyicnTwSQZiGntwl6IwI62iTdhymicA3xPQiROxh2jUtV1U=s64-c-mo';

	let currentMessage: string = '';
	let sendState: boolean = true;

	let messages: {
		message: string;
		type: string;
		sender: string;
		dichot?: Question;
	}[] = [
		{
			message: 'Hello! How can I help you today?',
			sender: supportAgentCanonicalName,
			type: 'dichot'
		},
		{
			message: 'Hello! How can I help you today?',
			sender: 'User',
			type: 'dichot'
		}
	];

	interface Option {
		option: string;
		image?: string;
		question?: string;
		result?: Result;
		options?: Option[];
	}

	interface Question {
		question?: string;
		image?: string;
		options?: Option[];
	}

	interface Result {
		result: string;
		description: string;
		solution: string[];
	}

	var displayDichot: Question = {};

	var route: string[] = [];

	async function handleClick(route: string[]) {
		const response = await fetch('/api/dichot', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ route: route })
		});
		let data = await response.json();
		data = data.response;
		console.log(data);
		if (data.result) {
			sendState = false;
		}
		messages = [
			...messages,
			{
				message: data.question,
				sender: supportAgentCanonicalName,
				type: 'dichot',
				dichot: data
			}
		];
	}

	onMount(() => {
		var messageBody = document.querySelector('#chat-container');
		messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
		if (!data.isAuthenticated) {
			goto('/api/auth/login');
		} else {
			console.log('User is authenticated');
			userPhoto = data.user.picture ?? userPhoto;
			handleClick(route);
		}
	});

	async function addMessage() {
		sendState = true;
		const tempMessage = currentMessage;
		currentMessage = '';
		messages = [
			...messages,
			{
				message: tempMessage,
				sender: 'User',
				type: 'gpt'
			}
		];
		const response = await fetch('/api/message', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				message: {
					text: tempMessage
				}
			})
		});

		if (response.ok) {
			const data = await response.json();
			messages = [
				...messages,
				{
					message: data.response,
					sender: supportAgentCanonicalName,
					type: 'gpt'
				}
			];
			currentMessage = '';
			sendState = false;
		} else {
			console.error('Failed to send message');
		}
	}
</script>

<section class="">
	<div class="p-5">
		<!-- <button class="btn btn-primary" on:click={() => goto('/api/auth/logout')}> Logout </button> -->
		<h1>FosterNation Helpdesk</h1>
		<p>Hi there! We are here to help.</p>
	</div>
	<div class="grid">
		<div id="chat-container" class="h-[68vh] overflow-scroll  p-5">
			<div>
				{#each messages as { message, sender, type, dichot }, i}
					{#if type === 'gpt'}
						<div
							class={`chat  ${sender === supportAgentCanonicalName ? 'chat-start' : 'chat-end'}`}
						>
							<div class="chat-image avatar">
								<div class="w-10 rounded-full">
									<img
										alt="User avatar"
										src={sender === supportAgentCanonicalName ? supportPhoto : userPhoto}
									/>
								</div>
							</div>
							<div class="chat-header">
								{sender === supportAgentCanonicalName
									? supportAgentCanonicalName
									: data.user.given_name}
								<time class="text-xs opacity-50"
									>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time
								>
							</div>
							<div class="bg-primary chat-bubble text-black"><p>{message}</p></div>
						</div>
					{:else if dichot?.question}
						<div class="chat chat-start">
							<div
								class="chat-image
								avatar"
							>
								<div class="w-10 rounded-full">
									<img alt="User avatar" src={supportPhoto} />
								</div>
							</div>
							<div class="chat-header">{sender}</div>
							<div class="bg-primary chat-bubble text-black">
								<p>{message}</p>
								{#if dichot}
									{#each dichot.options as option}
										<button
											class="btn btn-primary"
											on:click={() => {
												messages = [
													...messages,
													{
														message: option.option,
														sender: 'User',
														type: 'gpt',
														dichot: null
													}
												];
												route = [...route, option.option];
												handleClick(route);
											}}
										>
											{option.option}
										</button>
									{/each}
								{/if}
							</div>
						</div>
					{:else if dichot?.result}
						<div class="chat chat-start">
							<div
								class="chat-image
								avatar"
							>
								<div class="w-10 rounded-full">
									<img alt="User avatar" src={supportPhoto} />
								</div>
							</div>
							<div class="chat-header">{sender}</div>
							<div class="bg-primary chat-bubble text-black">
								<h2>{dichot.result.result}</h2>
								<p>{dichot.result.description}</p>
								<ul>
									{#each dichot.result.solution as solution}
										<li>{solution}</li>
									{/each}
								</ul>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
	<div class="absolute bottom-0 w-full p-5">
		<label class="input input-bordered flex items-center gap-2">
			<input
				disabled={sendState}
				type="text"
				bind:value={currentMessage}
				class="grow"
				placeholder="Send"
				on:keydown={(e) => e.key === 'Enter' && currentMessage.trim() && addMessage()}
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				height="20px"
				width="20px"
				version="1.1"
				stroke-width="20"
				stroke="#000"
				id="Layer_1"
				viewBox="0 0 512 512"
				xml:space="preserve"
			>
				<g>
					<g>
						<path
							d="M508.645,18.449c-2.929-2.704-7.133-3.51-10.826-2.085L6.715,204.446c-3.541,1.356-6.066,4.515-6.607,8.264    c-0.541,3.75,0.985,7.496,3.995,9.796l152.127,116.747c-0.004,0.116-0.575,0.224-0.575,0.342v83.592    c0,3.851,2.663,7.393,6.061,9.213c1.541,0.827,3.51,1.236,5.199,1.236c2.026,0,4.181-0.593,5.931-1.756l56.12-37.367    l130.369,99.669c1.848,1.413,4.099,2.149,6.365,2.149c1.087,0,2.186-0.169,3.248-0.516c3.27-1.066,5.811-3.672,6.786-6.974    L511.571,29.082C512.698,25.271,511.563,21.148,508.645,18.449z M170.506,321.508c-0.385,0.36-0.7,0.763-1.019,1.163    L31.659,217.272L456.525,54.557L170.506,321.508z M176.552,403.661v-48.454l33.852,25.887L176.552,403.661z M359.996,468.354    l-121.63-93.012c-1.263-1.77-2.975-3.029-4.883-3.733l-47.29-36.163L480.392,60.86L359.996,468.354z"
						/>
					</g>
				</g>
			</svg>
		</label>
	</div>
</section>
