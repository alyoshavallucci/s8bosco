import { Component } from '@angular/core';
import { faClone } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import { faTree } from '@fortawesome/free-solid-svg-icons'
import { range } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'esercizi';
  faClone = faClone;
  faTree = faTree;
  numero_palline = 10;

  ngOnInit(): void {

    // for(var i=0; i<this.numero_palline; i++){

    //   let x = Math.random() * 100;
    //   let y = Math.random() * 100;

    //   $(".alyo-animazione-sfondo:eq("+i+")").css({ left: x+"%",  top: y+"%"});

    //   x = Math.random() * 100;
    //   y = Math.random() * 100;

    //   $(".alyo-animazione-sfondo:eq("+i+")").animate({ left: x+"%",  top: y+"%"},5000, 'linear');

    // }

    // setInterval(() => {

    //     for(var i=0; i<10; i++){

    //     let x = Math.random() * 100;
    //     let y = Math.random() * 100;

    //     $(".alyo-animazione-sfondo:eq("+i+")").animate({ left: x+"%",  top: y+"%"},5000, 'linear');

    //     }

    // }, 1000);

    // let x_inizio = ["0","5"]

    // var vettore = range(10);
    // var codice = "";
    // var posizione = x_inizio[0];
    // vettore.forEach(myFunction);


    // function myFunction(item: number){
    //   posizione += 15;
    //   codice += "<div style='left: 10px; top: "+posizione+"rem; width: 10rem; height: 10rem;' class='alyo-verde alyo-animazione-sfondo alyo-posizione-fisso alyo-bordo-rotondo-50'></div>";
    // }

    // $("#alyo-sfondo").html(codice);

    // $(".alyo-animazione-sfondo").animate({ left: "110%"},15000, 'linear');

    // setInterval(() => {

    //   posizione = x_inizio[1];
    //   vettore.forEach(myFunction);

    //   function myFunction(item: number){
    //     posizione += 15;
    //     codice += "<div style='left: 10px; top: "+posizione+"rem; width: 10rem; height: 10rem;' class='alyo-verde alyo-animazione-sfondo alyo-posizione-fisso alyo-bordo-rotondo-50'></div>";
    //   }

    //   $("#alyo-sfondo").html(codice);

    //   $(".alyo-animazione-sfondo").animate({ left: "110%"},15000, 'linear');


    // }, 1000);







  }
}
