import bcrypt from 'bcryptjs';

const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

const verifyPassword = async(password:string, hashedPassword: string): Promise<boolean> =>{
    const match = await bcrypt.compare(hashedPassword, password)
    return match;
}

const passwordHelper = {
    verifyPassword,
    hashPassword
}

export default passwordHelper;