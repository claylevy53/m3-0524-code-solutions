-- List the number of "cities" per country in the "countries" table.

-- Hint: "per country" implies that you will need to group by the country.

-- Hint: There should be 35 in the United States, for example.


select countries,count("cities")
from countries
inner join "cities" using ("countryId")
group by countries
