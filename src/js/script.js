$('.header-slider').slick({
    dots: true,
    responsive:[
        {
            breakpoint:750,
            settings:{
                arrows:false,
            }
        }
    ]
});
//slider-blog
$('.slider-blog').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    variableWidth: true,
    responsive:[
        {
            breakpoint:1250,
            settings:{
                slidesToShow: 2,
                slidesToScroll:1,
                variableWidth: false,
            }
        },
        {
            breakpoint:830,
            settings:{
                arrows:false,
                slidesToShow: 1,
                slidesToScroll:1,
                variableWidth: false,
            }
        }
    ]
});

//filter content + active-menu
const listBtnAll = document.querySelectorAll('.work-project-btn'); 
const listBtn = document.querySelector('.work-project-btn-wrapper'),// 1.Получаем кнопки по котрым кликнули
    items = document.querySelectorAll('.work-project-content-item')//получаем наши блоки 

function filter(){
    listBtn.addEventListener('click', event =>{  
        const targetId = event.target.dataset.id
        const target = event.target

        if(target.classList.contains('work-project-btn')){
            listBtnAll.forEach(ListItem => ListItem.classList.remove('project-btn-active'))
            target.classList.add('project-btn-active')
        }
                           

        switch(targetId){
            case 'all':
                getItems('work-project-content-item')
                break
            case 'design':
                getItems(targetId)
                break
            case 'mobile': 
                getItems(targetId)
            case 'gallery': 
                getItems(targetId) 
            case 'photo': 
                getItems(targetId)    
        }
    })
}   
filter();

function getItems(className){
    items.forEach(item =>{
        if(item.classList.contains(className)){
            item.style.display = 'inline-flex';
        } else{
            item.style.display = 'none';
        }
    })    
}

//hidden -work
let hiddenWork = document.querySelector('.work-projekt-hidden');
let btnWork = document.querySelector('.work-btn');

btnWork.addEventListener('click',showWork);

function showWork(){
    hiddenWork.classList.toggle('work-projekt-hidden--off')
}
//hide btn more category

function removeBtn(){
    const buttons = document.querySelectorAll('.work-project-btn')//Получаем колекцию кнопок
    const btnAddBlock = document.querySelector('.work-btn');
    
    function filter(category){      
     const isItemFilter = !btnAddBlock.classList.contains(category);
            if(isItemFilter){
                btnAddBlock.classList.add('hide')
            }else btnAddBlock.classList.remove('hide')
    
        }
    buttons.forEach((button)=>{
        button.addEventListener('click',()=>{
            const currentCategory = button.dataset.id
            filter(currentCategory)        
        })    
    })
  
}
removeBtn()


//video
const videoItem = document.querySelector('.video-wrapper-item');
const video = document.querySelector('.video');
const playBtn = document.querySelector('.img-video')

function toggleVideoStatus(){
    videoItem.classList.add('hiden')
    if(video.paused){
        video.play()
    }else {
        video.paused
    }
}
playBtn.addEventListener('click',toggleVideoStatus)

// playBtn.addEventListener('click',function(){
//     wrapperVideo.play();
//   });