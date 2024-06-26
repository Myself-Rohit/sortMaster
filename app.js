import {enableButtons,disable,swapBars,changeSort,changeSpeed} from './helper.js'

const inputArray = document.getElementById("inputArray");

let algo = "Selection Sort";
let arraytoSort = [];
let delay = 1000;
let isSorting = false;

document.getElementsByClassName("selectInput")[0].addEventListener("change",()=>delay = changeSpeed())
document.getElementById("done").addEventListener("click",()=>done());
document.getElementsByClassName("btn1")[0].addEventListener("click",()=>generatebars());
document.getElementsByClassName("btn2")[0].addEventListener("click",()=>sort());

inputArray.addEventListener("input",(e)=>{
	let array = e.target.value.split(",");
	if(array[array.length-1] === ""){
		array.pop();
	}
	if(handleValidation(array)){
		displayError("");
	}else{
		disable();
	}
})

const container = document.querySelector(".data-container"); 

function resizeWidth(){
    const width = window.innerWidth;
	const bars = document.querySelectorAll(".bar")

	for(let i=0; i<bars.length; i++){
		bars[i].style.width =`${((width/2)/bars.length)}px`
		
	bars[i].style.transform = `translateX(${i* ((width/2)/bars.length+2)}px)`; 
	}
}

window.addEventListener("resize", () => resizeWidth());
window.removeEventListener("resize", () => resizeWidth());

function generatebars(array=[]) {  
	inputArray.value=""
	container.innerHTML = ""
	if(array.length<2){
		if(array[0]==="") array.length=0;
		for (let i = 0; i < 40; i++) {
			const random = Math.floor(Math.random() * 100) + 1
			 array.push(random); 
		}
	}

	let newArr = [...array]
	let max = Math.max(...newArr)
	document.querySelector(".originalArray").innerHTML = ""
	document.querySelector(".sortedArray").innerHTML = "sorted array will display here after Visualization"
for (let i = 0; i < array.length; i++) { 

	document.querySelector(".originalArray").innerHTML += array[i]+" ";
	const bar = document.createElement("div"); 
	bar.classList.add("bar"); 
	
	bar.style.height = `${array[i] * (384/max)}px`;
	bar.style.width = `${((window.innerWidth/2)/array.length)}px`
	bar.style.transform = `translateX(${i*(((window.innerWidth/2)/array.length)+2)}px)`; 
	
	const barLabel = document.createElement("label");
	barLabel.classList.add("bar_id"); 
	barLabel.innerHTML = array[i]; 
	 
	bar.appendChild(barLabel); 
	container.appendChild(bar); 
} 

} 
generatebars()

export function sleep() {
    return new Promise(resolve => setTimeout(resolve, delay));
}

// asynchronous function to perform "Selection Sort" 
async function SelectionSort() { 
let bars = document.querySelectorAll(".bar"); 
// Assign 0 to min_idx 
var min_idx = 0; 
for (var i = 0; i < bars.length; i += 1) { 

	// Assign i to min_idx 
	min_idx = i; 
	// Provide darkblue color to the ith bar 
	bars[i].style.backgroundColor = "darkblue"; 
	for (var j = i + 1; j < bars.length; j += 1) { 

	// Provide red color to the jth bar 
	bars[j].style.backgroundColor = "red"; 
		
	// To pause the execution of code for 300 milliseconds 
	// await new Promise((resolve) => setTimeout(resolve,delay))
	await sleep()
		

	// To store the integer value of jth bar to var1 
	var val1 = parseInt(bars[j].childNodes[0].innerHTML); 

	// To store the integer value of (min_idx)th bar to var2 
	var val2 = parseInt(bars[min_idx].childNodes[0].innerHTML); 
		
	// Compare val1 & val2 
	if (val1 < val2) { 
		if (min_idx !== i) { 

		// Provide skyblue color to the (min-idx)th bar 
		bars[min_idx].style.backgroundColor = " black"; 
		} 
		min_idx = j; 
	} else { 

		// Provide skyblue color to the jth bar 
		bars[j].style.backgroundColor = " black"; 
	} 
	} 

	// To swap ith and (min_idx)th bar 
	swapBars(bars,min_idx,i);
	
	// Provide skyblue color to the (min-idx)th bar 
	bars[min_idx].style.backgroundColor = " black"; 

	// Provide lightgreen color to the ith bar 
	bars[i].style.backgroundColor = " rgb(49, 226, 13)"; 
} 
enableButtons();
isSorting = false;
displayArray(bars);
} 

