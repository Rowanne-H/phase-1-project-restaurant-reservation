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
            meal: e.target.meals.value,
            no: e.target.number.value,
            name: e.target.name.value,
            mobile: e.target.mobile.value,
            email: e.target.email.value,
        };
        booking.status = 'current';
        renderBooking(booking); 
    }

    function renderBooking(booking) {
        display.style.visibility = 'visible';
        let card = document.createElement('tr')
        card.innerHTML = `
            <td>${booking.date}</td>
            <td>${booking.meal}</td>
            <td>${booking.no}</td>
            <td>${booking.name}</td>
            <td>${booking.Mobile}</td>
            <td>${booking.email}</td>
            <td>
                <select class="status">
                    <option value="current">${booking.status}</option>
                    <option value="cancel">cancel</option>
                </select>
            </td>
        `
        display.appendChild(card);
        document.querySelector('.status').addEventListener('change', (e) => {
            booking.status = e.target.value
            console.log(booking)
        })
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