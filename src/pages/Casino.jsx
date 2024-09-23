import { useState } from 'react';

const Casino = () => {
    const [currentValue, setCurrentValue] = useState();
    const [rolling, setRolling] = useState(false);
    const [bets, setBets] = useState(Array(6).fill(0));
    const [winners, setWinners] = useState([]);

    // handle bet change
    const handleBetChange = (index, value) => {
        const newBets = [...bets];
        newBets[index] = value;
        setBets(newBets);
    };

    // handle start game
    const handleStartGame = () => {
        setRolling(true);

        setTimeout(() => {
            const winnerBox = calculateWinner(); 
            setCurrentValue(winnerBox);
            setRolling(false); 
            declareWinner(winnerBox);
        }, 1000); 
    };


    const calculateWinner = () => {
        const maxBet = Math.max(...bets); // fine max number
        const maxBetCount = bets.filter(bet => bet === maxBet).length; // filter all max length

        let excludedIndices = [];

        if (maxBetCount === 1) {
            excludedIndices.push(bets.indexOf(maxBet));
        } else if (maxBetCount === 2) {
            bets.forEach((bet, index) => {
                if (bet === maxBet) {
                    excludedIndices.push(index);
                }
            });
        } else if (maxBetCount === 3) {
            bets.forEach((bet, index) => {
                if (bet === maxBet) {
                    excludedIndices.push(index);
                }
            });
        }

      
        const validIndices = bets.map((bet, index) =>
            bet > 0 && !excludedIndices.includes(index) ? index : -1).filter(index => index !== -1);

        if (validIndices.length === 0) {
            return null; 
        }

        const randomIndex = validIndices[Math.floor(Math.random() * validIndices.length)];
        return randomIndex + 1; 
    };



    // declare winner
    const declareWinner = (value) => {
        if (bets[value - 1] > 0) {
            const newWinner = {
                box: value,
                bet: bets[value - 1]
            };
            setWinners(prevWinners => [...prevWinners, newWinner]);
        } else {
            setWinners(prevWinners => [...prevWinners, { box: value, bet: 0 }]);
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f4f4f4' }}>
            <h2>Casino Game</h2>

            <div style={{
                width: '100px',
                height: '100px',
                backgroundColor: '#ffffff',
                border: '2px solid black',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                margin: '0 auto',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
                transition: 'transform 0.2s ease',
                transform: rolling ? 'rotate(360deg)' : 'none',
            }}>
                <div style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: 'black',
                }}>
                    {currentValue || 1}
                </div>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                marginTop: '20px',
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
            }}>
                {bets.map((bet, index) => (
                    <div key={index} style={{
                        margin: '10px',
                        textAlign: 'center',
                        width: '30%',
                        backgroundColor: '#e7e7e7',
                        padding: '15px',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                    }}>
                        <input
                            type="number"
                            value={bet}
                            onChange={(e) => handleBetChange(index, parseInt(e.target.value) || 0)}
                            placeholder={`Bet on ${index + 1}`}
                            style={{ margin: '5px', padding: '10px', width: '80%' }}
                        />
                        <div style={{ marginTop: '5px' }}>Box {index + 1}</div>
                    </div>
                ))}
            </div>

            <button onClick={handleStartGame}
                disabled={rolling}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: rolling ? '#6c757d' : '#28a745',
                    cursor: rolling ? 'not-allowed' : 'pointer',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    marginBottom: '20px',
                }}>
                {rolling ? '....Rolling' : 'Start'}
            </button>

            {/* wining list */}
            <div style={{
                marginTop: '30px',
                backgroundColor: '#f9f9f9',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                width: '60%',
                height: '250px',
                margin: '0 auto',
                overflow: 'scroll'

            }}>
                <h3>Winners</h3>
                {winners.length === 0 ? (
                    <p>No winners!</p>
                ) : (
                    <ul>
                        {winners.map((winner, index) => (
                            <li key={index}>
                                Box {winner.box} won with a bet of {winner.bet}!
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Casino;
