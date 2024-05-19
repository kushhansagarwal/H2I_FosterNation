## What it does

The FosterNation Helpdesk employs a LLMs and dichotomous keys to provide users who need to know more about FosterNation a quick and easy way to access information about the NPO. 

## How I built it

It is built as a web app which can be embedded as an ```iframe``` element. For the first part of the conversation, a preset conversation flow built on a custom designed dichotomous key workflow gives the user quick responses to common questions. If the question is not answered properly / the user wants more information, they can type in a question and have it answered by a LLM trained specifically on what FosterNation does.

Authentication by Google (using Kinde) ensures absuse protection.

## Challenges we ran into

None

## Accomplishments that I am proud of

Was able to finish it in ~4 hours

## What we learned

Refined my custom dichotomous key implementation for conversations.

## What's next for FosterNation Helpdesk

Have it implemented
