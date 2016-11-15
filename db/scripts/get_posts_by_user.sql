select body, first_name, last_name, timestamp
from posts
left join users on creator_id = id
left join profiles on user_id = id
where username = ?; 
