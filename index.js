document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form');
    let uBookings = document.querySelector('#upcoming-bookings');
    let cBookings = document.querySelector('#cancelled-bookings');
    let eBookings = document.querySelector('#expired-bookings');
    let display = document.querySelector('#display');
    let today = new Date();

    function selectDateAfterToday() {
        let today = new Date();
        let mon = today.getMonth() + 1;
        let day = today.getDate() + 1;
        let year = today.getFullYear();
        if (mon < 10) { mon = '0' + mon }
        if (day < 10) { day = '0' + day }
        let minDate = year + '-' + mon + '-' + day;
        document.querySelector('#date').min = minDate;
    }
    selectDateAfterToday()

    function createTableHeader() {
        display.innerHTML = '';
        let tHeaders = document.createElement('tr');
        tHeaders.innerHTML = `
                            <th>Date</th>
                            <th>Meal</th>
                            <th>No of ppl</th>
                            <th>Name</th>
                            <th>Moble</th>
                            <th>Email</th>
                            <th>Status</th>
                        `
        display.appendChild(tHeaders);
    }

    function renderBooking(booking) {
        display.style.visibility = 'visible';
        let card = document.createElement('tr')
        let text = `<td>${booking.date}</td>
                    <td>${booking.meal}</td>
                    <td>${booking.no}</td>
                    <td>${booking.name}</td>
                    <td>${booking.mobile}</td>
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

    function handleSubmit(e) {
        e.preventDefault();
        uBookings.className = '';
        cBookings.className = '';
        eBookings.className = '';
        let booking = {
            date: e.target.date.value,
            meal: e.target.meals.value,
            no: e.target.number.value,
            name: e.target.name.value,
            mobile: e.target.mobile.value,
            email: e.target.email.value,
            status: 'current'
        };
        createTableHeader();
        newBooking(booking);
        renderBooking(booking);
        document.querySelectorAll('.status').forEach(bookingStatus => {
            bookingStatus.addEventListener('click', (e) => {
                alert('Please change booking status under Upcoming Bookings')
            })
            handleDelete()
        })
        form.reset()
    }

    function getAllUpcomingBookings(e) {
        if (e.target.className === '') {
            e.target.className = 'selected';
            cBookings.className = '';
            eBookings.className = '';
            createTableHeader();
            fetch('http://localhost:3000/bookings')
                .then(res => res.json())
                .then(bookings => {
                    let upComingBookings = bookings.filter(booking => new Date(booking.date) >= today && booking.status === 'current');
                    upComingBookings.forEach(uBooking => renderBooking(uBooking));
                    handleStatusChange();
                    handleDelete()
                })
        }
    }

    function getAllCancelledBookings(e) {
        if (e.target.className === '') {
            e.target.className = 'selected';
            uBookings.className = '';
            eBookings.className = '';
            createTableHeader();
            fetch('http://localhost:3000/bookings')
                .then(res => res.json())
                .then(bookings => {
                    let upComingBookings = bookings.filter(booking => booking.status === 'cancel' && new Date(booking.date) >= today);
                    upComingBookings.forEach(uBooking => renderBooking(uBooking));
                    handleStatusChange();
                    handleDelete()
                })
        }
    }

    function getAllExpiredBookings(e) {
        if (e.target.className === '') {
            e.target.className = 'selected';
            cBookings.className = '';
            uBookings.className = '';
            createTableHeader();
            fetch('http://localhost:3000/bookings')
                .then(res => res.json())
                .then(bookings => {
                    let upComingBookings = bookings.filter(booking => new Date(booking.date) < today)
                    upComingBookings.forEach(uBooking => renderBooking(uBooking));
                    document.querySelectorAll('.status').forEach(bookingStatus => {
                        bookingStatus.addEventListener('click', (e) => {
                            alert('The booking has expired, cannot change its status, but you can delete it')
                        })
                        handleDelete()
                    })
                })
        }
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

    function handleStatusChange() {
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

    function deleteBooking(id) {
        fetch(`http://localhost:3000/bookings/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
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
                e.target.parentNode.parentNode.remove()
            })
        })
    }    

    form.addEventListener('submit', handleSubmit)

    uBookings.addEventListener('click', getAllUpcomingBookings)

    cBookings.addEventListener('click', getAllCancelledBookings)

    eBookings.addEventListener('click', getAllExpiredBookings)

})