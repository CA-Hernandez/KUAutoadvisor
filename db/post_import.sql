insert into class ("shortName", "longName") 
Select course, i.coursename 
from import_table as i 
where course not in (select "shortName" from class); 

delete from class 
where "classID" not in 
(select min("classID") 
from (select * from class) as  c 
group by "shortName"); 

Update import_table 
set attempted = '0' 
where (
  attempted IS NULL 
    or attempted = '') 
  and grade = 'CR';
  
alter table import_table add pk Serial; 
delete from import_table  
where pk not in 
  (select m from ( 
    select course, min(pk) as m 
    from import_table 
	group by 1) as h); 


truncate transcript;
insert into transcript ("classID", "creditsReceived", "creditsNeeded", "grade") 
(Select c."classID", i.r::DECIMAL, i.a::DECIMAL, i.g 
from 
(Select course, max(received) as r, max(attempted) as a, grade as g 
from import_table 
group by course, grade) as i 
inner join class as c on c."shortName" = i.course);