import { useEffect, useState, useRef } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import tinycolor from "tinycolor2";

export default function Test(){

    const [test, setTest] = useState('test');
    const [color, setColor] = useState("#aabbcc");
    const [repeat, setRepeat] = useState(0);
    const testRef = useRef(test);

    console.log(color);

    function onChange(e){

        setRepeat(e.currentTarget.value);
        // let colorData = tinycolor(color);
        // let name = e.currentTarget.getAttribute('name');
        // let val = e.currentTarget.value;

        // let r = colorData._r;
        // let g = colorData._g;
        // let b = colorData._b;

        // let el = [];
        // let i = 1;
        // while (i<=val){

        //     let r_formula = (i * r / 11);
        //     let g_formula = (i * g / 11);
        //     let b_formula = (i * b / 11);
            
        //     el.push(<div style={{ flex: '1 1 0px', background:'rgb(' + r_formula + ', ' + g_formula + ', ' + b_formula + ')' }} className="text-[rgb(207, 76, 74)]">{i}</div>);
        //     i++;
        // }

        // setTest(el);

    }

    function generateHTML(limit, color){

        let colorData = tinycolor(color);
        let colorB = colorData.getBrightness();

        let lighten = colorData.lighten(10).toString();

        let el = [];
        let i = 1;

        let shades = {};
        let currentColor = color;

        // calculates how many arrays there should be
        let remainder = limit % 2;
        if (remainder === 0){
            shades.light = limit / 2;
            shades.light = limit / 2;
            shades.dark = limit / 2;
        } else {
            shades.light = parseInt(limit) / 2;
            shades.light = (parseInt(limit) - 1) / 2;
            shades.dark = (parseInt(limit) + 1) / 2;
        }

        console.log(shades);

        while (i<=limit){

            let ok = 1;
            let newColor = tinycolor(currentColor).lighten(10).toString();
            currentColor = newColor;
            let colorL = tinycolor(newColor).getBrightness();
            if (colorL > 251){
                ok = 0;
            }
            el.push(
                    <div style={{ flex: '1 1 0px', background:newColor }} className="text-[rgb(207, 76, 74)]">
                        <p>Index : {i}</p>
                        <p>Lightness : {colorL}</p>
                        <p>Visible : {ok}</p>
                    </div>
                    );
            i++;
        }
        return el;
    }

    useEffect(() => {

        setTest(generateHTML(repeat, color));

    }, [color, repeat]);
    return (
        <div>
        <div>
            <HexColorPicker color={color} onChange={setColor} placeholder="Type a color" prefixed alpha />
        </div>

        <input onChange={onChange} type="range" id="points" name="points" min="1" max="25"/>

        <div className="flex">
            {test}
        </div>
        
        </div>
    )
}