document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form');
    let uBookings = document.querySelector('#upcoming-bookings');
    let cBookings = document.querySelector('#cancelled-bookings');
    let eBookings = document.querySelector('#expired-bookings');
    let display = document.querySelector('#display');

    function handleSubmit(e) {
        e.preventDefault();
        let booking = {
            date: e.target.date.value,
            meals: e.target.meals.value,
            no: e.target.number.value,
            fname: e.target.fname.value,
            lnam: e.target.lname.value,
            mobile: e.target.mobile.value,
            email: e.target.email.value,
        }
        
        console.log(booking)
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