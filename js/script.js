
if(!navigator.onLine){
    alert("اینترنت شما وصل نیست ممکن است نمودار نشان داده نشود");
}
function heatEquation(u0, alpha, dt, dx, n) {
    let u = [u0];
    for (let i = 1; i <= n; i++) {
        let uNew = [];
        for (let j = 0; j < u[i-1].length; j++) {
            let left = j > 0 ? u[i-1][j-1] : u[i-1][j];
            let right = j < u[i-1].length - 1 ? u[i-1][j+1] : u[i-1][j];
            let d2udx2 = (left - 2 * u[i-1][j] + right) / (dx * dx);
            uNew.push(u[i-1][j] + alpha * dt * d2udx2);
        }
        u.push(uNew);
    }
    return u;
}

function updateResult() {
    let u0 = document.getElementById("u0").value.split(",").map(Number);
    let alpha = Number(document.getElementById("alpha").value);
    let dt = Number(document.getElementById("dt").value);
    let dx = Number(document.getElementById("dx").value);
    let n = Number(document.getElementById("n").value);

    let result = heatEquation(u0, alpha, dt, dx, n);

    let table = document.getElementById("result");
    table.innerHTML = "";
    for (let i = 0; i < result.length; i++) {
        let row = table.insertRow(i);
        for (let j = 0; j < result[i].length; j++) {
            let cell = row.insertCell(j);
            cell.innerHTML = result[i][j].toFixed(2);
        }
    }

    let ctx = document.getElementById("chart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: result[0].map((_, i) => i),
            datasets: result.map((row, i) => ({
                label: `t=${i}`,
                data: row,
                borderColor: `hsl(${i / result.length * 360}, 100%, 50%)`,
                fill: false
            }))
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

updateResult();