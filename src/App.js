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

function isSearched(searchTerm)
{
  return function (item)
  {
    return item.nome.toLowerCase().includes(searchTerm.toLowerCase()); //Ritorna un boolean
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
      searchTerm: '',
      manoA: giocatori[0].mano,
    }

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this); //Per far diventare onDimiss un metodo di classe. 
    this.carta = this.cartaGiu.bind(this);
  }

  onDismiss(id){
    const updatedList = this.state.listaCarte.filter(carta => carta.id !== id);

    this.setState({listaCarte: updatedList});
  }

  onSearchChange(event) 
  {
    this.setState({searchTerm: event.target.value});
  }

  cartaGiu()
  {
    const manoUp = this.state.listaCarte[0];
    
    this.setState(
      {
        manoA:manoUp
      }
    );
  }

  render() {
      return (
        <div className="page">
          <div className="interactions">
            <Search 
              value = {this.state.searchTerm}
              onChange = {this.onSearchChange}
            >
              Cerca
            </Search>
          </div>

          <Blocchetto
          list = {this.state.giocatori}
          >
          </Blocchetto>
          
          <Button
          onClick={()=>this.cartaGiu()}
          type="button"
          >
            Aggiungi Carta
          </Button>

          {/* <Table 
            list = {this.state.listaCarte}
            pattern = {this.state.searchTerm}
            onDismiss = {this.onDismiss}
          /> */}
        </div>
      );
  }
}

class Blocchetto extends Component
{
  render()
  {
    const {children, 
            list,
            className = '',
          } = this.props;

    return(
      list.map(item => 
        (
          <span className="table-row">
            <span>Nome:</span> <span className="casella">{item.nome}</span>
            <span>Totale:</span> <span className="casella"> {item.totale}</span>
            <span>Punteggio:</span> <span className="casella"> {item.punteggio}</span>
            <span>Mano:</span> <span className="casella"> {item.mano}</span>
          </span>
        )
      )
    );
  }
}

class Search extends Component
{
  render()
  {
    const {value, onChange, children} = this.props;

    return(
      <form>
          {children}<input
            type = "text"
            value = {value}
            onChange = {onChange}
          />
      </form>
    );
  }
}

class Table extends Component
{
  render()
  {
    const {list, pattern, onDismiss} = this.props;

    return(
    <div className="table">
      {list.filter(isSearched(pattern)).map(item => (<div key={item.id} className= "table-row">
                                                      <span>ID: {item.id} </span>
                                                      <span>Nome: {item.nome} </span>
                                                      <span>Colore: {item.colore} </span>
                                                      <span>Valore: {item.valore}</span>
                                                      <span>
                                                        <Button
                                                          onClick={()=> onDismiss(item.id)}
                                                          type="button"
                                                          className="buttom-inline"
                                                          >
                                                            Dismiss
                                                          </Button>
                                                      </span>
                                                    </div>))}
      
    </div>
    );
  }
}

class Button extends Component
{
  render()
  {
    const
    {
      onClick,
      className = '',
      children,
    } = this.props;

    return(
      <button
        onClick = {onClick}
        className = {className}
        type = "button"
      >
        {children}
      </button>
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

export default App;






/* CODICE FUNZIONANTE SENZA SEPARAZIONE DEI COMPONENT. Rif.: Fino a "Split up Component"

class App extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      giocatori,
      listaCarte : mazzo.listaCarte,
      searchTerm: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this); //Per far diventare onDimiss un metodo di classe. 
  }

  onDismiss(id){
    const updatedList = this.state.listaCarte.filter(carta => carta.id !== id);

    this.setState({listaCarte: updatedList});
  }

  onSearchChange(event) 
  {
    this.setState({searchTerm: event.target.value});
  }

  render() {
      return (
        <div className="App">

          <form>
            <input
            type="text"
            value={this.state.searchTerm}// Da capire meglio. Rif. libro React par. "Controlled Component"
            onChange={this.onSearchChange}
            />
          </form>

          {this.state.listaCarte.filter(isSearched(this.state.searchTerm)).map(item => (<div key={item.id}>
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

*/






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