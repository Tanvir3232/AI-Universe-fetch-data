const loadAllData = async limitData =>{
    toggleLoader(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllData(data.data.tools,limitData);
}
//for loader
const toggleLoader = isLoading =>{
    const loader = document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('hidden');
    }else{
        loader.classList.add('hidden');
    }
}
const displayAllData = (allData,limitData) =>{
    const allAiCardsContainer = document.getElementById('all-ai-cards-container');
    allAiCardsContainer.textContent = '';
    const seeMore = document.getElementById('see-more');
    //Initialy user see only 6 data using limit
    if(limitData){
        allData = allData.slice(0,limitData);
        seeMore.classList.remove('hidden');
    }
    else{
        seeMore.classList.add('hidden');
    }
    for(const data of allData){
        console.log(data);
        const dataDiv = document.createElement('div');
        dataDiv.classList.add('card','card-compact', 'bg-base-100', 'shadow-xl');
        dataDiv.innerHTML = `
        <figure class="h-60"><img class='h-full'src="${data.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">Features</h2>
          <ol class="list-decimal mx-5">
             ${data.features.length>0?data.features.map(feature => `<li>${feature}</li>`).join(""):'no'}
          </ol>
          <hr>
          
          <div class="flex justify-between items-center w-full">
             <div>
             <h2 class="card-title">${data.name}</h2>
             <p><i class="fa-regular fa-calendar-days"></i> ${data.published_in?data.published_in:"no mentioned"} </p>
             </div>
             <div> 
                 <label onclick="loadSingle(${data.id})" for="my-modal-5" class="btn btn-ghost"> <i  class="fa-solid fa-arrow-right text-red-500 text-2xl"></i> </label>
             </div>
          </div>
        </div>
        `;
        allAiCardsContainer.appendChild(dataDiv);
    }
    toggleLoader(false);
}
const loadSingle =async id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id<10?'0'+id:id}`;
    const res = await fetch(url);
    const data = await res.json();
    showSingleDetails(data.data);
}
const showSingleDetails = data =>{
    console.log(data);
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
       
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 p-2 md:p-5">
           <div class="bg-red-50 rounded-lg shadow-xl p-3">
               <h1 class="text-lg font-semibold">${data.description?data.description:"No description"}</h1>
               <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                  
                  ${data.pricing.map(course => `
                    <div class="bg-stone-50 p-3">
                      <h1 class="text-center text-xl font-semibold text-red-400">${course.price?course.price:"free of cost"} <br> ${course.plan}</h1>
                    </div>`).join('')}

              

               </div>
               <div class="flex flex-col md:flex-row justify-between mt-5">
                   <div>
                        <h1 class="text-xl font-semibold">Features</h1>
                        <ul class="list-disc ml-5">
                           <li>${data.features[1].feature_name}</li>
                           <li>${data.features[2].feature_name}</li>
                           <li>${data.features[3].feature_name}</li>
                           
                        </ul>
                      
                   </div>
                   <div>
                        <h1 class="text-xl font-semibold">Integrations</h1>
                        <ul class="list-disc ml-5"> 
                          ${data.integrations.length>0?data.integrations.map(integration => `<li>${integration}</li>`).join(""):"No data found"}
                          
                        </ul>
                   </div>
               </div>
           </div>
           <div class="shadow-xl p-3 rounded-lg">
              <figure>
                 <img src="${data.image_link[0]}" alt="Album"/>
                 ${data.accuracy.score?`<span class="bg-red-500 px-4 py-1 -mt-8 md:mt-1 md:top-16 md:right-16  absolute rounded-xl text-white">${data.accuracy.score*100}% accuracy </span>`:''}
              </figure>
              <h1 class="text-center text-lg font-semibold">${data.input_output_examples[0].input?data.input_output_examples[0].input:"No question found"}</h1>
              <h1 class="text-center text-lg">${data.input_output_examples[0].output?data.input_output_examples[0].output:"No answer found"}</h1>
           </div>
           
        </div>
       
    `;
}
const seeMoreBtn = document.getElementById('see-more-btn');
seeMoreBtn.addEventListener('click',function(){
      
      seeMoreBtn.classList.add('d-none');
      loadAllData();
});
loadAllData(6);