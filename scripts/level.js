const url ='https://openapi.programming-hero.com/api/levels/all';

const loadLevels = () => {
    fetch(url)
    .then(res => res.json())
    .then(json => displayLevels(json.data))
    
}

const loadLevelWord = (levelNo) => {
    console.log('lesson loaded', levelNo );

    const leveUrl = `https://openapi.programming-hero.com/api/level/${levelNo}`;
    console.log(leveUrl);

    fetch(leveUrl)
    .then(res => res.json())
    .then(json => displayLevelWord(json.data))
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
        `
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
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
                
            </div>
        `
        wordContainer.appendChild(wordDiv);
    });   
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
            <button onclick="loadLevelWord(${element.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson ${element.level_no}</button>
        `

        //appending the child element to the parent container
        levelsContainer.appendChild(btnDiv);
    });
}



loadLevels();