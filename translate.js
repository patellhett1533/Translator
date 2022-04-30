const selectTag = document.querySelectorAll("select");
const inputTxt = document.getElementById('inputTxt');
const outputTxt = document.getElementById('outputTxt');
const translateText = document.getElementById('translateText');
const copyIn = document.getElementById('copyIn');
const mic = document.getElementById('mic');
const copyOut = document.getElementById('copyOut');
const speak = document.getElementById('speak');
const exchange = document.getElementById('exchange');
const clear = document.getElementById('clear');



selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected;
        if(id == 0 && country_code == "en-GB"){
            selected = "selected";
        }
        else if(id == 1 && country_code == "hi-IN"){
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend",option);
    }
});
translateText.addEventListener('click', ()=>{
    if(inputTxt){
        let text = inputTxt.value;
        let transFrom = selectTag[0].value;
        let transTo = selectTag[1].value;

        let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${transFrom}|${transTo}`;
        fetch(apiUrl).then(res => res.json()).then(data =>{
            console.log(data);
            outputTxt.value = data.responseData.translatedText;
        })
    }
    else{
        inputTxt.focus();
    }
})
exchange.addEventListener('click', ()=>{
    let tempTxt = inputTxt.value;
    let tempTag = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempTag;
    inputTxt.value = outputTxt.value;
    outputTxt.value = tempTxt;
})
copyIn.addEventListener('click',()=>{
    navigator.clipboard.writeText(inputTxt.value);
})

copyOut.addEventListener('click',()=>{
    navigator.clipboard.writeText(outputTxt.value);
})

speak.addEventListener('click', ()=>{
    let utterance;
    utterance = new SpeechSynthesisUtterance(outputTxt.value);
    utterance.lang = selectTag[1].value;
    speechSynthesis.speak(utterance);
})
clear.addEventListener('click', ()=>{
    inputTxt.value = "";
    outputTxt.value = "";
})


mic.addEventListener('click', ()=>{
    let utterance1;
    utterance1 = new SpeechSynthesisUtterance(inputTxt.value);
    utterance1.lang = selectTag[0].value;
    speechSynthesis.speak(utterance1);
})