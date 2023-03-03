const loadAllData = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllData(data.data.tools);
}
const displayAllData = allData =>{
    const allAiCardsContainer = document.getElementById('all-ai-cards-container');
    for(const data of allData){
        console.log(data);
        const dataDiv = document.createElement('div');
        dataDiv.classList.add('card','card-compact','w-96', 'bg-base-100', 'shadow-xl');
        dataDiv.innerHTML = `
        <figure class="h-60"><img class='h-full'src="${data.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">Features</h2>
          <ol class="list-decimal mx-5">
            
            <li>${data.features[0]}</li>
            <li>${data.features[1]}</li>
            <li>${data.features[2]}</li>
          </ol>
          <hr>
          
          <div class="flex justify-between items-center w-full">
             <div>
             <h2 class="card-title">${data.name}</h2>
             <p><i class="fa-regular fa-calendar-days"></i> ${data.published_in} </p>
             </div>
             <div> 
                 <label onclick="loadSingle(${data.id})" for="my-modal-5" class="btn btn-ghost"> <i  class="fa-solid fa-arrow-right text-red-500 text-2xl"></i> </label>
             </div>
          </div>
        </div>
        `;
        allAiCardsContainer.appendChild(dataDiv);
    }
}

loadAllData();