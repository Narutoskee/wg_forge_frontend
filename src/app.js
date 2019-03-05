import orders from '../data/orders.json'; //  import orders data from json
import users from '../data/users.json'; // import users data from json





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

function change(idName) {
    if(document.getElementById(idName).style.display ==='none') {
        let div = document.getElementById(idName).style.display = 'block';
    } else {
        document.getElementById(idName).style.display = 'none';
    }
    return false;
}

export default (function () {
let tableLoad= '<table class="table"><thead>';
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

    const orderId= Number(orders[i].id);
    const transactionId= String(orders[i].transaction_id);
    const userId= Number(orders[i].user_id);
    const createdAt= String(orders[i].created_at);
    const totalPay= parseFloat(orders[i].total);
    const cardNumber= String(orders[i].card_number);
    const cardType = String(orders[i].card_type);
    const orderCountry = String(orders[i].order_country);
    const orderIp = String(orders[i].order_ip);
    let clickId = "demo"+orderId;

    tableLoad +='<tr id="order_'+orderId+'">';
    tableLoad +="<td>"+transactionId+"</td>";
    tableLoad +='<td class="user_data">' +
        '<a onclick="change('+clickId+')" href="#" >'+userId+'</a> ' +
        '<div style="display:none" id="demo'+orderId+'" class="user-details"> ' +
        '<p>Birthday: 01/02/1991</p>' +
        '<p><img src="" width="100px"></p>' +
        '<p>Company: <a href="http://awesome.website">Bumbershoot Corp.</a></p>' +
        '<p>Industry: Apparel / Consumer Services</p>' +
        '</div></td>';
    tableLoad +='<td>'+timeConverter(createdAt)+'</td>';
    tableLoad +='<td>$'+totalPay+'</td>';
    tableLoad +='<td>'+starConverter(cardNumber)+'</td>';
    tableLoad +='<td>'+cardType+'</td>';
    tableLoad +='<td>'+orderCountry +' ('+orderIp+')</td>';
    tableLoad +='</tr>';
}
tableLoad +='</tbody>';
tableLoad +='</table>';

document.getElementById('app').innerHTML = "" + tableLoad + " <br>";
}());

