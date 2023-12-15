type SlackSlashCommandPayload = {
    token: string;
    team_id: string;
    team_domain: string;
    channel_id: string;
    channel_name: string;
    user_id: string;
    user_name: string;
    command: string;
    text: string;
    api_app_id: string;
    is_enterprise_install: boolean;
    response_url: string;
    trigger_id: string;
    payload: never;
};

type SlackInteractivityPayload = {
    payload: string;
    command: never;
};

type SlackPayload = SlackSlashCommandPayload | SlackInteractivityPayload;

type SlackBlockSection = {
    type: 'section';
    text: {
        type: 'plain_text' | 'mrkdwn';
        text: string;
        verbatim?: boolean;
    };
};

type SlackBlockButton = {
    type: 'button';
    text: {
        type: 'plain_text';
        text: string;
        emoji: boolean;
    };
    value: string;
    action_id: string;
};

type SlackBlockInput = {
    type: 'input';
    block_id: string;
    label: {
        type: 'plain_text';
        text: string;
        emoji?: boolean;
    };
    hint?: {
        type: 'plain_text';
        text: string;
        emoji?: boolean;
    };
    optional?: boolean;
    dispatch_action?: boolean;
    element: {
        type: string;
        action_id: string;
        placeholder?: {
            type: string;
            text: string;
            emoji?: boolean;
        };
        options?: {
            text: {
                type: 'plain_text';
                text: string;
                emoji?: boolean;
            };
            value: string;
        }[];
        initial_value?: string;
        dispatch_action_config?: {
            trigger_actions_on: string[];
        };
    };
};

type SlackBlock = SlackBlockSection | SlackBlockInput;

type ModalArgs = {
    trigger_id: string;
    id: string;
    title: string;
    submit_text?: string;
    blocks: SlackBlock[];
    metadata: {
        question: string;
        kingWen: number;
        change: number[];
        title: string;
    };
};

type SlackModalPayload = {
    type: string;
    callback_id?: string;
    team: {
        id: string;
        domain: string;
    };
    user: {
        id: string;
        username: string;
        name: string;
        team_id: string;
    };
    channel?: {
        id: string;
        name: string;
    };
    message: {
        ts: string;
        thread_ts?: string;
    };
    api_app_id: string;
    token: string;
    trigger_id: string;
    view: {
        id: string;
        team_id: string;
        type: string;
        blocks: SlackBlock[];
        private_metadata: any;
        callback_id: string;
        state: any;
        hash: string;
        title: {
            type: 'plain_text';
            text: string;
            emoji: boolean;
        };
        clear_on_close: boolean;
        notify_on_close: boolean;
        close: null;
        submit: {
            type: 'plain_text';
            text: string;
            emoji: boolean;
        };
        app_id: string;
        external_id: string;
        app_installed_team_id: string;
        bot_id: string;
    };
};

type SlackInteractionPayload = {
    type:
        | 'block_actions'
        | 'interactive_message'
        | 'message_action'
        | 'dialog_submission'
        | 'dialog_cancellation'
        | 'dialog_suggestion'
        | 'view_submission'
        | 'view_closed';
    team: {
        id: string;
        domain: string;
    };
    user: {
        id: string;
        username: string;
        name: string;
        team_id: string;
    };
    api_app_id: string;
    token: string;
    container: {
        type: 'message' | 'view' | 'file' | 'app_home';
        message_ts?: string;
        channel_id?: string;
        is_ephemeral?: boolean;
        view_id?: string;
        external_id?: string;
        hash?: string;
        file_id?: string;
        file?: any;
    };
    trigger_id: string;
    response_url?: string;
    actions?: any[];
    message?: any;
    view?: any;
    callback_id?: string;
    submission?: any;
    state?: any;
    action_ts?: string;
    is_app_unfurl?: boolean;
    channel?: {
        id: string;
        name: string;
    };
    original_message?: any;
    enterprise?: {
        id: string;
        name: string;
    };
    is_enterprise_install?: boolean;
};

type SlackApiEndpoint = 'chat.postMessage' | 'views.open' | 'chat.update';

type BlockArgs = {
    id: string;
    label: string;
    placeholder: string;
};

type SectionBlockArgs = {
    text: string;
};

type InputBlockArgs = {
    initial_value?: string;
    hint?: string;
} & BlockArgs;

type SelectBlockArgs = {
    options: {
        label: string;
        value: string;
    }[];
} & BlockArgs;

type ButtonBlockArgs = {
    text: string;
    value: string;
    action_id: string;
};

type HexagramLine = {
    position: number;
    value: number;
    text: string;
};

type Hexagram = {
    kingWen: number;
    title: string;
    chars: string;
    uniCode: number;
    judgement: string;
    lines: string;
    url: string;
};

type OracleItem = {
    question: string;
    submitter: string;
    note: string;
    kingWen: number;
    change: number[];
    date?: string;
};
