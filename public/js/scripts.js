$(document).foundation()

const root = document.documentElement
const toggleSwitch = document.querySelector('.toggle')
const inputToggle = toggleSwitch.querySelector('input')

if(document.cookie.includes('font')){
    let foont = document.cookie.slice(5).replace(/"/g, '')
    root.style.setProperty('--font',foont)
    if(/serif/.test(foont)){
        inputToggle.checked = true
    }
}

//add event listener to the toggle switch to swap into the higher contrast version so that viewers don't have to struggle with the font
//add a cookie when doing this, so that we can check for the cookie and not force the user to recheck the toggle on each page

inputToggle.addEventListener('change', (e)=>{
    
    if(e.target.checked) {
        root.style.setProperty('--font', "Merriweather, serif")
        document.cookie = 'font="Merriweather, serif"'
    } else {
        root.style.setProperty('--font', "Special Elite, cursive")
        document.cookie = 'font="Special Elite, cursive"'
        console.log('eh?')
    }
})

//a class to make bubbles
// see my github for details https://github.com/kalenhoneyfield/bubbles.git
class Bubble {

    constructor(size, blur, color ,elem) {
        this._size = size
        this._blur = blur
        this._color = color
        this._elem = elem
        this.range = 0
    }

    createBubble() {
        this.randomID()
        this.randomStart()
        this.bubble = document.createElement('div')
        this.bubble.style.position = 'absolute'
        this.bubble.style.borderRadius = `50%`
        this.bubble.style.height = `${this._size}px`
        this.bubble.style.width = `${this._size}px`
        this.bubble.style.filter = `blur(${this._blur}px)`
        this.bubble.style.transition = '4s ease'
        // this.bubble.style.background = this._color
        this.bubble.style.background = 'radial-gradient(ellipse at center,  rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 70%);'
        // this.bubble.style.boxShadow = `0 20px 30px rgba(0, 0, 0, 0.2), inset 0px 10px 30px 5px rgba(255, 125, 125, 1)`
        this.bubble.style.boxShadow = `0 20px 30px rgba(0, 0, 0, 0.2), inset 0px 10px 30px 5px ${this._color}`
        this.bubble.style.opacity = 0
        this.bubble.style.zIndex = -1
        this.bubble.style.transform = `translate(calc(${this.startPOS}vw - 30px), calc(40vh - 10px))`
        this.bubble.id = this.ID

        const el = document.querySelector(this._elem)
        el.style.overflow = 'hidden'
        el.append(this.bubble)
    }

    moveBubble() {
        setInterval(() => {
            const distance = Math.floor(Math.random() * 1000)
            let coords = this.bubble.getBoundingClientRect()
            if(coords.top <= -200){
                this.range = 0
                this.bubble.style.transition = '0s'
                this.bubble.style.opacity = 0;
                // this.bubble.style.top = this.range +'px'
                this.randomStart()
                this.bubble.style.transform = `translate(calc(${this.startPOS}vw - 30px), calc(40vh - 20px))`
            }
            else{
                this.bubble.style.transition = '4s ease-in-out'
                this.bubble.style.opacity = 1;
                this.range = this.range - distance
                // this.bubble.style.top = this.range +'px'
                this.bubble.style.transform = `translate(calc(${this.startPOS}vw - 30px), calc(40vh + ${this.range}px))`
            }
        }, (Math.floor(Math.random() * (4000 - 1000 + 1) ) + 1000) + 1);

        
    }

    randomID() {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 8; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        this.ID = text
    }

    randomStart() {
        this.startPOS = Math.floor(Math.random() * 100)
    }

}

//make 100 bubbles on screen
function makeBubbles(){
    const number = 100
    let bubbly = []
    for(let i = 0; i < number; i++){
        const size = Math.floor(Math.random() * 100)
        const bub = new Bubble(size,0,'#fff', 'body')
        bubbly.push(bub)
    }

    bubbly.forEach(blubble => {
        blubble.createBubble()
        blubble.moveBubble()
    })
}