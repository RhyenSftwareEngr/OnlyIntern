const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const mysql = require('mysql');
const argon2 = require('argon2');
const fs = require('fs');
const path = require('path');



// Establishing a MySQL connection and error handling
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jebongskii_ojt',
    multipleStatements: true
})

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to wamp: ' + err.stack);
        return; 
    }
   console.log('Connected as id ' + connection.threadId);
});

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.static(`${__dirname}/public`))
app.set('views', `${__dirname}/public/view`)
app.set('view engine', 'pug')

app.use(session({
    secret: 'somesecretkey',
    resave: false,
    saveUninitialized: false
}))

// Remove caching for the pages
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
})

app.get('/', (req, res) => {
    if (req.session.email) {
        res.redirect('/home')
    } else {
        res.render('index')
    }
})

app.post('/', (req, res) => {
    const email = req.body.email
    const pass = req.body.password

    if (email && pass) {
        try {
            var query = 'SELECT * FROM admins WHERE email=?'
            connection.query(query, [email], 
            async function(err, result, field) {
                if (result.length > 0) {
                    if (await argon2.verify(result[0].password, pass)) {
                        req.session.email = email
                        req.session.name = generateFullName(result[0])
                        res.redirect('/home')
                    } else {
                        res.render('index', {
                            validationText: "Incorrect password"
                        })
                    }
                } else {
                    res.render('index', {
                        validationText: "There is no existing user with that email"
                    })
                }
            })
        } catch (err) {
            console.log("Something went wrong: LOGIN")
            throw err
        }
    } else {
        res.render('index', {
            validationText: "Please enter credentials"
        })
    }
})

app.get('/home', (req, res) => {
    if (req.session.email) {
        var query = 'SELECT students.stud_id, students.first_name, students.middle_name, students.last_name, students.advisor, DATE_FORMAT(student_report_log.date, "%m/%d/%Y") as date, student_report_log.hrs_rendered from student_report_log INNER JOIN students ON students.stud_id = student_report_log.stud_id WHERE hrs_rendered > 0 ORDER BY date DESC'
        
        connection.query(query,
        function(err, result, field) {
            if (err)
                throw err
            if (result.length > 0) {
                res.render('home', {
                    username: req.session.name,
                    stud_info: result
                })
            } else {
                console.log("Something went wrong: HOME")
            }
        })
    } else {
        res.redirect('/')
    }
})


app.get('/manage', (req, res) => {
    if (req.session.email) {
    var query1 = 'SELECT * FROM students_info_all ORDER BY last_name ASC'
    var query2 = 'SELECT * FROM requirement_columns'
    var query3 = 'SELECT first_name, middle_name, last_name, email, admin_id FROM admins'
    var query4 = 'SELECT first_name, middle_name, last_name, sup_id FROM supervisors'
    var query5 = 'SELECT company_name, email FROM companies'

    connection.query(query1 + ';' + query2 + ';' + query3 + ';' + query4 + ';' + query5, 
    function(err, result, field) {
        if (err) {
            result[1].shift()
            res.render('manage', {
                username: req.session.name,
                advisers: result[2],
                supervisers: result[3],
                companies: result[4],
                requirements: initColumnNames(result[1]),
                min_value: 0,
                max_value: 2000,
                data: result[0],
                validation: {
                    status: true,
                    display: "block",
                    pEvents: "all",
                    msg: "Something went wrong in Initialization"
                }
            })
            throw err
        }
        if (result.length > 0) {
            result[1].shift()
            res.render('manage', {
                username: req.session.name,
                advisers: result[2],
                supervisers: result[3],
                companies: result[4],
                requirements: initColumnNames(result[1]),
                min_value: 0,
                max_value: 2000,
                data: result[0],
                validation: {
                    status: false,
                    display: "none",
                    pEvents: "none",
                    msg: ""
                }
            })
        } else {
            console.log("Something went wrong: MANAGE");
        }
    })
    } else {
        res.redirect('/')
    }
})

