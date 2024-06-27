import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatBackendService {

  // constructor() { }
  constructor(private http: HttpClient) { }

  fetchQueryResponse(product_id:string, query:string){
    const reqBody = {
      "name" : "raafay",
      "query":query
    }
    return this.http.post("http://localhost:5000/askQuestion",reqBody)
  }

}
