$(document).ready(function () {

    $('#add_picture').hide();

    var get_item = localStorage.getItem("item");
    var products_sum = localStorage.getItem("price");
    var item_amount_result = localStorage.getItem("amount");

    if (localStorage.getItem("price") === null || localStorage.getItem("price") == 0) {
        var sum = 0;
        $("#button_text").text(" Prekių krepšelis yra tuščias ");
        $(".badge, .caret").hide();

    } else if (localStorage.getItem("amount") == 1) {
        $("#button_text").text(" Prekių yra ");
        $(".badge, .caret").show();

        $('#itemsum').text('Viso už prekes: ' + products_sum + " €");
        $('.itemlist').html(get_item);
        $('.badge').text(item_amount_result + " Vienetas");
        var item_sum = parseInt(products_sum);
        var sum = item_sum;
    } else {
        $("#button_text").text(" Prekių yra ");
        $(".badge, .caret").show();

        $('#itemsum').text('Viso už prekes: ' + products_sum + " €");
        $('.itemlist').html(get_item);
        $('.badge').text(item_amount_result + " Vienetai");
        var item_sum = parseInt(products_sum);
        var sum = item_sum;
    };

    /**************************************** Get result from Json ***************************************************/

    $.getJSON('list.json', function (data) {
        for (var i = 0; i < data.items.length; i++) {
            var image = data.items[i].image;
            var title = data.items[i].title;
            var description = data.items[i].description;
            var price = data.items[i].price;

            /**************************************** style with description *****************************************/

            $('.list_description').append('<tr>' +
                '<td class="title text-center"><strong>' + title + '</strong></td>' +
                '<td><h6><small>' + description + '</small></h6></td>' +
                '<td class="price text-center">' + price + ' €' + '</td >' +
                '<td><button type="button" class="btn btn-primary add">Į krepšelį</button></td >' +
                '</tr >');

            /*************************************** style with picture *********************************************/

            $('.list_picture').append('<tr>' +
                '<td class="image">' + '<img class="img-rounded m-x-auto d-block" height="95" src=' + image + '>' + '</td>' +
                '<td class="title text-center"><strong>' + title + '</strong></td>' +
                '<td class="price text-center">' + price + ' €' + '</td>' +
                '<td class="text-center"><button type="button" class="btn btn-primary add">Į krepšelį</button></td>' +
                '</tr>');
        }
    });

    /**************************************** Add products to basket **************************************************/

    $(document).on("click", ".add", function () {
        var producttitle = $(this).closest("tr").find(".title").text();
        var productprice = $(this).closest("tr").find(".price").text();

        var productpriceresult = parseInt(productprice);
        sum += productpriceresult;
        localStorage.setItem("price", sum);
        var products_sum = localStorage.getItem("price");

        $('.itemlist').append('<div class="row">' + '<div class="col-md-6">' + producttitle + '</div>' +
            '<div class="col-md-2">' + '<span class="price">' + productprice + '</span>' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '<a role="menuitem" href="#"><span class="glyphicon glyphicon-trash" aria-hidden="true"></a></span>' + '</div>');

        var item = $('.itemlist').html();
        localStorage.setItem("item", item);
        var get_item = localStorage.getItem("item");

        if (localStorage.getItem("price") === null || localStorage.getItem("price") == 0) {
            $("#button_text").text(" Prekių krepšelis yra tuščias ");
            $(".badge, .caret").hide();
        } else {
            $("#button_text").text(" Prekių yra ");
            $('#itemsum').show().text('Viso už prekes: ' + products_sum + " €");
            $(".badge, .caret").show();
            $('.itemlist').html(get_item);
        }
        // prekiu vienetu apskaiciavimas
        var item_amount = $(".glyphicon-trash").length;
        localStorage.setItem("amount", item_amount);
        var item_amount_result = localStorage.getItem("amount");
        if ($(".glyphicon-trash").length <= 1) {
            $('.badge').text(item_amount_result + " Vienetas");
        } else {
            $('.badge').text(item_amount_result + " Vienetai");
        }
    });

    /**************************************** Remove products from basket **************************************************/

    $(document).on("click", ".glyphicon-trash", function () {
        var confirm_action = confirm("Ar tikrai norite pašalinti šią prekę!");
        if (confirm_action == true) {

            $(this).closest(".row").remove();
            var item = $('.itemlist').html();
            localStorage.setItem("item", item);
            var get_item = localStorage.getItem("item");
            $('.itemlist').html(get_item);

            var product_price = $(this).closest(".row").find(".price").text();
            var product_price_result = parseInt(product_price);
            sum -= product_price_result;

            localStorage.setItem("price", sum);
            var products_sum = localStorage.getItem("price");

            if (localStorage.getItem("price") === null || localStorage.getItem("price") == 0) {
                $("#button_text").text(" Prekių krepšelis yra tuščias ");
                $(".badge, .caret, #itemsum").hide();
            } else {
                $("#button_text").text(" Prekių yra ");
                $(".badge, .caret").show();
                $('#itemsum').text('Viso už prekes: ' + products_sum + " €");
            }
        };

        var item_amount = $(".glyphicon-trash").length;
        localStorage.setItem("amount", item_amount);
        var item_amount_result = localStorage.getItem("amount");
        if ($(".glyphicon-trash").length <= 1) {
            $('.badge').text(item_amount_result + " Vienetas");
        } else {
            $('.badge').text(item_amount_result + " Vienetai");
        }
    });

    /**************************************** Change styles **************************************************/

    $(document).on("click", "#style_description", function () {
        $('#description').show('.list_description');
        $('#add_picture').hide('.list_picture');
    });

    $(document).on("click", "#style_foto", function () {
        $('#add_picture').show('.list_picture');
        $('#description').hide('.list_description');
    });
});

