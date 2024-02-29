document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form');
    let uBookings = document.querySelector('#upcoming-bookings');
    let cBookings = document.querySelector('#cancelled-bookings');
    let eBookings = document.querySelector('#expired-bookings');
    let display = document.querySelector('#display');

    function handleSubmit(e) {
        e.preventDefault();
        console.log('e')
        display.innerHTML = 'GO'
    }

    form.addEventListener('submit', handleSubmit)
    uBookings.addEventListener('click', () =>{
        alert('u')
    })
    cBookings.addEventListener('click', () =>{
        alert('c')
    })
    eBookings.addEventListener('click', () =>{
        alert('e')
    })


})