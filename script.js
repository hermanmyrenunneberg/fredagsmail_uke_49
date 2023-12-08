document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const boardSize = 3;
    let minePositions = new Set();
    let revealedSquares = 0;
    let totalSquares = boardSize * boardSize;
    let totalMines = 2;

    // Funksjon for å generere rutenettet og plassere miner
    function initializeGame() {
        minePositions.clear();
        revealedSquares = 0;
        gameBoard.innerHTML = '';
        for (let i = 0; i < totalSquares; i++) {
            const square = document.createElement('div');
            square.dataset.index = i;
            square.addEventListener('click', function(e) {
                clickSquare(square);
            });
            gameBoard.appendChild(square);
        }
        placeMines();
    }

    // Funksjon for å plassere miner tilfeldig
    function placeMines() {
        while (minePositions.size < totalMines) {
            const position = Math.floor(Math.random() * totalSquares);
            minePositions.add(position);
        }
    }

    // Funksjon som kjøres når en celle klikkes
    function clickSquare(square) {
        const index = parseInt(square.dataset.index);
        if (minePositions.has(index)) {
            square.classList.add('mine');
            revealMines();
            setTimeout(() => {
                alert('Boom! Du traff en mine. Spillet starter på nytt.');
                initializeGame();
            }, 100);
        } else {
            if (!square.classList.contains('revealed')) {
                revealedSquares++;
                square.classList.add('revealed');
                const mines = calculateMines(index);
                square.textContent = mines > 0 ? mines : '';
                if (revealedSquares === totalSquares - totalMines) {
                    setTimeout(showWinMessage, 100);
                }
            }
        }
    }

    // Funksjon for å vise vinnermeldingen
    function showWinMessage() {
        const winMessage = document.createElement('div');
        winMessage.className = 'win-message';
        winMessage.innerHTML = `
            <strong>Wonka-premiere</strong>
            <p>Har du savnet Timothée Chalamet? Eller er du veldig glad i Charlie og sjokoladefabrikken-universet? Da bør du ta turen til en kino nær deg i løpet av helgen. Ikke bare spilles selveste Willy av ovennevnte, hele galleriet er stjernespekket. Og filmen er faktisk bra.</p>
            
            <strong>Oransjevin-smaking til vegetarmat</strong>
            <p>Har du ikke troen på at juleveggismat og oransjevin kan pares? Da kanskje du lar deg overbevise her. På ett av helgens mange julemarkeder – ja, du gjettet rett: Oslo vegetarfestival sitt – kan du lære om tre typer som passer til en klassisk vegansk julematvariant.</p>
            <p><strong>Hvor:</strong> Doga, Hausmanns gate 16</p>
            <p><strong>Når:</strong> Lørdag kl. 15 og søndag kl. 16</p>
            <p><strong>Pris:</strong> Må ha dags (170,-)- eller helgepass (220,-) til festivalen.</p>
            
            <strong>Vintermarked på Stikling</strong>
            <p>De har unngått ordet jul, men det er nok fullt mulig å finne noe å legge under ett eller flere trær også på dette markedet. Det blir selvsagt mulig å kjøpe stiklinger og planter, men i tillegg kan du meske deg i en rekke andre boder. Bøker, lys, smykker, votter – du skjønner greia.</p>
            <p><strong>Hvor:</strong> Grønlandsleiret 31A</p>
            <p><strong>Når:</strong> Lørdag og søndag 12–17</p>
            
            <strong>Mongoland på Cinemateket</strong>
            <p>Det er ikke så enkelt å finne ujulete ting å gjøre i desember. Kanskje skal det ikke være sånn heller? En 20 år gammel romantisk komedie på lavbudsjett med en handling lagt til julen, byr uansett på noe mer enn det som befinner seg på topplisten hos Netflix. Kanskje er det nettopp i denne salen du finner julestemningen?</p>
            <p><strong>Hvor:</strong> Dronningens Gate 16</p>
            <p><strong>Når:</strong> Fredag kl. 20</p>
            <p><strong>Pris:</strong> 90,-</p>
            
            <strong>Konsert med Smiling Magnus Skaug</strong>
            <p>I helgen står blant annet Johan Hansson Liljeberg, gitarist i Honningbarna og Magnus Skaug på scenen. Ord du kan få bruk for til å beskrive det i etterkant er prog, rock, eksperimentell og mathroom pop(?).</p>
            <p><strong>Hvor:</strong> Dunk, Bernt Ankers gate 21</p>
            <p><strong>Når:</strong> Fredag kl. 20</p>
            <p><strong>Pris:</strong> 225,-</p>
        `;
        document.body.appendChild(winMessage);
    }

    // Funksjon for å avsløre alle miner
    function revealMines() {
        minePositions.forEach(index => {
            const square = gameBoard.children[index];
            square.classList.add('mine');
        });
    }

    // Funksjon for å beregne og vise antall nærliggende miner for et gitt felt
    function calculateMines(index) {
        const row = Math.floor(index / boardSize);
        const col = index % boardSize;
        let mines = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
                    const newIndex = newRow * boardSize + newCol;
                    if (minePositions.has(newIndex)) {
                        mines++;
                    }
                }
            }
        }
        return mines;
    }

    initializeGame();
});
