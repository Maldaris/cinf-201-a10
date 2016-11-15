select user_id, first_name, last_name
from profiles
left join friends on f1 = user_id
where username = ?
union
select user_id, first_name, last_name
from profiles
left join friends on f2 = user_id
where username = ?;
