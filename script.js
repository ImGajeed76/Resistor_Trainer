let colors = ["#c0c0c0", "#e0bd00", "#202020", "#a5512a", "#d30e0e", "#ff9500", "#ffff00", "#029c02", "#2e2eed", "#af50e6", "#777777", "#f3f3f3"]

let band1
let band2
let band3
let band4
let band5

let inputField
let enterButton

let resistorValue = 0
let resistorTolerance = 0

let acceptedValues = []

function onPageLoad() {
    console.log("Page loaded");

    band1 = document.getElementById("b1");
    band2 = document.getElementById("b2");
    band3 = document.getElementById("b3");
    band4 = document.getElementById("b4");
    band5 = document.getElementById("b5");

    inputField = document.getElementById("field");
    enterButton = document.getElementById("btn");

    newResistor();
}

function newResistor() {
    let color1 = Math.floor(Math.random() * (colors.length - 3)) + 3;
    let color2 = Math.floor(Math.random() * (colors.length - 2)) + 2;
    let color3 = Math.floor(Math.random() * (colors.length - 2)) + 2;
    let color4 = Math.floor(Math.random() * (colors.length - 2));

    let toleranceColors = colors.slice(0, 2).concat(colors.slice(3, 5)).concat(colors.slice(7, 11));
    let color5 = Math.floor(Math.random() * toleranceColors.length);

    band1.style.backgroundColor = colors[color1];
    band2.style.backgroundColor = colors[color2];
    band3.style.backgroundColor = colors[color3];
    band4.style.backgroundColor = colors[color4];
    band5.style.backgroundColor = toleranceColors[color5];

    resistorValue = Number((((color1 - 2) * 100 + (color2 - 2) * 10 + (color3 - 2)) * Math.pow(10, (color4 - 2))).toFixed(2));

    if (color5 === 0) {
        resistorTolerance = 10;
    } else if (color5 === 1) {
        resistorTolerance = 5;
    } else if (color5 === 2) {
        resistorTolerance = 1;
    } else if (color5 === 3) {
        resistorTolerance = 2;
    } else if (color5 === 4) {
        resistorTolerance = 0.5;
    } else if (color5 === 5) {
        resistorTolerance = 0.25;
    } else if (color5 === 6) {
        resistorTolerance = 0.1;
    } else if (color5 === 7) {
        resistorTolerance = 0.05;
    }

    acceptedValues = [];
    acceptedValues.push(resistorValue.toString());
    acceptedValues.push(resistorValue.toString() + " " + resistorTolerance.toString() + "%");

    if (resistorValue > 1e9) {
        acceptedValues.push(replaceMultiple(1e9, "G"));
        acceptedValues.push(replaceMultiple(1e9, "G") + " " + resistorTolerance.toString() + "%");
    } else if (resistorValue > 1e6) {
        acceptedValues.push(replaceMultiple(1e6, "M"));
        acceptedValues.push(replaceMultiple(1e6, "M") + " " + resistorTolerance.toString() + "%");
    } else if (resistorValue > 1e3) {
        acceptedValues.push(replaceMultiple(1e3, "k"));
        acceptedValues.push(replaceMultiple(1e3, "k") + " " + resistorTolerance.toString() + "%");
    } else {
        acceptedValues.push(replaceMultiple(1, "R"));
        acceptedValues.push(replaceMultiple(1, "R") + " " + resistorTolerance.toString() + "%");
    }
}

function replaceMultiple(multiple, size) {
    let v = Number((resistorValue / multiple).toFixed(2));
    if (Number.isInteger(v) && size !== "R") {
        return v.toString() + size;
    } else {
        return v.toString().replace(".", size);
    }
}

function checkResult() {
    let value = inputField.value;

    if (acceptedValues.includes(value)) {
        alert("Correct!");
    } else {
        alert("Incorrect!\n-------------------\nAccepted values:\n - " + acceptedValues.join("\n - "));
    }

    inputField.value = "";
    newResistor();
}