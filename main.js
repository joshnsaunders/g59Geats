$(document).ready(function() {
  $('#mainButton').click(function() {
    $('#bannerImage, #descriptions, #mainButton').hide();
    $('main').removeAttr("grid-template-rows")
    $('main').css({
      'display': 'grid',
      "grid-template-columns": "32.5% 32.5% 33%",
      "grid-gap": "1%",
    })
    $('#menus').css({
      'display': 'grid',
      'grid-template-rows': "7% 53% 30% 10%",
      // 'grid-gap':"2%",
    })
    $('#orderAndTotal').css({
      'display': 'grid',
      'grid-template-columns': '45% 45%',
      'grid-gap': '1%',
      'height': "100%"
    })
    $('#information').css({
      'display': 'grid',
      'grid-template-rows': "33% 33% 33%",
      'grid-gap': '1%',
      'height': '100%',
    })
    $('#order').css({
      'display': 'grid',
      'grid-template-rows': '60% 40%',
      'grid-gap': '3%',
    })

    $('#menus, #order, #map, #orderAndTotal, #information').show();

    initMap();

    $.get('https://galvanize-eats-api.herokuapp.com/menu')

      .then(function(data) {
        console.log(data);
        var keys = Object.keys(data["menu"])
        console.log(keys);
        console.log(data["menu"]["0"]);

        for (var i = 0; i < keys.length; i++) {
          $('#menuItems').append(
            '<div class="items menu"><span class="itemName">' + data["menu"][keys[i]]["name"] + "</span><span class='itemPrice'>" + data["menu"][keys[i]]["price"] + '</span><span class="quantityInput">' + '<input name="' + data["menu"][keys[i]]["price"] + '" class="orderInput" value="" type="text" placeholder="qty">' + '</span></div>'
          )
        }
        var total = 0
        $('.orderInput').change(function(){
            $('.orderInput').each(function(){
              total += ($(this).val()*(this.name))
              console.log($(this).val()*(this.name));
              console.log(total);
              total=total*1.0083
              total=(Math.round(total*100))/100
              var postTotal = total
              $('#orderTotal').text(total)
            })
            total = 0;


        });

      })
  })


  function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: {
        lat: 39.733475,
        lng: -104.992599,
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var marker = new google.maps.Marker({
      position: {
        lat: 39.733475,
        lng: -104.992599,
      },
      map: map,
      title: 'FOOD!!!'
    });
  }
})


  $('#orderButton').click(function(){
    $.post('https://galvanize-eats-api.herokuapp.com/orders',{
      'price': 'postTotal',
      'name':$('#nameInput').val(),
      'address':$('#addressInput').val(),
      'phone':$('#phoneInput').val(),
    })

    .done(function() {
      console.log("yay!");
      $('#orderButton, #orderTotal').hide();

      $('#orderAndTotal').css({
        'grid-template-rows':'100%',
      })
      $('#congratulations').css({
        'display':'flex',
        'justify-content':'center',
        'align-items':'center',
      })
      $('#congratulations').show()
      });
    })
    // .fail(function() {
    //   console.log("nope");
    //   });
