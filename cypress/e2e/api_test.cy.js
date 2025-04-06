describe('API Testing - Facilities Booking System', () => {
  
    it('POST /addEvent - should add a new event successfully', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/addEvent',
        body: {
          title: 'Test Event',
          date: '2025-04-10',
          description: 'This is a test event'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.contain('Event added successfully');
      });
    });
  
    it('GET /checkAvailability - should return slot available', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/checkAvailability',
        qs: {
          facility: 'Gym',
          date: '2025-04-11'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.include('Slot');
      });
    });
  
  });
  