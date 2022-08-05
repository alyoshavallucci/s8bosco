import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: "root"
})
export class NameService {

  perorso = "http://localhost:8080/s8bosco/php/";
  percorsi = [this.perorso+"caricamento.php",
              this.perorso+"load_dirette.php",this.perorso+"load_eventi.php",this.perorso+"load_conduttori.php",
              this.perorso+"modifica.php"];

  constructor(private http: HttpClient){}

  ngOnInit(): void {}

  alyo_get(url: string, dataformat:  FormData): Observable<any> {return this.http.post(url,dataformat); }
  alyo_post(url: string, dataformat:  FormData): Observable<any> { return this.http.post(url,dataformat); }

  alyo_load(dataformat:  any): Observable<any> { return this.alyo_get(this.percorsi[0],dataformat) }

  alyo_modifica(formDate: any): Observable<any> { return this.alyo_post(this.percorsi[1],formDate); }

  
}


