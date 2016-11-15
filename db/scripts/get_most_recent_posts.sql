select body, timestamp from posts
left join users on id = creator_id
left join profile on id = user_id
where username = ?
order by timestamp desc
union
select creator_id, body, timestamp from posts
left join friends on creator_id = f1
left join users on id = creator_id
left join profile on id = user_id
where pending != 1 and username = ?
order by timestamp desc
union
select creator_id, body, timestamp from posts
left join friends on creator_id = f2
left join users on id = creator_id
left join profile on id = user_id
where pending != 1 and username = ?
order by timestamp desc;
