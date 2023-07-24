import { Component, OnInit } from '@angular/core';
import { CrudTestService } from './service/crudtest.service';
import { Card } from './models/card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CRUDTest';
  cards: Card[] = [];
  card: Card = {
    id: '',
    cardNumber: '',
    cardHolderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: ''
  }

  constructor(private crudTestService: CrudTestService){

  }
  ngOnInit(): void {
    this.getAllCards();
  }

  getAllCards(){
    this.crudTestService.getAllCards()
    .subscribe(
      response => {
        this.cards = response;
      }
    );
  }

  onSubmit(){

    if(this.card.id === ''){
      this.crudTestService.addCard(this.card)
      .subscribe(
      response => {
        this.getAllCards();
        this.card = {
          id: '',
          cardNumber: '',
          cardHolderName: '',
          expiryMonth: '',
          expiryYear: '',
          cvc: ''
        };
      }
    );
    }
    else{
      this.updateCard(this.card);
    }
  }

  deleteCard(id: string){
    this.crudTestService.deleteCard(id)
    .subscribe(
      response =>{
        this.getAllCards();
      }
    );
  }

  populateForm(card: Card){
    this.card = card;
  }

  updateCard(card: Card){
    this.crudTestService.updateCard(card)
    .subscribe(
      response => {
        this.getAllCards();
      }
    );
  }
}

