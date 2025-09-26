npm run seed
Start server:


node src/server.js
Server URL: http://localhost:4000
Now all routes can be tested in Postman.


1. GET /properties
Fetch all properties with optional pagination.  
**URL:** `http://localhost:4000/properties`  
**Query Parameters (optional):** `page` (default 1), `limit` (default 10)  
**Example:** `http://localhost:4000/properties?page=1&limit=5`  
**Response:**

{
  "total": 20,
  "page": 1,
  "limit": 5,
  "items": [
    {
      "_id": "64f...",
      "title": "Cozy 2 BHK Apartment in Cyberhub",
      "location": "Gurgaon",
      "price": 7000000,
      "bhk": 2,
      "type": "Flat",
      "description": "Bright, central Cyberhub location"
    }
  ]
}
2. GET /properties/:id
Fetch property by ID.
URL: http://localhost:4000/properties/<property_id>
Steps: Copy _id from /properties response.
Example: http://localhost:4000/properties/64f123abc456def7890
Response:

{
  "_id": "64f123abc456def7890",
  "title": "Cozy 2 BHK Apartment in Cyberhub",
  "location": "Gurgaon",
  "price": 7000000,
  "bhk": 2,
  "type": "Flat",
  "description": "Bright, central Cyberhub location"
}
3. GET /search
Search properties by keyword, BHK, and/or location.
URL: http://localhost:4000/search
Query Parameters: query, bhk, location
Examples:

http://localhost:4000/search?query=flat
http://localhost:4000/search?bhk=2&location=Gurgaon
http://localhost:4000/search?query=studio in Powai
Response:

json
Copy code
{
  "count": 2,
  "results": [
    { "_id": "...", "title": "Cozy 2 BHK Apartment in Cyberhub", ... },
    { "_id": "...", "title": "Studio Apartment in Cyberhub", ... }
  ]
}
4. GET /recommendations/:id
Get 3 similar properties based on location and BHK.
URL: http://localhost:4000/recommendations/<property_id>
Steps: Copy a property _id from /properties.
Example: http://localhost:4000/recommendations/64f123abc456def7890
Response:


{
  "count": 3,
  "recommendations": [
    { "_id": "...", "title": "Similar 2 BHK Apartment in Gurgaon", ... },
    { "_id": "...", "title": "Another 2 BHK in Gurgaon", ... },
    { "_id": "...", "title": "Nearby property with same BHK", ... }
  ]
}
Postman Testing Tips
Use Params tab for query parameters.

Copy _id from /properties for /properties/:id and /recommendations/:id.

query in /search supports keyword matching in title/description.

Pagination defaults: page=1, limit=10.

Running the Backend
Seed MongoDB with sample data:




