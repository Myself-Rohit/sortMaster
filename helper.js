
export function enableButtons() {
    document.getElementById("done").disabled = false;
    document.getElementById("Button1").disabled = false;
    document.getElementById("Button1").style.backgroundColor = "#6f459e";
    document.getElementById("Button2").disabled = false;
    document.getElementById("Button2").style.backgroundColor = "#6f459e";
}

export function disable() 
{
	document.getElementById("done").disabled = true; 

	document.getElementById("Button1").disabled = true; 

	document.getElementById("Button2").disabled = true;  
}

export function swapBars(bars, i, j) {
    let tempHeight = bars[i].style.height;
    let tempText = bars[i].childNodes[0].innerText;
    bars[i].style.height = bars[j].style.height;
    bars[j].style.height = tempHeight;
    bars[i].childNodes[0].innerText = bars[j].childNodes[0].innerText;
    bars[j].childNodes[0].innerText = tempText;
}

export function changeSort(){
    const options = document.querySelectorAll(".option")
        for (let i = 0; i < options.length; i++) {
            const element = options[i];
            if(element.selected){
                return element.innerHTML
            }
        }
    }
    
 export function changeSpeed(){
        const options = document.querySelectorAll(".speedOption")
        const optn = Array.from(options).filter(i=>i.selected);
        let delay
        switch(optn[0].innerHTML){
            case "very slow" : delay = 1300
                break;
    
            case "slow" : delay = 1200
                break;
    
            case "normal" : delay = 1000
                break;
    
            case "fast" : delay = 200
                break;
    
            case "very fast" : delay = 100
                break;
    
            default:console.log("wrong case")
    
        }
        return delay
        
    }

