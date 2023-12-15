import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { generateHexagram } from './src/oracle';
import getJudgement from './src/getJudgement';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        console.log(event);
        const hexagram = generateHexagram();
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: getJudgement(hexagram),
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
