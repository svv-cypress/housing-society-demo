$(document).ready(function() {
    $('#event-form').submit(function(event) {
        event.preventDefault();

        const eventData = {
            title: $('#title').val(),
            date: $('#date').val(),
            description: $('#description').val()
        };
    
        $.ajax({
            url: 'http://localhost:3000/addEvent',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(eventData),
            success: function(response) {
                alert('Event added successfully!');
                $('#title').val('');
                $('#date').val('');
                $('#description').val('');
            },
            error: function(error) {
                console.error('Error adding event:', error);
            }
        });
    });

    $('#facility-form').submit(function(event) {
        event.preventDefault();

        const selectedFacility = $('#facility').val();
        const selectedDate = $('#date').val();

        $.ajax({
            url: 'http://localhost:3000/checkAvailability',
            method: 'GET',
            data: { facility: selectedFacility, date: selectedDate },
            success: function(response) {
                $('#availability-message').text(response.message);
            },
            error: function(error) {
                console.error('Error checking availability for facilities:', error);
            }
        });
    });
});
