var basicSpinResult = new Array();
var basicSpinImage = new Array();
var catSpinResult = new Array();
var catSpinImage = new Array();
var catFound = false;
var swordFound = false;

function basicSpin() {
    var weight = [];
    weight[0] = [
        [5, "images/symbol1.png"],
        [15, "images/symbol2.png"],
        [30, "images/symbol3.png"],
        [55, "images/symbol4.png"],
        [105, "images/symbol5.png"],
        [205, "images/symbol6.png"],
        [355, "images/symbol7.png"],
        [855, "images/symbol8.png"],
        [1355, "images/symbol9.png"],
        [1855, "images/symbol10.png"],
        [2355, "images/symbol11.png"],
        [6225, "images/symbol12.png"],
        [10095, "images/symbol13.png"],
        [13965, "images/symbol14.png"],
        [17835, "images/symbol15.png"]
    ];
    weight[1] = [
        [5, "images/symbol1.png"],
        [15, "images/symbol2.png"],
        [30, "images/symbol3.png"],
        [55, "images/symbol4.png"],
        [105, "images/symbol5.png"],
        [205, "images/symbol6.png"],
        [355, "images/symbol7.png"],
        [855, "images/symbol8.png"],
        [1355, "images/symbol9.png"],
        [1855, "images/symbol10.png"],
        [2355, "images/symbol11.png"],
        [5355, "images/symbol12.png"],
        [8355, "images/symbol13.png"],
        [11355, "images/symbol14.png"],
        [14355, "images/symbol15.png"],
        [15355, "images/symbol16.png"],
        [20355, "images/symbol17.png"]
    ];
    weight[2] = JSON.parse(JSON.stringify(weight[1]));
    weight[2][weight[2].length - 1] = [20352, "images/symbol18.png"];
    weight[3] = JSON.parse(JSON.stringify(weight[1]));
    weight[3][weight[3].length - 1] = ["17150", "images/symbol19.png"];
    weight[4] = weight[0];
    $("div#basic div.placeholder").empty();
    catFound = swordFound = false;

    var serverSeed = $("input#serverSeed").val();
    var clientSeed = $("input#clientSeed").val();
    var nonce = $("input#nonce").val();
    var round = $("div#basic input#round").val();
    var hash = encrypt(serverSeed, clientSeed, nonce, round);
    $("div#basic input#hash").val(hash);

    var canvasWidth = 900;
    var canvasHeight = 470;
    var ctx = createCanvas($("div#basic div.placeholder"), canvasWidth, canvasHeight, "#f8f8f8", true);
    var descriptionFontSize = 12;
    var descriptionFontColor = "#999";
    var fontSize = 16;
    var lineHeight = 24;
    var rightSide = 120;
    ctx.font = descriptionFontSize + "px sans-serif";
    ctx.fillStyle = descriptionFontColor;
    drawWrapText(ctx, "Split the hash every 8 characters and take the first five string", 0, rightSide, lineHeight);
    drawWrapText(ctx, "Split each string every 2 characters", 0, rightSide, lineHeight * 3);
    drawWrapText(ctx, "Convert hexadecimal to decimal", 0, rightSide, lineHeight * 5);
    drawWrapText(ctx, "Calculate separately and add up", 0, rightSide, lineHeight * 6.5);
    drawWrapText(ctx, "Multiply the total by the weight", 0, rightSide, lineHeight * 11.5);
    drawWrapText(ctx, "Round to integer", 0, rightSide, lineHeight * 14);
    var spacing = 10;
    var cellWidth = (canvasWidth - rightSide - spacing * 4) / 5;
    var len = 8;
    var sword = 0;
    for (var a = 0, b = 0; a < 5; a++, b += len) {
        var str = hash.substr(b, len);
        var x = rightSide + (cellWidth * a) + (spacing * a);
        var result = drawProcess(ctx, str, weight[a], x, 0, cellWidth, lineHeight);
        basicSpinResult[a] = Math.floor(result);
        drawWrapText(ctx, "Reel_" + (a + 1) + "=" + basicSpinResult[a], x, x + cellWidth, lineHeight * 14, "center");
        var img = new Image();
        $(img).data("x", x);
        $(img).data("cellWidth", cellWidth);
        img.onload = function() {
            ctx.drawImage(this, $(this).data("x") + ($(this).data("cellWidth") - this.width) / 2, lineHeight * 15);
        };
        for (var c = 0; c < weight[a].length; c++) {
            if (Math.floor(result) <= weight[a][c][0]) {
                basicSpinImage[a] = weight[a][c][1];
                img.src = basicSpinImage[a];
                if (basicSpinImage[a] == "images/symbol16.png") {
                    catFound = true;
                } else if (basicSpinImage[a] == "images/symbol17.png" || basicSpinImage[a] == "images/symbol18.png" || basicSpinImage[a] == "images/symbol19.png") {
                    sword++;
                }
                break;
            }
        }
        /*ctx.strokeStyle = "#cccccc";
        ctx.lineCap = 'round';
        ctx.lineWidth = 1;
        ctx.beginPath();
        x = rightSide + (cellWidth * a) + (spacing * a);
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        if (a > 0) {
            x = rightSide + (cellWidth * a) + (spacing * (a - 1));
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvasHeight);
        }
        ctx.stroke();*/
    }
    swordFound = sword >= 3;
    insertShowMoreButton("div#basic div.placeholder");
    canvasWidth = 900;
    canvasHeight = 1000;
    spacing = 30;
    var ctx2 = createCanvas($("div#basic div.placeholder"), canvasWidth, canvasHeight, "#f8f8f8", false);
    ctx2.fillStyle = "#000";
    ctx2.font = fontSize + "px sans-serif";
    var totalLines = weight[2].length + 2;
    cellWidth = (canvasWidth - rightSide - spacing * 4) / 5;
    var lineHeight2 = canvasHeight / (totalLines);
    for (var a = 0; a < 5; a++) {
        var x, y, txtSize, str;
        var highlight = false;
        for (var b = 0; b < totalLines; b++) {
            x = rightSide + (cellWidth * a) + (spacing * a);
            if (b == 0) {
                drawWrapText(ctx2, "Reel_" + (a + 1), x, x + cellWidth, lineHeight2 * 0.5, "center");
            } else if (b == totalLines - 1) {
                drawWrapText(ctx2, "Total=" + weight[a][weight[a].length - 1][0], x, x + cellWidth, lineHeight2 * (b + 0.5), "center");
            } else {
                if (b - 1 < weight[a].length) {
                    var img2 = new Image();
                    var symbol = weight[a][b - 1];
                    var selected = !highlight && basicSpinResult[a] <= symbol[0];
                    if (selected) {
                        highlight = true;
                    }
                    $(img2).data("left", rightSide + (cellWidth * a) + (spacing * (a)));
                    $(img2).data("width", cellWidth);
                    $(img2).data("top", lineHeight2 * (b));
                    $(img2).data("height", lineHeight2);
                    $(img2).data("weight", symbol[0]);
                    $(img2).data("selected", selected);
                    img2.onload = function() {
                        var width = this.width / 2;
                        var height = this.height / 2;
                        var left = $(this).data("left");
                        var top = $(this).data("top");
                        var w = $(this).data("width");
                        var h = $(this).data("height");
                        var x = left + 20;
                        var y = top;
                        if ($(this).data("selected")) {
                            ctx2.fillStyle = "#ccc";
                            ctx2.fillRect(left, y, w, h);
                            ctx2.drawImage(this, x, y, width, height);
                        } else {
                            ctx2.save();
                            ctx2.globalAlpha = 0.5;
                            ctx2.drawImage(this, x, y, width, height);
                            ctx2.restore();
                        }
                        ctx2.fillStyle = "#000";
                        drawWrapText(ctx2, $(this).data("weight").toString(), left + 70, left + w, top + 30, "center");
                    };
                    img2.src = symbol[1];
                }
            }
        }
        /*ctx2.strokeStyle = "#cccccc";
        ctx2.lineCap = 'round';
        ctx2.lineWidth = 1;
        ctx2.beginPath();
        x = rightSide + (cellWidth * a) + (spacing * a);
        ctx2.moveTo(x, 0);
        ctx2.lineTo(x, canvasHeight);
        if (a > 0) {
            x = rightSide + (cellWidth * a) + (spacing * (a - 1));
            ctx2.moveTo(x, 0);
            ctx2.lineTo(x, canvasHeight);
        }
        ctx2.stroke();*/
    }
    catRespin();
    luckySpin();
}

