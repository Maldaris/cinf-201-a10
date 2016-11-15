select * from profiles p
left join on user u
  on u.userid = p.userid
where u.username = ?;
