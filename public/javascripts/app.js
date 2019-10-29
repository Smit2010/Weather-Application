console.log("Javascript Loaded");

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const fetchReq = (search) => {
    fetch('http://localhost:3000/weather?address=' + search).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = 'Invalid Address'
            } else {
                messageTwo.textContent = 'Temperature is ' + data.forecast.temperature + ' degree Celsius'
                messageOne.textContent = data.place_name
                console.log(data);
            }
        })
    })
}

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
weatherForm.addEventListener('submit', (e) => {
    // prevents refreshing the site on submission
    e.preventDefault();
    messageTwo.textContent = ''
    console.log('Test');
    const location = searchElement.value;
    messageOne.textContent = 'Loading...'
    fetchReq(location);
})