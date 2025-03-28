import SmallText from "./SmallText";
import { useState } from "react";

function Greeting(props){
    // {name="Default", age=7} 
    
    const [counter,setCounter] = useState(0); // variable, function to change variable, default value 0
    const [userText, setUserText] = useState("");

    const name = props.name;


    const greetings = [
        "Hi",
        "Howdy",
        "Hello"
    ];

    const updateCounter = () => {
        let tmp = counter;
        tmp = tmp +1;
        setCounter(tmp);
    }

    const getGreeting = () =>{
        let randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        console.log(randomGreeting);
        return randomGreeting
    }

    const handleUserChange = (e) =>{
        setUserText(e.target.value);
    }

    return(
      <div>
        <h1>{getGreeting()} {name} from component</h1>
        <p>How are you today?</p>
        <p>The button has been pressed {counter} times</p>
        <button onClick={updateCounter}>Click me</button>
        <br/>
        <input type="text" value={userText} onChange={handleUserChange}></input>
        
        <SmallText userText={userText} />
      </div>
    )
}

export default Greeting;