import data from './data';
import { IHexagram } from './oracle';

interface Hexagram {
    judgement: string;
    title: string;
    changes: string[];
}

const getJudgement: (iHexagram: IHexagram) => Hexagram = (iHexagram) => {
    const result = data.find((item) => item.kingWen === iHexagram.kingWen);

    if (!result) {
        throw new Error('Something went wrong!');
    }

    const { judgement, lines, title } = result;

    if (!iHexagram.change) {
        return {
            judgement,
            title,
            changes: [],
        };
    }

    const changes = lines.filter((line) => iHexagram.change?.includes(line.position)).map((line) => line.text);

    return {
        judgement,
        title,
        changes,
    };
};

export default getJudgement;
