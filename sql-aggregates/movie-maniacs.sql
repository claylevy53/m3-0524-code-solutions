select
"firstName","lastName", sum(amount)
from customers
inner join payments using ("customerId")
group by 1,2
order by 3 DESC
