document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form');
    let uBookings = document.querySelector('#upcoming-bookings');
    let cBookings = document.querySelector('#cancelled-bookings');
    let eBookings = document.querySelector('#expired-bookings');
    let display = document.querySelector('#display');

    function handleSubmit(e) {
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
        newBooking(booking); 
        form.reset();
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
            updateBooking(booking)
        })
    }

    function getAllUpcomingBookings(e) {
        if (e.target.className === '') {
            e.target.className = 'selected';
            cBookings.className = '';
            eBookings.className = '';
            let today = new Date();
            fetch('http://localhost:3000/bookings')
                .then(res => res.json())
                .then(bookings => {
                    const today = new Date();
                    let upComingBookings = bookings.filter(booking => new Date(booking.date) > today)
                    upComingBookings.forEach(uBooking => renderBooking(uBooking))
                })
        }
    }

    function getAllCancelledBookings(e) {
        if (e.target.className === '') {
            e.target.className = 'selected';
            uBookings.className = '';
            eBookings.className = '';
            let today = new Date();
            fetch('http://localhost:3000/bookings')
                .then(res => res.json())
                .then(bookings => {
                    const today = new Date();
                    let upComingBookings = bookings.filter(booking => booking.status === 'cancel')
                    upComingBookings.forEach(uBooking => renderBooking(uBooking))
                })
        }
    }

    function newBooking(booking) {
        fetch('http://localhost:3000/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(booking)
        });
    }

    function updateBooking(booking) {
        fetch(`http://localhost:3000/bookings/${booking.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
        });
    }

    form.addEventListener('submit', handleSubmit)
    uBookings.addEventListener('click', getAllUpcomingBookings)

    cBookings.addEventListener('click', getAllCancelledBookings)

    eBookings.addEventListener('click', () =>{
        display.innerHTML = 'e'
    })



})