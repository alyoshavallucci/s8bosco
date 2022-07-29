import { Component, OnInit, SecurityContext } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import * as $ from 'jquery';
import { faClone, faCircleXmark, faPlus, faSliders, faTrashCan, faMinusCircle, faVideo, faCalendar, faUserGroup, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import "@ptkdev/webcomponent-instagram-widget";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { NameService } from './name.services';

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

  lista_video = [{src: "https://www.youtube.com/embed/c3oQSQmOqb4", titolo: "londra"},
                 {src: "https://www.youtube.com/embed/jXJwcqR5P0E", titolo: "Formentera"},
                 {src: "https://www.youtube.com/embed/ue05b88zb8A", titolo: "ciao"},
                 {src: "https://www.youtube.com/embed/lcruLvCn1Fg", titolo: "ciao"},
  ]

  lista_conduttori = [{
                        nome: "Jack Irriverente",
                        url: this.percorso[0]+"image1.jpeg"
                      },
                      {
                        nome: "Mister IXI",
                        url: this.percorso[0]+"image2.jpeg"
                      },
                      {
                        nome: "Principessa Figa",
                        url: this.percorso[0]+"image3.jpeg"
                      },
                      {
                        nome: "Strabueno",
                        url: this.percorso[0]+"image4.jpeg"
                      },
                      {
                        nome: "Signor Robbinson",
                        url: this.percorso[0]+"image5.jpeg"
                      },
                      {
                        nome: "Pacca",
                        url: this.percorso[0]+"image6.jpeg"
                      }];

  lista_eventi = [{mese: "Agosto",
                   lista: [{tipo: "video",src: this.percorso[1]+"video1.MOV", titolo: "TUTTI ALLA GRIGLIATA",data: "10 Settembre 2022",luogo : "Carpi", colore: "alyo-grigio10"}]
                  },
                  {mese: "Luglio",
                   lista: [{tipo: "video",src: this.percorso[1]+"video2.MOV", titolo: "",data: "10 Settembre 2022",luogo : "Carpi", colore: "alyo-grigio10"},
                           {tipo: "video",src: this.percorso[1]+"video3.MOV", titolo: "",data: "10 Settembre 2022",luogo : "Carpi", colore: "alyo-grigio10"}
                          ]
                  }
                  ]

  lista_sfondi = [this.percorso[3]+"sfondo1.gif",this.percorso[3]+"sfondo2.gif",this.percorso[3]+"sfondo3.gif",this.percorso[3]+"sfondo4.gif"]

  constructor(private _sanitizer: DomSanitizer,private nameService: NameService) {
  }

  ngOnInit(): void {

    for(let item of this.lista_video){
       this.lista_video_dinamico.push({src: this.sanitize(item.src),url: item.src, titolo: {valore: item.titolo, item: null}})
    }

    for(let item of this.lista_conduttori){
      this.lista_conduttori_dinamico.push({nome: {valore: item.nome, item: null}, url: item.url})
    }

    for(let item of this.lista_eventi){
      var lista3 = [];
      for(let item2 of item.lista){
          lista3.push({tipo: item2.tipo, src: item2.src, titolo: {valore: item2.titolo, item: null},data : item2.data, luogo : {valore: item2.luogo, item: null}})
      }

      this.lista_eventi_dinamico.push({mese: item.mese, lista: lista3})
    }

    this.lista_video_dinamico = this.lista_video_dinamico.reverse();

    this.cont_contenuti_primopiano = 0;
    this.cont_sfondi = 1;
    this.cont = 2;

    setInterval(() => {

                if(this.cont_sfondi > this.lista_sfondi.length-1){ this.cont_sfondi = 0; }
                if(this.cont > this.lista_nome_profilo.length-1){ this.cont = 0;}
                if(this.cont_contenuti_primopiano > this.lista_contenuti_primopiano.length-1){ this.cont_contenuti_primopiano = 0;}
                if(this.cont_sfondi > this.lista_sfondi.length-1){ this.cont_sfondi = 0;}

                $("body").css({"background-image":"url("+this.lista_sfondi[this.cont_sfondi]+")"})

                // let codice = "<div class='alyo-np-div alyo-posizione-assoluto alyo-padding-10px alyo-altezza-100 alyo-larghezza-100' style='top: 50%; left: 250%;  transform: translate(-50%, -50%);'>"

                // if(this.lista_contenuti_primopiano[this.cont_contenuti_primopiano].tipo == 1) {
                //   codice +=  "<img class='alyo-bordo-efefef alyo-bordo-rotondo-20px alyo-ombra alyo-altezza-100 alyo-larghezza-100' src='"+this.lista_contenuti_primopiano[this.cont_contenuti_primopiano].url+"'>"
                // }

                // if(this.lista_contenuti_primopiano[this.cont_contenuti_primopiano].tipo == 2) {
                //   codice += "<iframe class='alyo-bordo-efefef alyo-bordo-rotondo-20px alyo-ombra alyo-altezza-100 alyo-larghezza-100' src='"+this.lista_contenuti_primopiano[this.cont_contenuti_primopiano].url+this.autoplay+"' name='youtube embed' allow='autoplay; encrypted-media' allow='autoplay' frameborder='0' allowfullscreen>"
                //          +"  </iframe>"
                // }

                // if(this.lista_contenuti_primopiano[this.cont_contenuti_primopiano].tipo == 3) {

                //   codice += "<div class='row alyo-bordo-efefef alyo-bordo-rotondo-20px alyo-ombra alyo-altezza-100 alyo-larghezza-100 "+this.lista_contenuti_primopiano[1].url.colore+"' style='margin: 0px; padding: 10px;'>"
                //          +" <div  style='width: 20%; margin: 0px; padding: 0px; overflow: hidden;'>"
                //   if(this.lista_contenuti_primopiano[this.cont_contenuti_primopiano].url.tipo == 'immagine'){
                //      codice +="<img class='alyo-bordo-rotondo-10px alyo-larghezza-100' src='"+this.lista_contenuti_primopiano[1].url.src+"'>"
                //   }
                //   else{
                //   codice +="<video class='alyo-zoom-interno alyo-larghezza-100 alyo-bordo-rotondo-10px' style='border-radius: 10px;' controls >"
                //          +"<source src='"+this.lista_contenuti_primopiano[1].url.src+"' >"
                //          +"</video>"
                //   }
                //   codice +=" </div>"
                //          +" <div class='alyo-padding-5px' style='margin: 0px; padding: 5px; width: 80%;'>"
                //          +"   <h3 class='alyo-testo-centro'>"+this.lista_contenuti_primopiano[1].url.titolo +"</h3>"
                //          +"   <h3 class='alyo-testo-centro'>"+this.lista_contenuti_primopiano[1].url.luogo +"</h3>"
                //          +"   <h3 class='alyo-testo-centro'>"+this.lista_contenuti_primopiano[1].url.data +"</h3>"
                //          +" </div>"
                //   +"</div>";

                // }

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

    },10000);

    setInterval(this.intervallo,10000);

    $(".alyo-log-copy").hide();

    this.lista_contenuti_primopiano = [
      {tipo: 1, url: this.percorso[2]+"image2.jpeg"},                       //img gufo
      {tipo: 1, url: this.percorso[2]+"image1.jpeg"},                       //img jek irriverente
      {tipo: 2, url: this.sanitize(this.lista_video[3].src+this.autoplay)}, //iframe yotutube
      {tipo: 1, url: this.percorso[2]+"image1.jpeg"},                       //img jek irriverente
    ]

    this.loadDirette();
  }

  loadDirette(): void {
   // this.nameService.onService().subscribe(res => {console.log("VETTORE: "+res)}, err=>{console.log("ERRORE: "+err)});
    this.nameService.onService();
  }


  intervallo() {

      if(this.cont_sfondi > this.lista_sfondi.length-1){ this.cont_sfondi = 0; }
      if(this.cont > this.lista_nome_profilo.length-1){ this.cont = 0;}
      if(this.cont_contenuti_primopiano > this.lista_contenuti_primopiano.length-1){ this.cont_contenuti_primopiano = 0;}
      if(this.cont_sfondi > this.lista_sfondi.length-1){ this.cont_sfondi = 0;}

      $("body").css({"background-image":"url("+this.lista_sfondi[this.cont_sfondi]+")"})

      // let codice = "<div class='alyo-np-div alyo-posizione-assoluto alyo-padding-10px alyo-altezza-100 alyo-larghezza-100' style='top: 50%; left: 250%;  transform: translate(-50%, -50%);'>"

      // if(this.lista_contenuti_primopiano[this.cont_contenuti_primopiano].tipo == 1) {
      //   codice +=  "<img class='alyo-bordo-efefef alyo-bordo-rotondo-20px alyo-ombra alyo-altezza-100 alyo-larghezza-100' src='"+this.lista_contenuti_primopiano[this.cont_contenuti_primopiano].url+"'>"
      // }

      // if(this.lista_contenuti_primopiano[this.cont_contenuti_primopiano].tipo == 2) {
      //   codice += "<iframe class='alyo-bordo-efefef alyo-bordo-rotondo-20px alyo-ombra alyo-altezza-100 alyo-larghezza-100' src='"+this.lista_contenuti_primopiano[this.cont_contenuti_primopiano].url+this.autoplay+"' name='youtube embed' allow='autoplay; encrypted-media' allow='autoplay' frameborder='0' allowfullscreen>"
      //          +"  </iframe>"
      // }

      // if(this.lista_contenuti_primopiano[this.cont_contenuti_primopiano].tipo == 3) {

      //   codice += "<div class='row alyo-bordo-efefef alyo-bordo-rotondo-20px alyo-ombra alyo-altezza-100 alyo-larghezza-100 "+this.lista_contenuti_primopiano[1].url.colore+"' style='margin: 0px; padding: 10px;'>"
      //          +" <div  style='width: 20%; margin: 0px; padding: 0px; overflow: hidden;'>"
      //   if(this.lista_contenuti_primopiano[this.cont_contenuti_primopiano].url.tipo == 'immagine'){
      //      codice +="<img class='alyo-bordo-rotondo-10px alyo-larghezza-100' src='"+this.lista_contenuti_primopiano[1].url.src+"'>"
      //   }
      //   else{
      //   codice +="<video class='alyo-zoom-interno alyo-larghezza-100 alyo-bordo-rotondo-10px' style='border-radius: 10px;' controls >"
      //          +"<source src='"+this.lista_contenuti_primopiano[1].url.src+"' >"
      //          +"</video>"
      //   }
      //   codice +=" </div>"
      //          +" <div class='alyo-padding-5px' style='margin: 0px; padding: 5px; width: 80%;'>"
      //          +"   <h3 class='alyo-testo-centro'>"+this.lista_contenuti_primopiano[1].url.titolo +"</h3>"
      //          +"   <h3 class='alyo-testo-centro'>"+this.lista_contenuti_primopiano[1].url.luogo +"</h3>"
      //          +"   <h3 class='alyo-testo-centro'>"+this.lista_contenuti_primopiano[1].url.data +"</h3>"
      //          +" </div>"
      //   +"</div>";

      // }

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
}
