SELECT
    to_char(calendar_day, 'YYYY-MM-DD') AS day,
    to_char(calendar_hour_range.start_hour, 'HH24:MI') AS start_time,
    to_char(calendar_hour_range.end_hour, 'HH24:MI') AS end_time,
    COALESCE(item.id, 0) AS item_id,
    COALESCE(item."Name", 'No Event') AS item_name
FROM
    (
        SELECT
            generate_series(
                '2023-01-01 00:00'::timestamp,
                '2023-01-01 00:00'::timestamp + interval '6 days',
                interval '1 day'
            )::date AS calendar_day,
            generate_series(
                '2023-01-01 00:00'::timestamp,
                '2023-01-01 00:00'::timestamp + interval '6 days',
                interval '4 hours'
            )::time AS start_hour,
            generate_series(
                '2023-01-01 00:00'::timestamp,
                '2023-01-01 00:00'::timestamp + interval '6 days',
                interval '4 hours'
            )::time + interval '4 hours' AS end_hour
    ) AS calendar_hour_range
LEFT JOIN
    public."nc_09_0___Features" AS item
ON
    calendar_hour_range.calendar_day BETWEEN date_trunc('day', item."From_Date_Time")::date AND (date_trunc('day', item."To_Date_Time" - interval '1 second'))::date
    AND calendar_hour_range.start_hour BETWEEN (date_trunc('hour', item."From_Date_Time"::timestamp)::time) AND (date_trunc('hour', (item."To_Date_Time" - interval '1 second')::timestamp)::time)
    AND calendar_hour_range.end_hour BETWEEN (date_trunc('hour', item."From_Date_Time"::timestamp)::time) AND (date_trunc('hour', (item."To_Date_Time" - interval '1 second')::timestamp)::time)
ORDER BY
    calendar_day, start_hour;
