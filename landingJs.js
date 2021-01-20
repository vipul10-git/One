const card = document.querySelector('#card');
const container = document.querySelector('#container');
const ripple = document.querySelector('#ripple');

container.addEventListener('mousemove', (e)=>{
    let x= (window.innerWidth/2- e.pageX)/10;
    let y= (window.innerHeight/2- e.pageY)/10;
    ripple.style.transform = `rotateY(${-x}deg) rotateX(${-y}deg)`
    ripple.style.transform = 'translateZ(70px)';
    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
});

ripple.addEventListener('click', (e)=>{
    console.log(window.innerWidth)
    
});
ripple.addEventListener('mouseover',e=>{
    card.style.transform = `rotateX(0deg) rotateY(0deg)`
    ripple.style.transform = `rotateY(${0}deg) rotateX(${0}deg)`

})

container.addEventListener('mouseleave', (e)=>{
    card.style.transform = `rotateX(0deg) rotateY(0deg)`
    ripple.style.transform = `rotateY(${0}deg) rotateX(${0}deg)`
    ripple.style.transform = 'translateZ(0px)';
});

