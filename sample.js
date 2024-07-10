function randomFunnyMessage(){
    let randomMessageArr = ["You Are Bad At Guess", "Do You Want To Crash The GAME !!👀" , "Go And Play with Kids !" , "No Luck This TIMEEEE⬇️" ]
    let randomIndex = Math.floor(Math.random() * 4)
    
    console.log(randomMessageArr[randomIndex])
}

randomFunnyMessage()