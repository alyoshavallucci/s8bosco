import { Component, OnInit, SecurityContext } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import * as $ from 'jquery';
import { faClone, faCircleXmark, faPlus, faSliders, faTrashCan, faMinusCircle, faVideo, faCalendar, faUserGroup, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import "@ptkdev/webcomponent-instagram-widget";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { NameService } from './name.services';

// <!--versione 2.0-->

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //sezioni_sito = [true,false,false,false];
  sezioni_sito = [false,false,false,true];

  pre_percorso = "./../../assets/";
  pre_percorso2 = "./assets/";
  percorso_http = "./php/"
  // pre_percorso = "./../../s8bosco/assets/";
  // pre_percorso2 = "./s8bosco/assets/";

  cont = 0;
  cont_contenuti_primopiano = 0;
  cont_sfondi = 0;
  lista_nome_profilo = ["S8БФSϾФ","Ⓢ⑧ⒷⓄⓈⒸⓄ","Ṡ8ḄÖṠĊÖ","$8ßØ$ĈØ","𝒮𝟾𝐵𝒪𝒮𝒞𝒪","ꌗ8ꌃꂦꌗꉓꂦ","𝕊𝟠𝔹𝕆𝕊ℂ𝕆","💲8🅱️🅾️💲☪️🅾️","🅢8🅑🅞🅢🅒🅞","🅂8🄱🄾🅂🄲🄾"]

  percorso = [this.pre_percorso2+"conduttori/",this.pre_percorso2+"eventi/",this.pre_percorso2+"immagini_profilo/",this.pre_percorso2+"sfondo/"]
  user_instagram: any = {};
  lista_foto: any = [];
  lista_video_dinamico: any = [];
  mostra_bottoni_elimina = [false,false];
  autoplay = "?autoplay=1&mute=1"
  lista_cont = [0]

  lista_eventi_dinamico: any = [];
  lista_conduttori_dinamico: any = [];
  lista_contenuti_primopiano: any = [];

  faPlus = faPlus;
  faTrashCan = faTrashCan;
  faMinusCircle = faMinusCircle;
  faClone = faClone;
  faCircleXmark = faCircleXmark;
  faSliders = faSliders;
  faVideo =  faVideo;
  faCalendar = faCalendar;
  faUserGroup = faUserGroup;
  faAddressCard =  faAddressCard;
  loading = false;

  lista_video = [{id: 1,url: "https://www.youtube.com/embed/c3oQSQmOqb4", titolo: "londra"},
                 {id: 2,url: "https://www.youtube.com/embed/jXJwcqR5P0E", titolo: "Formentera"},
                 {id: 3,url: "https://www.youtube.com/embed/ue05b88zb8A", titolo: "ciao"},
                 {id: 4,url: "https://www.youtube.com/embed/lcruLvCn1Fg", titolo: "ciao"},
  ]

  lista_conduttori = [{ id: 1,
                        nome: "Jack Irriverente",
                        url: this.percorso[0]+"image1.jpeg"
                      },
                      { id: 2,
                        nome: "Mister IXI",
                        url: this.percorso[0]+"image2.jpeg"
                      },
                      { id: 3,
                        nome: "Principessa Figa",
                        url: this.percorso[0]+"image3.jpeg"
                      },
                      { id: 4,
                        nome: "Strabueno",
                        url: this.percorso[0]+"image4.jpeg"
                      },
                      { id: 5,
                        nome: "Signor Robbinson",
                        url: this.percorso[0]+"image5.jpeg"
                      },
                      { id: 6,
                        nome: "Pacca",
                        url: this.percorso[0]+"image6.jpeg"
                      }];

  lista_eventi = [{id: 1,tipo: "video",src: this.percorso[1]+"video1.MOV", titolo: "TUTTI ALLA GRIGLIATA",data: "10 Settembre 2022",luogo : "Carpi"},
                  {id: 2,tipo: "video",src: this.percorso[1]+"video2.MOV", titolo: "",data: "10 Settembre 2022",luogo : "Carpi"},
                  {id: 3,tipo: "video",src: this.percorso[1]+"video3.MOV", titolo: "",data: "10 Settembre 2022",luogo : "Carpi"}
                 ]

  lista_sfondi = [this.percorso[3]+"sfondo1.gif",this.percorso[3]+"sfondo2.gif",this.percorso[3]+"sfondo3.gif",this.percorso[3]+"sfondo4.gif"]

  constructor(private _sanitizer: DomSanitizer,private service: NameService) {
  }

  ngOnInit(): void {

    this.caricamentoDati()

    this.cont_contenuti_primopiano = 0;
    this.cont_sfondi = 1;
    this.cont = 2;

    setInterval(this.intervallo,10000);

    $(".alyo-log-copy").hide();

    this.lista_contenuti_primopiano = [
      {tipo: 1, url: this.percorso[2]+"image2.jpeg"},                       //img gufo
      {tipo: 1, url: this.percorso[2]+"image1.jpeg"},                       //img jek irriverente
      {tipo: 2, url: this.sanitize(this.lista_video[3].url+this.autoplay)}, //iframe yotutube
      {tipo: 1, url: this.percorso[2]+"image1.jpeg"},                       //img jek irriverente
    ]
  }

  caricamentoDati(): void {

    var formdate = new FormData();
    formdate.append("tabella","dirette");

    this.service.alyo_load(formdate).subscribe(dati => {
       for(let item of dati){
           this.lista_video_dinamico.push({id: item.id, url_sanitize: this.sanitize(item.url), url: item.url, titolo: {valore: item.titolo, item: null}})
       }
    });

    formdate = new FormData();
    formdate.append("tabella","eventi")    

    this.service.alyo_load(formdate).subscribe(dati => {
      for(let item of dati){
        this.lista_eventi_dinamico({id: item.id, tipo: item.tipo, src: item.src, titolo: {valore: item.titolo, item: null},data : item.data, luogo : {valore: item.luogo, item: null}})
      }
    });

    formdate = new FormData();
    formdate.append("tabella","conduttori")

    this.service.alyo_load(formdate).subscribe(dati => {
       for(let item of dati){
          this.lista_conduttori_dinamico.push({id: item.id, nome: {valore: item.nome, item: null}, url: item.url})
       }
    });

    this.lista_eventi_dinamico = [];
    this.lista_conduttori_dinamico = [];
    this.lista_contenuti_primopiano = [];


    for(let item of this.lista_video){
        this.lista_video_dinamico.push({id: item.id, url_sanitize: this.sanitize(item.url), url: item.url, titolo: {valore: item.titolo, item: null}})
    }

    for(let item of this.lista_eventi){
        this.lista_eventi_dinamico({id: item.id, tipo: item.tipo, src: item.src, titolo: {valore: item.titolo, item: null},data : item.data, luogo : {valore: item.luogo, item: null}})
    }

    for(let item of this.lista_conduttori){
        this.lista_conduttori_dinamico.push({id: item.id, nome: {valore: item.nome, item: null}, url: item.url})
    }

  }


  intervallo() {

      if(this.cont_sfondi > this.lista_sfondi.length-1){ this.cont_sfondi = 0; }
      if(this.cont > this.lista_nome_profilo.length-1){ this.cont = 0;}
      if(this.cont_contenuti_primopiano > this.lista_contenuti_primopiano.length-1){ this.cont_contenuti_primopiano = 0;}
      if(this.cont_sfondi > this.lista_sfondi.length-1){ this.cont_sfondi = 0;}

      $("body").css({"background-image":"url("+this.lista_sfondi[this.cont_sfondi]+")"})

      $("#nome_profilo").append("<h1 class='alyo-np-h1 alyo-posizione-assoluto alyo-sfocato-bianco-80 alyo-padding-10px alyo-bordo-rotondo-10px alyo-ombra' style='top: 50%; left: 250%; transform: translate(-50%, -50%);'>"+this.lista_nome_profilo[this.cont]+"</h1>");

      $(".alyo-np-h1:eq(0), .alyo-np-div:eq(0)").animate({left: '-=100%'},"linear");
      $(".alyo-np-h1:eq(1), .alyo-np-div:eq(1)").animate({left: '-=100%'},"linear");
      $(".alyo-np-h1:eq(2), .alyo-np-div:eq(2)").animate({left: '-=100%'},"linear");
      $(".alyo-np-h1:eq(3), .alyo-np-div:eq(3)").animate({left: '-=100%'},"linear");


      setTimeout(() => {

          $(".alyo-np-div:eq("+this.cont_contenuti_primopiano+")").css({"left": "250%"});
          $(".alyo-np-h1:eq(0)").remove();
          this.cont_contenuti_primopiano = this.cont_contenuti_primopiano+1;
      }, 1000);

      this.cont = this.cont+1;
      this.cont_sfondi = this.cont_sfondi+1;


  }

  contmeno(){
    this.lista_cont[0] = this.lista_cont[0]-1;
    return this.lista_cont[0];
  }

  sanitize(url: string){
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onkey(input: any){
    return input.target.value;
  }

  elimina(i: number){

    this.lista_video_dinamico = this.lista_video_dinamico.filter(filtro);

    function filtro(item: any,index: number){
      return i != index
    }
  }

  elimina_conduttore(i: number){

    this.lista_conduttori_dinamico = this.lista_conduttori_dinamico.filter(filtro);

    function filtro(item: any,index: number){
      return i != index
    }
  }

  trovaCarattere(dict: any,carattere: String){

        for (const [key, value] of Object.entries(dict)) {
             if(value == carattere){ return key; }
        }
        return carattere;
  }

  inseriscitesto(item: any,input: any): String{

    // console.log("------------------RICERCA----------------------")
    return this.convertiTesto(item,input.target.value);
    // console.log("-----------------------------------------------")
  }


  convertiTestoOriginale(item: any,testo: String): any {

    var testo_prov1 = "";
    for(var k of testo.toString()){ testo_prov1 += this.trovaCarattere(item.value,k); }
    //console.log("[ testo: "+testo+" ][ testo_prov1: "+testo_prov1+" ]");
    return testo_prov1;
  }


  convertiTesto(item: any,testo: any): any {

    var testo_prov2 = "";
    // console.log("[ ITEM: "+item+" ][ testo: "+testo+" ][ testo_prov2: "+testo_prov2+" ]");
    if(item != undefined){
    for(var k of testo.toString()){
      if(item.value[k]){ testo_prov2 += item.value[k]; }
      else{ testo_prov2 += k; }
    }}
    else { testo_prov2 = testo; }

    // console.log("[ testo: "+testo+" ][ testo_prov2: "+testo_prov2+" ]");
    return testo_prov2;
  }

  alyoCopy(text: any){


      var dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);

  }


  alyoLogCopy(index: number){

    if(index!= -1){
       $(".alyo-log-copy:eq("+index+")").fadeIn();
    }else{
       $("#alyo-log-copyall").fadeIn();
    }

    setTimeout(function alertFunc() {
         $(".alyo-log-copy:eq("+index+")").fadeOut();
         $("#alyo-log-copyall").fadeOut();
    }, 1500);

  }

  modifica(server: string[],testo: string){

    console.log("TABELLA [ "+server[0]+"]  ATTRIBUTO [ "+server[1]+" ] ID [ "+server[2]+" ] VALORE [ "+testo.valore+" ]")
    var formdate = new FormData();
    formdate.append("tabella",server[0]);
    formdate.append("attributo",server[1]);
    formdate.append("id",server[2]);
    formdate.append(server[1],testo);

    this.service.alyo_modifica(formdate).subscribe(dati => {
        console.log("MESSAGGIO: "+dati);
    });

  }

}
