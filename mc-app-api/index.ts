import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { generateHexagram } from './src/oracle';
import getJudgement from './src/getJudgement';
import { pushToMainChannelHandle } from './src/utils/slack/pushToMainChannelHandle';
import { parse } from 'querystring';
import { storeInteractionHandle } from './src/utils/slack/storeInteractionHandle';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(event);

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    if (event.resource !== '/ask') {
        const body = parse(event.body ?? '') as SlackPayload;
        console.log('body', body);
        if (body.payload) {
            const payload = JSON.parse(body.payload);
            console.log('payload', payload);
            await storeInteractionHandle(payload);
        }
        return {
            statusCode: 200,
            body: '',
        };
    }

    try {
        const hexagram = generateHexagram();
        const message = getJudgement(hexagram);

        const body = JSON.parse(event.body || '{}');

        await pushToMainChannelHandle({
            kingWen: hexagram.kingWen,
            title: message.title,
            firstName: body.firstName || 'NA',
            lastName: body.lastName || 'NA',
            email: body.email || 'NA',
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message,
                hexagram,
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
