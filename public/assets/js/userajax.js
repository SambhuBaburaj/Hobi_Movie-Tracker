function addtocart(product) {
  console.log("here", product);
  $.ajax({
    type: "get",
    url: "/AddCart",
    data: {
      productId: product,
    },
    dataType: "json",
    success: (response) => {
      window.location.href = "/AddCart";
    },
  });
}

function cartcontrol(UserObject, Quantity, productId, count) {
  console.log(UserObject, Quantity, productId, count);
  event.preventDefault();
  console.log(Number(Quantity) + Number(count));
  if (Number(Quantity) + Number(count) == 0) {
    swal("canot be done!");
  } else {
    console.log(UserObject, Quantity, productId, count);
    $.ajax({
      type: "POST",
      url: "/CountControl",
      data: {
        UserObject: UserObject,
        Quantity: Quantity,
        productId: productId,
        count: count,
      },
      dataType: "json",
      success: (response) => {
        window.location.reload();
      },
    });
  }
}

function RemoveProduct(UserObject, productId) {
  event.preventDefault();

  $.ajax({
    type: "post",
    url: "/RemoveProduct",
    data: {
      UserObject: UserObject,
      productId: productId,
    },
    dataType: "json",
    success: (response) => {
      window.location.href = "/AddCart";
    },
  });
}

function CancelOrder(cancelid) {
  console.log("here");

  $.ajax({
    type: "post",
    url: "/CancelOrder?id=cancelid",
    data: {
      id: cancelid,
    },
    dataType: "json",
    success: (response) => {
      console.log("here is it");
      location.reload();
    },
  });
}
function saveAddress(
  firstname,
  lastname,
  address,
  country,
  city,
  state,
  postcode,
  phone,
  email,
  extra
) {
  console.log(
    firstname,
    lastname,
    address,
    country,
    city,
    state,
    postcode,
    phone,
    email,
    extra
  );
  $.ajax({
    url: "/SaveAddress",
    type: "post",
    data: {
      firstname: firstname,
      lastname: lastname,
      address: address,
      country: country,
      city: city,
      state: state,
      postcode: postcode,
      phone: phone,
      email: email,
      extra: extra,
    },
    dataType: "json",
    success: (response) => {
      console.log("something", response);
      if (response == "true") {
        console.log("here");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1300,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
            location.reload();
          },
        });
        Toast.fire({
          icon: "success",
          title: "Address saved",
        });
      } else {
        swal("Already Saved!");
      }
    },
  });
}
function addadressbar(
  firstname,
  lastname,
  address,
  country,
  city,
  state,
  postcode,
  phone,
  email,
  extra
) {
  $("#firstname").val(firstname);
  $("#lastname").val(lastname);
  $("#address").val(address);
  $("#country").val(country);
  $("#city").val(city);
  $("#state").val(state);
  $("#postcode").val(postcode);
  $("#phone").val(phone);
  $("#email").val(email);
  $("#extra").val(extra);
}

function clearAddress() {
  $("#firstname").val("");
  $("#lastname").val("");
  $("#address").val("");
  $("#country").val("");
  $("#city").val("");
  $("#state").val("");
  $("#postcode").val("");
  $("#phone").val("");
  $("#email").val("");
  $("#extra").val("");
}

function payment() {
  $.ajax({
    type: "get",
    url: "/AddCart",
    data: {
      productId: product,
    },
    dataType: "json",
    success: (response) => {
      window.location.href = "/AddCart";
    },
  });
}

$("#placeOrder").submit((event) => {
  event.preventDefault();
console.log("first here");
  $.ajax({
    url: "/OrderCheckout",
    method: "post",
    data: $("#placeOrder").serialize(),
    success: (response) => {
      console.log("resposer", response);
      console.log(response,"whats trhe resposn");
      if (response.name == "COD") {
        // location.href = '/OrderSuccess/'+response;
        location.href = "/CODOrderSuccess?data=" + response.id;
      } else if (response.name == "paypal") {
        console.log("yesim here");
        window.location.href = "/paypalpay";
      } 
      else if(response.name == "no balance")
      {
swal("inefficient balnce")
      }
      else if(response.name == "wallet")
      {
        location.href = "/CODOrderSuccess?data=" + response.id;
      }


      else if (response.notes.key1 == "razerpay") {
        razorpayPayment(response);
      }
    },
  });
});

