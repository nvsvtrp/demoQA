import { basePage } from "./basePage";
export class RandomValues extends basePage {
    constructor (page) {
        super (page)
    }
    getRandomName(): string {
        const firstName = this.getRandomFirstname();
        const lastName = this.getRandomLastName();
        return `${firstName} ${lastName}`;
    }
    
    getRandomFirstname(): string {
        const firstNames: string[] = ["Andrey", "Alexandr", "Oleg", "Victor", "German", "Artem", "Denis"];
        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        return `${randomFirstName}`;
    }

    getRandomLastName(): string {
        const lastNames: string[] = ["Petrov", "Ivanov", "Sokolov", "Orlov", "Kazakov", "Nekrasov", "Kulagin"];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${randomLastName}`;
    }

    getRandomAge(): string {
        const minAge = 18;
        const maxAge = 78;
        const randomAge = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
        return `${randomAge}`;
    }

    getRandomSalary(): string {
        const minSalary = 1000;
        const maxSalary = 9000;
        const randomAge = Math.floor(Math.random() * (maxSalary - minSalary + 1)) + minSalary;
        return `${randomAge}`;
    }

    getRandomDepartment(): string {
        const departments: string[] = ["Finance", "Marketing", "Sales", "Information Technology", "Customer Service", "Research and Development", "Human Resources"];
        const randomLastName = departments[Math.floor(Math.random() * departments.length)];
        return `${randomLastName}`;
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

    // getRandomPassword(): string {
    //     const lower = 'abcdefghijklmnopqrstuvwxyz';
    // const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // const digits = '0123456789';
    // const special = '@';
    // const getRandomCharacter = (charset: string): string => {
    //     const randomIndex = Math.floor(Math.random() * charset.length);
    //     return charset[randomIndex];
    // };
    // let password = [
    //     getRandomCharacter(lower),
    //     getRandomCharacter(upper),
    //     getRandomCharacter(digits),
    //     getRandomCharacter(special)
    // ];
    // const allCharacters = lower + upper + digits + special;

    // while (password.length < 8) {
    //     password.push(getRandomCharacter(allCharacters));
    // }

    // password = password.sort(() => Math.random() - 0.5);
    // const hasLower = password.some(char => lower.includes(char));
    // const hasUpper = password.some(char => upper.includes(char));
    // const hasDigit = password.some(char => digits.includes(char));
    // const hasSpecial = password.some(char => special.includes(char));
    // if (!hasLower || !hasUpper || !hasDigit || !hasSpecial) {
    //     return this.getRandomPassword();
    // }
    // return password.join('');
    // }

    getRandomUserName() : string {
        const firstName: string[] = ["hot", "crispy", "cool", "spicy", "funny", "bright", "speedy", "shiny", "happy", "lazy"];
        const lastName: string[] = ["pig", "elephant", "lion", "tiger", "bear", "cat", "dog", "rabbit", "fox", "wolf"];
        const minValue = 1;
        const maxValue = 1000;
        const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        const randomEmail = firstName[Math.floor(Math.random() * firstName.length)];
        const randomEmailServise = lastName[Math.floor(Math.random() * lastName.length)];
        return `${randomEmail}${randomEmailServise}${randomValue}`;
    }
}