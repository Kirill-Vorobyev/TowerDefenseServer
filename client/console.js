displayConsoleInput = (input) => {
    var consoleOutput = $('#console-output');
    var newLine = $('<pre/>').text(input);
    consoleOutput.append(newLine);
    consoleOutput.scrollTop(consoleOutput[0].scrollHeight);
}

handleConsoleInput = () => {
    var consoleInput = $('#console-input');
    var input = consoleInput.val();
    if(input == ""){
        input = " ";
    }
    consoleInput.val("");
    displayConsoleInput(input);
}

bindConsoleInputEvent = () => {
    $('#console-input').keypress(function(e){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            handleConsoleInput();
        }
    })
}