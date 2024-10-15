const express = require('express');
const router = express.Router();
const db = require('../Connection');


router.get('/fetch-table-data', (req, res) => {
  // Correct way to log and access query parameters
  console.log('Received body:', req.query);  // This should show correct varfromdate, vartodate
  
  // Destructure query parameters from req.query
  const { varfromdate, vartodate, varebno, vardepartment, company_id } = req.query;
  
  // Log to verify individual variables
  console.log('varfromdate:', varfromdate);
  console.log('vartodate:', vartodate);
  
  // Check if the query params exist and are valid
  if (!varfromdate || !vartodate) {
    return res.status(400).json({ error: 'Invalid dates provided' });
  }

  // Function to format the date
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Convert received string date to a Date object
  const fdate = new Date(varfromdate);
  const tdate = new Date(vartodate);

  // Format the dates to YYYY-MM-DD
  const formattedFromDate = formatDate(fdate);
  const formattedToDate = formatDate(tdate);

  // Log the formatted dates
  console.log('Formatted from date:', formattedFromDate);
  console.log('Formatted to date:', formattedToDate);
//  const formattedVarFromDate = formatDate(varfromdate);
//  const formattedVarToDate = formatDate(vartodate); // Remove this line

  // Create a query based on form input
  //let query = `select * from company_master `;
  
  const params = [];
  
  let query = `select `;
//  console.log(req.body.varfromdate);
  query += `?` ;
  params.push(formattedFromDate);
  query +=  ` startdate,`; 
  query += `?` ;
  params.push(formattedToDate);
  query +=  ` enddate,`; 
  
  query += ` eb_no,first_name,dept_desc,desig,sum(working_hours-idle_hours) whrs from daily_attendance da 
    join department_master dm on dm.dept_id =da.worked_department_id 
    join designation d on d.id =da.worked_designation_id 
    join tbl_hrms_ed_personal_details thepd on thepd.eb_id =da.eb_id 
    where da.is_active =1 `
    query += ` and da.company_id = ?`;
    params.push(company_id);
    query += ` and attendance_date between ?`;
    params.push(formattedFromDate);
    query += ` and  ?`;
    params.push(formattedToDate);
    
//    and da.worked_department_id =2 
//    group by eb_no,first_name,dept_desc,desig`;
  //`SELECT * FROM your_table WHERE 1=1`;



/*
  if (varfromdate) {
    query += ` AND date_column >= ?`;
    params.push(varfromdate);
  }
  if (vartodate) {
    query += ` AND date_column <= ?`;
    params.push(vartodate);
  }
  */

  
  if (varebno !== null && varebno !== '' && varebno !== 'null') {
    query += ` AND eb_no = ?`;
    params.push(varebno);
  }
    if (vardepartment !== null && vardepartment !== 0 && vardepartment !== 'null')   {
    query += ` AND da.worked_department_id  = ?`;
    params.push(vardepartment);
  }

  query += ` group by eb_no,first_name,dept_desc,desig order by eb_no`;

  // Execute the query
  console.log('Query:', query);
  
  db.query(query, params, (err, result) => {
    if (err) {
      console.error('Error fetching table data:', err);
      return res.status(500).send('Server error');
    }
    res.json(result);
  });
});


