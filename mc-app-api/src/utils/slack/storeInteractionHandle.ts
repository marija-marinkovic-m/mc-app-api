import { saveReading } from '../notion/questionsTable';
import { STORE_MC_LEAD, slackApi } from './api';

export async function storeInteractionHandle(payload: SlackInteractionPayload) {
    if ('block_actions' !== payload.type) {
        console.log('wrong payload.type', payload.type);
        return;
    }

    const triggerButton = payload.actions?.find((action) => action.action_id === `${STORE_MC_LEAD}_btn`);

    if (!triggerButton || !triggerButton.value) {
        console.log('missing expected action', payload.actions);
        return;
    }
    const data = JSON.parse(triggerButton.value);

    const saveReadingResponse = await saveReading({
        question: `${data.firstName} ${data.lastName} - ${data.email}`,
        note: data.title ?? 'NA',
        kingWen: data.kingWen,
        change: data.change || [],
        submitter: payload.user.name,
    });

    console.log('saveReadingResponse', saveReadingResponse);

    const slackApiResponse = await slackApi('chat.update', {
        channel: payload.channel?.id,
        ts: payload.message.ts,
        blocks: [
            payload.message.blocks[0],
            {
                type: 'context',
                elements: [
                    {
                        type: 'mrkdwn',
                        text: `:rocket: Submitted by <@${payload.user.id}>`,
                    },
                ],
            },
        ],
    });

    console.log('slackApiResponse', slackApiResponse);
}
