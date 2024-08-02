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
            data: {userName, password}
            });
            const body = await this.getResponseBody(response)
            return body.userId
  
            
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
            const randomIsbn = isbns[0];
            return randomIsbn;
    }

    async getRandomBookTitle() {
        const response = await this.page.request.get(`${this.baseUrl}/BookStore/v1/Books`, {
            });
            const body = await this.getResponseBody(response);
            const title = body.books.map(book => book.title);
            const randomTitle = title[0];
            return randomTitle;
    }
    
    async deleteUser(token: string, userId: string) {
        const response = await this.page.request.delete(`${this.baseUrl}/Account/v1/User/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Response status:', response.status());
        console.log('Response body:', await response.text());
        if (!response.ok()) {
            throw new Error(`Failed to delete user. Status: ${response.status()}. Response body: ${await response.text()}`);
        }
    }

    async deleteBook(isbn: string, userId: string, token: string) {
        const url = `${this.baseUrl}/BookStore/v1/Book`;
        return await this.page.request.delete(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: {
            "isbn": isbn, 
            "userId": userId
        }
        
        });
    }
    async getBooks() {
        const response = await fetch(`${this.baseUrl}/BookStore/v1/Books`);
        const data = await response.json();
        return data.books;
    }

}

