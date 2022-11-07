const startGameButton=document.querySelector("header button");
const backdrop=document.getElementById("backdrop");
// const userInputs=document.getElementById("userInput"); //dont work

const inputGameModal=document.getElementById("input-modal");
const cancelGameInputButton=inputGameModal.querySelector(".btn--passive");
const confirmGameInputButton=inputGameModal.querySelector(".btn--success");

const userInputs=inputGameModal.querySelectorAll("Input");

const invalidInputModal=document.getElementById('invalidInput-modal');
const tryAgainButton=invalidInputModal.querySelector('.btn--tryAgain');
const NotTryAgainButton=invalidInputModal.querySelector('.btn--passive');

const playAgainModal=document.getElementById('playAgain-modal');
const playAgainButton=playAgainModal.querySelector('.btn--playAgain');
const NotPlayAgainButton=playAgainModal.querySelector('.btn--passive');

//GAME CONSTANTS
const STONE='STONE';
const PAPER='PAPER';
const SCISSOR='SCISSOR';
const DEFAULT_USER_CHOICE='STONE';
let GAME_RUNNING=false;
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER_WINS';

const funcToggleBackdrop=()=>{
    backdrop.classList.toggle('visible');
};
const funcClearGameInput= () => {
    userInputs[0].value="";
    // for (const usrInput of userInputs) {
    //   usrInput.value = ' ';
    // }
};
const funcShowGameModal=()=>{
    inputGameModal.classList.add("visible");
    funcToggleBackdrop();
};
const funcCloseGameModal=()=>{
    inputGameModal.classList.remove("visible");
    funcToggleBackdrop();
};
const funcShowInvalidInputModal=()=>{
    invalidInputModal.classList.add("visible");
};
const funcCLoseInvalidInputModal=()=>{
    invalidInputModal.classList.remove("visible");
};
const funcShowPlayAgainModal=()=>{
    playAgainModal.classList.add("visible");
};
const funcClosePlayAgainModal=()=>{
    playAgainModal.classList.remove("visible");
    funcToggleBackdrop();
};
const funcBackdropClickHandler=()=>{
    funcCloseGameModal();
    funcClearGameInput();
    funcCLoseInvalidInputModal();
}
const funcCancelGameInputHandler=()=>{
    funcClearGameInput();
    funcCloseGameModal();
}
const funcShowTryAgainModal=()=>{
    funcShowGameModal();
    funcCLoseInvalidInputModal();
    funcToggleBackdrop();
};
const funcCloseTryAgainModal=()=>{
    funcCloseGameModal();
    funcCLoseInvalidInputModal();
};
const funcPlayAgainButtonHandler=()=>{
    funcClosePlayAgainModal();
    funcShowGameModal();
}


//-------GETTING PLAYER CHOICE------
const funcGetPlayerChoice=()=>{
    let selection=userInputs[0].value.trim().toUpperCase();
    if(selection!==STONE && selection!==PAPER && selection!==SCISSOR)
    {
          funcClearGameInput();
          funcCloseGameModal();
          funcShowInvalidInputModal();
          funcToggleBackdrop();
          return -1; //If Invalid Input
    }
    funcToggleBackdrop();
    return selection; //If Valid Input
}

//-------GETTING COMPUTER CHOICE------
const funcGetComputerChoice=()=>{
    const SelectedRandomValue=Math.random();
    if(SelectedRandomValue<0.33) return STONE;
    else if(SelectedRandomValue<0.67) return PAPER;
    else return SCISSOR;
}

//-------Deciding Winner---------
const funcGetWinner=(playerChoice,computerChoice)=>{
    if(playerChoice===computerChoice) return RESULT_DRAW;
    else if(
      playerChoice===STONE && computerChoice===SCISSOR ||
      playerChoice===PAPER && computerChoice===STONE ||
      playerChoice===SCISSOR && computerChoice===PAPER ) 
      return RESULT_PLAYER_WINS ;
    else return RESULT_COMPUTER_WINS;
}

//Check & Show Result if valid input
const funcCheckResultHandler=()=>{
    const playerChoice=funcGetPlayerChoice();
    if(playerChoice!==-1) //If Valid Input
    {
        const computerChoice=funcGetComputerChoice();
        const result=funcGetWinner(playerChoice,computerChoice);
        let message=`Your's choice :-${playerChoice}\nComputer's choice :-${computerChoice}\nTherefore you `;
        if(result===RESULT_DRAW) {message=message+"had A draw.";}
        else if(result===RESULT_PLAYER_WINS) {message=message+"won.";}
        else {message=message+"lost.";}
        funcClearGameInput();
        funcCloseGameModal();
        alert(message);
        funcShowPlayAgainModal();
    }
}

startGameButton.addEventListener('click',funcShowGameModal);
//backdrop.addEventListener("click",funcBackdropClickHandler);

confirmGameInputButton.addEventListener("click",funcCheckResultHandler);
cancelGameInputButton.addEventListener("click",funcCancelGameInputHandler);

tryAgainButton.addEventListener("click",funcShowTryAgainModal);
NotTryAgainButton.addEventListener("click",funcCloseTryAgainModal);

playAgainButton.addEventListener("click",funcPlayAgainButtonHandler);
NotPlayAgainButton.addEventListener("click",funcClosePlayAgainModal);