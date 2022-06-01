import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 
    //'Content-Type': 'application/json',
    'X-NP-TOKEN': sessionStorage.getItem('auth') as string,
    //'X-NP-TOKEN': "52740219-4d79-470a-a08e-91b5111633b0"
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  rootURL = 'http://localhost:9000/';

  register(data: any) {
    return this.http.post(this.rootURL + 'v1/register', data);
  }

  login(data: any) {
    return this.http.post(this.rootURL + 'v1/login', data);
  }

  getCategories() {
    return this.http.get(this.rootURL + 'v1/get/categories', httpOptions);
  }

  getQuestionsByCategoryId(categoryId: number) {
    return this.http.get(this.rootURL + 'v1/get/questions/' + categoryId, httpOptions);
  }

  saveResult(data: any) {
    return this.http.post(this.rootURL + 'v1/save/question/answers', data, httpOptions);
  }
}