function verifyPayment(payment, order) {
  console.log(payment, order);
  $.ajax({
    url: "/verifyPayments",
    data: { payment, order },
    method: "post",
    success: (response) => {
      if (response.status) {
        window.location.href = "/OrderSuccessrazer";
      } else {
        swal("Payment Failed ");
      }
    },
  });
}

function razorpayPayment(order) {
  console.log("razor pay reached at 2nd fn usesrside ajax 109");

  var options = {
    key: "rzp_test_362XDrxHPf2XgP", // Enter the Key ID generated from the Dashboard
    amount: Math.trunc(order.amount) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise100
    currency: "INR",
    name: "COZY",
    description: "Test Transaction",
    image: "https://example.com/your_logo",
    order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response) {
      verifyPayment(response, order);
    },
    prefill: {
      name: "Fashion Kart",
      email: "support@fk.com",
      contact: "9999999999",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  var rzp1 = new Razorpay(options); /// for pop up
  rzp1.open();
}
function returnOrder(orderid) {
  swal({
    title: "Are you sure?",
    text: "do you want return this product ",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      $.ajax({
        type: "post",
        url: "/ReuturnOrder",
        data: {
          orderid: orderid,
        },
        dataType: "json",
        success: (response) => {
          window.location.reload();
        },
      });
    } else {
      swal("Your imaginary file is safe!");
      window.location.reload();
    }
  });
}

function deleteaddress(addressid) {
  event.preventDefault();

  swal({
    title: "Are you sure?",
    text: "do you want to delete this address ",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      $.ajax({
        type: "post",
        url: "/DeleteAddress",
        data: {
          addressid: addressid,
        },
        dataType: "json",
        success: (response) => {
          window.location.reload();
        },
      });
    } else {
      swal("cancelled!");
    }
  });
}

function saveupdateAddress(
  addressid,
  firstname,
  lastname,
  address,
  country,
  city,
  state,
  postcode,
  phone,
  email,
  extra
) {
  $.ajax({
    url: "/saveupdateAddress",
    type: "post",
    data: {
      addressid: addressid,
      firstname: firstname,
      lastname: lastname,
      address: address,
      country: country,
      city: city,
      state: state,
      postcode: postcode,
      phone: phone,
      email: email,
      extra: extra,
    },
    dataType: "json",
    success: (response) => {
      console.log("something", response);

      location.href = "/My-account";
    },
  });
}


function ApplyCoupon()
{
event.preventDefault()

  const coupon=document.getElementById("coupon").value

  $.ajax({
    type: "post",
    url: "/ApplyCoupon",
    data: {
      coupon: coupon,
    },
    dataType: "json",
    success: (response) => {
      
      console.log(response);
if(response.status=="Used")
{

  document.getElementById("denied").innerHTML =
  "coupon Already Used" 
  document.getElementById("approved").innerHTML =
  " " 

}
if(response.status=="denied")
{
  document.getElementById("denied").innerHTML =
  "Invalid coupon !" 
  document.getElementById("approved").innerHTML =
  " " 
}

if(response.status=="min")
{
  document.getElementById("denied").innerHTML =
  "minimum spend is "+response.cap +"!"
  document.getElementById("approved").innerHTML =
  " " 
}


if(response.status=="applied")
{
  document.getElementById("approved").innerHTML =
  "coupon  applied!" 
  document.getElementById("denied").innerHTML =
  " " 
  document.getElementById("grand").innerHTML =
response.GrantTotal

document.getElementById("abc").innerHTML =
response.discount+"₹"
}
    },
  });

} 

function WishList(product,value)
{
  event.preventDefault()

  $.ajax({ 
    type: "post",
    url: "/WishList",
    data: {
      product:product,
      value:value
    },
    dataType: "json",
    success: (response) => {
     console.log(response);
if(response.status=="invlid")
{
  location.href="/UserLogin"

}

     if(response.status=="false")
     {
      document.getElementById(product).style.color = "red";  

     }
      else if(response.status=="true")
      {
        document.getElementById(product).style.color = "";  

      }
   
    }
    ,
  });
}


function addtocart(ProductId){
 event.preventDefault()
 $.ajax({
  type: "post",
  url: "/addtocart",
  data: {
    ProductId:ProductId
  },
  dataType: "json",
  success: (response) => {
    if(response)
    document.getElementById(product).style.color = "red";  
    else
    document.getElementById(product).style.color = "";  
  },
});
}
function removewish(ProductId)
{

  event.preventDefault()
  $.ajax({
   type: "post",
   url: "/removewish",
   data: {
     ProductId:ProductId
   },
   dataType: "json",
   success: (response) => {

    location.reload()
   },
 });
}