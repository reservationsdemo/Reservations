# Steps to run the Project

1. `npm install`
2. `npm start`


# Steps for API testing

1. ### Create a Reservation
    API:   `http://localhost:8080/reservations/create`<br>
    method: POST<br>
    Body:   `{
                "guestId": "GS3532523601",
                "guestName": "Pradeep Reddy",
                "hotelname": "Hotel Grand",
                "arrivalDate": "02-08-2023",
                "departureDate": "02-10-2023",
                "baseStayAmount": 40,
                "taxAmount": 5
            }`


2. ### Get All Reservations

    API: `http://localhost:8080/reservations/list`<br>
    method: GET

3. ### Cancel Reservation

    API: `http://localhost:8080/reservations/cancel/{reservationId}`<br>
    method: PUT<br>
    Example: `http://localhost:8080/reservations/cancel/63e86f9b8ae2184d1ede3c6b`<br>

4. ### Guest Stay Summary

    API: `http://localhost:8080/reservations/guest/stay-summary/{groupId}`<br>
    method: GET<br>
    Example: `http://localhost:8080/reservations/guest/stay-summary/GS3532523601`


5. ### Reservations by Date Range

    API: `http://localhost:8080/reservations/search?startDate={startDate}&endDate={startDate}`<br>
    method: GET<br>
    Example: `http://localhost:8080/reservations/search?startDate={01-01-2023}&endDate={01-10-2023}`



### NOTE: Date format in body or query params should be in **MM-DD-YYYY** Format.    