import chroma from 'chroma-js';

let levels = [50,100,200,300,400,500,600,700,800,900];

function generatePalette(starterPalette){
    let newPalette = {
        paletteName : starterPalette.paletteName,
        id : starterPalette.id,
        emoji : starterPalette.emoji,
        colors : {}
    };

    // init array for all color levels
    for (let level of levels){
        newPalette.colors[level] = [];
    }

    for (let color of starterPalette.colors){
        let scale = generateScale(color.color, 10).reverse();
        for(let i in scale){
            newPalette.colors[levels[i]].push({
                name : `${color.name} ${levels[i]}`,
                hex : chroma(scale[i]).hex(),
                //id is color name lowercase with spaces replaced with dashes
                id : color.name.toLowerCase().replace(/ /g, "-"),
                //convert our LAB chroma color back to RGB so we can display
                rgb : chroma(scale[i]).css(),
                //generate rgba value by changing end of rgb to have a 1.0 alpha channel
                rgba : chroma(scale[i]).css().replace("rgb", "rgba").replace(")",",1.0)")
            });
        }
    }
    return newPalette;
}

function getRange(hexColor){
    const end = "#fff";
    return[
        chroma(hexColor).darken(1.4).hex(),
        hexColor,
        end
    ];
}

function generateScale(hexColor, numberOfColors){
    return chroma.scale(getRange(hexColor))
          .mode('lab')
          .colors(numberOfColors);
}

export { generatePalette }