console.log('Client side javascript file is loaded')


const weatherForm = document.querySelector('form') 
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-error')
const messageTwo= document.querySelector('#message-data')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    console.log(location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+ location ).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                console.log(data.error)
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.summary + ' temperature is '  
                    + data.forecast.temperature +
                    ' propability of precipitation is ' + data.forecast.precipProbability
               
                // messageTwo.textContent = {
                //     location: data.location,
                //     forecast: data.forecast
                // }
 
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})