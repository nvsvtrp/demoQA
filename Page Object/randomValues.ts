import { basePage } from "./basePage";
export class RandomValues extends basePage {
    constructor (page) {
        super (page)
    }
    getRandomName(): string {
        const firstNames: string[] = ["Andrey", "Alexandr", "Oleg", "Victor", "German", "Artem", "Denis"];
        const lastNames: string[] = ["Petrov", "Ivanov", "Sokolov", "Orlov", "Kazakov", "Nekrasov", "Kulagin"];
        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${randomFirstName} ${randomLastName}`;
    }
    
    getRandomEmail(): string {
        const emailName: string[] = ["hotman", "supermario", "blackobama", "easygo", "dusindus", "kittylover", "pythonman"];
        const emailServise: string[] = ["gmail.com", "yahoo.com", "hotmail.com", "aol.com", "gmx.com", "mail.com"];
        const randomEmail = emailName[Math.floor(Math.random() * emailName.length)];
        const randomEmailServise = emailServise[Math.floor(Math.random() * emailServise.length)];
        return `${randomEmail}@${randomEmailServise}`;
    }
    
    getRandomStreet(): string {
        const streetName: string[] = ["Pervomaiskaya", "Leninskaya", "Zavodskaya", "Kislaya", "Randomnaya", "Molochnaya", "Zagorodnaya"];
        const randomNumber = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
        const randomStreet = streetName[Math.floor(Math.random() * streetName.length)];
        return `${randomStreet} st. ${randomNumber}`;
    }

    getRandomPassword(): string {
        const length = Math.floor(Math.random() * 3) + 8;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
        let password = '';
        for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
        return password;
    }
}