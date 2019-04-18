function show(idElement){
    document.getElementById(idElement).style.display = "block";
}
function hide(idElement){
    document.getElementById(idElement).style.display = "none";
}
function general(i){
    var x = document.getElementById("general"+i).value;
    switch(x){
        case 'A':
            show("aggettivo"+i);
            hide("avverbio"+i);
            hide("congiunzione"+i);
            hide("preposizione"+i);
            hide("punteggiatura"+i);
            hide("pronome"+i);
            hide("articolo"+i);
            hide("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'B':
            hide("aggettivo"+i);
            show("avverbio"+i);
            hide("congiunzione"+i);
            hide("preposizione"+i);
            hide("punteggiatura"+i);
            hide("pronome"+i);
            hide("articolo"+i);
            hide("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'C':
            hide("aggettivo"+i);
            hide("avverbio"+i);
            show("congiunzione"+i);
            hide("preposizione"+i);
            hide("punteggiatura"+i);
            hide("pronome"+i);
            hide("articolo"+i);
            hide("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'E':
            hide("aggettivo"+i);
            hide("avverbio"+i);
            hide("congiunzione"+i);
            show("preposizione"+i);
            hide("punteggiatura"+i);
            hide("pronome"+i);
            hide("articolo"+i);
            hide("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'F':
            hide("aggettivo"+i);
            hide("avverbio"+i);
            hide("congiunzione"+i);
            hide("preposizione"+i);
            show("punteggiatura"+i);
            hide("pronome"+i);
            hide("articolo"+i);
            hide("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'P':
            hide("aggettivo"+i);
            hide("avverbio"+i);
            hide("congiunzione"+i);
            hide("preposizione"+i);
            hide("punteggiatura"+i);
            show("pronome"+i);
            hide("articolo"+i);
            hide("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'R':
            hide("aggettivo"+i);
            hide("avverbio"+i);
            hide("congiunzione"+i);
            hide("preposizione"+i);
            hide("punteggiatura"+i);
            hide("pronome"+i);
            show("articolo"+i);
            hide("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            show("genere"+i);
            show("numero"+i);
            break;
        case 'S':
            hide("aggettivo"+i);
            hide("avverbio"+i);
            hide("congiunzione"+i);
            hide("preposizione"+i);
            hide("punteggiatura"+i);
            hide("pronome"+i);
            hide("articolo"+i);
            show("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'V':
            hide("aggettivo"+i);
            hide("avverbio"+i);
            hide("congiunzione"+i);
            hide("preposizione"+i);
            hide("punteggiatura"+i);
            hide("pronome"+i);
            hide("articolo"+i);
            hide("nome"+i);
            show("verbo"+i);
            show("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'X':
            hide("aggettivo"+i);
            hide("avverbio"+i);
            hide("congiunzione"+i);
            hide("preposizione"+i);
            hide("punteggiatura"+i);
            hide("pronome"+i);
            hide("articolo"+i);
            hide("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        default:
            hide("aggettivo"+i);
            hide("avverbio"+i);
            hide("congiunzione"+i);
            hide("preposizione"+i);
            hide("punteggiatura"+i);
            hide("pronome"+i);
            hide("articolo"+i);
            hide("nome"+i);
            hide("verbo"+i);
            hide("tempo"+i);
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
    }
}
function aggettivo(i){
    var x = document.getElementById("aggettivo"+i).value;
    switch(x){
        case 'N':
            hide("genere"+i);
            hide("numero"+i);
            break;
        default:
            show("genere"+i);
            show("numero"+i);
            break;
    }
}
function preposizione(){
    var x = document.getElementById("preposizione"+i).value;
    switch(x){
        case 'E':
            hide("genere"+i);
            hide("numero"+i);
            break;
        default:
            show("genere"+i);
            show("numero"+i);
            break;
    }
}
function pronome(i){
    var x = document.getElementById("pronome"+i).value;
    switch(x){
        case 'PE':
            show("persona"+i);
            show("genere"+i);
            show("numero"+i);
            break;
        case 'PC':
            show("persona"+i);
            show("genere"+i);
            show("numero"+i);
            break;
        default:
            hide("persona"+i);
            show("genere"+i);
            show("numero"+i);
            break;
    }
}
function nome(i){
    var x = document.getElementById("nome"+i).value;
    switch(x){
        case 'S':
            show("genere"+i);
            show("numero"+i);
            break;
        default:
            hide("genere"+i);
            hide("numero"+i);
            break;
    }
}
function verbo(i){
    var x = document.getElementById("verbo"+i).value;
    switch(x){
        case 'VA':
            hide("pp");
            document.getElementById("tempo"+i).selectedIndex=0;
            break;
        case 'VM':
            hide("pp");
            document.getElementById("tempo"+i).selectedIndex=0;
            break;
        default:
            show("pp");
            break;
    }
}
function tempo(i){
    var x = document.getElementById("tempo"+i).value;
    switch(x){
        case 'f':
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'g':
            hide("persona"+i);
            hide("genere"+i);
            hide("numero"+i);
            break;
        case 'pp':
            hide("persona"+i);
            hide("genere"+i);
            show("numero"+i);
            break;
        case 'ps':
            hide("persona"+i);
            show("genere"+i);
            show("numero"+i);
            break;
        default:
            show("persona"+i);
            hide("genere"+i);//modificato
            show("numero"+i);
            break;
    }
}

