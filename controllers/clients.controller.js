const Client = require("../models/tableClients");

const clientesAnteriores =[
    {
     "nombre": "Gabriel Alberto Granito",
     "fechaCompra": "27-Sep",
     "producto": "1 full redonda Eva ",
     "precio": 39900,
     "costo": 20000,
     "envio": 4000,
     "valorCarbono": 15900
    },
    {
     "nombre": "Santiago Bausero",
     "fechaCompra": "27-Sep",
     "producto": "1 atos Eva + protector colocado  ",
     "precio": 47501,
     "costo": 35550,
     "envio": 3500,
     "valorCarbono": 8451
    },
    {
     "nombre": "Pamela giamportone",
     "fechaCompra": "28-Sep",
     "producto": "2 fibra diamante",
     "precio": 30273,
     "costo": 24000,
     "envio": 3000,
     "valorCarbono": 3273
    },
    {
     "nombre": "Estaban Augusto Petit de Meurville",
     "fechaCompra": "28-Sep",
     "producto": "1 onuris ",
     "precio": 33249,
     "costo": 20000,
     "envio": 3200,
     "valorCarbono": 10049
    },
    {
     "nombre": "Mauro Alejandro de Inocenti",
     "fechaCompra": "28-Sep",
     "producto": "1 12K foam redonda + protector",
     "precio": 60341,
     "costo": 25550,
     "envio": 5000,
     "valorCarbono": 29791
    },
    {
     "nombre": "maria belen duarte",
     "fechaCompra": "26-Sep",
     "producto": "1 full (corazon de la aots)",
     "precio": 41000,
     "costo": 20000,
     "envio": 4000,
     "valorCarbono": 17000
    },
    {
     "nombre": "David arroyo",
     "fechaCompra": "28-Sep",
     "producto": "1 full gota o diamante eva con rugosidad",
     "precio": 38025,
     "costo": 20000,
     "envio": 2000,
     "valorCarbono": 16025
    },
    {
     "nombre": "Mercado libre ",
     "fechaCompra": "28-Sep",
     "producto": "1 full redonda con rugosidad",
     "precio": 39206,
     "costo": 20000,
     "valorCarbono": 15364
    },
    {
     "nombre": "Mercado libre ",
     "fechaCompra": "28-Sep",
     "producto": "1 full gota eva",
     "precio": 38156,
     "costo": 20000,
     "valorCarbono": 14524
    },
    {
     "nombre": "Jonatan del negro",
     "fechaCompra": "29-Sep",
     "producto": "1 full redonda foam + protector",
     "precio": 41135,
     "costo": 20550,
     "envio": 3500,
     "valorCarbono": 17085
    },
    {
     "nombre": "Luciano gastrinci",
     "fechaCompra": "29-Sep",
     "producto": "2 fibra diamante",
     "precio": 32300,
     "costo": 24000,
     "envio": 3000,
     "valorCarbono": 5300
    },
    {
     "nombre": "Mercado libre ",
     "fechaCompra": "29-Sep",
     "producto": "1 full diamante",
     "precio": 38044,
     "costo": 20000,
     "valorCarbono": 14435
    },
    {
     "nombre": "INGRESOS SEPARADOS 29\/09",
     "precio": 1462571,
     "costo": 859500,
     "envio": 71300,
     "valorCarbono": 516847
    },
    {
     "nombre": "Ivan gustavo mercado",
     "fechaCompra": "29-Sep",
     "producto": "2 fibra (mixto)",
     "precio": 30658,
     "costo": 24000,
     "envio": 2200,
     "valorCarbono": 4458
    },
    {
     "nombre": "Tobias Tomas",
     "fechaCompra": "30-Sep",
     "producto": "1 full redonda eva",
     "precio": 35526,
     "costo": 20000,
     "envio": 3500,
     "valorCarbono": 12026
    },
    {
     "nombre": "Fede tundidor",
     "fechaCompra": "30-Sep",
     "producto": "1 atos eva",
     "precio": 47079,
     "costo": 35000,
     "envio": 2000,
     "valorCarbono": 10079
    },
    {
     "nombre": "Gonzalo galluci ",
     "fechaCompra": "Sep-30",
     "producto": "4 fibra de vidrio ",
     "precio": 64600,
     "costo": 48000,
     "envio": 4000,
     "valorCarbono": 12600
    },
    {
     "nombre": "Jimena Munagorri",
     "fechaCompra": "01-Oct",
     "producto": "2 fibra gotas",
     "precio": 29244,
     "costo": 24000,
     "envio": 3000,
     "valorCarbono": 2244
    },
    {
     "nombre": "Gustavo Mora ",
     "fechaCompra": "01-Oct",
     "producto": "1 atos Eva + 1 resina + 2 protectores",
     "precio": 53343,
     "costo": 37850,
     "envio": 3500,
     "valorCarbono": 11993
    },
    {
     "nombre": "FEDE dagosto ",
     "fechaCompra": "01-Oct",
     "producto": "1 atos Foam ",
     "precio": 46299,
     "costo": 35000,
     "envio": 3500,
     "valorCarbono": 7799
    },
    {
     "nombre": "Nahuel Maldonado ",
     "fechaCompra": "02-Oct",
     "producto": "2 full carbono (1 redonda, 1 diamante) + 3 protectores ",
     "precio": 75992,
     "costo": 41650,
     "envio": 2000,
     "valorCarbono": 32342
    },
    {
     "nombre": "Emiliano villasuso",
     "fechaCompra": "02-Oct",
     "producto": "1 full redonda Foam ",
     "precio": 38025,
     "costo": 20000,
     "envio": 2000,
     "valorCarbono": 16025
    },
    {
     "nombre": "Marcelo daniel Cabrera ",
     "fechaCompra": "02-Oct",
     "producto": "1 atos Foam + resina ",
     "precio": 46098,
     "costo": 35750,
     "envio": 3500,
     "valorCarbono": 6848
    },
    {
     "nombre": "Sebastian migliorini ",
     "fechaCompra": "02-Oct",
     "producto": "1 full c\/r + protector",
     "precio": 48750,
     "costo": 20550,
     "envio": 2000,
     "valorCarbono": 26200
    },
    {
     "nombre": "Fernando Martin gomez",
     "fechaCompra": "02-Oct",
     "producto": "1 12K formato lipsis",
     "precio": 63650,
     "costo": 30000,
     "envio": 3500,
     "valorCarbono": 30150
    },
    {
     "nombre": "Mercado libre",
     "fechaCompra": "02-Oct",
     "producto": "1 full eva diamante",
     "precio": 36389,
     "costo": 20000,
     "valorCarbono": 13111
    },
    {
     "nombre": "Mercado libre ",
     "fechaCompra": "02-Oct",
     "producto": "1 full foam gota",
     "precio": 38044,
     "costo": 20000,
     "valorCarbono": 8000
    },

    {
     "nombre": "Cristobal Antonucci",
     "fechaCompra": "02-Oct",
     "producto": "1 full diamante foam + protector + resina",
     "precio": 43035,
     "costo": 21300,
     "envio": 5000,
     "valorCarbono": 16735
    },
    {
     "nombre": "Marcelo perez",
     "fechaCompra": "03-Oct",
     "producto": "1 full diamante foam + protector",
     "precio": 39203,
     "costo": 20550,
     "envio": 4300
    },
    {
     "nombre": "German Leoni",
     "fechaCompra": "03-Oct",
     "producto": "1 ATOS FOAM",
     "precio": 49400,
     "costo": 35000,
     "envio": 6000,
     "valorCarbono": 8400
    },

    {
     "nombre": "Alejandro holzmann",
     "fechaCompra": "03-Oct",
     "producto": "1 full gota Foam ",
     "precio": 39900,
     "costo": 20000,
     "envio": 5000,
     "valorCarbono": 14900
    },
    {
     "nombre": "Hector menchacabaso",
     "fechaCompra": "03-Oct",
     "producto": "1 full diamante Eva + resina",
     "precio": 39836,
     "costo": 20750,
     "envio": 3000,
     "valorCarbono": 16086
    },
    {
     "nombre": "Cesar Tello",
     "fechaCompra": "04-Oct",
     "producto": "1 atos foam",
     "precio": 45000,
     "costo": 35000,
     "envio": 5000,
     "valorCarbono": 5000
    },
    {
     "nombre": "Perello celestino",
     "fechaCompra": "04-Oct",
     "producto": "1 atos eva c\/r",
     "precio": 54150,
     "costo": 35000,
     "envio": 6500,
     "valorCarbono": 12650
    },
    {
     "nombre": "maximiliano varela",
     "fechaCompra": "04-Oct",
     "producto": "3 fibra de vidrio (1 gota eva, 2 diamante foam) + motoenvio",
     "precio": 63666,
     "costo": 36000,
     "envio": 3500,
     "valorCarbono": 24166
    },

    {
     "nombre": "Venta Fer heladeria",
     "fechaCompra": "04-Oct",
     "producto": "1 12K formato lipsis",
     "precio": 60000,
     "costo": 30000,
     "valorCarbono": 30000
    },
    {
     "nombre": "Sofia Capurro",
     "fechaCompra": "04-Oct",
     "producto": "1 full redonda foam",
     "precio": 38025,
     "costo": 20000,
     "valorCarbono": 18025
    },
    {
     "nombre": "pablo venvenuto",
     "fechaCompra": "04-Oct",
     "producto": "1 full redonda eva + protector + resina",
     "precio": 41014,
     "costo": 21300,
     "envio": 4000,
     "valorCarbono": 15714
    },
    {
     "nombre": "Norberto corbo",
     "fechaCompra": "04-Oct",
     "producto": "2 fibra gotas",
     "precio": 38949,
     "costo": 24000,
     "envio": 3500,
     "valorCarbono": 11449
    },
    {
     "nombre": "Emanuel flores",
     "fechaCompra": "04-Oct",
     "producto": "1 full redonda foam + protector + resina",
     "precio": 40335,
     "costo": 21300,
     "envio": 4500,
     "valorCarbono": 14535
    },
    {
     "nombre": "Alejandro Kralj",
     "fechaCompra": "04-Oct",
     "producto": "1 full foam (formato lypsis)",
     "precio": 37395,
     "costo": 30000,
     "envio": 3500,
     "valorCarbono": 3895
    },
    {
     "nombre": "Ornella simonassi",
     "fechaCompra": "04-Oct",
     "producto": "1 full redonda foam + protector",
     "precio": 38025,
     "costo": 20550,
     "envio": 4500,
     "valorCarbono": 2123
    },
    {
     "nombre": "Agustin lazzari",
     "fechaCompra": "04-Oct",
     "producto": "1 atos foam",
     "precio": 46800,
     "costo": 35000,
     "valorCarbono": 0
    },
    {
     "nombre": "Amaro morino ",
     "fechaCompra": "04-Oct",
     "producto": "1 full redonda Eva ",
     "precio": 39900,
     "costo": 20000,
     "envio": 5000,
     "valorCarbono": 14900
    },
    {
     "nombre": "Pícallo vanesa ",
     "fechaCompra": "04-Oct",
     "producto": "2 12K (con un solo agujero) con rugosidad",
     "precio": 123950,
     "costo": 60000,
     "envio": 5000,
     "valorCarbono": 58950
    },
    {
     "nombre": "Diego marinao ",
     "fechaCompra": "04-Oct",
     "producto": "1 atos Eva ",
     "precio": 49399,
     "costo": 35000,
     "envio": 4500,
     "valorCarbono": 9899
    },
    {
     "nombre": "D'Elía Gimenez ",
     "fechaCompra": "05-Oct",
     "producto": "1 full diamante Foam ",
     "precio": 38025,
     "costo": 20000,
     "envio": 2000,
     "valorCarbono": 16025
    },
    {
     "nombre": "Guillermo Garcia ",
     "fechaCompra": "22-Sep",
     "producto": "1 full diamante Foam ",
     "precio": 37395,
     "costo": 20000,
     "envio": 5000,
     "valorCarbono": 12395
    },
    {
     "nombre": "Martin Ariel Oddone Espindola",
     "fechaCompra": "05-Oct",
     "producto": "1 12K diamante foam + protector",
     "precio": 60815,
     "costo": 30550,
     "envio": 6000,
     "valorCarbono": 24265
    },
    {
     "nombre": "Matias Gabutti",
     "fechaCompra": "05-Oct",
     "producto": "1 full diamante eva",
     "precio": 39900,
     "costo": 20000,
     "envio": 5000
    },
    {
     "nombre": "Martinez Andres Marcelo",
     "fechaCompra": "05-Oct",
     "producto": "1 full gota c\/r",
     "precio": 44650,
     "costo": 30000,
     "envio": 4500,
     "valorCarbono": 10150
    },
    {
     "nombre": "Santiago Cavallo",
     "fechaCompra": "05-Oct",
     "producto": "1 12K gota , eva 360\/365 peso",
     "precio": 63649,
     "costo": 30000,
     "envio": 2500,
     "valorCarbono": 31149
    },
    {
     "nombre": "Maria Isabel Saavedra",
     "fechaCompra": "05-Oct",
     "producto": "1 12K eva, formato lipsis",
     "precio": 56950,
     "costo": 30000,
     "envio": 3500,
     "valorCarbono": 23450
    },
    {
     "nombre": "Pablo Olguin",
     "fechaCompra": "05-Oct",
     "producto": "1 fibra redonda foam + protector",
     "precio": 23500,
     "costo": 13000,
     "envio": 4000,
     "valorCarbono": 6500
    },
    {
     "nombre": "Osvaldo Ferrari",
     "fechaCompra": "05-Oct",
     "producto": "1 atos eva + protector + resina",
     "precio": 50068,
     "costo": 37000,
     "envio": 2000,
     "valorCarbono": 11068
    },
    {
     "nombre": "Ignacio robustelli",
     "fechaCompra": "05-Oct",
     "producto": "1 fibra gota + protector",
     "precio": 23512,
     "costo": 15000,
     "envio": 2000,
     "valorCarbono": 6512
    },
    {
     "nombre": "Lautaro nordera jodar",
     "fechaCompra": "05-Oct",
     "producto": "1 full redonda foam, 2 fibra de vidrio (gota y diamante) + protector",
     "precio": 76079,
     "costo": 45000,
     "envio": 4500,
     "valorCarbono": 26579
    },
    {
     "nombre": "Pio ezequiel Adanto",
     "fechaCompra": "06-Oct",
     "producto": "1 12K C\/R, diamante, eva",
     "precio": 62833,
     "costo": 30000,
     "envio": 5000,
     "valorCarbono": 27833
    },
    {
     "nombre": "Julio Dello Russo",
     "fechaCompra": "06-Oct",
     "producto": "1 full gota eva",
     "precio": 50000,
     "costo": 20000,
     "envio": 6000,
     "valorCarbono": 24000
    },
    {
     "nombre": "Tomas Da eocha",
     "fechaCompra": "06-Oct",
     "producto": "1 full diamante eva + protector",
     "precio": 46835,
     "costo": 20550,
     "envio": 4000,
     "valorCarbono": 22285
    },
    {
     "nombre": "Nano",
     "fechaCompra": "06-Oct",
     "producto": "1 12K",
     "precio": 63650,
     "costo": 30000,
     "envio": 6000,
     "valorCarbono": 27650
    },
    {
     "nombre": "INGRESOS SEPARADOS 06\/10",
     "precio": 2319540,
     "costo": 1333650,
     "envio": 169500,
     "valorCarbono": 751163
    },
    {
     "nombre": "Mercado Libre",
     "fechaCompra": "06-Oct",
     "producto": "1 full diamante ",
     "precio": 36389,
     "costo": 30000,
     "valorCarbono": 13111
    },
    {
     "nombre": "Marce",
     "fechaCompra": "06-Oct",
     "producto": "1 atos eva",
     "precio": 49000,
     "costo": 42000,
     "envio": 4000,
     "valorCarbono": 3000
    },
    {
     "nombre": "Diego Arcurio",
     "fechaCompra": "09-Oct",
     "producto": "1 12K eva + resina",
     "precio": 62471,
     "costo": 40750,
     "envio": 4000,
     "valorCarbono": 17721
    },
    {
     "nombre": "Daniel Santillan",
     "fechaCompra": "06-Oct",
     "producto": "1 atos foam",
     "precio": 49400,
     "costo": 42000,
     "envio": 5500,
     "valorCarbono": 1900
    },
    {
     "nombre": "Benitez barrios francisco daniel",
     "fechaCompra": "06-Oct",
     "producto": "1 atos eva ",
     "precio": 55100,
     "costo": 42000,
     "envio": 5000,
     "valorCarbono": 8100
    },
    {
     "nombre": "Eduardo Campagnola",
     "fechaCompra": "09-Oct",
     "producto": "1 full redonda foam",
     "precio": 47079,
     "costo": 30000,
     "envio": 5000,
     "valorCarbono": 12079
    },
    {
     "nombre": "Federico rocher",
     "fechaCompra": "09-Oct",
     "producto": "1 atos woman",
     "precio": 36650,
     "costo": 33000,
     "valorCarbono": 3650
    },
    {
     "nombre": "1 ATOS EVA EFECT",
     "fechaCompra": "09-Oct",
     "producto": "1 atos eva",
     "precio": 55100,
     "costo": 42000,
     "envio": 3500,
     "valorCarbono": 9600
    },
    {
     "nombre": "Jorge Leandro Sosa",
     "fechaCompra": "09-Oct",
     "producto": "1 12K lypsis",
     "precio": 69000,
     "costo": 40000,
     "envio": 4000,
     "valorCarbono": 25000
    },
    {
     "nombre": "Delfino danilo",
     "fechaCompra": "09-Oct",
     "producto": "1 fibra con rugosidad",
     "precio": 25649,
     "costo": 18000,
     "envio": 3000,
     "valorCarbono": 4649
    },
    {
     "nombre": "Alexis german palomeque",
     "fechaCompra": "10-Oct",
     "producto": "1 fibra redonda foam",
     "precio": 27230,
     "costo": 25000,
     "envio": 2000,
     "valorCarbono": 230
    },
    {
     "nombre": "Alejandro mitrovich",
     "fechaCompra": "10-Oct",
     "producto": "1 full diamante (formato atos)",
     "precio": 41889,
     "costo": 30000,
     "envio": 5000,
     "valorCarbono": 6889
    },
    {
     "nombre": "3k Efectivo",
     "fechaCompra": "11-Oct",
     "producto": "1 full gota",
     "precio": 39800,
     "costo": 30000,
     "envio": 1869,
     "valorCarbono": 7931
    },
    {
     "nombre": "Sebastian Alejandro fecha",
     "fechaCompra": "11-Oct",
     "producto": "1 full diamante eva",
     "precio": 49400,
     "costo": 30000,
     "envio": 4500,
     "valorCarbono": 14900
    },
    {
     "nombre": "Nacho montoya",
     "fechaCompra": "11-Oct",
     "producto": "5 atos foam, 1 full gota",
     "precio": 286000,
     "costo": 240000,
     "envio": 7000,
     "valorCarbono": 39000
    },
    {
     "nombre": "Alejandro Nicolas Garcia",
     "fechaCompra": "11-Oct",
     "producto": "10 fibra de vidrio mixtas",
     "precio": 229491,
     "costo": 180000,
     "envio": 7000,
     "valorCarbono": 42491
    },
    {
     "nombre": "Nicolas Zamorano",
     "fechaCompra": "11-Oct",
     "producto": "1 12K, gota c\/r, eva + 1 full redonda",
     "precio": 77900,
     "costo": 40000,
     "envio": 3000,
     "valorCarbono": 34900
    },
    {
     "nombre": "Fabricio Milanesio",
     "fechaCompra": "12-Oct",
     "producto": "1 12k redonda foam",
     "precio": 69739,
     "costo": 40000,
     "envio": 4000,
     "valorCarbono": 25739
    },
    {
     "nombre": "Gabriel Ceresole",
     "fechaCompra": "12-Oct",
     "producto": "1 atos foam",
     "precio": 59000,
     "costo": 42000,
     "envio": 5000,
     "valorCarbono": 12000
    },
    {
     "nombre": "Ivan Pavka",
     "fechaCompra": "12-Oct",
     "producto": "1 fibra diamante",
     "precio": 30000,
     "costo": 25000,
     "envio": 1500,
     "valorCarbono": 3500
    },
    {
     "nombre": "Pablo cabral",
     "fechaCompra": "13-Oct",
     "producto": "1 full redonda foam + protector",
     "precio": 51062,
     "costo": 30550,
     "envio": 1100,
     "valorCarbono": 19412
    },
    {
     "nombre": "Hernan Cao",
     "fechaCompra": "13-Oct",
     "producto": "1 full diamante + protector",
     "precio": 46231,
     "costo": 30550,
     "envio": 1600,
     "valorCarbono": 14081
    },
    {
     "nombre": "Guerreo martin francisco",
     "fechaCompra": "15-Oct",
     "producto": "1 full redonda foam\/ liviana",
     "precio": 53000,
     "costo": 30000,
     "envio": 5000,
     "valorCarbono": 18000
    },
    {
     "nombre": "Nicolas Zamorano",
     "fechaCompra": "15-Oct",
     "producto": "1 full redonda s\/r",
     "precio": 47000,
     "costo": 30000,
     "valorCarbono": 17000
    },
    {
     "nombre": "Pablo cecilio",
     "fechaCompra": "15-Oct",
     "producto": "1 full lypsis",
     "precio": 47980,
     "costo": 30000,
     "envio": 2000,
     "valorCarbono": 15980
    },
    {
     "nombre": "Maximo De Michieli",
     "fechaCompra": "16-Oct",
     "producto": "1 12K diamante eva c\/r + protector",
     "precio": 77900,
     "costo": 40000,
     "valorCarbono": 37900
    },
    {
     "nombre": "Ariel Pierini",
     "fechaCompra": "16-Oct",
     "producto": "1 12K formato lypsis c\/r",
     "precio": 82000,
     "costo": 40000,
     "envio": 5000,
     "valorCarbono": 37000
    },
    {
     "nombre": "Juan Lorenzo Espinoza",
     "fechaCompra": "16-Oct",
     "producto": "1 12K redonda foam",
     "precio": 69892,
     "costo": 40000,
     "envio": 5000,
     "valorCarbono": 24892
    },
    {
     "nombre": "PRIORIDAD, Calfinier",
     "fechaCompra": "16-Oct",
     "producto": "Cinco 3k,Tres Atos Dama, Dos 12 k importada,Cinco Resinas, Diez protectores ",
     "precio": 453000,
     "costo": 338250,
     "envio": 6000,
     "valorCarbono": 108750
    },

    {
     "nombre": "Mariano Emanuel",
     "fechaCompra": "17-Oct",
     "producto": "1 atos eva",
     "precio": 58899,
     "costo": 42000,
     "envio": 6000,
     "valorCarbono": 10899
    },
    {
     "nombre": "Lucas Gaston",
     "fechaCompra": "17-Oct",
     "producto": "5 fibra de vidrio (1 modelo contra pared) (2 focus)",
     "precio": 138056,
     "costo": 125000,
     "envio": 2000,
     "valorCarbono": 11056
    },
    {
     "nombre": "Ariel Graziani",
     "fechaCompra": "17-Oct",
     "producto": "1 full diamante foam",
     "precio": 44739,
     "costo": 30000,
     "envio": 2000,
     "valorCarbono": 12739
    },
    {
     "nombre": "Jazmin Giselle Gerez",
     "fechaCompra": "17-Oct",
     "producto": "1 12K eva",
     "precio": 69714,
     "costo": 40000,
     "valorCarbono": 29714
    },
    {
     "nombre": "Jose Brolese",
     "fechaCompra": "17-Oct",
     "producto": "1 atos foam",
     "precio": 56133,
     "costo": 42000,
     "envio": 4500,
     "valorCarbono": 9633
    },
    {
     "nombre": "INGRESOS SEPARADOS 17\/10",
     "precio": 2661893,
     "costo": 1710100,
     "envio": 115069,
     "valorCarbono": 633446
    },
    {
     "nombre": "Lenadro Etchezar",
     "fechaCompra": "17-Oct",
     "producto": "1 full gota foam",
     "precio": 49400,
     "costo": 30000,
     "envio": 5000,
     "valorCarbono": 6900
    },
    {
     "nombre": "Pedro antivero",
     "fechaCompra": "17-Oct",
     "producto": "1 full gota foam + protector",
     "precio": 49400,
     "costo": 30000,
     "envio": 5000,
     "valorCarbono": 6900
    },
    {
     "nombre": "Wilma Ocampo",
     "fechaCompra": "19-Oct",
     "producto": "1 atos foam",
     "precio": 56133,
     "costo": 42000,
     "envio": 4500,
     "valorCarbono": 2073
    },
    {
     "nombre": "folldo hector enrique",
     "fechaCompra": "17-Oct",
     "producto": "6 12K david",
     "precio": 220000,
     "valorCarbono": 0
    },
    {
     "nombre": "Fernando matias sendra",
     "fechaCompra": "19-Oct",
     "producto": "1 FULL formato lypsis brillosa",
     "precio": 50000,
     "costo": 30000,
     "envio": 5000,
     "valorCarbono": 7500
    },
    {
     "nombre": "Emiliano galasso",
     "fechaCompra": "19-Oct",
     "producto": "1 12K eva + resina",
     "precio": 75049,
     "costo": 40750,
     "envio": 1500,
     "valorCarbono": 32799
    },
    {
     "nombre": "Guille mazera",
     "fechaCompra": "19-Oct",
     "producto": "5 conquer 3k",
     "precio": 284000,
     "costo": 198500,
     "envio": 5000,
     "valorCarbono": 30875
    },
    {
     "nombre": "Cristian lasarte",
     "fechaCompra": "19-Oct",
     "producto": "1 full redonda eva",
     "precio": 50000,
     "costo": 30000,
     "valorCarbono": 12500
    },
    {
     "nombre": "Mercado libre",
     "fechaCompra": "19-Oct",
     "producto": "1 full redonda eva",
     "precio": 43569,
     "costo": 30000,
     "envio": 2713,
     "valorCarbono": 3356
    },
    {
     "nombre": "Jairo gonzalez",
     "fechaCompra": "19-Oct",
     "producto": "1 full con rugosidad",
     "precio": 51738,
     "costo": 30000,
     "envio": 5000,
     "valorCarbono": 9238
    },
    {
     "nombre": "Marcos Benamo",
     "fechaCompra": "19-Oct",
     "producto": "1 atos foam + resina",
     "precio": 64500,
     "costo": 42000,
     "envio": 3500,
     "valorCarbono": 11440
    },
    {
     "nombre": "Jonatan ivan gonzalez",
     "fechaCompra": "19-Oct",
     "producto": "1 atos  eva",
     "precio": 56133,
     "costo": 42000,
     "envio": 5000,
     "valorCarbono": 1573
    },
    {
     "nombre": "pierini ariel ",
     "fechaCompra": "19-Oct",
     "producto": "agrego rugosidad",
     "precio": 5000,
     "valorCarbono": 5000
    },
    {
     "nombre": "Gaston Gilardoni",
     "fechaCompra": "19-Oct",
     "producto": "1 atos eva c\/r + protector",
     "precio": 63175,
     "costo": 43000,
     "envio": 1500,
     "valorCarbono": 10935
    },
    {
     "nombre": "Cadamuro francisco matias",
     "fechaCompra": "19-Oct",
     "producto": "2 full carbono diamante eva",
     "precio": 98798,
     "costo": 60000,
     "envio": 2300,
     "valorCarbono": 21498
    },
    {
     "nombre": "INGRESOS SEPARADOS 20\/10",
     "precio": 996895,
     "costo": 648250,
     "envio": 46013,
     "valorCarbono": 162587
    },
    {
     "nombre": "Jose Gerardo Lopez",
     "fechaCompra": "20-Oct",
     "producto": "1 full redonda foam",
     "precio": 46299,
     "costo": 30000,
     "envio": 4500,
     "valorCarbono": 4299
    },
    {
     "nombre": "Mercado libre",
     "fechaCompra": "20-Oct",
     "producto": "1 full redonda",
     "precio": 42964,
     "costo": 30000,
     "envio": 2592,
     "valorCarbono": 2872
    },
    {
     "nombre": "Ezequiel Lobato",
     "fechaCompra": "21-Oct",
     "producto": "1 fibra diamante + protector",
     "precio": 35862,
     "costo": 25000,
     "envio": 4500,
     "valorCarbono": 6362
    },
    {
     "nombre": "Lourdes Guevara",
     "fechaCompra": "21-Oct",
     "producto": "1 atos foam+ resina",
     "precio": 58900,
     "costo": 42000,
     "envio": 5000,
     "valorCarbono": 4400
    },
    {
     "nombre": "Mauricio Layan",
     "fechaCompra": "22-Oct",
     "producto": "1 12K diamante + protector",
     "precio": 73150,
     "costo": 42000,
     "envio": 6000,
     "valorCarbono": 25150
    },
    {
     "nombre": "Selene Orfanello",
     "fechaCompra": "22-Oct",
     "producto": "1 12K eva",
     "precio": 69714,
     "costo": 40000,
     "envio": 4000,
     "valorCarbono": 25714
    },
    {
     "nombre": "Nicolas Korjo",
     "fechaCompra": "22-Oct",
     "producto": "1 atos eva",
     "precio": 56133,
     "costo": 42000,
     "envio": 1400,
     "valorCarbono": 5173
    }
   ]


const createClient = async (req, res) => {
    const client = req.body;
    const newClient = new Client(client);
    try {
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const crearClientesExistentes = async (req, res) => {
    try {
        await Client.insertMany(clientesAnteriores);
        res.status(201).json({ message: "Clientes creados correctamente" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const editClient = async (req, res) => {
    const {id} = req.params;
    const body = req.body;

    const client = await Client.findById(id);
    if(!client) return res.status(204).json()

    Object.keys(body).forEach(key => {
        client[key] = body[key];
      });
      await product.save();
      res.send(client);
}

const deleteClient = async (req, res) => {}


module.exports = {
    createClient,
    getClients,
    editClient,
    deleteClient,
    crearClientesExistentes
}