app.post('/manage/filter', (req, res) => {
    if (req.session.email) {
        let search = req.body.searchQuery
        let adviser = req.body.adviser
        let requirements = req.body.requirements
        let min = req.body.min
        let max = req.body.max
        
        var query1 = 'SELECT * FROM students_info_all WHERE total_hours BETWEEN ? AND ? ORDER BY last_name ASC'
        var query2 = 'SELECT * FROM requirement_columns'
        var query3 = 'SELECT first_name, middle_name, last_name, email, admin_id FROM admins'
        var query4 = 'SELECT first_name, middle_name, last_name, sup_id FROM supervisors'
        var query5 = 'SELECT company_name, comp_id FROM companies'

        connection.query(query1 + ';' + query2 + ';' + query3 + ';' + query4 + ';' + query5,  [min, max],
        async function(err, result, field) {
            if (err) {
                result[1].shift()
                res.render('manage', {
                    username: req.session.name,
                    advisers: result[2],
                    supervisers: result[3],
                    companies: result[4],
                    requirements: initColumnNames(result[1]),
                    min_value: 0,
                    max_value: 2000,
                    data: result[0],
                    validation: {
                        status: true,
                        display: "block",
                        pEvents: "all",
                        msg: "Something went wrong in Filtering"
                    }
                })
                throw err
            }
            if (result.length > 0) {
                if (search != undefined) {
                    result[0] = result[0].filter((element) => {
                        var fname = generateFullName(element)
                        return fname.toLowerCase().includes(search.toLowerCase())
                    })
                }

                if (adviser != undefined) {
                    result[0] = result[0].filter((element) => element.admin_email === adviser)
                }
    
                if (requirements != undefined) {
                    if (typeof(requirements) === 'string') {
                        result[0] = result[0].filter((element) => element[requirements] != null)
                    } else {
                        requirements.forEach(element => {
                            result[0] =  result[0].filter((elem) => elem[element] != null)
                        });
                    }
                }
    
                result[1].shift()
                res.render('manage', {
                    username: req.session.name,
                    advisers: result[2],
                    supervisers: result[3],
                    companies: result[4],
                    requirements: initColumnNames(result[1]),
                    min_value: 0,
                    max_value: 2000,
                    data: result[0],
                    validation: {
                        status: false,
                        display: "none",
                        pEvents: "none",
                        msg: ""
                    }
                })
            } else {
                console.log("Something went wrong: MANAGE_FILTERING");
            }
        })
    } else {
        res.redirect('/')
    }
})

app.post('/manage/edit', (req, res) => {
    if (req.session.email) {
        let fname = req.body.firstName
        let mname = req.body.middleName
        let lname = req.body.lastName
        let gender = req.body.gender
        let birthday = req.body.birthday

        let studentID = req.body.studentID
        let courseYear = req.body.courseYear
        let classcode = req.body.classCode
        let advisor = req.body.advisor
        let supervisor = req.body.supervisor

        var query1 = 'SELECT * FROM students_info_all ORDER BY last_name ASC'
        var query2 = 'SELECT * FROM requirement_columns'
        var query3 = 'SELECT first_name, middle_name, last_name, email, admin_id FROM admins'
        var query4 = 'SELECT first_name, middle_name, last_name, sup_id FROM supervisors'
        var query5 = 'SELECT company_name, email FROM companies'
        var queryUpd1 = 'UPDATE students SET first_name = ?, middle_name = ?, last_name = ?, gender = ?, birthday = ?, classcode = ?, course_year = ?, advisor = ?, supervisor = ? WHERE stud_id = ?'
    
        connection.query(queryUpd1 + ';' + query1 + ';' + query2 + ';' + query3 + ';' + query4 + ';' + query5, 
        [fname,mname,lname,gender,birthday,classcode,courseYear,advisor,supervisor,studentID],
        async function(err, result, field) {
            if (err) {
                result[1].shift()
                res.render('manage', {
                    username: req.session.name,
                    advisers: result[2],
                    supervisers: result[3],
                    companies: result[4],
                    requirements: initColumnNames(result[1]),
                    min_value: 0,
                    max_value: 2000,
                    data: result[0],
                    validation: {
                        status: true,
                        display: "block",
                        pEvents: "all",
                        msg: "Something went wrong in Updating info"
                    }
                })
                throw err
            }
            if (result.length > 0) {
                // console.log(result[0])
                result[2].shift()
                res.render('manage', {
                    username: req.session.name,
                    advisers: result[3],
                    supervisers: result[4],
                    companies: result[5],
                    requirements: initColumnNames(result[2]),
                    min_value: 0,
                    max_value: 2000,
                    data: result[1],
                    validation: {
                        status: true,
                        display: "block",
                        pEvents: "all",
                        msg: "Updated Database successsfully"
                    }
                })
            } else {
                console.log("Something went wrong: MANAGE_EDIT");
            }
        })
    } else {
        res.redirect('/')
    }
})

