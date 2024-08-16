let e, t, n;
const o = document.getElementById("courseBody")
  , r = document.getElementById("courseSearch")
  , s = courses.querySelectorAll("th");
let c = !1;
async function a(t) {
    try {
        let n = await fetch(t)
          , o = await n.json();
        o && d(o),
        e = o
    } catch (e) {
        console.error("Error:", e)
    }
}
function l(e) {
    let o = e.target.id;
    n === o && (c = !c),
    n = o,
    t.sort((e,t)=>e[n] < t[n] ? c ? 1 : -1 : e[n] > t[n] ? c ? -1 : 1 : 0),
    d(t)
}
function d(e) {
    o.innerHTML = "",
    e.forEach(e=>{
        o.innerHTML += `<tr>
            <td>${e.code}</td>
            <td>${e.coursename}</td>
            <td>${e.progression}</td>
            <td><a target="_blank" class="icon__link" title='${e.coursename}' href='https://miun.se/utbildning/kursplaner-och-utbildningsplaner/${e.code.toUpperCase()}/'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V4H5V20H19ZM7 6H11V10H7V6ZM7 12H17V14H7V12ZM7 16H17V18H7V16ZM13 7H17V9H13V7Z"></path></svg></a></td> 
        </tr>`
    }
    ),
    t = e
}
r.addEventListener("keyup", function() {
    let t = r.value.toLowerCase();
    d(e.filter(e=>e.code.toLowerCase().includes(`${t}`) || e.coursename.toLowerCase().includes(`${t}`)))
}),
s.forEach(e=>{
    e.addEventListener("click", l)
}
),
window.onload = a("https://dahlgren.miun.se/ramschema_ht23.php");
//# sourceMappingURL=index.9580016d.js.map