function catRespin() {
    if (!catFound) {
        $("div#cat #msg").show("fast");
        $("div#cat #content").hide();
        return;
    }
    $("div#cat div.placeholder").empty();
    $("div#cat #msg").hide();
    $("div#cat #content").show("fast");
    catSpinResult = JSON.parse(JSON.stringify(basicSpinResult));
    catSpinImage = JSON.parse(JSON.stringify(basicSpinImage));
    var weight = [
        [25, "images/symbol1.png"],
        [75, "images/symbol2.png"],
        [150, "images/symbol3.png"],
        [275, "images/symbol4.png"],
        [525, "images/symbol5.png"],
        [825, "images/symbol6.png"],
        [1125, "images/symbol7.png"],
        [1625, "images/symbol8.png"],
        [2125, "images/symbol9.png"],
        [2625, "images/symbol10.png"],
        [3125, "images/symbol11.png"],
        [5125, "images/symbol17.png", "images/symbol18.png", "images/symbol19.png"]
    ];
    var catSpinIndex = new Array();
    var serverSeed = $("input#serverSeed").val();
    var clientSeed = $("input#clientSeed").val();
    var nonce = $("input#nonce").val();
    var round = $("div#cat input#round").val();
    var hash = encrypt(serverSeed, clientSeed, nonce, round);
    $("div#cat input#hash").val(hash);
    var cellWidth = 150;
    var rightSide = 120;
    var lineHeight = 24;
    var canvasWidth = 900;
    var canvasHeight = 350;
    var fontSize = 16;
    var descriptionFontSize = 12;
    var descriptionFontColor = "#999";
    var ctx = createCanvas($("div#cat div.placeholder"), canvasWidth, canvasHeight, "#f8f8f8", true);
    ctx.font = descriptionFontSize + "px sans-serif";
    ctx.fillStyle = descriptionFontColor;
    drawWrapText(ctx, "Split the hash every 8 characters and take the first five string", 0, rightSide, lineHeight);
    drawWrapText(ctx, "Split each string every 2 characters", 0, rightSide, lineHeight * 3);
    drawWrapText(ctx, "Convert hexadecimal to decimal", 0, rightSide, lineHeight * 5);
    drawWrapText(ctx, "Calculate separately and add up", 0, rightSide, lineHeight * 6.5);
    drawWrapText(ctx, "Multiply the total by the weight", 0, rightSide, lineHeight * 11.5);
    drawWrapText(ctx, "Round to integer", 0, rightSide, lineHeight * 13.5);
    var str = hash.substr(0, 8);
    var x = rightSide;
    var result = drawProcess(ctx, str, weight, x, 0, cellWidth, lineHeight);
    drawWrapText(ctx, "=" + Math.floor(result), x, x + cellWidth, lineHeight * 13.5, "right");
    var spacing = 30;
    x = rightSide + cellWidth + spacing;
    var _cellWidth = (canvasWidth - x - spacing * 3) / 3;
    var sword = 0;
    for (var a = 0; a < 3; a++) {
        var _x = x + (_cellWidth * a) + (spacing * a);
        var _y = lineHeight;
        drawWrapText(ctx, "Reel_" + (a + 2), _x, _x + _cellWidth, _y, "center");
        if (basicSpinImage[a + 1] == "images/symbol16.png") {
            catSpinResult[a + 1] = result;
            drawWrapText(ctx, "Respin", _x, _x + _cellWidth, lineHeight * 7, "center");
            drawWrapText(ctx, "↓", _x, _x + _cellWidth, lineHeight * 8, "center");
            drawWrapText(ctx, Math.floor(result).toString(), _x, _x + _cellWidth, lineHeight * 9.5, "center");
            var img = new Image();
            $(img).data("x", _x);
            $(img).data("y", lineHeight * 10);
            $(img).data("cellWidth", _cellWidth);
            img.onload = function() {
                ctx.drawImage(this, $(this).data("x") + ($(this).data("cellWidth") - this.width) / 2, $(this).data("y"));
            };
            for (var b = 0; b < weight.length; b++) {
                if (Math.floor(result) <= weight[b][0]) {
                    catSpinIndex[a] = weight[b][0];
                    catSpinImage[a + 1] = weight[b][1];
                    if (b == weight.length - 1) {
                        if (a == 1) {
                            catSpinImage[a + 1] = weight[b][2];
                        } else if (a == 2) {
                            catSpinImage[a + 1] = weight[b][3];
                        }
                    }
                    img.src = catSpinImage[a + 1];
                    break;
                }
            }
        }
        var img2 = new Image();
        $(img2).data("x", _x);
        $(img2).data("y", lineHeight * 2);
        $(img2).data("cellWidth", _cellWidth);
        img2.onload = function() {
            ctx.drawImage(this, $(this).data("x") + ($(this).data("cellWidth") - this.width) / 2, $(this).data("y"));
        };
        img2.src = basicSpinImage[a + 1];
        if (catSpinImage[a + 1] == "images/symbol17.png" || catSpinImage[a + 1] == "images/symbol18.png" || catSpinImage[a + 1] == "images/symbol19.png") {
            sword++;
        }
        // ctx.strokeStyle = "#cccccc";
        // ctx.lineCap = 'round';
        // ctx.lineWidth = 1;
        // ctx.beginPath();
        // _x = x + (_cellWidth * a) + (spacing * a);
        // ctx.moveTo(_x, 0);
        // ctx.lineTo(_x, canvasHeight);
        // _x += _cellWidth;
        // ctx.moveTo(_x, 0);
        // ctx.lineTo(_x, canvasHeight);
        // ctx.stroke();
    }
    swordFound = sword >= 3;
    // ctx.strokeStyle = "#cccccc";
    // ctx.lineCap = 'round';
    // ctx.lineWidth = 1;
    // ctx.beginPath();
    // ctx.moveTo(rightSide, 0);
    // ctx.lineTo(rightSide, canvasHeight);
    // ctx.stroke();
    insertShowMoreButton("div#cat div.placeholder");

    canvasWidth = 900;
    canvasHeight = 500;
    spacing = 30;
    var ctx2 = createCanvas($("div#cat div.placeholder"), canvasWidth, canvasHeight, "#f8f8f8", false);
    ctx2.fillStyle = "#000";
    ctx2.font = fontSize + "px sans-serif";
    var lineHeight2 = 24;
    cellWidth = (canvasWidth - spacing * 7) / 6;
    for (var a = 0; a < 6; a++) {
        x = (cellWidth * a) + (spacing * (a + 1));
        drawWrapText(ctx2, "Reel_" + (a % 3 + 2), x, x + cellWidth, lineHeight2 * 1.5, "center");
        for (var b = Math.floor(a / 3) * 6; b < (Math.floor(a / 3) + 1) * 6; b++) {
            var index = 1;
            if (a > 3 && b == 11) {
                index += a - 3;
            }
            var selected = catSpinIndex[a % 3] && catSpinIndex[a % 3] == weight[b][0];
            var img = new Image();
            $(img).data("x", x);
            $(img).data("y", lineHeight2 * 3 * (b % 6 + 1));
            $(img).data("selected", selected);
            $(img).data("cellWidth", cellWidth);
            $(img).data("weight", weight[b][0].toString());
            img.onload = function() {
                var selected = $(this).data("selected");
                var x = $(this).data("x");
                var y = $(this).data("y");
                var _str = $(this).data("weight");
                var _cellWidth = $(this).data("cellWidth");
                var width = this.width / 2;
                var txtSize = ctx2.measureText(_str);
                var _spacing = 10;
                var _x = x + 10;
                if (selected) {
                    ctx2.fillStyle = "#ccc";
                    ctx2.fillRect(x, y - _spacing, _cellWidth, width + _spacing * 2);
                } else {
                    ctx2.save();
                    ctx2.globalAlpha = 0.5;
                }
                ctx2.drawImage(this, _x, y, width, width);
                if (!selected) {
                    ctx2.restore();
                }
                ctx2.fillStyle = "#000";
                drawWrapText(ctx2, _str, _x + width, x + _cellWidth, y + 30, "center");
            };
            img.src = weight[b][index];
        }
        // ctx2.strokeStyle = "#cccccc";
        // ctx2.lineCap = 'round';
        // ctx2.lineWidth = 1;
        // ctx2.beginPath();
        // ctx2.moveTo(x, 0);
        // ctx2.lineTo(x, canvasHeight);
        // x += cellWidth;
        // ctx2.moveTo(x, 0);
        // ctx2.lineTo(x, canvasHeight);
        // ctx2.stroke();
    }
}

