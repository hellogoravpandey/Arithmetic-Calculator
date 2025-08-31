let operationArray = ["+", "-", "*", "/","^"];

function precedence(char) {
    if (char === "+") return 1;
    if (char === "-") return 1;
    if (char === "*") return 2;
    if (char === "/") return 2;
    if ( char==="^") return 3;
}

function tokenize(expr) {
    return expr.match(/\d+\.\d+|\d+|[()+\-*/^]/g);    
}


function infixToPostfix(expression) { // 6666+1666  
    let stack = [];
    let postfix = []; 
    const tokens = tokenize(expression); // array
    console.log(tokens);
    for ( let token of tokens){
        if ( token==="(") stack.push(token);
        else if (!isNaN(token)) postfix.push(token);
        else if ( token===")"){
            while (stack.length && stack[stack.length-1]!="("){
              postfix.push(stack.pop())   
            }
            if (stack.length) stack.pop() 
        }
        else if (operationArray.includes(token)) {
            while (stack.length && stack[stack.length-1]!="(" && precedence(token)<=precedence(stack[stack.length-1]) ) {
                postfix.push(stack.pop());
            }
            stack.push(token);
        }
    }
    while (stack.length > 0) {
        postfix.push(stack.pop());
    }
    return postfix;
    }


function postfixEvaluation(expression) {
        let output_stack=[];
    for (let i = 0; i < expression.length; i++) {
        //  .contains any operator  ===> pop*2 and push onto the stack 
        //   do until the end  
        if (operationArray.includes(expression[i])) {
            let e2 = Number(output_stack.pop());
            let e1 =Number(output_stack.pop());
            console.log(e2**e1);
            switch (expression[i]) {
                case "+": output_stack.push(e1 + e2); break;
                case "-": output_stack.push(e1 - e2); break;
                case "*": output_stack.push(e1 * e2); break;
                case "/": output_stack.push(e1 / e2); break;
                case "^": output_stack.push(e1 ** e2); break;
            }
        }
        else if (!isNaN(expression[i])) output_stack.push((expression[i]));

    }

    return output_stack[output_stack.length - 1];
}


// Main User Interaction 
const screen = document.querySelector(".screen");
const calculator = document.querySelector(".calculator");   // event delegation 

let stack = [];
calculator.addEventListener("click", printOnScreen);
calculator.addEventListener("keydown", printOnScreen);


function printOnScreen(e) {
    let screenText=screen.textContent;   // refresh  666
    let char=e.target.id;
      // main operations  
    if ( char==="c") {
        screen.textContent="";
        return;
    }
    if (char === "=") {
        const postfixExp = infixToPostfix(screenText)  
        console.log("the postfix expresssion",postfixExp);
        const result = postfixEvaluation(postfixExp);
        screen.textContent = result;
        return;
    }

    // appending after click
    if ( screenText.length>0 && isNaN(char) && screenText[screenText.length-1]===char)  return;

  
    if ( char==="x"){
        screen.textContent=screenText.length>0?screenText.slice(0,-1):"";
        return;
    }

    screen.textContent+=char;
}