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

let giocatori;

Player.id = 0;

let nuovoGiocatoreA = new Player("Achille");

let nuovoGiocatoreB = new Player("Ettore");

giocatori = [nuovoGiocatoreA, nuovoGiocatoreB];


class App extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      giocatori,
    }

    this.onDismiss = this.onDismiss.bind(this); //Per far diventare onDimiss un metodo di classe. 
  }

  onDismiss(id){
    const updatedList = this.state.giocatori.filter(giocatore => giocatore.id !== id);

    this.setState({giocatori: updatedList});
  }

  render() {
      return (
        <div className="App">
          {this.state.giocatori.map(item => (<div key={item.id}>
                                    <span>ID: {item.id} </span>
                                    <span>Nome: {item.nome} </span>
                                    <span>Punteggio: {item.punteggio} </span>
                                    <span>Totale: {item.totale}</span>
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