function luckySpin() {
    if (!swordFound) {
        $("div#lucky #msg").show("fast");
        $("div#lucky #content").hide();
        bonusRespin(false);
        return;
    }
    $("div#lucky div.placeholder").empty();
    $("div#lucky #msg").hide();
    $("div#lucky #content").show("fast");
    var weight = [
        [25, 20],
        [55, 30],
        [75, 50],
        [85, 100],
        [110, 1],
        [140, 2],
        [170, 3],
        [185, 5]
    ];

    var serverSeed = $("input#serverSeed").val();
    var clientSeed = $("input#clientSeed").val();
    var nonce = $("input#nonce").val();
    var round = $("div#lucky input#round").val();
    var hash = encrypt(serverSeed, clientSeed, nonce, round);
    $("div#lucky input#hash").val(hash);

    var canvasWidth = 900;
    var canvasHeight = 350;
    var rightSide = 120;
    var lineHeight = 24;
    var fontSize = 16;
    var cellWidth = 150;
    var descriptionFontSize = 12;
    var descriptionFontColor = "#999";
    var ctx = createCanvas($("div#lucky div.placeholder"), canvasWidth, canvasHeight, "#f8f8f8", true);
    ctx.font = descriptionFontSize + "px sans-serif";
    ctx.fillStyle = descriptionFontColor;
    drawWrapText(ctx, "Split the hash every 8 characters and take the first five string", 0, rightSide, lineHeight);
    drawWrapText(ctx, "Split each string every 2 characters", 0, rightSide, lineHeight * 3);
    drawWrapText(ctx, "Convert hexadecimal to decimal", 0, rightSide, lineHeight * 5);
    drawWrapText(ctx, "Calculate separately and add up", 0, rightSide, lineHeight * 6.5);
    drawWrapText(ctx, "Multiply the total by the weight", 0, rightSide, lineHeight * 11.5);
    drawWrapText(ctx, "Round to integer", 0, rightSide, lineHeight * 13.5);
    var str = hash.substr(0, 8);
    var x = rightSide;
    var result = drawProcess(ctx, str, weight, x, 0, cellWidth, lineHeight);
    drawWrapText(ctx, "=" + Math.floor(result), x, x + cellWidth, lineHeight * 13.5, "right");
    var img = new Image();
    $(img).data("result", result);
    img.onload = function() {
        ctx.drawImage(this, 350, 40);
        var y = 99;
        var x = 356;
        var _cellWidth = 112;
        var highlight = false;
        var prize;
        var type = "payout";
        for (var a = 0; a < weight.length; a++) {
            var _y = y + 35.5 * a;
            if (a > 3) {
                x = 609;
                _y = y + 35.5 * (a - 4);

            }
            if (!highlight && $(this).data("result") <= weight[a][0]) {
                highlight = true;
                ctx.fillStyle = "#ccc";
                ctx.fillRect(x, _y - 22, _cellWidth * 2, 37);
                prize = weight[a][1];
                if (a > 3) {
                    type = "respin";
                }
            }
            ctx.fillStyle = "#000";
            drawWrapText(ctx, weight[a][0].toString(), x, x + _cellWidth, _y, "center");
            drawWrapText(ctx, weight[a][1].toString(), x + _cellWidth, x + _cellWidth * 2, _y, "center");
        }
        drawWrapText(ctx, weight[weight.length - 1][0].toString(), x, x + _cellWidth, 280, "center");
        if (type == "payout") {
            drawWrapText(ctx, "You get " + prize + "x payout", 270, canvasWidth, lineHeight * 13.5, "center");
        } else {
            drawWrapText(ctx, "You get bonus respin and then " + prize + "x payout", 270, canvasWidth, lineHeight * 13.5, "center");
            bonusRespin(true);
        }
    }
    img.src = "images/luckySpin.png";
}

