import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
    async hash(password: string): Promise<string> {
        // Prevent re-hashing
        if (this.isHashed(password)) {
            return password;
        }
        return bcrypt.hash(password, 10);
    }

    async compare(
        plainPassword: string,
        hashedPassword: string
    ): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    // Utility method to check if password is already hashed
    private isHashed(password: string): boolean {
        // Basic check for bcrypt hash format
        return password.startsWith('$2b$') ||
            password.startsWith('$2a$') ||
            password.startsWith('$2y$');
    }
}