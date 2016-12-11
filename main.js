$(document).ready(function () {
    $('#add_picture').hide();

    var itemQuantityResult = localStorage.getItem("quantity");
    var getItem = localStorage.getItem("item");
    var productsSum = localStorage.getItem("price");

    Basket();
    itemsQuantity();

    if (localStorage.getItem("quantity") == null) {
        var sum = 0;
    } else {
        var itemSum = parseInt(productsSum);
        var sum = itemSum;
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
        var productTitle = $(this).closest("tr").find(".title").text();
        var productPrice = $(this).closest("tr").find(".price").text();

        var productPriceResult = parseInt(productPrice);
        sum += productPriceResult;

        localStorage.setItem("price", sum);
        var productsSum = localStorage.getItem("price");

        $('.itemlist').append('<div class="row">' + '<div class="col-md-6">' + productTitle + '</div>' +
            '<div class="col-md-2">' + '<span class="price">' + productPrice + '</span>' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '<a role="menuitem" href="#"><span class="glyphicon glyphicon-trash" aria-hidden="true"></a></span>' + '</div>');

        var itemQuantity = $(".glyphicon-trash").length;
        localStorage.setItem("quantity", itemQuantity);

        ItemList();
        Basket();
        itemsQuantity();
    });

    /**************************************** Remove products from basket **************************************************/

    $(document).on("click", ".glyphicon-trash", function () {

        var confirmAction = confirm("Ar tikrai norite pašalinti šią prekę!");
        if (confirmAction == true) {

            $(this).closest(".row").remove();

            var itemQuantity = $(".glyphicon-trash").length;
            localStorage.setItem("quantity", itemQuantity);

            var productPrice = $(this).closest(".row").find(".price").text();
            var productPriceResult = parseInt(productPrice);
            sum -= productPriceResult;

            localStorage.setItem("price", sum);
            var productsSum = localStorage.getItem("price");

            ItemList();
            Basket();
            itemsQuantity();
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

    /****************************************** Basket info *******************************************************/

    function Basket() {
        var getItem = localStorage.getItem("item");
        var productsSum = localStorage.getItem("price");
        if (localStorage.getItem("quantity") == 0 || localStorage.getItem("quantity") == null) {
            $("#button_text").text(" Prekių krepšelis yra tuščias ");
            $(".badge, .caret, #itemsum").hide();
            $("#menu").prop("disabled", true);
        } else {
            $("#button_text").text(" Prekių krepšelyje yra ");
            $(".badge, .caret").show();
            $("#menu").prop("disabled", false);
            $('#itemsum').show().text('Viso už prekes: ' + productsSum + " €");
            $('.itemlist').html(getItem);
        }
    }

/**************************************** Number of units on basket button *************************************/

    function itemsQuantity() {
        var itemQuantityResult = localStorage.getItem("quantity");
        if (itemQuantityResult == 1) {
            $('.badge').text(itemQuantityResult + " Vienetas");
        } else {
            $('.badge').text(itemQuantityResult + " Vienetai");
        }
    }

/********************************** Set/Get Item list to/from localStorage ***************************************/

    function ItemList() {
        localStorage.setItem("item", $('.itemlist').html());
        var getItem = localStorage.getItem("item");
        $('.itemlist').html(getItem);
    }
});

