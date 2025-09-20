import { animate, utils, createDraggable, createSpring, text, stagger} from 'animejs';
import { createCanvasElement } from 'three';

import { lookCamera, moveCamera, switchScene, renderShapes} from './models';

const overlay = document.getElementById('overlay')
let sceneCount = 0;

let bg;

document.getElementById("back").addEventListener("click", ()=>{
    if (sceneCount>1)
    {
        sceneCount--;
        sceneControl();
    }
})

// Control scene
async function sceneControl(){
    let para = document.createElement('p');
    let body;
    switch (sceneCount)
    {
        case 1: 
            lookCamera(0,0,0)
            let dis = Array.from(document.getElementsByClassName('disapear'));
            animate(dis,{
                opacity:0,
                duration:300,
                onComplete: ()=>{
                    dis.forEach(el => el.remove());
                    para.id = 'intro'
                    para.className = 'disapear'
                    body = document.createTextNode("Theories which attempt to describe the fate of the universe partly rely on the properties of gravity, the overall geometry of the universe, and dark energy.");
                    para.appendChild(body)
                    overlay.appendChild(para);
            }})
            break;
        case 2:
            switchScene(1)
            lookCamera(250,220,100)
            await disapear(Array.from(document.getElementsByClassName('disapear')))
            para.id = 'intro'
            para.className = 'disapear'
            para.style.maxWidth = "50%"
            para.style.marginTop = "-400px"
            body = document.createTextNode("The geometry of the universe is determined by its density (average matter) compared to a critical density. This critial density is proportional to the Hubble Constant and tells us if the average matter in the universe can simply halt the expansion in an infinite amount of time.");
            para.appendChild(body)
            document.getElementById('overlay').appendChild(para);
            break;
        case 3:
            lookCamera(0,0,0)
            switchScene(2)
            renderShapes(1)
            await disapear(Array.from(document.getElementsByClassName('disapear')))
            para.id = 'sphere'
            para.className = 'disapear'
            para.style.maxWidth = "50%"
            para.style.marginTop = "-600px" 
            body = document.createTextNode("If the density is greater than the critical density, then the geometry of space is closed and positively closed (alike a sphere).");
            para.appendChild(body)
            document.getElementById('overlay').appendChild(para);
            break;
        case 4:
            renderShapes(2)
            await disapear(Array.from(document.getElementsByClassName('disapear')))
            para.id = 'saddle'
            para.className = 'disapear'
            para.style.maxWidth = "50%"
            para.style.marginTop = "-600px"
            body = document.createTextNode("If density is less than critical density, then the geometry of space is open, and negetively closed (alike a saddle like shape).");
            para.appendChild(body)
            document.getElementById('overlay').appendChild(para);
            break;
        case 5:
            switchScene(2)
            lookCamera(0,0,0)
            renderShapes(3)
            await disapear(Array.from(document.getElementsByClassName('disapear')))
            para.id = 'plane'
            para.className = 'disapear'
            para.style.maxWidth = "50%"
            para.style.marginTop = "-600px"
            body = document.createTextNode("If the density is equal to the critical density, then the geometry of the universe is flat, alike a sheet of paper, and infinite in extent");
            para.appendChild(body)
            document.getElementById('overlay').appendChild(para);
            break;
        case 6:
            await disapear(Array.from(document.getElementsByClassName('disapear')));
            switchScene(1)
            moveCamera(0,400,1000)
            lookCamera(0,0,0)
            // Create main container
            const container = document.createElement('div');
            container.style.display = 'grid';
            container.style.gridTemplateRows = '1fr 1fr'; // two rows
            container.style.gridTemplateColumns = '1fr'; // initially 1 column
            container.style.height = '50%'; // adjust as needed
            container.style.width = '90%';
            container.style.gap = '10px'; // spacing between rows
            container.className ='disapear'
            container.style.marginTop = '-100px'

            // Top row (one column)
            const topRow = document.createElement('div');
            topRow.style.gridRow = '1 / 2';
            topRow.style.display = 'block';
            topRow.style.alignItems = 'center';
            topRow.style.justifyContent = 'center';

            // Add a paragraph to top row
            const topP = document.createElement('p');
            const topH = document.createElement('h1');
            topH.textContent = "Dark Energy";
            topP.textContent = "Currently the universe is expanding according to the Hubble Constant, and seems to be accelarating instead of decreasing from gravity due to a unknown force called dark energy. Scientist currently don't know exactly what is dark energy, but they do know it exists and it is the something which is speeding up expansion. There are two main explanation for dark energy:";
            topRow.appendChild(topH)
            topRow.appendChild(topP);

            // Bottom row (two columns)
            const bottomRow = document.createElement('div');
            bottomRow.style.gridRow = '2 / 3';
            bottomRow.style.display = 'grid';
            bottomRow.style.gridTemplateColumns = '1fr 1fr'; // two columns
            bottomRow.style.gap = '10px';

            // Create two columns in bottom row
            const bottomLeft = document.createElement('div');
            const bottomRight = document.createElement('div');

            // Add paragraphs to bottom columns
            const hLeft = document.createElement('h2');
            const pLeft = document.createElement('p');
            pLeft.textContent = "A fundamental, ever-present background energy called vacuum energy, which could be equal to the cosmological constant, a mathematical term in Einstein's equations in the Theory of General Relativity. It is a vacuum energy of empty space which was used to keep the universe static rather than contracting or expanding according to his equation. However, once Hubble observed that the universe was expanding, he quickly removed this constant. If this is dark energy is equal to this 'cosmological constant' then dark energy would not only balance gravity but exude a negetive pressure which then causes the expansion of the universe.";
            hLeft.textContent = "Vacuum Energy"
            bottomLeft.appendChild(hLeft);
            bottomLeft.appendChild(pLeft);

            const pRight = document.createElement('p');
            const hRight = document.createElement('h2');
            pRight.textContent = "Nicknamed Quintessence after the proposed mysterious fifth element proposed by the ancient Greeks. This energy could be a sort of energy fluid or field which fills space and behaves in a opposite way to normal matter and can vary in amounts and distributions in space and time.";
            hRight.textContent = "Quintessence"
            bottomRight.appendChild(hRight);
            bottomRight.appendChild(pRight);

            // Append columns to bottom row
            bottomRow.appendChild(bottomLeft);
            bottomRow.appendChild(bottomRight);

            // Append rows to container
            container.appendChild(topRow);
            container.appendChild(bottomRow);

            // Append container to body or a specific parent
            overlay.appendChild(container);
            break;
        case 7:
            await disapear(Array.from(document.getElementsByClassName('disapear')));
            switchScene(3);
            lookCamera(0,0,0);
            moveCamera(0,1,30)
            const container2 = document.createElement('div');
            container2.style.display = 'flex';      // make row layout
            container2.style.gap = '500px';          // space between columns
            container2.style.justifyContent = 'center'; // optional centering
            container2.style.width = "90%"
            container2.className ="disapear"

            // column 1
            const col1 = document.createElement('div');
            const p1 = document.createElement('p');
            col1.style.flex = '1';
            p1.textContent = "If the universe is closed, then there are two possibilies. If the universe has a lot of dark energy, then expansion could continue forever. However, if the universe lacks the repulsive force of dark energy then gravity will eventually stop the expansion, and start to contract untill all matter collapses into a singularity.";
            col1.appendChild(p1);

            // column 2
            const col2 = document.createElement('div');
            const p2 = document.createElement('p');
            col2.style.flex = '1';
            p2.textContent = "If the universe is open or even flat, the universe will continue expand because gravity alone will not be sufficient to stop the expansion.";
            col2.appendChild(p2);

            // add columns to container
            container2.appendChild(col1);
            container2.appendChild(col2);

            // add container to page
            overlay.appendChild(container2);
            break;
        case 8:
            await disapear(Array.from(document.getElementsByClassName('disapear')));
            moveCamera(0,0,4070);
            const container3 = document.createElement('div');
            container3.style.display = 'flex';
            container3.style.flexDirection = 'column';
            container3.style.width = '90%';
            container3.style.gap = '20px'; // spacing between rows
            container3.className ='disapear'

            // Row 1 (one column full width)
            const row1 = document.createElement('div');
            row1.style.flex = '1';
            const pp = document.createElement('p');
            pp.textContent = "These situations give 4 main possible states to the end of the universe.";
            row1.appendChild(pp);

            // Row 2 (two equal columns)
            const row2 = document.createElement('div');
            row2.style.display = 'flex';
            row2.style.gap = '10px';
            const col21 = document.createElement('div');
            col21.style.flex = '1';
            col21.innerHTML = "<h3>Big Freeze</h3><p>In the case that the universe continues to expand forever, galaxies will continue to seperate and star formation within the galaxies will ceases as there is not enough material to form new stars. Then the universe will eventually cool down to absolute zero, a heat death will occur. In this state, no life will be able to exist.</p>";
            const col22 = document.createElement('div');
            col22.style.flex = '1';
            col22.innerHTML = "<h3>Big Crunch</h3><p>The universe will begin to contract, and continue into a singularity point. Eventually, the universe will enter a fireball state like the state which the Big Bang originated from. This gives form to the \"Oscillating Theory of the Universe\", where the universe contracts and expands in a cyclic way.</p>";
            row2.appendChild(col21);
            row2.appendChild(col22);

            // Row 3 (two equal columns)
            const row3 = document.createElement('div');
            row3.style.display = 'flex';
            row3.style.gap = '10px';
            const col31 = document.createElement('div');
            col31.style.flex = '1';
            col31.innerHTML = "<h3>Big Rip</h3><p>This occurs if dark energy continues to cause the accelarating expansion of the universe without limit, then dark energy could become so strong and overwhelm the other fundamental forces. This will cause galaxies to pull apart, then stars, then atoms themselves.</p>";
            const col32 = document.createElement('div');
            col32.style.flex = '1';
            col32.innerHTML = "<h3>Big Bounce</h3><p>Derived from the Big Crunch and Big Bang theory, it predicts if the Big Crunch compacts the universe to a singularity, another Big Bang could occur in which another universe will emerge. This means that we could currently live in a series of universes.</p>";
            row3.appendChild(col31);
            row3.appendChild(col32);

            // Add rows into container
            container3.appendChild(row1);
            container3.appendChild(row2);
            container3.appendChild(row3);

            // Attach to page
            overlay.appendChild(container3);
            break;
        case 9: 
            if (bg)
            {
                bg.pause();}    
            document.getElementById('fade').style.opacity =0;
            await disapear(Array.from(document.getElementsByClassName('disapear')));
            para.className = 'disapear'
            para.style.maxWidth = "50%"
            body = document.createTextNode("From recent research, the probability of the Big Crunch and Big Bounce theory has become negliable. Current research from WMAP satellites and Cosmic Background Imager indicate that the universe has a flat shape, giving favour to the theory of the Big Freeze.");
            para.appendChild(body)
            overlay.appendChild(para);
            break;
        case 10:
            await disapear(Array.from(document.getElementsByClassName('disapear')));
            para.className = 'disapear';
            para.id = 'poem';
            para.style.maxWidth = "50%";
            para.style.textAlign= "left"
            para.innerHTML = `"I had a dream, which was not all a dream.<br>
            The bright sun was extinguish'd, and the stars<br>
            Did wander darkling in the eternal space" - Lord Byron`;
            overlay.appendChild(para);

            bg = animate(document.getElementById('fade'), {
                opacity: 1,
                duration:14000,
                easing:'linear'
            })

            text.split(para, { 
                lines: { wrap: 'clip' }
            })
            .addEffect(({ lines }) => animate(lines, {
                y: [
                    { to: ['-100%', '0%'] }],
                duration: 5000,
                ease: 'out(3)',
                delay: stagger(3000),
            }));
            break;
    }
}

function incrementScene(){
    if (sceneCount<10)
    {
        sceneCount++;
        sceneControl()
    }
}

function disapear(text)
{
    return new Promise((resolve, reject)=>{
        animate(text,{
        opacity:0,
        duration:500,
        onComplete: ()=>{
            text.forEach(el => el.remove());
            resolve();
        }})
    })
}

export {incrementScene};