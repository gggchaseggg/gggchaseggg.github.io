flag = 1
function listan1(id) {
    if (flag == 1) {
        document.getElementById(id).src="../img/doma/dvaitaja_slogo.png";
        flag = 2;
    }
    else if (flag == 2) {
        document.getElementById(id).src="../img/doma/stremkrisha-slogo.png";
        flag = 3;
    }
    else if (flag == 3) {
        document.getElementById(id).src="../img/doma/prostoy_slogo.png";
        flag = 1;
    }
}

function listan2(id) {
    if (flag == 1) {
        document.getElementById(id).src="../img/doma/stremkrisha-slogo.png";
        flag = 3;
    }
    else if (flag == 2) {
        document.getElementById(id).src="../img/doma/prostoy_slogo.png";
        flag = 1;
    }
    else if (flag == 3) {
        document.getElementById(id).src="../img/doma/dvaitaja_slogo.png";
        flag = 2;
    }
}