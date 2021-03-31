// initializing the count of the notes
let kv = localStorage.getItem('kv');
if (kv == null) {
    localStorage.setItem('kv','0');
    kv = 0;
}
kv = parseInt(kv);
show_notes();
// clearing the notes area for updating
function clear_notes_area(){
    let card_area = document.querySelector("div.notes_section");
    card_area.innerHTML = "";
}
// deleting a spesific note
function del_note(bid) {
    // localStorage.removeItem(`each_text${bid}`);
    bid = parseInt(bid);
    for (var i = bid; i < kv; i++) {
        console.log(i);
        let ntxtxt = localStorage.getItem(`each_text${i+1}`);
        let ntxhdng = localStorage.getItem(`text_name${i+1}`);
        localStorage.setItem(`each_text${i}`,ntxtxt);
        localStorage.setItem(`text_name${i}`,ntxhdng);
    }
    let ntxtxt = localStorage.getItem(`each_text${i+1}`);
    let ntxhdng = localStorage.getItem(`text_name${i+1}`);
    localStorage.removeItem(`each_text${i}`,ntxtxt);
    localStorage.removeItem(`text_name${i}`,ntxhdng);
    kv -=1;
    show_notes();
    localStorage.setItem('kv',kv);
}
// adding a note
function addnote() {
    let text_note = document.getElementById("text_note");
    console.log(text_note.value);
    let note_heading = document.getElementById("note_heading");
    console.log(note_heading.value);
    kv += 1;
    localStorage.setItem(`text_name${kv}`,note_heading.value);
    localStorage.setItem(`each_text${kv}`,text_note.value);
    text_note.value = "";
    note_heading.value = "";
    localStorage.setItem('kv',kv);
    clear_notes_area();
    show_notes();
}
// displaying all the notes after inserting or deleting
function show_notes(){
    clear_notes_area();
    for (let i = 1; i <(kv+1); i++){
        let card = document.createElement('div');
        let each_text = localStorage.getItem(`each_text${i}`);
        let text_name = localStorage.getItem(`text_name${i}`);
        card.className = "each_note";
        card.id = `n${i}`;
        card.innerHTML = `<h1> ${text_name}</h1><p>${each_text}</p><button id = "${i}" onclick = "del_note(this.id)" class = "bttn" >Delete</button>`;
        let card_area = document.querySelector("div.notes_section");
        card_area.appendChild(card);
    }
}
// the search bar 
let search = document.getElementById('srchtxt');
search.addEventListener('input',function(){
    let srchval = search.value.toLowerCase();
    let notes = document.getElementsByClassName('each_note');
    Array.from(notes).forEach(function(element) {
        let cardtxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        if(cardtxt.includes(srchval)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})