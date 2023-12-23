document.addEventListener("DOMContentLoaded", function () {
   loadFonts();
   initializeAnimations();
});

async function loadFonts() {
    const apiKey = 'AIzaSyAP1CFMZBbZ-o4JPrDAPHaz5Ivzh29_mpQ';
    try {
        const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`);
        const data = await response.json();
        const fontSelector = document.getElementById('fontSelector');
        data.items.forEach(font => {
            const option = document.createElement('option');
            option.value = font.family;
            option.innerText = font.family;
            fontSelector.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading fonts:", error);
    }
}

// Function to apply the selected font to the preview text
function applyFont() {
    const selectedFont = document.getElementById('fontSelector').value;
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${selectedFont}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const previewText = document.getElementById('previewText'); // Update this ID to your preview text element's ID
    previewText.style.fontFamily = `'${selectedFont}', sans-serif`;
}

// Add event listener for font selection changes
document.getElementById('fontSelector').addEventListener('change', applyFont);

// Load fonts when the page loads
window.onload = loadFonts;

function initializeAnimations() {
   const textAnimations = [
       "Twirling", "Flipping", "Falling",
       "USF 1", "USF 2", "USF 3", "Rolling", "Fall & Fade", "Drop & fade out","Zoom In Drop", "Text Zoom & Rotate",
       "3D Flip and Fade", "Explosion Effect", "Wave and Bounce","Shimmering Text", "Position Characters",
       "US 3D R", "Fade & Tracking", "Effect A", "Effect B", "Effect C", "OS Fade", "3D Flip E", "Effect3", "Effect11",
       "Effect2", "Effect5", "effect D", "BackInDown", "BackOutDown", "BackInLeft", "BackOutLeft", "BackInRight", "BackOutRight", "BackInUp", "BackOutUp",
       "Fade Separately", "Fade Randomly", "Flip X", "Flip Y", "flipOutX", "FlipOutY", "3D P", "3D P out", "zoom in",
       "zoom out", "bounce in", "bounceOut", "bounceInDown", "bounceOutDown", "bounceInUp", "bounceOutUp", "Text Swing",
       "Roll in", "Roll out", "Color Drip", "Slide and Rotate"
   ];

   const motionAnimations = [
       "BackInDown", "BackOutDown", "BackInLeft", "BackOutLeft", "BackInRight", "BackOutRight", "BackInUp", "BackOutUp",
       "Text Zoom & Rotate", "Flip X", "Flip Y", "flipOutX", "FlipOutY", "3D P", "3D P out", "zoom in",
       "zoom out", "Roll in", "Roll out", "Text Zoom & Rotate"
   ];

   const textSlider = document.getElementById("textAnimations");
   const motionSlider = document.getElementById("motionAnimations");

   textAnimations.forEach(animation => {
       const button = document.createElement("div");
       button.classList.add("animationButton");
       button.innerText = animation;
       button.onclick = function () { applyTextAnimation(animation); };
       textSlider.appendChild(button);
   });

   motionAnimations.forEach(animation => {
       const button = document.createElement("div");
       button.classList.add("animationButton");
       button.innerText = animation;
       button.onclick = function () { applyMotionAnimation(animation); };
       motionSlider.appendChild(button);
   });
}

function showTab(tabId) {
   let contentDivs = document.querySelectorAll('.content');
   contentDivs.forEach(div => div.classList.remove('active-content'));
   let tabs = document.querySelectorAll('.tab');
   tabs.forEach(tab => tab.classList.remove('active'));
   document.getElementById(tabId).classList.add('active-content');
   if (tabId === 'textTab') {
       tabs[0].classList.add('active');
   } else {
       tabs[1].classList.add('active');
   }
}

function toggleBold() {
   let previewText = document.querySelector('#previewBox span');
   let fontWeight = window.getComputedStyle(previewText).fontWeight;
   previewText.style.fontWeight = fontWeight === 'bold' || fontWeight >= 700 ? 'normal' : 'bold';
}

function toggleHollow() {
    const previewBox = document.getElementById('previewBox');
    previewBox.classList.toggle('hollow');
    applyColor(); // Apply color based on current hollow state
}

function changeTextColor() {
    applyColor(); // Apply color when the color picker value changes
}

function applyColor() {
    let previewText = document.querySelector('#previewBox span');
    let colorPicker = document.getElementById('colorPicker');
    let isHollow = document.getElementById('previewBox').classList.contains('hollow');

    if (isHollow) {
        // Apply color only to text border when hollow
        previewText.style.color = 'transparent';
        previewText.style.webkitTextStrokeColor = colorPicker.value;
        previewText.style.webkitTextStrokeWidth = '1px';
    } else {
        // Apply color to the whole text when not hollow
        previewText.style.color = colorPicker.value;
        previewText.style.webkitTextStrokeColor = 'transparent';
        previewText.style.webkitTextStrokeWidth = '0px';
    }
}


function changeFontFamily(fontFamily) {
   let previewText = document.querySelector('#previewBox span');
   previewText.style.fontFamily = fontFamily;
}


function applyTextAnimation(animation) {
    let previewText = document.querySelector('#previewBox span');
    let currentColor = previewText.style.color; // Store current color
    let currentTextStrokeColor = previewText.style.webkitTextStrokeColor; // Store current text stroke color if hollow effect is applied

 
    let tl = gsap.timeline({
        onComplete: () => {
            previewText.style.color = currentColor; // Reapply stored color
            previewText.style.webkitTextStrokeColor = currentTextStrokeColor; // Reapply text stroke color
            if (window.currentSplitText) {
                window.currentSplitText.revert();
            }
        }
    });
 
  
    switch (animation) {
        case "Twirling":
        var mySplitText = new SplitText(previewText, { type: "chars" });
        var chars = mySplitText.chars;
        gsap.set(previewText, { perspective: 400 });
        gsap.to(chars, { duration: .5, rotationY: 360, ease: "power2.inOut", stagger: .1 });
        break;
            break;
       case "Flipping":
        const flipping = new SplitText(previewText, { type: "chars" });
        gsap.to(flipping.chars, { duration: .5, rotationX: 360, ease: "power1.inOut", stagger: 0.1, yoyo: true });
        break; 
         case "Falling":
        const falling = new SplitText(previewText, { type: "chars" });
        gsap.to(falling.chars, { duration: 1, y: "100%", ease: "bounce.out", stagger: .2, yoyo: true })
        .then(() => {
                gsap.set(previewText, { clearProps: "all" });
                falling.revert();
            });
        break;
        case "USF 1":
        var split1 = new SplitText(previewText, { type: "words,chars" });
        var chars1 = split1.chars;
        gsap.set(previewText, { perspective: 400 });
        tl.from(chars1, { duration: 0.9, opacity: 0, scale: 0, y: 80, rotationX: 360, ease: "back", stagger: 0.05 });
        break;
         case "USF 2": 
        var split2 = new SplitText(previewText, { type: "words,chars" });
        var chars2 = split2.chars;
        gsap.set(previewText, { perspective: 400 });
        tl.from(chars2, { duration: 0.9, opacity: 0, scale: 0, y: 80, rotationX: 360, transformOrigin: "0% 50% -50", ease: "back", stagger: 0.05 });
        break;
        case "USF 3":
        var mySplitText3 = new SplitText(previewText, {type: "chars, words"});
        var tl3 = gsap.timeline({ repeatDelay: 0.5});
        for(var i = 0; i < mySplitText3.chars.length; i++) {
            tl3.from(mySplitText3.chars[i], {duration: 0.6, opacity: 0, scale: 0, y: 80, rotationX: 180, transformOrigin: "0% 50% -50", ease: "back", stagger: 0.1 }, i * 0.1);
        }
        break;
         case "Rolling":
        let rolling = new SplitText(previewText, { type: "chars" });
        gsap.from(rolling.chars, {duration: 1, rotation: 360, transformOrigin: "50% 50% -50", ease: "back", stagger: 0.1})
        .then(() => {
                gsap.set(previewText, { clearProps: "rotationX,transformOrigin" });
                rollingText.revert();
            });
        break;
      case "Fall & Fade":
        let fallAndFade = new SplitText(previewText, { type: "chars" });
        gsap.from(fallAndFade.chars, { y: -100, opacity: 0, duration: 1, stagger: 0.3, ease: "power1.inOut" })
            .then(() => {
                gsap.to(fallAndFade.chars, { opacity: 0, duration: 2, stagger: 0.05 })
                    .then(() => {
                        gsap.set(previewText, { clearProps: "rotationX,transformOrigin,opacity" });
                        fallAndFade.revert();
                    });
            });
        break;
        case "Drop & fade out":
        let dropFadeOut = new SplitText(previewText, { type: "chars" });
        gsap.fromTo(dropFadeOut.chars, { opacity: 1, y: -50 }, { opacity: 0, y: 0, duration: 1, stagger: 0.15, ease: "power1.in" })
            .then(() => {
                gsap.set(previewText, { clearProps: "all" });
                dropFadeOut.revert();
            });
        break;
       case "Zoom In Drop":
       let zoomInText = new SplitText(previewText, { type: "chars" });
        gsap.from(zoomInText.chars, {
        duration: 1,
        scale: 1,
        y: -100,
        transformOrigin: "50% 50%",
        ease: "back.out(3)",
        stagger: 0.05
    });
    break;
        case "Text Zoom & Rotate":
        gsap.from(previewText, { duration: 5, scale: 0, rotation: 360, transformOrigin: "50% 50%", ease: "power1.inOut" })
        .then(() => {
          gsap.set(previewText, { clearProps: "scale,rotation,transformOrigin" });
         });
        break;
         case "3D Flip and Fade":
        gsap.to(previewText, { duration: 3, rotationX: 360, autoAlpha: 0, transformOrigin: "center center", onComplete: function() {
            gsap.fromTo("#text1", { rotationX: -180, autoAlpha: 0 }, { rotationX: 0, autoAlpha: 1, ease: "power2.inOut" });
        }}).then(() => {
          gsap.set(previewText, { clearProps: "all" });
      });
        break;
        case  "Explosion Effect":
        let explosionText = new SplitText(previewText, { type: "chars" });
        gsap.to(explosionText.chars, { duration: 3, scale: 0, opacity: 0,
        x: (i) => Math.random() * 400 - 200, y: (i) => Math.random() * 400 - 200,
        rotation: (i) => Math.random() * 360, stagger: 0.05, ease: "power2.inOut" })
        .then(() => {
                gsap.set(previewText, { clearProps: "all" });
                explosionText.revert();
            });
            break;
         case "Wave and Bounce":
        let waveBounceText = new SplitText(previewText, { type: "chars" });
        gsap.to(waveBounceText.chars, { duration: 1.5, y: -30, rotationX: 360, stagger: 0.05, ease: "bounce.out" })
        .then(() => {
                gsap.set(previewText, { clearProps: "all" });
                waveBounceText.revert();
            });
        break;
        case "Shimmering Text":
    let shimmerText = new SplitText(previewText, { type: "chars" });
    gsap.fromTo(shimmerText.chars, { opacity: 0.3 }, { opacity: 1, duration: 1, repeat: 4, yoyo: true, stagger: 0.1, ease: "sine.inOut" });
    break;
       case "Position Characters":
        let anim2 = new SplitText(previewText, { type: "chars" });
        gsap.from(anim2.chars, { duration: 4, x: -50, opacity: 0, stagger: 0.05 });
        break;
        case "US 3D R":
        let anim4 = new SplitText(previewText, { type: "chars" });
        gsap.from(anim4.chars, { duration: 4, rotationX: 180, transformOrigin: "50% 50% -30px", ease: "back", stagger: 0.05 });
        break;
         case "Fade & Tracking":
        let anim3 = new SplitText(previewText, { type: "chars" });
        gsap.from(anim3.chars, { duration: 4, opacity: 0, letterSpacing: '5px', stagger: 0.05 });
        break;
         case "Effect A":
        const elementA = previewText;
        const splitA = new SplitText(elementA, { type: "words,chars" });
        gsap.from(splitA.chars, { duration: 1, opacity: 0, scale: 0, y: -100, stagger: 0.05, ease: "back.in" });
        break;
        case "Effect B":
        const elementB = previewText;
        const splitB = new SplitText(elementB, { type: "words,chars" });
        gsap.from(splitB.chars, { duration: 1, opacity: 0, scale: 0, y: -100, stagger: 0.05, ease: "back.out" });
        break;
        case "Effect C":
        const elementC = previewText;
        const splitC = new SplitText(elementC, { type: "words,chars" });
        gsap.from(splitC.chars, { duration: 1, opacity: 0, scale: 0, x: -100, stagger: 0.12, ease: "back.in" });
        break;
      case "OS Fade":
        let overshootFadePosition = new SplitText(previewText, { type: "chars" });
        gsap.from(overshootFadePosition.chars, { duration: 1, opacity: 0, x: 100, ease: "back.out(5)", stagger: 0.05 });
        break;
       case "3D Flip E":
        let flipEntranceWord = new SplitText(previewText, { type: "words" });
        gsap.from(flipEntranceWord.words, { duration: 3, rotateY: -360, transformOrigin: "50% 50% -80px", ease: "power3.out", stagger: 0.01, opacity: 0 });
        break;
         case "Effect3":
        animateEffect3();
        function animateEffect3() {
    let text3 = new SplitText(previewText, { type: "chars" });
    gsap.from(text3.chars, { duration: 0.8, opacity: 0, scale: 0, transformOrigin: "0% 50% -50", stagger: 0.1, ease: "back.out(1.7)" });
}
        break;        
         case "Effect11":
        animateEffect11();
        function animateEffect11() {
    let text11 = new SplitText(previewText, { type: "chars" });
    gsap.from(text11.chars, { duration: 1, opacity: 0, x: -100, stagger: 0.08, ease: "power4.out" });
}
        break;
        case "Effect2":
        animateEffect2();
        function animateEffect2() {
    let text2 = new SplitText(previewText, { type: "chars, words" });
    gsap.from(text2.chars, { duration: 0.5, opacity: 1, scale: 2, force3D: true, stagger: 0.05, ease: "back.out(0.5)" });
}
        break;  
        case "Effect5":
        animateEffect5();
        function animateEffect5() {
    let text5 = new SplitText(previewText, { type: "chars, words" });
    gsap.from(text5.chars, { duration: 3, opacity: 0, x: 100, rotationX: 360, transformOrigin: "0% 50% -50", stagger: 0.01, ease: "back" });
}
        break;     
         case "effect D":
        const elementD = previewText;
        const splitD = new SplitText(elementD, { type: "words,chars" });
        gsap.from(splitD.chars, { duration: 1, opacity: 0, scale: 0, x: -100, stagger: 0.04, ease: "back.out" });
        break; 
        case "BackInDown":
            tl.from(previewText, { y: -200, opacity: 0, duration: 1, ease: "power2.out" })
              .to(previewText, { delay: 0.5, duration: 0 })
              .to(previewText, { scale: 1.5, rotationX: 360, duration: 2, ease: "power2.inOut" })
          .then(() => {
          gsap.set(previewText, { clearProps: "y,opacity,scale,rotationX" });
      });
            break;
             case "BackOutDown":
tl.to(previewText, { scale: 0.5, rotationX: 360, duration: 1, ease: "power2.out" });
tl.to(previewText, { delay: 0.05, duration: 0 });
tl.to(previewText, { y: 1000, duration: 1, ease: "power2.in" })
.then(() => {
          gsap.set(previewText, { clearProps: "y,opacity,scale,rotationX" });
      });
            break;
        case "BackInLeft":
tl.from(previewText, { x: -500, duration: 1, ease: "power2.out" });
tl.to(previewText, { delay: 0.05, duration: 0 });
tl.to(previewText, { scale: 1.8,rotationX: 360, duration: 2, ease: "power2.inOut" })
.then(() => {
          gsap.set(previewText, { clearProps: "x,scale,rotationX" });
      });
            break;
        case "BackOutLeft":
tl.to(previewText, { scale: 0.5,rotationX: 360,duration: 1, ease: "power2.out" });
tl.to(previewText, { delay: 0.05, duration: 0 });
tl.to(previewText, { x: -500, duration: 1, ease: "power2.in" })
.then(() => {
          gsap.set(previewText, { clearProps: "x,scale,rotationX" });
      });
            break;
        case "BackInRight":
tl.from(previewText, { x: 500, duration: 1, ease: "power2.out" });
tl.to(previewText, { delay: 0.05, duration: 0 });
tl.to(previewText, { scale: 1.5, rotationX: 360, duration: 2, ease: "power2.inOut" })
.then(() => {
          gsap.set(previewText, { clearProps: "x,scale,rotationX" });
      });
            break;
        case "BackOutRight":
tl.to(previewText, { scale: 0.5,rotationX: 360, duration: 1, ease: "power2.out" });
tl.to(previewText, { delay: 0.05, duration: 0 });
tl.to(previewText, { x: 500, duration: 1, ease: "power2.in" })
.then(() => {
          gsap.set(previewText, { clearProps: "x,scale,rotationX" });
      });
            break;
        case "BackInUp":
tl.from(previewText, { y: 500,  duration: 1, ease: "power2.out" });
tl.to(previewText, { delay: 0.05, duration: 0 });
tl.to(previewText, { scale: 1.5, rotationX: 360, duration: 2, ease: "power2.inOut" })
.then(() => {
          gsap.set(previewText, { clearProps: "y,scale,rotationX" });
      });
            break;
        case "BackOutUp":
tl.to(previewText, { scale: 0.5,rotationX: 360, duration: 1, ease: "power2.out" });
tl.to(previewText, { delay: 0.05, duration: 0 });
tl.to(previewText, { y: -500, duration: 1, ease: "power2.in" })
.then(() => {
          gsap.set(previewText, { clearProps: "y,scale,rotationX" });
      });
            break;
   case "Fade Separately":
    let fadeSeparately = new SplitText(previewText, {type: "chars"});
    gsap.to(fadeSeparately.chars, {
        duration: 1,
        opacity: 0,
        stagger: 0.1
    }).then(() => {
        gsap.set(previewText, { clearProps: "all" });
        fadeSeparately.revert(); // Reverts the DOM changes made by SplitText
    });
    break;
case "Fade Randomly":
    let fadeRandomly = new SplitText(previewText, { type: "chars" });
    let completedAnimations = 0;

    fadeRandomly.chars.forEach(char => {
        gsap.to(char, { 
            duration: 3, 
            opacity: 0, 
            delay: Math.random(),
            onComplete: () => {
                completedAnimations++;
                if (completedAnimations === fadeRandomly.chars.length) {
                    gsap.set(previewText, { clearProps: "all" });
                    fadeRandomly.revert();
                }
            }
        });
    });
    break;
        case  "Flip X":
gsap.to(previewText, { duration: 2, rotationX: 360, transformOrigin: "center" })

            break;
        case  "Flip Y":
gsap.to(previewText, { duration: 2, rotationY: 360, transformOrigin: "center" })

            break;
        case  "flipOutX":
gsap.to(previewText, { duration: 2, rotationX: 360, autoAlpha: 0, transformOrigin: "center" })
.then(() => {
          gsap.set(previewText, { clearProps: "all" });
      });
            break;
        case  "FlipOutY":
gsap.to(previewText, { duration: 2, rotationY: 360, autoAlpha: 0, transformOrigin: "center" })
.then(() => {
          gsap.set(previewText, { clearProps: "all" });
      });
            break;
      case  "3D P":
    gsap.to(previewText, { duration: 3, rotationY: 360,
   transformOrigin: "50% 50%", repeat:2,ease:"linear"})
.then(() => {
          gsap.set(previewText, { clearProps: "rotationY,transformOrigin" });
      });
            break;
        case   "3D P out":
    gsap.to(previewText, { duration: 2, rotationY: 360,autoAlpha: 0, transformOrigin: "50% 50%",ease:"linear"})
.then(() => {
          gsap.set(previewText, { clearProps: "all" });
      });
            break;
        case  "zoom in":
gsap.from(previewText, { duration: 2, scale: 0, ease: "power1.inOut" })
.then(() => {
          gsap.set(previewText, { clearProps: "scale" });
      });
            break;
        case  "zoom out":
gsap.to(previewText, { duration: 2, scale: 0, ease: "power1.inOut" })
.then(() => {
          gsap.set(previewText, { clearProps: "scale" });
      });
            break;
        case  "bounce in":
gsap.from(previewText, { duration: 2, opacity: 0, scale: 0, ease: "bounce.out" })
.then(() => {
          gsap.set(previewText, { clearProps: "scale,opacity" });
      });
            break;
        case  "bounceOut":
gsap.to(previewText, { duration: 2, opacity: 0, scale: 0, ease: "bounce.in" })
.then(() => {
          gsap.set(previewText, { clearProps: "scale,opacity" });
      });
            break;
        case   "bounceInDown":
gsap.from(previewText, { duration: 2, y: -100, opacity: 0, ease: "bounce.out" })
.then(() => {
          gsap.set(previewText, { clearProps: "y,opacity" });
      });
            break;
        case  "bounceOutDown":
gsap.to(previewText, { duration: 2, y: 100, opacity: 0, ease: "bounce.in" })
.then(() => {
          gsap.set(previewText, { clearProps: "y,opacity" });
      });
            break;
        case  "bounceInUp":
gsap.from(previewText, { duration: 2, y: 100, opacity: 0, ease: "bounce.out" })
.then(() => {
          gsap.set(previewText, { clearProps: "y,opacity" });
      });
            break;
        case  "bounceOutUp":
gsap.to(previewText, { duration: 2, y: -100, opacity: 0, ease: "bounce.in" })
.then(() => {
          gsap.set(previewText, { clearProps: "y,opacity" });
      });
            break;
       case "Text Swing":
    let swingText = new SplitText(previewText, { type: "chars" });
    gsap.from(swingText.chars, {
        duration: 1,
        rotation: 45,
        transformOrigin: "top center",
        ease: "elastic.out(1, 0.3)",
        stagger: 0.05
    }).then(() => {
                gsap.set(previewText, { clearProps: "all" });
                swingText.revert();
            });
    break;
        case  "Roll in":
gsap.from(previewText, { duration: 1, x: -200, rotation: 360, scale: 0 })
.then(() => {
          gsap.set(previewText, { clearProps: "x,rotation" });
      });
            break;
        case  "Roll out":
gsap.to(previewText, { duration: 1, x: 200, rotation: -360, scale: 0 })
.then(() => {
          gsap.set(previewText, { clearProps: "x,rotation" });
      });
            break;
       case "Color Drip":
    let dripText = new SplitText(previewText, { type: "chars" });
    gsap.to(dripText.chars, {
        duration: 1,
        color: "#ff0000",
        ease: "none",
        stagger: {
            each: 0.1,
            from: "start",
            repeat: 3,
            yoyo: true
        }
    });
      break;
        case "Slide and Rotate":
    let slideRotateText = new SplitText(previewText, { type: "chars" });
    gsap.to(slideRotateText.chars, {
        duration: 1,
        x: 400, // Horizontal slide distance
        rotationX: 360, // Rotation angle
        transformOrigin: "50% 50%", // Center of rotation
        ease: "power2.inOut",
        stagger: 0.001 // Staggering the animation for each character
    }).then(() => {
                gsap.set(previewText, { clearProps: "all" });
                slideRotateText.revert();
            });
        break;


 
 default:
            console.log('Unknown animation:', animation);
            return; // Exit the function if the animation is not recognized
    }
  
}       
  
  


function applyMotionAnimation(animation) {
    let image = document.getElementById('animatedImage');
    let tl = gsap.timeline({
        onComplete: () => {
            setTimeout(() => {
                // Use GSAP to set properties instantly after the delay
                gsap.to(image, { duration: 1.5, display: 'none', onComplete: () => {
                    gsap.set(image, { clearProps: "all" });
                    image.style.display = ''; // Reset display property for the next animation
                }});
            }, 100); // 0.5 second delay before hiding and resetting
        }
    });
  
        switch (animation) {
        case "BackInDown":
 tl.set(image, { opacity: 0 })
              .to(image, { delay: 0.5, opacity: 0 })
                tl.from(image, { y: -200, opacity: 0, duration: 1, ease: "back.inOut" })
                  .to(image, { delay: 0.5, duration: 0 })
                  .to(image, { scale: 1.5, rotationX: 360, duration: 1, ease: "back.inOut" })
              tl.to(image, { opacity: 0, duration: 0.5 })
      .eventCallback("onComplete", () => {
          gsap.set(image, {  x: 0,  y: 0, scale: 1, rotationX: 0, opacity: 0 });
          gsap.to(image, { opacity: 1, delay: 0.5 });
      });
                break;
 case "BackOutDown":
tl.to(image, { scale: 0.5, rotationX: 360, duration: 1, ease: "power2.out" });
tl.to(image, { delay: 0.05, duration: 0 });
tl.to(image, { y: 300, duration: 1, ease: "power2.in" })
   tl.to(image, { opacity: 0, duration: 0.5 })
      .eventCallback("onComplete", () => {
          gsap.set(image, {  x: 0,  y: 0, scale: 1, rotationX: 0, opacity: 0 });
          gsap.to(image, { opacity: 1, delay: 0.5 });
      });
            break;
        case "BackInLeft":
  tl.set(image, { opacity: 0 })
              .to(image, { delay: 0.5, opacity: 1 })
tl.from(image, { x: -300, duration: 1, ease: "power2.out" });
tl.to(image, { delay: 0.05, duration: 0 });
tl.to(image, { scale: 1.8, rotationX: 360, duration: 1, ease: "power2.inOut" })
   tl.to(image, { opacity: 0, duration: 0.5 })
      .eventCallback("onComplete", () => {
          gsap.set(image, {  x: 0,  y: 0, scale: 1, rotationX: 0, opacity: 0 });
          gsap.to(image, { opacity: 1, delay: 0.5 });
      });
            break;
        case "BackOutLeft":
tl.to(image, { scale: 0.5, rotationX: 360, duration: 1, ease: "power2.out" });
tl.to(image, { delay: 0.05, duration: 0 });
tl.to(image, { x: -300, duration: 1, ease: "power2.in" })
   tl.to(image, { opacity: 0, duration: 0.5 })
      .eventCallback("onComplete", () => {
          gsap.set(image, {  x: 0,  y: 0, scale: 1, rotationX: 0, opacity: 0 });
          gsap.to(image, { opacity: 1, delay: 0.5 });
      });
            break;
        case "BackInRight":
  tl.set(image, { opacity: 0 })
              .to(image, { delay: 0.5, opacity: 1 })
tl.from(image, { x: 300, duration: 1, ease: "power2.out" });
tl.to(image, { delay: 0.05, duration: 0 });
tl.to(image, { scale: 1.5, rotationX: 360, duration: 1, ease: "power2.inOut" })
   tl.to(image, { opacity: 0, duration: 0.5 })
      .eventCallback("onComplete", () => {
          gsap.set(image, {  x: 0,  y: 0, scale: 1, rotationX: 0, opacity: 0 });
          gsap.to(image, { opacity: 1, delay: 0.5 });
      });
            break;
        case "BackOutRight":
tl.to(image, { scale: 0.5, rotationX: 360, duration: 1, ease: "power2.out" });
tl.to(image, { delay: 0.05, duration: 0 });
tl.to(image, { x: 300, duration: 1, ease: "power2.in" })
   tl.to(image, { opacity: 0, duration: 0.5 })
      .eventCallback("onComplete", () => {
          gsap.set(image, {  x: 0,  y: 0, scale: 1, rotationX: 0, opacity: 0 });
          gsap.to(image, { opacity: 1, delay: 0.5 });
      });
            break;
        case "BackInUp":
  tl.set(image, { opacity: 0 })
              .to(image, { delay: 0.5, opacity: 1 })
tl.from(image, { y: 300, duration: 1, ease: "power2.out" });
tl.to(image, { delay: 0.05, duration: 0 });
tl.to(image, { scale: 1.5, rotationX: 360, duration: 1, ease: "power2.inOut" })
   tl.to(image, { opacity: 0, duration: 0.5 })
      .eventCallback("onComplete", () => {
          gsap.set(image, {  x: 0,  y: 0, scale: 1, rotationX: 0, opacity: 0 });
          gsap.to(image, { opacity: 1, delay: 0.5 });
      });
            break;
        case "BackOutUp":
tl.to(image, { scale: 0.5, rotationX: 360, duration: 1, ease: "power2.out" });
tl.to(image, { delay: 0.05, duration: 0 });
tl.to(image, { y: -300, duration: 1, ease: "power2.in" })
   tl.to(image, { opacity: 0, duration: 0.5 })
      .eventCallback("onComplete", () => {
          gsap.set(image, {  x: 0,  y: 0, scale: 1, rotationX: 0, opacity: 0 });
          gsap.to(image, { opacity: 1, delay: 0.5 });
      });
            break;
       case "Text Zoom & Rotate":
      tl.set(image, { opacity: 0 })
              .to(image, { delay: 1, opacity: 1 })
        gsap.from(image, { duration: 5, scale: 0, rotation: 360, transformOrigin: "50% 50%", ease: "power1.inOut" })
        .then(() => {
          gsap.set(image, { clearProps: "all" });
         });
        break;
        case  "Flip X":
gsap.to(image, { duration: 3, rotationX: 360, transformOrigin: "center" })

            break;
        case  "Flip Y":
gsap.to(image, { duration: 3, rotationY: 360, transformOrigin: "center" })

            break;
        case  "flipOutX":
gsap.to(image, { duration: 1, rotationX: 360, autoAlpha: 0, transformOrigin: "center" })
  .eventCallback("onComplete", () => {
          gsap.set(image, {  x: 0,  y: 0, scale: 1, rotationX: 0, opacity: 0 });
          gsap.to(image, { opacity: 1, delay: 0.5 });
      });
            break;
        case  "FlipOutY":
gsap.to(image, { duration: 1, rotationY: 360, autoAlpha: 0, transformOrigin: "center" })
 .eventCallback("onComplete", () => {
          gsap.set(image, {  x: 0,  y: 0, scale: 1, rotationY: 0, opacity: 0 });
          gsap.to(image, { opacity: 1, delay: 0.5 });
      });
            break;
       case  "3D P":
    gsap.to(image, { duration: 3, rotationY: 360, transformOrigin: "50% 50%", repeat:2,ease:"linear"})

            break;
        case   "3D P out":
    gsap.to(image, { duration: 2, rotationY: 360,autoAlpha: 0, transformOrigin: "50% 50%",ease:"linear"})
  .eventCallback("onComplete", () => {
          gsap.set(image, {  x: 0,  y: 0, scale: 1, rotationY: 0, opacity: 0 });
          gsap.to(image, { opacity: 1, delay: 0.5 })
                     tl.to(image, { opacity: 0, duration: 0.5 });
      });
            break;
        case  "zoom in":
      tl.set(image, { opacity: 0 })
              .to(image, { delay: 1, opacity: 1 })
gsap.from(image, { duration: 2, scale: 0, ease: "power1.inOut" })

            break;
        case  "zoom out":
gsap.to(image, { duration: 2, scale: 0, ease: "power1.inOut" })
  .eventCallback("onComplete", () => {
          gsap.set(image, {  x: 0,  y: 0, scale: 1, rotationX: 0, opacity: 0 });
          gsap.to(image, { opacity: 1, delay: 0.5 });
      });
            break;       
        case  "Roll in":
          tl.set(image, { opacity: 0 })
              .to(image, { delay: 1, opacity: 1 })
gsap.from(image, { duration: 3, x: -500, rotation: 360, scale: 0 })

            break;
        case  "Roll out":
gsap.to(image, { duration: 1, x: 200, rotation: -360, scale: 0 })
    .eventCallback("onComplete", () => {
          gsap.set(image, {  x: 0,  y: 0, scale: 1, rotation: 0, opacity: 0 });
          gsap.to(image, { opacity: 1, delay: 0.5 })
                     tl.to(image, { opacity: 0, duration: 0.5 });
      });
  
            break;
       case "Text Zoom & Rotate":
        gsap.from(image, { duration: 5, scale: 0, rotation: 360, transformOrigin: "50% 50%", ease: "power1.inOut" })
        .then(() => {
          gsap.set(image, { clearProps: "all" });
         });
        break;
 
          
             default:
            console.log('Unknown animation:', animation);
           
        
    }
 
  
}


function loadImage() {
    let input = document.getElementById('imageUpload');
    let image = document.getElementById('animatedImage');
    let imageText = document.querySelector('#imageBox span');

    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            image.src = e.target.result;
            image.style.display = 'block';
            imageText.style.display = 'none'; // Hide the text once the image is loaded
        };
        reader.readAsDataURL(input.files[0]);
    }
}


