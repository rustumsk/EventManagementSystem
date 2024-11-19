export type CustomUser = {
    type: 'existingUser' | 'newUser';
    token?: string;
    addInfo?: {
        email: string;
        google_id: string;
    };
};

