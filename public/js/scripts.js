$(document).foundation()

//grab the elements we'll need for the toggle switch
const root = document.documentElement
const toggleSwitch = document.querySelector('.toggled')
const inputToggle = toggleSwitch.querySelector('input')

//if the user has already selected a font, let them keep it
if(cookieMonster('font')){
    let foont = cookieMonster('font').replace(/"/g, '')
    root.style.setProperty('--font',foont)
}

//add event listener to the toggle switch to swap into the higher contrast version so that viewers don't have to struggle with the font
//add a cookie when doing this, so that we can check for the cookie and not force the user to recheck the toggle on each page
inputToggle.addEventListener('change', (e)=>{
    
    if(e.target.checked) {
        root.style.setProperty('--font', "Merriweather, serif")
        setCookie('font', "Merriweather, serif", 3)
    } else {
        root.style.setProperty('--font', "Special Elite, cursive")
        setCookie('font', "Special Elite, cursive", 3)
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
        this.bubble.style.background = 'radial-gradient(ellipse at center,  rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 70%);'
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
                this.randomStart()
                this.bubble.style.transform = `translate(calc(${this.startPOS}vw - 30px), calc(40vh - 20px))`
            }
            else{
                this.bubble.style.transition = '4s ease-in-out'
                this.bubble.style.opacity = 1;
                this.range = this.range - distance
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

//add cookie
//these two functions were derived from https://www.w3schools.com/js/js_cookies.asp
function setCookie(key, value, expireInDays) {
    const daat = new Date()
    daat.setTime(daat.getTime() + (expireInDays * 24 * 60 * 60 * 1000)) // 24hours per day, 60 minutes per hour, 60 seconds per minute, 1000 milliseconds per second
    const expires = "expires=" + daat.toUTCString()
    document.cookie = `${key}=${value};${expires};path=/`
}
//which key do we have?
function cookieMonster(key) {
    const decodedCookie = decodeURIComponent(document.cookie)
    const cookieArray = decodedCookie.split(';'); 
    const regex = /(^[\w+\d*]*)\=([\w+\d*,?\ ?'?]*$)/ //a regex that will need to be tested against other cookies but for now it works with the ones I'm setting
    for (let i = 0; i < cookieArray.length; i++) {
        const check = JSON.parse(cookieArray[i].replace(regex, '{"$1":"$2"}')) //turn each element into a JSON key value pair
        if (check[key] !== undefined) { //check if the key defined matches the key with values that we're looking for(will need to test this as well)
            return check[key]
        } else {
            return ""
        }
    }
}

