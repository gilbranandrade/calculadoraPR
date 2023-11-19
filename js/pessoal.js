function handleFormSubmission(event) {
    event.preventDefault(); 
    if (this.checkValidity() === false) {
        event.stopPropagation(); 
    }
    this.classList.add("was-validated"); 
}

function calculaLPO() {
    var calcLPO = document.getElementById("calcLPO");
    calcLPO.addEventListener("submit", handleFormSubmission, false)

    if (lpo = parseFloat(document.getElementById('lpo').value)){
        var tabela = document.getElementById('tabelaLPO').getElementsByTagName('tbody')[0];

        var mostrarTabela = document.querySelectorAll('[id^="tabelaLPO"]');
        mostrarTabela.forEach(function(element) {
            element.removeAttribute("style");
        });

        while (tabela.rows.length > 0) {
            tabela.deleteRow(0);
        }

        var titulos = ["120%", "115%", "110%", "105%", "100%", "95%", "90%", "85%", "80%", "75%", "70%", "65%", "60%", "55%", "50%", "45%", "40%"];

        /* LPO */

        var porcentagem = 1.2;

        for (var i = 0; i < titulos.length; i++) {
            // insere linha
            var linha = tabela.insertRow(-1);

            // insere coluna
            var col1 = linha.insertCell(0);
            var col2 = linha.insertCell(1);
            var col3 = linha.insertCell(2);

            col1.innerHTML = titulos[i];

            if (document.getElementById('mult5').checked){
                var restoKg = (lpo * porcentagem) % 5;
                var arredondaKg = 0;
                var arredondaLb = 0;
                if (restoKg < 2.49) {
                    arredondaKg = (lpo * porcentagem) - restoKg;
                } else {
                    arredondaKg = (lpo * porcentagem) + (5 - restoKg);
                }
                var restoLb = (lpo * porcentagem * 2.20462262185) % 5;
                var arredondaLb = 0;
                if (restoLb < 2.49) {
                    arredondaLb = (lpo * porcentagem * 2.20462262185) - restoLb;
                } else {
                    arredondaLb = (lpo * porcentagem * 2.20462262185) + (5 - restoLb);
                }

                col2.innerHTML = arredondaKg.toFixed(0) + " kg";
                col3.innerHTML = arredondaLb.toFixed(0) + " lb";
            } else {
                col2.innerHTML = (lpo * porcentagem).toFixed(0) + " kg"; // .toFixed controla as casas decimais
                col3.innerHTML = (lpo * porcentagem * 2.20462262185).toFixed(0) + " lb";
            }

            porcentagem -= 0.05;
        }
    }
}

function calculaCorrida() {
    var calcLPO = document.getElementById("calcCorrida");
    calcLPO.addEventListener("submit", handleFormSubmission, false)

    if (corr = (document.getElementById('corrida').value)){
        if (corr.indexOf(":") != -1){
        
            var corrida = corr.split(":");

            var tabela = document.getElementById('tabelaCorrida').getElementsByTagName('tbody')[0];

            var mostrarTabela = document.querySelectorAll('[id^="tabelaCorrida"]');
            mostrarTabela.forEach(function(element) {
                element.removeAttribute("style");
            });

            while (tabela.rows.length > 0) {
                tabela.deleteRow(0);
            }

            var titulos = ["120%", "115%", "110%", "105%", "100%", "95%", "90%", "85%", "80%", "75%", "70%", "65%", "60%", "55%", "50%", "45%", "40%"];

            /* Corrida */
            var porcentagem = 0.8;


            var min = parseInt(corrida[0]);
            var seg = parseInt(corrida[1]);
            tempoTotal = (min * 60) + seg;

            for (var i = 0; i < titulos.length; i++) {
                // insere linha
                var linha = tabela.insertRow(-1);

                // insere coluna
                var col1 = linha.insertCell(0);
                var col2 = linha.insertCell(1);
                var col3 = linha.insertCell(2);

                col1.innerHTML = titulos[i];

                novoTempo = tempoTotal * porcentagem;
                min = Math.floor(novoTempo / 60);
                seg = novoTempo - (min * 60);
                

                col2.innerHTML = min.toFixed(0) + ":" + seg.toFixed(0).padStart(2, '0') + " min/km";

                col3.innerHTML = (60 / (novoTempo/60)).toFixed(1) + " km/h";

                porcentagem += 0.05;
            }
        }
    }
}

function changeActive(clickedElement, elementToShow) {
    var paginationItems = document.querySelectorAll('#paginacao .page-item');

    paginationItems.forEach(function(item) {
        item.classList.remove('active');
    });

    var parentLi = clickedElement.parentElement;
    parentLi.classList.add('active');

    if (elementToShow == 'formCorrida'){
        var elementsToHide = document.querySelectorAll('[id^="formLPO"]');
        var elementToDisplay = document.getElementById(elementToShow);
        elementsToHide.forEach(function(element) {
            element.style.display = 'none';
        });

        
        if (elementToDisplay) {
            elementToDisplay.style.display = 'block';
        }
    } else {
        var elementsToHide = document.querySelectorAll('[id^="formCorrida"]');
        var elementToDisplay = document.getElementById(elementToShow);
        elementsToHide.forEach(function(element) {
            element.style.display = 'none';
        });

        
        if (elementToDisplay) {
            elementToDisplay.style.display = 'block';
        }
    }
}