/* ================= MOBILE MENU ================= */

function toggleMenu() {

    const nav = document.getElementById("navMenu");

    nav.classList.toggle("active");

}


/* ================= SCROLL TO ROOMS ================= */

function scrollToRooms() {

    document.getElementById("rooms").scrollIntoView({
        behavior: "smooth"
    });

}


/* ================= BOOKING MODAL ================= */

function openBooking() {

    document.getElementById("bookingModal").style.display = "flex";

}


function closeBooking() {

    document.getElementById("bookingModal").style.display = "none";

}


/* Close modal when clicking outside */

window.addEventListener("click", function(event) {

    const modal = document.getElementById("bookingModal");

    if (event.target === modal) {

        closeBooking();

    }

});


/* ================= BOOK ROOM ================= */

function bookRoom(roomName, price) {

    document.getElementById("selectedRoom").value = roomName;

    openBooking();

}


/* ================= SEARCH ROOMS ================= */

function searchRooms() {

    const checkin = document.getElementById("checkin").value;

    const checkout = document.getElementById("checkout").value;

    const guests = document.getElementById("guests").value;


    if (!checkin || !checkout) {

        alert("Please select Check-in and Check-out dates.");

        return;

    }


    const start = new Date(checkin);

    const end = new Date(checkout);


    if (end <= start) {

        alert("Check-out date must be after Check-in date.");

        return;

    }


    document.getElementById("modalCheckin").value = checkin;

    document.getElementById("modalCheckout").value = checkout;


    alert(
        "Rooms are available!\n\n" +
        "Check-in: " + checkin +
        "\nCheck-out: " + checkout +
        "\nGuests: " + guests
    );


    openBooking();

}


/* ================= BOOKING SUBMIT ================= */

function submitBooking(event) {

    event.preventDefault();


    const name =
        document.getElementById("guestName").value;

    const phone =
        document.getElementById("guestPhone").value;

    const email =
        document.getElementById("guestEmail").value;

    const room =
        document.getElementById("selectedRoom").value;

    const checkin =
        document.getElementById("modalCheckin").value;

    const checkout =
        document.getElementById("modalCheckout").value;


    if (!checkin || !checkout) {

        alert("Please select your dates.");

        return;

    }


    const start = new Date(checkin);

    const end = new Date(checkout);


    if (end <= start) {

        alert("Check-out must be after Check-in.");

        return;

    }


    const nights =
        Math.ceil(
            (end - start) /
            (1000 * 60 * 60 * 24)
        );


    let price = 3500;


    if (room === "Premium Suite") {

        price = 5500;

    }


    if (room === "Royal Presidential Suite") {

        price = 9500;

    }


    const total = price * nights;


    /* Save booking */

    const booking = {

        id: "RH" + Date.now(),

        name: name,

        phone: phone,

        email: email,

        room: room,

        checkin: checkin,

        checkout: checkout,

        nights: nights,

        total: total

    };


    localStorage.setItem(
        "latestBooking",
        JSON.stringify(booking)
    );


    alert(
        "Booking Confirmed!\n\n" +

        "Booking ID: " + booking.id +

        "\nGuest: " + name +

        "\nRoom: " + room +

        "\nNights: " + nights +

        "\nTotal: ₹" + total
    );


    closeBooking();

}


/* ================= DISCOVER MORE ================= */

function showMessage() {

    alert(
        "Royal Haven offers luxury rooms, fine dining, " +
        "spa, swimming pool, fitness center and premium hospitality."
    );

}


/* ================= SET MIN DATE ================= */

window.addEventListener("DOMContentLoaded", function() {

    const today =
        new Date().toISOString().split("T")[0];


    const checkin =
        document.getElementById("checkin");

    const checkout =
        document.getElementById("checkout");

    const modalCheckin =
        document.getElementById("modalCheckin");

    const modalCheckout =
        document.getElementById("modalCheckout");


    checkin.min = today;

    checkout.min = today;

    modalCheckin.min = today;

    modalCheckout.min = today;

});


/* ================= AUTO UPDATE CHECKOUT ================= */

document.getElementById("checkin").addEventListener(
    "change",
    function() {

        document.getElementById("checkout").min =
            this.value;

    }
);


document.getElementById("modalCheckin").addEventListener(
    "change",
    function() {

        document.getElementById("modalCheckout").min =
            this.value;

    }
);