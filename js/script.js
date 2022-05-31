/*Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html,
e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).
Il computer deve generare 16 numeri casuali compresi nel range della griglia: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
*/


let gridContainer = document.querySelector(".grid-container")
let punteggio = 0
let gameOver = false;

// genero una lista di numeri che saranno le mie bombe
function generateListBombs(maxCells){
    let listBombs = [];

    do{
        const randomNumber = Math.floor(Math.random() * maxCells)+1
        if (!listBombs.includes(randomNumber)) {
            listBombs.push(randomNumber)
        }
    }while (listBombs.length < 16) 

    return listBombs
}


function generateGrid (xCells, yCells){

    // Numero totale di celle da creare
    let totCells = xCells * yCells;

    // imposto grandezza griglia
    gridContainer.style.width = `calc(50px * ${xCells})`;

    let listBombs = generateListBombs(totCells)
    console.log(listBombs)

    renderGrid(totCells, listBombs)


}


function renderGrid(totCells, listBombs){

    // ciclo che crea il numero di celle 
    for (let i = 1; i <= totCells; i++) {
        
        const cell = document.createElement("div")
        cell.classList.add("cell")
        cell.textContent = i;
        cell.dataset.indice = i;

        // aggiungo evento sulla cella
        cell.addEventListener("click", function (){
            
            //controllo se la cella cliccata ha la classe bomb o la classe clicked oppure game over è true
            if (this.classList.contains("bomb") || this.classList.contains("clicked") || gameOver) {
                return
            }

            cellIndex = +cell.dataset.indice
            console.log(cellIndex)
            
            if (listBombs.includes(cellIndex)) {
                cell.classList.add("bomb")

                // imposto la variabile gameover a true per indicare che l utente ha perso
                gameOver = true
                renderGameOver();
            }else{
                //aggiungo la classe clicked
                cell.classList.add("clicked")

                // aumento il punteggio
                punteggio++;
            }
        })

        gridContainer.append(cell);

        
    }
}


generateGrid(8,8)

// informa l utente ch eil gioco è finito
function renderGameOver() {
    alert("il gioco è finito. hai totalizzato: " + punteggio + " punti")
}