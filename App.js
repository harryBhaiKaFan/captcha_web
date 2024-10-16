
const hearBtn = document.querySelector("#hear");
const numInp = document.querySelector("#inpNum");
const verifyBtn = document.querySelector("#verify");
const usrLabel = document.querySelector("#usrLabel");

function setSpeech() {
    	return new Promise(
        	function (resolve, reject) {
        		let synth = window.speechSynthesis;
        		let id;

            	id = setInterval(() => {
                if (synth.getVoices().length !== 0) {
                    resolve(synth.getVoices());
                    clearInterval(id);
                }
        	}, 10);
        }
    )
}


const App = {
	synth: null,
	voices: [],
	key: -1,
	randInt(min,max)
	{
		return (Math.floor(Math.random()*(max-min))+min)
	},
	init(){
		if(!window.speechSynthesis) {
			alert("Your browser does not support speech synthesis");
			return;
		}
		
		this.synth = window.speechSynthesis;
		this.key = this.randInt(1000,3000);
		
		hearBtn.onclick = () =>{
			this.speak(`${this.key}`);
		}
		
		verifyBtn.onclick = () =>{
			if(parseInt(numInp.value) === this.key)
			{
				usrLabel.innerText = "You are human!"
			}else{
				usrLabel.innerText = "You are bot!"
			}
		}
	},
	
	speak(text){
		 if(this.synth.speaking){
		 	return;
		 }
		 
		const speakText = new SpeechSynthesisUtterance(text);
		
		speakText.onerror = (e) => {
			console.log(e.error);
		}
		
		speakText.rate = 1.2;
		speakText.pitch = 0.5; 
		
		speakText.voice = this.voices[0];
		this.synth.speak(speakText);
	}
		
}

window.onload = () => {
	
	setSpeech().then((voices)=>{
		loader.style.display="none";
		App.voices = voices;
		const f = App.init.bind(App);
		f();
	})
};