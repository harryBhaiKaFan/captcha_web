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
	init(){
		if(!window.speechSynthesis) {
			alert("Your browser does not support speech synthesis");
			return;
		}
		
		this.synth = window.speechSynthesis;
		this.speak("hello");
	},
	
	speak(text){
		// if(this.synth.speaking){
		// 	alert("Error already speaking...");
		// 	return;
		// }
		//if(text.trim() === '') return;
		
		const speakText = new SpeechSynthesisUtterance(text);
		
		 speakText.onend = (e) => {
			alert("ended")
		 }
		
		 speakText.onerror = (e) => {
		 	alert(e.error);
		 }
		//alert(text);
		//speakText.rate = "1.2"; // btw 1 and 2 (inc)
		//speakText.pitch = "1.2"; 
		
		speakText.voice = this.voices[0];
		this.synth.speak(speakText);
	}
		
}

window.onload = () => {
	setSpeech().then((voices)=>{
		App.voices = voices;
		const f = App.init.bind(App);
		f();
	})
};