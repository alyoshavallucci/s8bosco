import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: "root"
})
export class NameService {

  perorso = "http://localhost:8080/s8bosco/php/";
  percorsi = ["load_dirette.php"];

  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
  };

  constructor(private http: HttpClient){}

  ngOnInit(): void {}

  onService(): Observable<any> {
     return this.http.post('http://localhost:8080/s8bosco/php/load_dirette.php',this.headers)
  }
}