// function for bubble sort
async function BubbleSort() {
    let bars = document.querySelectorAll(".bar");
    let n = bars.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";

			await sleep()

            let val1 = parseInt(bars[j].childNodes[0].innerHTML);
            let val2 = parseInt(bars[j + 1].childNodes[0].innerHTML);

            if (val1 > val2) {
                swapBars(bars,j,j+1);
            }

            bars[j].style.backgroundColor = "blue";
            bars[j + 1].style.backgroundColor = "blue";
        }

        bars[n - i - 1].style.backgroundColor = "rgb(49, 226, 13)";
    }

    bars[0].style.backgroundColor = "rgb(49, 226, 13)";

	enableButtons();
	isSorting = false;
	displayArray(bars);
}

// function for Insertion Sort
async function InsertionSort() {
    let bars = document.querySelectorAll(".bar");
    let n = bars.length;

    for (let i = 1; i < n; i++) {
        bars[i].style.backgroundColor = "red";

        let key = parseInt(bars[i].childNodes[0].innerHTML);
        let keyHeight = bars[i].style.height;

		await sleep()

        let j = i - 1;
        while (j >= 0 && parseInt(bars[j].childNodes[0].innerHTML) > key) {
        
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";

			await sleep()
			swapBars(bars,j,j+1);

            bars[j].style.backgroundColor = " blue";
            bars[j + 1].style.backgroundColor = " blue";

            j--;
        }
        bars[j + 1].style.height = keyHeight;
        bars[j + 1].childNodes[0].innerText = key.toString();

    }
	for(let i=n-1; i>=0; i--){
		await new Promise(resolve => setTimeout(resolve, 20));

		bars[i].style.backgroundColor = " rgb(49, 226, 13)"; 
	}

	enableButtons();
	isSorting = false;
	displayArray(bars);
}

// Helper function to pause execution for a given delay


// function for Quick Sort
async function QuickSort() {
    let bars = document.querySelectorAll(".bar");
    await quickSortHelper(bars, 0, bars.length - 1, delay);
    enableButtons();
	isSorting = false;
	displayArray(bars);
}

async function quickSortHelper(bars, low, high, delay) {
    if (low < high) {
        let pivotIdx = await partition(bars, low, high, delay);
        bars[pivotIdx].style.backgroundColor = "rgb(49, 226, 13)";

		for(let i=low;i<pivotIdx;i++){
			bars[i].style.backgroundColor = "purple"
		}
        await quickSortHelper(bars, low, pivotIdx - 1, delay);
		
		for(let i=pivotIdx+1;i<=high;i++){
			bars[i].style.backgroundColor = "purple"
		}
        await quickSortHelper(bars, pivotIdx + 1, high, delay);
    }

	for(let i=low;i<=high;i++){
		bars[i].style.backgroundColor = "rgb(49, 226, 13)"
	}
}

async function partition(bars, low, high, delay) {
    let pivot = parseInt(bars[high].childNodes[0].innerText);
    bars[high].style.backgroundColor = "yellow"

    let i = low - 1;
	if(i>=0)bars[i].style.backgroundColor = "blue";
	
    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = "red";

        // await new Promise(resolve => setTimeout(resolve, delay));
		await sleep()

        let val = parseInt(bars[j].childNodes[0].innerText);
        
        if (val < pivot) {
			if(i>0) {
                bars[i].style.backgroundColor = "black";
                bars[i+1].style.backgroundColor = "blue";
			}
            i++;
			await new Promise(resolve => setTimeout(resolve, delay));

            swapBars(bars, i, j);
        }

        bars[j].style.backgroundColor = "black";
    }


    swapBars(bars, i + 1, high); 
		// bars[i+1].style.backgroundColor = "rgb(49, 226, 13)"

    return i + 1;
}

