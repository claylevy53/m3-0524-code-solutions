-- Find the first and last name of every customer who rented 'Magic Mallrats'.

-- Hint: you'll need three joins.


select
distinct
"firstName","lastName"
from "customers"
join "inventory" using ("storeId")
join "films" using ("filmId")
join "rentals" using ("customerId")
where title = 'Magic Mallrats'
