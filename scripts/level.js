const url ='https://openapi.programming-hero.com/api/levels/all';

const loadLevels = () => {
    fetch(url)
    .then(res => res.json())
    .then(json => displayLevels(json.data))
    
}

const manageSpinner = (status)=>{
    if(status == true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }
    else{
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('word-container').classList.remove('hidden');
    }
}


const removeActiveClass = () => {
    const allBtn = document.getElementsByClassName('lesson-btn');
    for (const btn of allBtn) {
        btn.classList.remove('active');
    }
    // allBtn.forEach(btn => btn.classList.remove('active'));
}

const loadLevelWord = (levelNo) => {
    manageSpinner(true);
    console.log('lesson loaded', levelNo );

    const leveUrl = `https://openapi.programming-hero.com/api/level/${levelNo}`;
    console.log(leveUrl);

    fetch(leveUrl)
    .then(res => res.json())
    .then(json => {
        removeActiveClass();
        const clickBtn = document.getElementById(`lesson-btn-${levelNo}`);
        clickBtn.classList.add('active');
        displayLevelWord(json.data)
    })
}

const createSpan = (arr) => {
    const span = arr.map( (el) => `<span class="btn">${el}</span>` )
    return span.join(' ');
}

const loadWordDetails = async(wordId) => {
    const url = `https://openapi.programming-hero.com/api/word/${wordId}`;
    // console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

const displayWordDetails = (details) => {

    const wordBox = document.getElementById('details-container');
    console.log(details.synonyms , typeof details.synonyms);
    wordBox.innerHTML = `
            <div class="">
              <h2 class="text-2xl font-bold">${details.word} (<i class="fa-solid fa-microphone-lines"></i> :${details.pronunciation})</h2>
            </div>
            <div class="">
              <h2 class="font-bold">Meaning</h2>
              <p>${details.meaning}</p>
            </div>
            <div class="">
              <h2 class="font-bold">Meaning</h2>
              <p>${details.sentence}</p>
            </div>
            <div class="">
              <h2 class="font-bold">Synonyms</h2>
              <div>${createSpan(details.synonyms)}</div>
            </div>


    `


    document.getElementById('my_modal_5').showModal();
}


const displayLevelWord = (words) => {
    //getting the parent container
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if(words.length === 0){
        wordContainer.innerHTML = `
            <div class="text-center col-span-full rou py-6 space-y-6 hind-siliguri-regular">
                <i class="fa-solid fa-triangle-exclamation text-6xl"></i>
                <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান</h2>

            </div>
        `;
        manageSpinner(false);
        return;
    }
    

    words.forEach(element => {

        // console.log(element);
        //creating the child element
        const wordDiv = document.createElement('div');
        wordDiv.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-5">
                <h2 class="text-2xl font-bold">${element.word ? element.word : "word not found"}</h2>
                <p class="font-semibold">Meaning /Pronunciation</p>
                <div class="text-2xl hind-siliguri-regular">"${element.meaning ? element.meaning : "meaning not found"} / ${element.pronunciation ? element.pronunciation : "pronunciation not found"}"</div>
                <div class="flex justify-between items-center">
                    <button onclick="loadWordDetails(${element.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
                
            </div>
        `
        wordContainer.appendChild(wordDiv);
    });
    manageSpinner(false);   
}




const displayLevels = (levels) => {

    //getting the parent container
    const levelsContainer = document.getElementById('level-container-ul');
    levelsContainer.innerHTML = '';

    //looping through the levels and creating list items
    levels.forEach(element => {
        //creating the child element
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
            <button id="lesson-btn-${element.level_no}" onclick="loadLevelWord(${element.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson ${element.level_no}</button>
        `

        //appending the child element to the parent container
        levelsContainer.appendChild(btnDiv);
    });
}



loadLevels();