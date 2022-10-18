let car: Car;


function submitCar() {
    let errores = 0;
    let plateInput = <HTMLInputElement>document.getElementById("plateInput");
    let brandInput = <HTMLInputElement>document.getElementById("brandInput");
    let colorInput = <HTMLInputElement>document.getElementById("colorInput");

	//EX1. Validar los campos de matricula (formato: 1234ABC), marca y color, antes de hacer el new Car
    let errors:number = 0;

    if(!plateInput.value.match('^[0-9]{4}[A-Z]{3}$')){
        errors++
        plateInput.classList.add('is-invalid')
    }
    if(!brandInput.value.match('[a-zA-Z0-9{1,}]')){
        errors++
        brandInput.classList.add('is-invalid')
    }
    if(!colorInput.value.match('[a-zA-Z{1,}]')){
        errors++
        colorInput.classList.add('is-invalid')
    }
    if(!errors){
	    car = new Car(plateInput.value, colorInput.value, brandInput.value);
	    showVehicle();
	    showWheelForm();
    }
    else{
        setTimeout(() => {
            plateInput.classList.remove('is-invalid');
            brandInput.classList.remove('is-invalid');
            colorInput.classList.remove('is-invalid');
        }, 1500)        
    }
}

function showVehicle() {
    let carTitle = <HTMLInputElement>document.getElementById("carTitle");
    let plateOutput = <HTMLInputElement>document.getElementById("plateOutput");
    let brandOutput = <HTMLInputElement>document.getElementById("brandOutput");
    let colorOutput = <HTMLInputElement>document.getElementById("colorOutput");

    carTitle.innerText = "Car:";
    plateOutput.innerText = "Plate: " + car.plate;
    brandOutput.innerText = "Brand: " + car.brand;
    colorOutput.innerText = "Color: " + car.color;

}
function validateWheel(){
    let error:number = 0;
    for (let i = 1; i <= 4; i++) {
        let brandWheel = <HTMLInputElement>document.getElementById("brandWheel" + i);
        let diameterWheel = <HTMLInputElement>document.getElementById("diameterWheel" + i);

        diameterWheel.value = diameterWheel.value.replace(',','.');

        if(!brandWheel.value || brandWheel.value == ""){
            brandWheel.classList.add('is-invalid')
            error = 1;
        }

        if( isNaN(Number(diameterWheel.value)) || (Number(diameterWheel.value) < 1 || Number(diameterWheel.value) > 2) ){
            diameterWheel.classList.add('is-invalid')
            error = 1;
        }
        
        setTimeout(() => {
            brandWheel.classList.remove('is-invalid');
            diameterWheel.classList.remove('is-invalid');
        }, 1500) 
    }
    return error;
}
function submitWheelForm() {
    let errores:number = validateWheel();
	
	//EX2. Solo hacer el "new Wheel" si las 4 ruedas son correctas
	//EX3. Una rueda correcta deberá tener un diámetro entre 1 y 2. Crear una función para validarlas
    if(!errores){
        for (let i = 1; i <= 4; i++) {
            let brandWheel = <HTMLInputElement>document.getElementById("brandWheel" + i);
            let diameterWheel = <HTMLInputElement>document.getElementById("diameterWheel" + i);

            let wheel_generica = new Wheel(Number(diameterWheel.value), brandWheel.value);
            car.addWheel(wheel_generica);

        }
        console.log(car)
        showWheels();
    }
}

function showWheels() {
	//EX4. Optimizar la función showWheels
    document.getElementById("wheelTitle")!.innerText = "Wheels:";
    for (let i = 1; i <= 4; i++) document.getElementById(`wheelOutput${i}`)!.innerText = `Wheel ${i}: Brand: ${car.wheels[i-1].brand} Diameter: ${car.wheels[i-1].diameter}`;
}


function showWheelForm() {
    let carForm = <HTMLInputElement>document.getElementById("create-car-form");
    let carWheel = <HTMLInputElement>document.getElementById("create-wheel-form");
    carForm.style.display = "none";
    carWheel.style.display = "block";

}