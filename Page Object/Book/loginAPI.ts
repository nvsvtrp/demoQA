import { baseAPI } from "../baseAPI";
export class LoginApi extends baseAPI {
    private readonly baseUrl: string;
    constructor (page) {
        super (page)
        this.baseUrl = 'https://demoqa.com';
    }

    async registerUserRequest(userName: string, password: string) {
        const response = await this.page.request.post(`${this.baseUrl}/Account/v1/User`, {
            data: {userName, password}
            });
            const body = await this.getResponseBody(response)
            return body.userID;
    }

    async generateToken(userName: string, password: string) {
        const response = await this.page.request.post(`${this.baseUrl}/Account/v1/GenerateToken`, {
            data: {userName, password}});
            const body = await this.getResponseBody(response);
            return body.token;
    }

    async login(userName: string, password: string) {
        const response = await this.page.request.post(`${this.baseUrl}/Account/v1/Login`, {
            data: {"userName":userName,"password":password}
            });
            const body = await this.getResponseBody(response)
            return body.userId;
    }

    async postBookToAccount(userId: string, isbn: string, token: string) {
        const response = await this.page.request.post(`${this.baseUrl}/BookStore/v1/Books`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: {
                "userId": userId,
                "collectionOfIsbns": [
                  {
                    "isbn": isbn
                  }
                ]
              }
            });
            return response;
    }
    async getRandomBooksId() {
        const response = await this.page.request.get(`${this.baseUrl}/BookStore/v1/Books`, {
            });
            const body = await this.getResponseBody(response);
            const isbns = body.books.map(book => book.isbn);
            const randomIndex = Math.floor(Math.random() * isbns.length);
            const randomIsbn = isbns[randomIndex];
            return randomIsbn;
    }
    async deleteUser(token: string, userId: string) {
        await this.page.request.delete(`${this.baseUrl}/Account/v1/User/${userId}`, {
            data: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    }
    async deleteBook(isbn: string, userId: string) {
        const url = `${this.baseUrl}/BookStore/v1/Book?isbn=${isbn}&userId=${userId}`;
        await this.page.request.delete(url, {
        headers: {
            'Content-Type': 'application/json'
        }
        });
    }
    async getUserBooks(userId: string, token: string): Promise<any[]> {
        const url = `${this.baseUrl}/Account/v1/User/${userId}`;
        const response = await this.page.request.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await this.getResponseBody(response);
        const isbns = data.books.map(book => book.isbn);
        return isbns[0]; 
}

}

