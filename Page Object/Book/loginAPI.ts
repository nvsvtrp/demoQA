import { baseAPI } from "../baseAPI";
export class LoginApi extends baseAPI {
    private readonly baseUrl: string;
    constructor (page) {
        super (page)
        this.baseUrl = 'https://demoqa.com';
    }

    async registerUserRequest(userName: string, password: string) {
        const response = await this.page.request.post(`${this.baseUrl}/Account/v1/User`, {
            data: {"userName":userName,"password":password}
            });
            const body = await this.GetResponceBody(response)
            console.log(body.userID)
            return body.userID;
    }

    async generateToken(userName: string, password: string) {
        const response = await this.page.request.post(`${this.baseUrl}/Account/v1/GenerateToken`, {
            data: {"userName":userName,"password":password}});
            const body = await this.GetResponceBody(response);
            console.log(body.token)
            return body.token;
    }

    async login(userName: string, password: string) {
        const response = await this.page.request.post(`${this.baseUrl}/Account/v1/Login`, {
            data: {"userName":userName,"password":password}
            });
            const body = await this.GetResponceBody(response)
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
            data: {}
            });
            const body = await this.GetResponceBody(response);
            const isbns = body.books.map(book => book.isbn);
            const randomIndex = Math.floor(Math.random() * isbns.length);
            const randomIsbn = isbns[randomIndex];
            console.log(randomIsbn);
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

    async checkBookInBag(checkUserId) {
        const response = await this.page.request.get(`${this.baseUrl}Account/v1/User/${checkUserId}`, {
            data: {
                "userId": checkUserId
            }
            });
            const body = await this.GetResponceBody(response);
            if (body.books && body.books.length > 0) {
                return body.books[0].isbn;
            } else {
            console.log('No books found for this user.');
            return null;
        }
    }
    }
