// script.js
document.addEventListener('DOMContentLoaded', function() {
    const temperatureInput = document.getElementById('temperature');
    const convertBtn = document.getElementById('convert-btn');
    const convertedTemp = document.getElementById('converted-temp');
    const inputError = document.getElementById('input-error');
    
    convertBtn.addEventListener('click', function() {
        // Validate input
        if (!temperatureInput.value || isNaN(temperatureInput.value)) {
            inputError.style.display = 'block';
            return;
        } else {
            inputError.style.display = 'none';
        }
        
        // Get input value
        const inputTemp = parseFloat(temperatureInput.value);
        
        // Get selected units
        const fromUnit = document.querySelector('input[name="from-unit"]:checked').value;
        const toUnit = document.querySelector('input[name="to-unit"]:checked').value;
        
        // Perform conversion
        let result;
        
        if (fromUnit === toUnit) {
            result = inputTemp;
        } else {
            // Convert to Celsius first as an intermediate step
            let celsius;
            
            switch(fromUnit) {
                case 'celsius':
                    celsius = inputTemp;
                    break;
                case 'fahrenheit':
                    celsius = (inputTemp - 32) * 5/9;
                    break;
                case 'kelvin':
                    celsius = inputTemp - 273.15;
                    break;
            }
            
            // Convert from Celsius to the target unit
            switch(toUnit) {
                case 'celsius':
                    result = celsius;
                    break;
                case 'fahrenheit':
                    result = (celsius * 9/5) + 32;
                    break;
                case 'kelvin':
                    result = celsius + 273.15;
                    break;
            }
        }
        
        // Format and display the result
        const unitSymbols = {
            'celsius': '°C',
            'fahrenheit': '°F',
            'kelvin': 'K'
        };
        
        convertedTemp.textContent = `${result.toFixed(2)} ${unitSymbols[toUnit]}`;
    });
    
    // Allow only numbers, decimal point, and minus sign in the input
    temperatureInput.addEventListener('keydown', function(e) {
        // Allow: backspace, delete, tab, escape, enter
        if ([46, 8, 9, 27, 13, 110].includes(e.keyCode) || 
            // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (e.keyCode === 65 && e.ctrlKey === true) || 
            (e.keyCode === 67 && e.ctrlKey === true) || 
            (e.keyCode === 86 && e.ctrlKey === true) || 
            (e.keyCode === 88 && e.ctrlKey === true) ||
            // Allow: decimal point, minus sign
            e.keyCode === 190 || e.keyCode === 189 ||
            // Allow: numbers on keyboard and numpad
            (e.keyCode >= 48 && e.keyCode <= 57) || 
            (e.keyCode >= 96 && e.keyCode <= 105)) {
            return;
        }
        e.preventDefault();
    });
});