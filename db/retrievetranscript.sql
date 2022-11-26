Select c."shortName" as course, c."longName" as coursename, t."creditsNeeded" as attempted, t."creditsReceived" as received, t."grade" 
from class as c 
inner join transcript as t using ("classID");