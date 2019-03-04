// this is an example of improting data from JSON
import orders from '../data/orders.json';
// console.log(orders);
// console.log(orders[0].id+" "+ orders[0].transaction_id);
function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let year = a.getFullYear();
    let month = a.getMonth();
    let date = a.getDate();
    let hour = a.getHours() - (a.getHours() >= 12 ? 12 : 0);
    let period = a.getHours() >= 12 ? 'PM' : 'AM';
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let setTime = date + "/"+ month + "/" + year + ' ' + hour + ':' + min + ':' + sec + ' ' + period;
    return setTime;
}

function starConverter(str) {
        if (str.substr(0, 2) && str.substr(-4)) {
            let firstTwo = str.substr(0, 2);
            let lastFour = str.substr(-4);
            let beStar = "*";
            for(let i = (str.length)-4; i>0; i--){
                beStar += '*';
            }
            return firstTwo + beStar + lastFour;
        }
        else {
            return str = "";
        }
}




let tableLoad= '<thead>';
tableLoad +='<tr>';
tableLoad +='<th>Transaction ID</th>';
tableLoad +='<th>User Info</th>';
tableLoad +='<th>Order Date</th>';
tableLoad +='<th>Order Amount</th>';
tableLoad +='<th>Card Number</th>';
tableLoad +='<th>Card Type</th>';
tableLoad +='<th>Location</th>';
tableLoad +='</tr>';
tableLoad +='</thead>';
tableLoad +='<tbody>';

for(let i = 0; i< orders.length;i++){
    const orderId= orders[i].id;
    const transactionId= orders[i].transaction_id;
    const userId= orders[i].user_id;
    const createdAt= orders[i].created_at;
    const totalPay= orders[i].total;
    const cardNumber= orders[i].card_number;

    tableLoad +='<tr id="order_'+orderId+'">';
    tableLoad +="<td>"+transactionId+"</td>";
    tableLoad +='<td class="user_data">'+userId+'</td>';
    tableLoad +='<td>'+timeConverter(createdAt)+'</td>';
    tableLoad +='<td>$'+totalPay+'</td>';
    tableLoad +='<td>'+starConverter(cardNumber)+'</td>';


    tableLoad +='</tr>';
}

tableLoad +='</tbody>';

document.getElementById('table').innerHTML = "" + tableLoad + " <br>";

export default (function () {
    // YOUR CODE GOES HERE
    // next line is for example only
    //document.getElementById("app").innerHTML = "<h1>Hello WG Forge</h1>";
    // for(let i = 1; i <= 10; i++) {
    //     document.getElementById('table').innerHTML += "" + i + " <br>";
    // }
}());




