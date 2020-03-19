import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class Player
  {
    static nextId()
    {
      return Player.id++;
    }
    
    id;
    nome;
    punteggio;
    mano;
    totale;

    constructor(nome)
    {
      this.id = Player.nextId();
      
      this.nome = nome;

      this.punteggio = 0;

      this.mano = new Array();

      this.totale = 0;
    }

    toString()
    {
        return this.nome;
    }
  }

let nomi = 
[
    'Asso',
    'Due',
    'Tre',
    'Quattro',
    'Cinque',
    'Sei',
    'Sette',
    'Fante',
    'Cavallo',
    'Re'
];

let valori = [1,2,3,4,5,6,7,8,9,10];

let colori =
[
    'Denari',
    'Spade',
    'Bastoni',
    'Coppe'
]

class Carta
{
  static nextId()
  {
    return Carta.id++;
  }
  
  id;
  nome;
  valore;
  colore;
  
  constructor(nome, valore, colore)
  {
    this.id = Carta.nextId();
    this.nome = nome;
    this.valore = valore;
    this.colore = colore;
  }

  toString()
  {
      return `${this.nome} di ${this.colore}`;
  }
}

class Deck
{
    
  listaCarte = [];

  indice = 0;

  constructor()
  {
      this.initialize();
  }

  initialize()
  {
      colori.forEach(element => {
          for (let i = 0; i<10; i++)
          {
              let carta = new Carta(nomi[i], valori[i], element);
  
              this.listaCarte.push(carta);
          }
      });
  }

  visualizzaDeck()
  {
      this.listaCarte.forEach(element => {
          console.log(element.toString());
      });
  }

  mescola = function ()
  {
      let counter = this.listaCarte.length - 1;
      
      while(counter > -1)
      {
          let indice = Math.floor(Math.random() * 9);
  
          let temp = this.listaCarte[counter];
  
          this.listaCarte[counter] = this.listaCarte[indice];
  
          this.listaCarte[indice] = temp;
  
          counter--;
      }
  
  }
}

let giocatori;

Player.id = 0;

Carta.id = 0;

let nuovoGiocatoreA = new Player("Achille");

let nuovoGiocatoreB = new Player("Ettore");

giocatori = [nuovoGiocatoreA, nuovoGiocatoreB];

let mazzo = new Deck();


class App extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      giocatori,
      listaCarte : mazzo.listaCarte,
    }

    this.onDismiss = this.onDismiss.bind(this); //Per far diventare onDimiss un metodo di classe. 
  }

  onDismiss(id){
    const updatedList = this.state.listaCarte.filter(carta => carta.id !== id);

    this.setState({listaCarte: updatedList});
  }

  render() {
      return (
        <div className="App">
          {this.state.listaCarte.map(item => (<div key={item.id}>
                                                      <span>ID: {item.id} </span>
                                                      <span>Nome: {item.nome} </span>
                                                      <span>Colore: {item.colore} </span>
                                                      <span>Valore: {item.valore}</span>
                                                      <span>
                                                        <button
                                                          onClick={()=>this.onDismiss(item.id)}
                                                          type="button">
                                                            Dismiss
                                                          </button>
                                                      </span>
                                                    </div>))}
        </div>
      );
  }
}
export default App;








/* CODICE IMPOSTATO AUTONOMAMENTE DALLE ULTIME VERSIONI DI CREATE-REACT CHE PERO' NON UTILIZZA LA CLASSE MA ANCORA LE FUNZIONE STILE ES5. BOH?!?
function App() {


  Player.id = 0;


  let nuovoGiocatoreA = new Player("Achille");

  let nuovoGiocatoreB = new Player("Ettore");

  giocatori = [nuovoGiocatoreA, nuovoGiocatoreB];

  return (
    <div className="App">
      {giocatori.map(item => (<div key={item.id}>
                                <span>ID: {item.id} </span>
                                <span>Nome: {item.nome} </span>
                                <span>Punteggio: {item.punteggio} </span>
                                <span>Totale: {item.totale}</span>
                              </div>))}
    </div>
  );


}

export default App;*/