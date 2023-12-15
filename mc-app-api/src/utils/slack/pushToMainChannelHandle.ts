import { STORE_MC_LEAD, slackApi } from './api';
import { blocks } from './blocks';

interface Payload {
    kingWen: number;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
}

export async function pushToMainChannelHandle(payload: Payload) {
    const response = await slackApi('chat.postMessage', {
        channel: process.env.CHANNEL_GENERAL_ID,
        callback_id: STORE_MC_LEAD,
        blocks: [
            blocks.section({
                text: `New lead from Manychat Automation:\n>*${payload.firstName}*\n>*${payload.lastName}*\n>${payload.title}\n<https://manychat.com|Visit dashboard>`,
            }),
            {
                type: 'actions',
                elements: [
                    blocks.button({
                        text: 'Store the lead',
                        value: JSON.stringify(payload),
                        action_id: `${STORE_MC_LEAD}_btn`,
                    }),
                ],
            },
        ],
    });

    console.log('response from pushToMainChannelHandle', response);
}