function bonusRespin(bonus) {
    if (!bonus) {
        $("div#bonus #msg").show("fast");
        $("div#bonus #content").hide();
        return;
    }
    $("div#bonus div.placeholder").empty();
    $("div#bonus #msg").hide();
    $("div#bonus #content").show("fast");
    var weight = [
        [50, "images/symbol1.png"],
        [150, "images/symbol2.png"],
        [300, "images/symbol3.png"],
        [550, "images/symbol4.png"],
        [850, "images/symbol5.png"],
        [1250, "images/symbol6.png"],
        [1650, "images/symbol7.png"],
        [2150, "images/symbol8.png"],
        [2650, "images/symbol9.png"],
        [3150, "images/symbol10.png"],
        [3650, "images/symbol11.png"],
        [4150, "images/symbol12.png"],
        [4650, "images/symbol13.png"],
        [5150, "images/symbol14.png"],
        [5650, "images/symbol15.png"]
    ];
    var serverSeed = $("input#serverSeed").val();
    var clientSeed = $("input#clientSeed").val();
    var nonce = $("input#nonce").val();
    var round = 3;
    var canvasWidth = 900;
    var canvasHeight = 600;
    var descriptionFontSize = 12;
    var fontSize = 16;
    var lineHeight = 24;
    var rightSide = 120;
    var bonusSpinResult = new Array();
    var bonusSpinImage = new Array();
    var hash = encrypt(serverSeed, clientSeed, nonce, round);
    var ctx = createCanvas($("div#bonus div.placeholder"), canvasWidth, canvasHeight, "#f8f8f8", true);
    ctx.font = fontSize + "px sans-serif";
    ctx.fillStyle = "#000";
    drawWrapText(ctx, "Bonus Respin", 10, canvasWidth, lineHeight * 1);
    drawWrapText(ctx, "Round = " + (round++), 10, canvasWidth, lineHeight * 2);
    drawWrapText(ctx, "Hash = " + hash, 10, canvasWidth, lineHeight * 3);
    ctx.font = descriptionFontSize + "px sans-serif";
    ctx.fillStyle = "#999";
    drawWrapText(ctx, "HMAC_Sha256 ( Client_Seed : Nonce : Round , Server_Seed )", 65, canvasWidth, lineHeight * 3.7);
    drawWrapText(ctx, "Split the hash every 8 characters and take the first five string", 0, rightSide, lineHeight * 6);
    drawWrapText(ctx, "Split each string every 2 characters", 0, rightSide, lineHeight * 8);
    drawWrapText(ctx, "Convert hexadecimal to decimal", 0, rightSide, lineHeight * 10);
    drawWrapText(ctx, "Calculate separately and add up", 0, rightSide, lineHeight * 11.5);
    drawWrapText(ctx, "Multiply the total by the weight", 0, rightSide, lineHeight * 16.5);
    drawWrapText(ctx, "Round to integer", 0, rightSide, lineHeight * 19);
    var spacing = 10;
    var cellWidth = (canvasWidth - rightSide - spacing * 4) / 5;
    var len = 8;
    var respin = false;
    for (var col = 0, start = 0; col < 5; col++, start += len) {
        var str = hash.substr(start, len);
        var x = rightSide + (cellWidth * col) + (spacing * col);
        var result = drawProcess(ctx, str, weight, x, lineHeight * 5, cellWidth, lineHeight);
        bonusSpinResult[col] = Math.floor(result);
        if (bonusSpinResult[col] > weight[10][0]) {
            respin = true;
        }
        drawWrapText(ctx, "Reel_" + (col + 1) + "=" + bonusSpinResult[col], x, x + cellWidth, lineHeight * 19, "center");
        var img = new Image();
        $(img).data("ctx", ctx);
        $(img).data("x", x);
        $(img).data("cellWidth", cellWidth);
        img.onload = function() {
            $(this).data("ctx").drawImage(this, $(this).data("x") + ($(this).data("cellWidth") - this.width) / 2, lineHeight * 20);
        };
        for (var c = 0; c < weight.length; c++) {
            if (bonusSpinResult[col] <= weight[c][0]) {
                bonusSpinImage[col] = weight[c][1];
                img.src = weight[c][1];
                break;
            }
        }
        /*ctx.strokeStyle = "#cccccc";
        ctx.lineCap = 'round';
        ctx.lineWidth = 1;
        ctx.beginPath();
        x = rightSide + (cellWidth * col) + (spacing * col);
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        if (col > 0) {
            x = rightSide + (cellWidth * col) + (spacing * (col - 1));
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvasHeight);
        }
        ctx.stroke();*/
    }
    while (respin) {
        respin = false;
        canvasWidth = 900;
        canvasHeight = 750;
        ctx = createCanvas($("div#bonus div.placeholder"), canvasWidth, canvasHeight, "#f8f8f8", true);
        ctx.font = fontSize + "px sans-serif";
        ctx.fillStyle = "#000";
        var hash = encrypt(serverSeed, clientSeed, nonce, round);
        drawWrapText(ctx, "Respin when the spade symbol, heart symbol, club symbol and square symbol appear in the reels", 10, canvasWidth, lineHeight * 1);
        drawWrapText(ctx, "Round = " + (round++), 10, canvasWidth, lineHeight * 2);
        drawWrapText(ctx, "Hash = " + hash, 10, canvasWidth, lineHeight * 3);
        ctx.font = descriptionFontSize + "px sans-serif";
        ctx.fillStyle = "#999";
        drawWrapText(ctx, "HMAC_Sha256 ( Client_Seed : Nonce : Round , Server_Seed )", 65, canvasWidth, lineHeight * 3.7);
        drawWrapText(ctx, "Split the hash every 8 characters and take the first five string", 0, rightSide, lineHeight * 12);
        drawWrapText(ctx, "Split each string every 2 characters", 0, rightSide, lineHeight * 14);
        drawWrapText(ctx, "Convert hexadecimal to decimal", 0, rightSide, lineHeight * 16);
        drawWrapText(ctx, "Calculate separately and add up", 0, rightSide, lineHeight * 17.5);
        drawWrapText(ctx, "Multiply the total by the weight", 0, rightSide, lineHeight * 22.5);
        drawWrapText(ctx, "Round to integer", 0, rightSide, lineHeight * 25);
        for (var col = 0, start = 0; col < 5; col++, start += len) {
            ctx.font = fontSize + "px sans-serif";
            ctx.fillStyle = "#000";
            var str = hash.substr(start, len);
            var x = rightSide + (cellWidth * col) + (spacing * col);
            var img = new Image();
            $(img).data("ctx", ctx);
            $(img).data("x", x);
            $(img).data("y", lineHeight * 4);
            $(img).data("cellWidth", cellWidth);
            img.onload = function() {
                $(this).data("ctx").drawImage(this, $(this).data("x") + ($(this).data("cellWidth") - this.width) / 2, $(this).data("y"));
            };
            img.src = bonusSpinImage[col];
            drawWrapText(ctx, str, x, x + cellWidth, lineHeight * 12, "center");
            if (bonusSpinResult[col] > weight[10][0]) {
                drawWrapText(ctx, "Respin", x, x + cellWidth, lineHeight * 9.5, "center");
                drawWrapText(ctx, "↓", x, x + cellWidth, lineHeight * 10.5, "center");
                var respinResult = drawProcess(ctx, str, weight, x, lineHeight * 11, cellWidth, lineHeight);
                bonusSpinResult[col] = Math.floor(respinResult);
                if (bonusSpinResult[col] > weight[10][0]) {
                    respin = true;
                }
                drawWrapText(ctx, "Reel_" + (col + 1) + "=" + bonusSpinResult[col], x, x + cellWidth, lineHeight * 25, "center");
                var img1 = new Image();
                $(img1).data("ctx", ctx);
                $(img1).data("x", x);
                $(img1).data("y", lineHeight * 26);
                $(img1).data("cellWidth", cellWidth);

                img1.onload = function() {
                    $(this).data("ctx").drawImage(this, $(this).data("x") + ($(this).data("cellWidth") - this.width) / 2, $(this).data("y"));
                };
                for (var c = 0; c < weight.length; c++) {
                    if (bonusSpinResult[col] <= weight[c][0]) {
                        bonusSpinImage[col] = weight[c][1];
                        img1.src = weight[c][1];
                        break;
                    }
                }
            }
        }
    }
    insertShowMoreButton("div#bonus div.placeholder");

    canvasWidth = 900;
    canvasHeight = 900;
    spacing = 30;
    var ctx2 = createCanvas($("div#bonus div.placeholder"), canvasWidth, canvasHeight, "#f8f8f8", false);
    ctx2.fillStyle = "#000";
    ctx2.font = fontSize + "px sans-serif";
    cellWidth = (canvasWidth - rightSide - spacing * 4) / 5;
    var totalLines = weight.length + 2;
    var lineHeight2 = canvasHeight / (totalLines);
    for (var a = 0; a < 5; a++) {
        var x;
        for (var b = 0; b < totalLines; b++) {
            x = rightSide + (cellWidth * a) + (spacing * a);
            if (b == 0) {
                drawWrapText(ctx2, "Reel_" + (a + 1), x, x + cellWidth, lineHeight2 * 0.5, "center");
            } else if (b == totalLines - 1) {
                drawWrapText(ctx2, "Total=" + weight[weight.length - 1][0], x, x + cellWidth, lineHeight2 * (b + 0.5), "center");
            } else {
                if (b - 1 < weight.length) {
                    var img2 = new Image();
                    var symbol = weight[b - 1];
                    var selected = false;
                    selected = bonusSpinResult[a] <= weight[b - 1][0] && bonusSpinResult[a] >= (b - 2 >= 0 ? weight[b - 2][0] : 0);
                    $(img2).data("left", rightSide + (cellWidth * a) + (spacing * (a)));
                    $(img2).data("width", cellWidth);
                    $(img2).data("top", lineHeight2 * (b));
                    $(img2).data("height", lineHeight2);
                    $(img2).data("weight", symbol[0]);
                    $(img2).data("selected", selected);
                    img2.onload = function() {
                        var width = this.width / 2;
                        var height = this.height / 2;
                        var left = $(this).data("left");
                        var top = $(this).data("top");
                        var w = $(this).data("width");
                        var h = $(this).data("height");
                        var x = left + 20;
                        var y = top;
                        if ($(this).data("selected")) {
                            ctx2.fillStyle = "#ccc";
                            ctx2.fillRect(left, y, w, h);
                            ctx2.drawImage(this, x, y, width, height);
                        } else {
                            ctx2.save();
                            ctx2.globalAlpha = 0.5;
                            ctx2.drawImage(this, x, y, width, height);
                            ctx2.restore();
                        }
                        ctx2.fillStyle = "#000";
                        drawWrapText(ctx2, $(this).data("weight").toString(), left + 70, left + w, top + 30, "center");
                    };
                    img2.src = symbol[1];
                }
            }
        }
        /*ctx2.strokeStyle = "#cccccc";
        ctx2.lineCap = 'round';
        ctx2.lineWidth = 1;
        ctx2.beginPath();
        x = rightSide + (cellWidth * a) + (spacing * a);
        ctx2.moveTo(x, 0);
        ctx2.lineTo(x, canvasHeight);
        if (a > 0) {
            x = rightSide + (cellWidth * a) + (spacing * (a - 1));
            ctx2.moveTo(x, 0);
            ctx2.lineTo(x, canvasHeight);
        }
        ctx2.stroke();*/
    }
}

