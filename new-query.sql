SELECT ;


SELECT 

SELECT 



WITH cal_range AS (
    SELECT 
        generate_series('2023-01-01 00:00'::timestamp, '2023-01-01'::timestamp + interval '6 days', interval '1 day')::date as calendar_day, 
        generate_series('2023-01-01 00:00'::timestamp, '2023-01-01 00:00'::timestamp + interval '6 days', interval '4 hours')::time as start_hour, 
        generate_series('2023-01-01 00:00'::timestamp, '2023-01-01 00:00'::timestamp + interval '6 days', interval '4 hours')::time + interval '4 hours' as end_hour
)
SELECT calendar_day, start_hour, end_hour, event."Name", event."From_Date_Time"
FROM cal_range 
INNER JOIN public."nc_09_0___Features" AS event ON 
    event."From_Date_Time"::date = cal_range.calendar_day
    AND event."From_Date_Time"::time >= cal_range.start_hour
    AND event."From_Date_Time"::time < cal_range.end_hour;




WITH cal_range AS (
    SELECT 
        generate_series('2023-01-01 00:00'::timestamp, '2023-01-01 00:00'::timestamp + interval '6 days', interval '1 day')::date as calendar_day, 
        generate_series('2023-01-01 00:00'::timestamp, '2023-01-01 00:00'::timestamp + interval '6 days', interval '4 hours')::time as start_hour, 
        generate_series('2023-01-01 00:00'::timestamp, '2023-01-01 00:00'::timestamp + interval '6 days', interval '4 hours')::time + interval '4 hours' as end_hour
) SELECT 
    calendar_day, 
    start_hour, 
    end_hour, 
    event."Name", 
    event."From_Date_Time",
    event."From_Date_Time"::date as event_date,
    event."From_Date_Time"::time as event_time
FROM cal_range 
JOIN public."nc_09_0___Features" AS event ON 
    event."From_Date_Time"::date = cal_range.calendar_day
    AND event."From_Date_Time"::time <= cal_range.end_hour
    AND event."From_Date_Time"::time >= cal_range.start_hour;