router.get('/doffsummary-data', (req, res) => {
   // Correct way to log and access query parameters

   console.log('Received body:', req.query);  // This should show correct varfromdate, vartodate
  
   // Destructure query parameters from req.query
   const { varfromdate, vartodate , company_id } = req.query;
   
   // Log to verify individual variables
   console.log('varfromdate:', varfromdate);
   console.log('vartodate:', vartodate);
   
   // Check if the query params exist and are valid
   if (!varfromdate || !vartodate) {
     return res.status(400).json({ error: 'Invalid dates provided' });
   }
 
   // Function to format the date
   function formatDate(date) {
     const year = date.getFullYear();
     const month = String(date.getMonth() + 1).padStart(2, '0');
     const day = String(date.getDate()).padStart(2, '0');
     return `${year}-${month}-${day}`;
   
   }
 
   function formatDat(date) {
     const year = date.getFullYear();
     const month = String(date.getMonth() + 1).padStart(2, '0');
     const day = String(date.getDate()).padStart(2, '0');
     return `${day}-${month}-${year}`;
   
   }
 
   // Convert received string date to a Date object
   const fdate = new Date(varfromdate);
   const tdate = new Date(vartodate);
 
 
   // Format the dates to YYYY-MM-DD
   const formattedFromDate = formatDate(fdate);
   const formattedToDate = formatDate(tdate);
 
   const formattedFromDat = formatDat(fdate);
   const formattedToDat = formatDat(tdate);
  
   // Log the formatted dates
   console.log('Formatted from date:', formattedFromDate);
   console.log('Formatted to date:', formattedToDate);
 //  const formattedVarFromDate = formatDate(varfromdate);
 //  const formattedVarToDate = formatDate(vartodate); // Remove this line
 
   // Create a query based on form input
   //let query = `select * from company_master `;
   
   const params = [];
 
   /*  
   let query = `select `;
 //  console.log(req.body.varfromdate);
   query += `?` ;
   params.push(formattedFromDate);
   query +=  ` startdate,`; 
   query += `?` ;
   params.push(formattedToDate);
   query +=  ` enddate,`; 
   
   query += ` eb_no,first_name,dept_desc,desig,sum(working_hours-idle_hours) whrs from daily_attendance da 
     join department_master dm on dm.dept_id =da.worked_department_id 
     join designation d on d.id =da.worked_designation_id 
     join tbl_hrms_ed_personal_details thepd on thepd.eb_id =da.eb_id 
     where da.is_active =1 `
     query += ` and da.company_id = ?`;
     params.push(company_id);
     query += ` and attendance_date between ?`;
     params.push(formattedFromDate);
     query += ` and  ?`;
     params.push(formattedToDate);
     
   query += ` group by eb_no,first_name,dept_desc,desig order by eb_no`;
 */
 console.log(varfromdate);
   let query=`SELECT 
     vpddd.mechine_id, 
     vpddd.frameno,
     SUM(vpddd.no_of_doff) AS noofdoff,
     round(SUM(vpddd.prod),0) AS prod,
     ROUND(SUM(prod) / SUM(vpddd.prod100) * 100, 2) AS eff,
     ROUND(SUM(prod / prod100) * 100, 2) AS effa,
     SUM(prod100) AS prod100,round(sum(prod)/sum(no_of_doff),2) avgwt,
     round(sum(prod)/sum(mcwhrs)*8,2) avgprod,round(sum(no_of_doff)/sum(mcwhrs)*8,2) avgnoofdoff, `
     query += `  ? fromDate, `;
     params.push( formattedFromDat );
     query += `  ? toDate `;
     params.push(formattedToDat);
     query+=`, 
     case when ROUND(SUM(prod) / SUM(vpddd.prod100) * 100, 2) <50 then 'bg-red'
     when ROUND(SUM(prod) / SUM(vpddd.prod100) * 100, 2) between 50 and 60 then 'bg-blue'
     when ROUND(SUM(prod) / SUM(vpddd.prod100) * 100, 2) between 60 and 70 then 'bg-yellow'
      else 'bg-green' end rowcolor `
     query += ` FROM 
   EMPMILL12.view_proc_daily_doff_details vpddd 
 WHERE `
   query += `  compid = ?`;
   params.push(company_id);
   query += ` and doffdate between ?`;
   params.push(formattedFromDate);
   query += ` and  ?`;
   params.push(formattedToDate);
 
   query += ` GROUP BY 
   mechine_id, frameno 
 ORDER BY CAST(frameno AS UNSIGNED)`;
 
 
 
 
   // Execute the query
   console.log('Query:', query);
   
   db.query(query, params, (err, result) => {
     if (err) {
       console.error('Error fetching table data:', err);
       return res.status(500).send('Server error');
     }
     res.json(result);
   });
 });

 






module.exports = router;