function insertShowMoreButton(parent) {
    var input = document.createElement('input');
    $(input).attr("type", "button");
    $(input).attr("value", "Show/Hide weight Table");
    $(input).addClass("button");
    $(input).click(function() { $(parent).children().eq($(parent).children().length - 1).toggle("fast") });
    $(parent).append(input);
}

function drawProcess(ctx, str, weight, x, y, cellWidth, lineHeight) {
    var fontSize = 16;
    var descriptionFontSize = 12;
    var sum = 0;
    ctx.fillStyle = "#000";
    ctx.font = fontSize + "px sans-serif";
    var txtSize = ctx.measureText(str);
    drawWrapText(ctx, str, x, x + cellWidth, y + lineHeight, "center");

    for (var c = 0, d = 0; c < 4; c++, d += 2) {
        ctx.font = fontSize + "px sans-serif";
        var _str = str.substr(d, 2);
        var _x = x + (cellWidth / 4) * c;
        drawWrapText(ctx, str.substr(d, 2), _x, _x + cellWidth / 4, y + lineHeight * 3, "center");
        _str = parseInt(_str, 16);
        drawWrapText(ctx, _str.toString(), _x, _x + cellWidth / 4, y + lineHeight * 5, "center");
        ctx.font = descriptionFontSize + "px sans-serif";
        var num = _str / Math.pow(256, c + 1);
        sum += num;
        drawWrapText(ctx, (c > 0 ? "+" : "") + _str + "/256^" + (c + 1) + "=" + parseFloat((num).toPrecision(10)).toFixed(10),
            x, x + cellWidth, y + lineHeight * (6.5 + c), "right");
        ctx.strokeStyle = "#cccccc";
        ctx.lineCap = 'round';
        ctx.lineWidth = 1;
        var offset = 6;
        ctx.beginPath();
        _x = x + (cellWidth - txtSize.width) / 2 + txtSize.width / 3 * c;
        ctx.moveTo(_x, y + lineHeight + offset);
        _x = x + (cellWidth / 4 * (c + 0.5));
        ctx.lineTo(_x, y + lineHeight * 2 + offset);
        ctx.moveTo(_x, y + lineHeight * 3 + offset);
        ctx.lineTo(_x, y + lineHeight * 4 + offset);
        ctx.stroke();
    }
    ctx.font = fontSize + "px sans-serif";
    drawWrapText(ctx, "=" + parseFloat((sum).toPrecision(10)).toFixed(10), x, x + cellWidth, y + lineHeight * 10.5, "right");
    var multiplier = weight[weight.length - 1][0];
    drawWrapText(ctx, "*" + multiplier, x, x + cellWidth, y + lineHeight * 11.5, "right");
    var result = sum * multiplier;
    drawWrapText(ctx, "=" + parseFloat(result.toPrecision(10)).toFixed(10), x, x + cellWidth, y + lineHeight * 12.5, "right");
    return result;
}

function drawWrapText(ctx, str, left, right, top, align = "left") {
    var lines = getLines(ctx, str, right - left);
    var height = parseInt(ctx.font.match(/\d+/), 10);
    for (var a = 0; a < lines.length; a++) {
        var txtSize = ctx.measureText(lines[a]);
        var x = left;
        if (align == "right") {
            x = right - txtSize.width;
        } else if (align == "center") {
            x = left + (right - left - txtSize.width) / 2;
        }
        ctx.fillText(lines[a], x, top + height * a);
    }
}

function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];
    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

function createCanvas(parent, width, height, color, visiable) {
    var canvas = document.createElement('canvas');
    if (!visiable) {
        $(canvas).hide();
    }
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    ctx.translate(0.5, 0.5);
    $(parent).append(canvas);
    return ctx;
}

function encrypt(serverSeed, clientSeed, nonce, round){
	return CryptoJS.HmacSHA256(clientSeed+":"+nonce+":"+round, serverSeed).toString();
}