app.post('/manage/remarks', (req, res) => {
     if (req.session.email) {
        let remark = req.body.studRemark
        let studId = req.body.studIdInvi

        var query1 = 'SELECT * FROM students_info_all ORDER BY last_name ASC'
        var query2 = 'SELECT * FROM requirement_columns'
        var query3 = 'SELECT first_name, middle_name, last_name, email, admin_id FROM admins'
        var query4 = 'SELECT first_name, middle_name, last_name, sup_id FROM supervisors'
        var query5 = 'SELECT company_name, email FROM companies'
        var queryUpd1 = 'UPDATE students SET remark = ? WHERE stud_id = ?'
    
        connection.query(queryUpd1 + ';' + query1 + ';' + query2 + ';' + query3 + ';' + query4 + ';' + query5, 
        [remark, studId],
        async function(err, result, field) {
            if (err) {
                result[1].shift()
                res.render('manage', {
                    username: req.session.name,
                    advisers: result[2],
                    supervisers: result[3],
                    companies: result[4],
                    requirements: initColumnNames(result[1]),
                    min_value: 0,
                    max_value: 2000,
                    data: result[0],
                    validation: {
                        status: true,
                        display: "block",
                        pEvents: "all",
                        msg: "Something went wrong in Updating info"
                    }
                })
                throw err
            }
            if (result.length > 0) {
                // console.log(result[0])
                result[2].shift()
                res.render('manage', {
                    username: req.session.name,
                    advisers: result[3],
                    supervisers: result[4],
                    companies: result[5],
                    requirements: initColumnNames(result[2]),
                    min_value: 0,
                    max_value: 2000,
                    data: result[1],
                    validation: {
                        status: true,
                        display: "block",
                        pEvents: "all",
                        msg: "Remark updated successsfully"
                    }
                })
            } else {
                console.log("Something went wrong: MANAGE_EDIT");
            }
        })
    } else {
        res.redirect('/')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

app.listen(8080, () => {
    console.log("The server is listening on port 8080")
})

function nameToInitital(name) {
    return name.charAt(0) + "."
}

// Add new attribute for the capitalize column names
function initColumnNames(arr) {
    arr.forEach(element => {
        element.column_values = element.column_names
        element.column_names = element.column_names.replace("_", " ")
        element.column_names = element.column_names.charAt(0).toUpperCase() + element.column_names.slice(1);
    });
    return arr
}

function generateFullName(person) {
    return person.first_name + " " + nameToInitital(person.middle_name) + " " + person.last_name 
}

app.get('/manage/calendar', (req, res) => {
    var query = "SELECT hrs_rendered, date, stud_id FROM student_report_log ORDER BY date ASC";

    connection.query(query, function(err, result, field) {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            // console.log("Query result:", result);
            if (result.length > 0) {
                res.json(result);
            } else {
                console.log("No data available for Calendar");
                res.json({ message: "No data available for Calendar" });
            }
        }
    });
});

app.get('/api/advisers', (req, res) => {
    try {
        var query = 'SELECT admin_id, first_name, middle_name, last_name FROM admins'

        connection.query(query, 
        function(err, result, field) {
            if (err)
                throw err
            if (result.length > 0) {
                res.json(result)
            } else {
                console.log("Something went wrong: MANAGE");
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/supervisors', (req, res) => {
    if (req.session.email) {
        try {
            var query = 'SELECT sup_id, first_name, middle_name, last_name FROM supervisors'
    
            connection.query(query, 
            function(err, result, field) {
                if (err)
                    throw err
                if (result.length > 0) {
                    res.json(result)
                } else {
                    console.log("Something went wrong: MANAGE");
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.redirect('/')
    }    
});

function generateRandomPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  
    let password = "";
  
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
  
    return password;
}

function copyAndRenameFile(sourcePath, destinationPath, studID) {
    try {
        const fileContent = fs.readFileSync(sourcePath);
        const fileExtension = path.extname(sourcePath);
        const newFilePath = path.join(destinationPath, `${studID}` + fileExtension);
  
        fs.writeFileSync(newFilePath, fileContent);
  
        console.log('File copied and renamed successfully.');
    } catch (err) {
        console.error('Error copying and renaming file:', err);
    }
}

app.post('/api/addStudent', async (req, res) => {
    if (req.session.email) {
        const {
          studentId,
          firstName,
          middleName,
          lastName,
          courseYear,
          classCode,
          gender,
          advisor,
          remark
        } = req.body;

        const sourceFilePath = './public/assets/img/pf-placeholder.jpg';
        const destinationFolderPath = './public/assets/img/profiles/students';

        copyAndRenameFile(sourceFilePath, destinationFolderPath, studentId)

        const password = generateRandomPassword(8)

        try {
            // Hash the password using Argon2
            const hashedPass = await argon2.hash(password, {
                type: argon2.argon2id,
                memoryCost: 2 ** 16,
                hashLength: 16,
            });

            console.log(hashedPass);
            console.log(password);
            try {
                if (await argon2.verify(hashedPass, password)) {
                    console.log("matched");
                } else {
                    console.log("not matched");
                }
            } catch (err) {
                console.log("error: " + err)
            }
      
            // Example query to insert data into the 'students' table**
            var queryInsert = 'INSERT INTO students (stud_id, first_name, middle_name, last_name, course_year, classcode, gender, password, advisor, remark) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            var query1 = 'SELECT * FROM students_info_all ORDER BY last_name ASC'
            var query2 = 'SELECT * FROM requirement_columns'
            var query3 = 'SELECT first_name, middle_name, last_name, email, admin_id FROM admins'
            var query4 = 'SELECT first_name, middle_name, last_name, sup_id FROM supervisors'
            var query5 = 'SELECT company_name, email FROM companies'
      
            // Execute the query
            connection.query(queryInsert + ';' + query1 + ';' + query2 + ';' + query3 + ';' + query4 + ';' + query5, 
            [studentId, firstName, middleName, lastName, courseYear, classCode, gender, hashedPass, advisor, remark],
            (err, result, field) => {
                console.log("error: " + err);
                console.log("result: " + result);
                    if (err) {
                        result[1].shift()
                        res.render('manage', {
                            username: req.session.name,
                            advisers: result[2],
                            supervisers: result[3],
                            companies: result[4],
                            requirements: initColumnNames(result[1]),
                            min_value: 0,
                            max_value: 2000,
                            data: result[0],
                            validation: {
                                status: true,
                                display: "block",
                                pEvents: "all",
                                msg: "Something went wrong in Adding Students"
                            }
                        })
                        throw err
                    } else {
                        result[2].shift()
                        res.render('manage', {
                            username: req.session.name,
                            advisers: result[3],
                            supervisers: result[4],
                            companies: result[5],
                            requirements: initColumnNames(result[2]),
                            min_value: 0,
                            max_value: 2000,
                            data: result[1],
                            validation: {
                                status: true,
                                display: "block",
                                pEvents: "all",
                                msg: `Data inserted successfully    Password: ${password}`
                            }
                        })
                    }
                }
            );
        } catch (error) {
            result[1].shift()
            res.render('manage', {
                username: req.session.name,
                advisers: result[2],
                supervisers: result[3],
                companies: result[4],
                requirements: initColumnNames(result[1]),
                min_value: 0,
                max_value: 2000,
                data: result[0],
                validation: {
                    status: true,
                    display: "block",
                    pEvents: "all",
                    msg: "Something went wrong in Adding Students"
                }
            })
            throw error
        }
    } else {
        res.redirect('/')
    }
})

// 404
app.get('*', (req, res) => {
    res.status(404).render('404');
});