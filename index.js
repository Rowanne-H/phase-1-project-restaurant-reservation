document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form');
    let uBookings = document.querySelector('#upcoming-bookings');
    let cBookings = document.querySelector('#cancelled-bookings');
    let eBookings = document.querySelector('#expired-bookings');
    let display = document.querySelector('#display');

    function handleSubmit(e) {
        e.preventDefault();
        console.log('e')
        
    }

    form.addEventListener('submit', handleSubmit)
    uBookings.addEventListener('click', () =>{
        display.innerHTML = 'u'
    })
    cBookings.addEventListener('click', () =>{
        display.innerHTML = 'c'
    })
    eBookings.addEventListener('click', () =>{
        display.innerHTML = 'e'
    })


})