CREATE TABLE total_average_traffic AS
SELECT
    weekda,
    AVG(total) AS avg_total,
    AVG(hr5) AS avg_hr05,
    AVG(hr6) AS avg_hr06,
    AVG(hr7) AS avg_hr07,
    AVG(hr8) AS avg_hr08,
    AVG(hr9) AS avg_hr09,
    AVG(hr10) AS avg_hr10,
    AVG(hr11) AS avg_hr11,
    AVG(hr12) AS avg_hr12,
    AVG(hr13) AS avg_hr13,
    AVG(hr14) AS avg_hr14,
    AVG(hr15) AS avg_hr15,
    AVG(hr16) AS avg_hr16,
    AVG(hr17) AS avg_hr17,
    AVG(hr18) AS avg_hr18,
    AVG(hr19) AS avg_hr19,
    AVG(hr20) AS avg_hr20,
    AVG(hr21) AS avg_hr21,
    AVG(hr22) AS avg_hr22,
    AVG(hr23) AS avg_hr23,
    AVG(hr24) AS avg_hr24
FROM total_traffic
GROUP BY weekda;