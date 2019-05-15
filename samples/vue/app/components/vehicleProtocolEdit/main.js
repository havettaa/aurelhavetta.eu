// Bootstrap root component
var vm = new Vue({
  el: '#vue', // div id used for rendering

  components: {
    'datagrid': httpVueLoader(appRoot + '/components/base/dataGrid.html'),
    'modaldialog': httpVueLoader(appRoot + '/components/base/modalDialog.html'),
  },

  created: function () {
    //this.refreshData();
  },

  data: {
    isBusy: true,
    showModal: false,

    searchQuery: '',
    gridColumnBinding: ['id', 'created_at', 'language', 'name', 'size', 'watchers'],
    gridColumnHeaders: ['ID', 'Dátum', 'Operátor', 'Čiastkové meranie', 'Pôvodne', 'Aktuálne'],
    gridData: []
  },

  methods: {
    showHistoryClick: function (event) {
      if (event) {
        event.preventDefault()
      }
      this.showModal = true
      this.searchQuery = ''
      this.refreshData()
    },

    refreshData: function (event) {
      if (event)
        event.preventDefault()

      this.isBusy = true
      var that = this

      var url = 'https://api.github.com/users/mralexgray/repos'

      // Using regular promise
      //axios.get(url).then(function (res) { console.log(res.data) }, function (err) { console.log(err) })

      // Using Rx.js
      Rx.Observable.fromPromise(axios.get(url)) // Konvertovanie http get requestu na http observable (axios je to iste ako ajax len lepsie)
        .map(function (response) { // Map zmeni parameter ktory dostane callback funkcia po ukonceni http requestu
          return response.data.map(function (row, index) { // Opakovane volanie map iteruje kazdy riadok v json-e
            Object.defineProperty( // Toto je spatna kompatibilita pre IE, operacia sa vola spread ...  
              row, 'localizedDate', { // Ulohou spredu je pridat novu property do existujuceho json-u
                value: moment // Pouzijem kniznicu moment.js na kovertovanie Date do String
                  .utc(row.dateTime) // Vstup je vo formate DateTime UTC
                  .local() // Pouzije sa casova zona prehliadaca a zmeni sa hodnota Date objektu podla casovej zony
                  .format('LLLL'), // Podla nastavenia regional setting PC kde bezi prehliadac sa Date skonvetruje na Text
            })
            return row // Vratim novy objekt do callback funkcie vyvolanej subscribe metodou
          })
        })
        .subscribe( // Subscribe realne spusti http request a po jeho ukonceni sa zavola tento callback:
          function (items) { // Parameter items bude obsahovat objekt ktory uz prebehol cez premapovanie
            that.gridData = items // Po nastaveni tejto property Vue detekuje zmenu a vyvola rendering v datagrid componente
            that.isBusy = false // Tociace kolecko binduje css display:on/off automaticky na hodnotu tejto property isBusy
          }, function (err) { console.log(err) }) // V pripade erroru na http requeste sa vola tento callback
      

      // If IE would not be used, same code would look like tihs:
      Rx.Observable.fromPromise(axios.get(url))
        .map(res => res.data.map(row => {
          return { ...row, ...{ localizedDate: moment.utc(row.dateTime).local().format('LLLL') } }
        }))
        .subscribe(items => {
            this.gridData = items
            this.isBusy = false
          }, err => console.log(err) )

    },

  }
})
