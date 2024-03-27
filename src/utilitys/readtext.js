let voices = [];
let selectedVoice = null;
// let synth = window.speechSynthesis
export function InitReadProccess() {
  let synth = window.speechSynthesis;
  let voicetype = "Microsoft HsiaoChen Online (Natural) - Chinese (Taiwan)";
  let voicetype_order =[
    "Microsoft HsiaoChen Online (Natural) - Chinese (Taiwan)",
    "Google 國語（臺灣）"
  ]
  synth.onvoiceschanged = () => {
    voices = synth.getVoices();
    selectedVoice = voices[0];
    selectedVoice = findlang(voicetype_order[0]);
    if (selectedVoice == null) {
      selectedVoice = findlang(voicetype_order[1]);
    }
  };
}
export function findlang(lang){
  for (let i = 0; i < voices.length; i++) {
    try{
      if (voices[i].name == lang) {
        return voices[i];
      }
    }catch(e){}
  }
  return null;
}
export function ReadText(text,stop=false) {
  if(stop){ // If Get time, Fix this
    let synth = window.speechSynthesis;
    synth.cancel();
    return 0
  }
  else{
    let synth = window.speechSynthesis;
    synth.cancel();
    let utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = selectedVoice;
    synth.speak(utterThis);
  }
}
export function StopRead() {
  let synth = window.speechSynthesis;
  synth.cancel();
}

