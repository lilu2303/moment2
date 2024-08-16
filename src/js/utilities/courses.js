const fetchUrl = 'https://dahlgren.miun.se/ramschema_ht23.php';
const courseBodyEL = document.getElementById('courseBody');
const courseSearchEl = document.getElementById('courseSearch');
const headers = courses.querySelectorAll('th');

let fetchData;
let tableData;
let sortColumn;
let sortAsc = false;

// Eventlistners
courseSearchEl.addEventListener('keyup', filterTable); //Key up event to filter table by text
headers.forEach((item) => { item.addEventListener('click', sortData)}); //Add eventlisterner to table headers to allow sorting


async function fetchAndDislayCourses(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();// Convert response to JSON

        if (data){renderTable(data);}
        fetchData = data;
        
    } catch (error) {
        console.error('Error:', error);
 }
}

function sortData(e) {
    let thisSort = e.target.id; // Get the id of the clicked table head
    // Toggle the sorting order if the clicked column is the same as the current sorting column
    if (sortColumn === thisSort) { sortAsc = !sortAsc; }  // If sortColumn = thisSort, toggle true/false for ascending/descending 
    sortColumn = thisSort;      // Update the current sorting column to the clicked column
    tableData.sort((a, b) => (
        a[sortColumn] < b[sortColumn] ? (sortAsc ? 1 : -1) : (a[sortColumn] > b[sortColumn] ? (sortAsc ? -1 : 1) : 0) // Sort the tableData based on the selected column and sorting order
    ));
    // Render the table with the updated data
    renderTable(tableData);
}


function filterTable(){
    const searchValue = courseSearchEl.value.toLowerCase();
    const filteredTable = fetchData.filter((course) => {
        return(
            course.code.toLowerCase().includes(`${searchValue}`) ||
            course.coursename.toLowerCase().includes(`${searchValue}`)
        )
    });
    renderTable(filteredTable)
}

function renderTable(data){
    courseBodyEL.innerHTML = '';
    data.forEach((item) => {
        //Link edited to go to syllabus using item.code instead of item.syllabus.
        courseBodyEL.innerHTML += 
        `<tr>
            <td>${item.code}</td>
            <td>${item.coursename}</td>
            <td>${item.progression}</td>
            <td><a target="_blank" class="icon__link" title='${item.coursename}' href='https://miun.se/utbildning/kursplaner-och-utbildningsplaner/${item.code.toUpperCase()}/'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V4H5V20H19ZM7 6H11V10H7V6ZM7 12H17V14H7V12ZM7 16H17V18H7V16ZM13 7H17V9H13V7Z"></path></svg></a></td> 
        </tr>`
    });
    tableData = data;
}


export {fetchAndDislayCourses, fetchUrl}