-- Use two joins to select the "releaseYear" and "genres"."name" of the film with the "title" 'Boogie Amelie'.
-- There is a special table in the database named "filmGenre" for this purpose.

select
"releaseYear","genres"."name"
from
"films"
join "filmGenre" using ("filmId")
join "genres" using ("genreId")
where
"title" = 'Boogie Amelie'
