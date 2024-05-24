select
"filmId", "title"
from
films
where
"rentalRate" < 1.00
order by "rentalRate" desc
limit 50
