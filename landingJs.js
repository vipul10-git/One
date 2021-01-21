const card = document.querySelector('#card');
const container = document.querySelector('#container');
const recod = document.querySelector('#recod');
const ripple = document.querySelector('#ripple');
const info = document.querySelector('#info');
var mediaRecorder;
var chunks =[];
container.addEventListener('mousemove', (e)=>{
    let x= (window.innerWidth/2- e.pageX)/20;
    let y= (window.innerHeight/2- e.pageY)/20;
    recod.style.transform = `rotateY(${-x}deg) rotateX(${-y}deg)`
    recod.style.transform = 'translateZ(100px)';
    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
});

recod.addEventListener('click', (e)=>{
    var countDown = 8;
    let x = setInterval(function() {
        --countDown;
        document.getElementById('info').innerHTML = '*'+countDown+' second left of recording';
        ripple.classList.add("listen");
        recod.style.transform = 'translateZ(100px)';
        if (countDown < 1) {
            clearInterval(x);
            document.getElementById('info').innerHTML = 'Done';
        }
    }, 1000);

    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        const chunks = [];
        mediaRecorder.addEventListener("dataavailable", event => {
            chunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
            const audioToBlob = new Blob(chunks);
            const url = URL.createObjectURL(audioToBlob);
            const audio = new Audio(url);
            //download the file
            const anchor = document.createElement('a');
            anchor.style.display = 'none';
            anchor.href = url;
            anchor.download = 'test.wav';
            document.body.appendChild(anchor);
            anchor.click();
            /*-------------*/
            setTimeout(() => {
                audio.play();
              }, 1000);
          });

        setTimeout(() => {
            ripple.classList.remove("listen");
            mediaRecorder.stop();
          }, 8000);
    });
});


container.addEventListener('mouseleave', (e)=>{
    card.style.transform = `rotateX(0deg) rotateY(0deg)`
    recod.style.transform = `rotateY(${0}deg) rotateX(${0}deg)`
    recod.style.transform = 'translateZ(0px)';
});