// Main function to merge two subarrays
async function merge(bars, low, mid, high, delay) {
    let n1 = mid - low + 1;
    let n2 = high - mid;

    let left = new Array(n1);
    let right = new Array(n2);

    for (let i = 0; i < n1; i++) {
        left[i] = bars[low + i].style.height;
        bars[low + i].style.backgroundColor = "orange";
    }
    for (let j = 0; j < n2; j++) {
        right[j] = bars[mid + 1 + j].style.height;
        bars[mid + 1 + j].style.backgroundColor = "yellow";
    }

    await sleep();

    let i = 0, j = 0, k = low;
    while (i < n1 && j < n2) {
        if (parseInt(left[i]) <= parseInt(right[j])) {
            bars[k].style.height = left[i];
            i++;
        } else {
            bars[k].style.height = right[j];
            j++;
        }
        bars[k].style.backgroundColor = "rgb(49, 226, 13)";
        k++;
    }

    while (i < n1) {
        bars[k].style.height = left[i];
        bars[k].style.backgroundColor = "rgb(49, 226, 13)";
        i++;
        k++;
    }

    while (j < n2) {
        bars[k].style.height = right[j];
        bars[k].style.backgroundColor = "rgb(49, 226, 13)";
        j++;
        k++;
    }

    await sleep(delay);
}

// Recursive Merge Sort function
async function mergeSort(bars, low, high, delay) {
    if (low >= high) {
        return;
    }

    let mid = low + Math.floor((high - low) / 2);
	
    await mergeSort(bars, low, mid, delay);
	
    await mergeSort(bars, mid + 1, high, delay);
    await merge(bars, low, mid, high, delay);
}

// Function to initialize and start the Merge Sort visualization
async function startMergeSort() {
    let bars = document.querySelectorAll(".bar");
    await mergeSort(bars, 0, bars.length - 1, delay);
    enableButtons();
    isSorting = false;
    displayArray(bars);
}




function sort(){
	isSorting = true;
	disable();
	switch (algo) {
		case "Selection Sort": SelectionSort();
		    
			break;
		case "Bubble Sort":BubbleSort();
			
			break;
		case "Insertion Sort":InsertionSort();
			
			break;
		case "Merge Sort":startMergeSort();
			
			break;
		case "Quick Sort":QuickSort();
			
			break;
		default: console.log("error",algo)
	}

}

function displayArray(bars){
	document.querySelector(".sortedArray").innerHTML =""
	for(let i=0; i<bars.length;i++){
		document.querySelector(".sortedArray").innerHTML += bars[i].childNodes[0].innerHTML +" "
	}
}

function displayError(msg){
	document.getElementById("errorMsg").innerHTML = msg;
}

function handleValidation(array){
	
	if(array.length===1 && array[0]!=""){
		if(!isNaN(array[0])) {
			displayError(`Enter at least two values`);
			return false;
		}else{
			displayError(`Enter only  valid values`);
			return false;
		}
	}
	if(array.length>=1){
	for(let i=0; i<array.length; i++){
		array[i] = +(array[i].trim());

		if(isNaN(array[i])){
			displayError(`Enter only valid values`);
			return false;
		}

		if(array[i] <= 0){
			displayError(`values cannot be less or equal to 0`);
			return false;
		}
		if(!array[i]){
			displayError("Enter valid comma seperated numbers/decimal values");
			return false;
		}
	}
}
	if(isSorting){
		disable();
	}else{
		enableButtons();
	}
	return true;
}

function done(){
	algo = changeSort();
	arraytoSort = inputArray.value.split(",");
    document.getElementsByClassName("head")[0].innerHTML = `${algo} Visualizer`;
	generatebars(arraytoSort);
}


// ****************************tabs*********************

const tab = document.querySelector(".btn-container");
const btns = document.querySelectorAll(".btn");
const slide = document.querySelectorAll(".slide");

tab.addEventListener("click", (event) => {
    btns.forEach(element => {
        element.classList.remove("active");
    });
    event.target.classList.add("active");

    slide.forEach(e => {
        e.classList.remove("active");
    })
    const getSlide = document.getElementById(event.target.dataset.id);
    getSlide.classList.add("active");
})

document.getElementById("mode").addEventListener("click",(e)=>{
	const app = document.getElementsByTagName("body")[0].classList;
if(app[0]==="light"){
	app.remove("light")
document.getElementById("mode").setAttribute("src","https://cdn-icons-png.flaticon.com/128/12301/12301305.png")
}
else{
	app.add("light")
    document.getElementById("mode").setAttribute("src","https://img.icons8.com/?size=80&id=H3yHeysB1dxv&format=png")
}
})