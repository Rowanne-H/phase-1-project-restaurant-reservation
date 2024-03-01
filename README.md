# Restaurant Reservation System for Fantastic BBQ 
### It is a a Single Page Application (SPA) for booking system of Fantastic BBQ
### This system is built with HTML, CSS, and JavaScript
#### On New Booking section, client can record a new booking to system by keying booking information in the form and clicking Submit button.
1. Date: the date value must be after today.
2. Meals: can be chosed between Lunch and Dinner.
3. Number of people: the minimum is 1 and maximum is 10.
4. Name: full name of the person who made the booking.
5. Mobile: the contact mobile number to the person. The value entered will be validated.
6. Email: the email address for the person. The value entered will be validated.
7. Note: All input areas in the form are required to fill out.
8. Submit button: when it is clicked, new booking is made and is rendered on the right section of the 9. screen (in this display screen, you are only allowed to delete this booking. You have to go to Upcoming Bookings display screen to change the status); On the other hand, the booking is added to booking system (json server).

#### On Booking Information section which is next to New Booking, client can get information about all upcoming bookings, cancelled bookings and expired bookings by clicking buttons shown on the top; The information will be display below three buttons.
1. Upcoming Bookings button: when this button is clicked, the display screen below renders all bookings which has date later than today; individual booking's status can be changed by choosing 'cancel' or 'current' and this will also be updated to system; The delete button at end of each booking allows client to delete this booking and also delete it in the system.
