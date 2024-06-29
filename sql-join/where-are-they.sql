select
"line1" as "address","cities"."name","district","countries"."name" as "country"
from
"addresses"
join "cities" using ("cityId")
join "countries" using ("countryId")
