"use strict";
var car;
function submitCar() {
    var errores = 0;
    var plateInput = document.getElementById("plateInput");
    var brandInput = document.getElementById("brandInput");
    var colorInput = document.getElementById("colorInput");
    //EX1. Validar los campos de matricula (formato: 1234ABC), marca y color, antes de hacer el new Car
    var errors = 0;
    if (!plateInput.value.match('^[0-9]{4}[A-Z]{3}$')) {
        errors++;
        plateInput.classList.add('is-invalid');
    }
    if (!brandInput.value.match('[a-zA-Z0-9{1,}]')) {
        errors++;
        brandInput.classList.add('is-invalid');
    }
    if (!colorInput.value.match('[a-zA-Z{1,}]')) {
        errors++;
        colorInput.classList.add('is-invalid');
    }
    if (!errors) {
        car = new Car(plateInput.value, colorInput.value, brandInput.value);
        showVehicle();
        showWheelForm();
    }
    else {
        setTimeout(function () {
            plateInput.classList.remove('is-invalid');
            brandInput.classList.remove('is-invalid');
            colorInput.classList.remove('is-invalid');
        }, 1500);
    }
}
function showVehicle() {
    var carTitle = document.getElementById("carTitle");
    var plateOutput = document.getElementById("plateOutput");
    var brandOutput = document.getElementById("brandOutput");
    var colorOutput = document.getElementById("colorOutput");
    carTitle.innerText = "Car:";
    plateOutput.innerText = "Plate: " + car.plate;
    brandOutput.innerText = "Brand: " + car.brand;
    colorOutput.innerText = "Color: " + car.color;
}
function validateWheel() {
    var error = 0;
    var _loop_1 = function (i) {
        var brandWheel = document.getElementById("brandWheel" + i);
        var diameterWheel = document.getElementById("diameterWheel" + i);
        diameterWheel.value = diameterWheel.value.replace(',', '.');
        if (!brandWheel.value || brandWheel.value == "") {
            brandWheel.classList.add('is-invalid');
            error = 1;
        }
        if (isNaN(Number(diameterWheel.value)) || (Number(diameterWheel.value) < 1 || Number(diameterWheel.value) > 2)) {
            diameterWheel.classList.add('is-invalid');
            error = 1;
        }
        setTimeout(function () {
            brandWheel.classList.remove('is-invalid');
            diameterWheel.classList.remove('is-invalid');
        }, 1500);
    };
    for (var i = 1; i <= 4; i++) {
        _loop_1(i);
    }
    return error;
}
function submitWheelForm() {
    var errores = validateWheel();
    //EX2. Solo hacer el "new Wheel" si las 4 ruedas son correctas
    //EX3. Una rueda correcta deberá tener un diámetro entre 1 y 2. Crear una función para validarlas
    if (!errores) {
        for (var i = 1; i <= 4; i++) {
            var brandWheel = document.getElementById("brandWheel" + i);
            var diameterWheel = document.getElementById("diameterWheel" + i);
            var wheel_generica = new Wheel(Number(diameterWheel.value), brandWheel.value);
            car.addWheel(wheel_generica);
        }
        console.log(car);
        showWheels();
    }
}
function showWheels() {
    //EX4. Optimizar la función showWheels
    document.getElementById("wheelTitle").innerText = "Wheels:";
    for (var i = 1; i <= 4; i++)
        document.getElementById("wheelOutput".concat(i)).innerText = "Wheel ".concat(i, ": Brand: ").concat(car.wheels[i - 1].brand, " Diameter: ").concat(car.wheels[i - 1].diameter);
}
function showWheelForm() {
    var carForm = document.getElementById("create-car-form");
    var carWheel = document.getElementById("create-wheel-form");
    carForm.style.display = "none";
    carWheel.style.display = "block";
}
