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
        display.innerHTML = '';
        renderBooking(booking);
        changeStatus();
        newBooking(booking);
    }

    function renderBooking(booking) {
        display.style.visibility = 'visible';
        let card = document.createElement('tr')
        let text = `<td>${booking.date}</td>
                    <td>${booking.meal}</td>
                    <td>${booking.no}</td>
                    <td>${booking.name}</td>
                    <td>${booking.Mobile}</td>
                    <td>${booking.email}</td>
                    <td>
                    <select id= "${booking.id}" class="status">
                    `
        if (booking.status === 'current') {
            text += `
                    <option value="current">current</option>
                    <option value="cancel">cancel</option>
                    `
        } else {
            text += `
                    <option value="cancel">cancel</option>
                    <option value="current">current</option>
                    `
        }
        card.innerHTML = text + `          
                </select>
                <button class="delete" id="${booking.email}">Delete</button>
            </td>
        `
        display.appendChild(card);
    }

    function changeStatus() {
        document.querySelectorAll('.status').forEach(bookingStatus => {
            bookingStatus.addEventListener('change', (e) => {
                fetch('http://localhost:3000/bookings')
                    .then(res => res.json())
                    .then(bookings => {
                        let changedBooking = bookings.find(booking => booking.id === e.target.id)
                        changedBooking.status = e.target.value;
                        updateBooking(changedBooking)
                    })
            })
        })
    }

    function handleDelete() {
        document.querySelectorAll('.delete').forEach(deleteBtn => {
            deleteBtn.addEventListener('click', (e) => {
                fetch('http://localhost:3000/bookings')
                    .then(res => res.json())
                    .then(bookings => {
                        let dBooking = bookings.find(booking => booking.email === e.target.id)
                        deleteBooking(dBooking.id)

                    })
            })
        })
    }

    function deleteBooking(id) {
        console.log(id)
        fetch(`http://localhost:3000/bookings/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    function getAllUpcomingBookings(e) {
        if (e.target.className === '') {
            e.target.className = 'selected';
            cBookings.className = '';
            eBookings.className = '';
            display.innerHTML = '';
            let today = new Date();
            fetch('http://localhost:3000/bookings')
                .then(res => res.json())
                .then(bookings => {
                    const today = new Date();
                    let upComingBookings = bookings.filter(booking => new Date(booking.date) > today);
                    upComingBookings.forEach(uBooking => renderBooking(uBooking));
                    changeStatus();
                    handleDelete()
                })
        }
    }

    function getAllCancelledBookings(e) {
        if (e.target.className === '') {
            e.target.className = 'selected';
            uBookings.className = '';
            eBookings.className = '';
            display.innerHTML = '';
            let today = new Date();
            fetch('http://localhost:3000/bookings')
                .then(res => res.json())
                .then(bookings => {
                    const today = new Date();
                    let upComingBookings = bookings.filter(booking => booking.status === 'cancel');
                    upComingBookings.forEach(uBooking => renderBooking(uBooking));
                    changeStatus()
                })
        }
    }

    function getAllExpiredBookings(e) {
        if (e.target.className === '') {
            e.target.className = 'selected';
            cBookings.className = '';
            uBookings.className = '';
            display.innerHTML = '';
            let today = new Date();
            fetch('http://localhost:3000/bookings')
                .then(res => res.json())
                .then(bookings => {
                    const today = new Date();
                    let upComingBookings = bookings.filter(booking => new Date(booking.date) < today)
                    upComingBookings.forEach(uBooking => renderBooking(uBooking));
                    changeStatus();
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

    eBookings.addEventListener('click', getAllExpiredBookings)

})