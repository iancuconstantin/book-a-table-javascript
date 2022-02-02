const button = document.querySelector("#submit");
button.addEventListener("click", (event)=>{
    event.preventDefault()
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const number = document.getElementById("guests").value;
    const validation = `Rezervare realizata cu succes!\n
                        Nume: ${name}\n
                        Email: ${email}\n
                        Data: ${date}\n
                        Ora: ${time}\n
                        Numar persoane: ${number}`

    if(validateName(name) && validateEmail(email) && validateDate(date) && validateTime(time, date) && validatePersons(number)){
        console.log(validation);
    }
});


const validateName = (name)=>{
    if(name !== ""){
        return true;
    } else {
        let node = document.createElement("p");
        let textnode = document.createTextNode("Fill Name field");
        node.appendChild(textnode);
        document.getElementById("error").appendChild(node);
        document.getElementById("name").focus();
        return false;
    }
}


const validateEmail = (text)=>{
    let foundAt = 0;
    let foundDot = 0;
    let atPosition = text.indexOf("@");
    let subText = text.substring(atPosition);

    if(text.length === 0){
        let node = document.createElement("p");
        let textnode = document.createTextNode("Missing email adress");
        node.appendChild(textnode);
        document.getElementById("error").appendChild(node);
        document.getElementById("email").focus();
        return false;
    }
    //@- symbol
    for(let i = 0; i<text.length; i++){
        if(text[i]==="@"){
            foundAt++
            if(i===0){
                let node = document.createElement("p");
                let textnode = document.createTextNode("Missing username");
                node.appendChild(textnode);
                document.getElementById("error").appendChild(node);
                document.getElementById("email").focus();
                return false;
                
            }   else if(i=== text.length-1){
                let node = document.createElement("p");
                let textnode = document.createTextNode("Missing domain");
                node.appendChild(textnode);
                document.getElementById("error").appendChild(node);
                document.getElementById("email").focus();
                return false;
            }
        }
    }
    if(foundAt >1){
        let node = document.createElement("p");
        let textnode = document.createTextNode("Can only have 1 '@' symbol");
        node.appendChild(textnode);
        document.getElementById("error").appendChild(node);
        document.getElementById("email").focus();
        return false;
    }   else if(foundAt<1){
        let node = document.createElement("p");
        let textnode = document.createTextNode("Missing @ Symbol");
        node.appendChild(textnode);
        document.getElementById("error").appendChild(node);
        document.getElementById("email").focus();
        return false;
    }
    // .-symbol

    for(let i =0; i<subText.length; i++){
        if(subText[i]==="."){
            foundDot++;
            if(i===1){
                let node = document.createElement("p");
                let textnode = document.createTextNode("Missing domain name before '.'");
                node.appendChild(textnode);
                document.getElementById("error").appendChild(node);
                document.getElementById("email").focus();
                return false;
            } else if(i===subText.length-1){
                let node = document.createElement("p");
                let textnode = document.createTextNode("Missing domain after '.'");
                node.appendChild(textnode);
                document.getElementById("error").appendChild(node);
                document.getElementById("email").focus();
                return false;
            }
        }
    }
    if(foundDot>1){
        let node = document.createElement("p");
        let textnode = document.createTextNode("Can only have 1 '.' symbol");
        node.appendChild(textnode);
        document.getElementById("error").appendChild(node);
        document.getElementById("email").focus();
        return false;
        
    } else if(foundDot<1){
        let node = document.createElement("p");
        let textnode = document.createTextNode("Missing '.' symbol");
        node.appendChild(textnode);
        document.getElementById("error").appendChild(node);
        document.getElementById("email").focus();
        return false;
    } else {
        let e = document.querySelector("#error");
            let first = e.firstElementChild;
            while (first) {
                first.remove();
                first = e.firstElementChild;
    }
}
    return true;
}


const validateDate = (date)=>{

    let now = new Date();
    let month = now.getMonth() + 1; //months from 1-12
    let day = now.getUTCDate();
    let year = now.getUTCFullYear();

    today = year + "-" + 0 + month + "-" + day;
    
    if(date === ""){
        let node = document.createElement("p");
        let textnode = document.createTextNode("selectati data dorita");
        node.appendChild(textnode);
        document.getElementById("error").appendChild(node);
        document.getElementById("date").focus();
        return false;
    }

    if(date < today){
        let node = document.createElement("p");
        let textnode = document.createTextNode("data selectata a trecut");
        node.appendChild(textnode);
        document.getElementById("error").appendChild(node);
        document.getElementById("date").focus();
        return false;
    } 
    return true;
}


const validateTime = (time, date)=>{
    
    let now = new Date();
    now.setMinutes(now.getUTCMinutes() + 30 );
    let hour = now.getHours();
    hour = ("0" + hour).slice(-2);
    let minutes = now.getMinutes();
    let thisHour = hour + ":" + minutes;
    
    let month = now.getUTCMonth() + 1; //months from 1-12
    let day = now.getUTCDate();
    let year = now.getUTCFullYear();

    today = year + "-" + 0 + month + "-" + day;

    if(time === ""){
        let node = document.createElement("p");
        let textnode = document.createTextNode("introduceti ora rezervarii");
        node.appendChild(textnode);
        document.getElementById("error").appendChild(node);
        document.getElementById("time").focus();
        return false;
    }
    if(date === today){
        if(time < thisHour){
            
            let node = document.createElement("p");
            let textnode = document.createTextNode("ora selectata a trecut");
            node.appendChild(textnode);
            document.getElementById("error").appendChild(node);
            document.getElementById("time").focus();
            return false;
        }
        return true;
    }

    return true;
}


const validatePersons = (number) =>{

    if(number <1){
        let node = document.createElement("p");
        let textnode = document.createTextNode("Select the number of persons");
        node.appendChild(textnode);
        document.getElementById("error").appendChild(node);
        document.getElementById("guests").focus();
        return false;
    }
    
    return true;
}