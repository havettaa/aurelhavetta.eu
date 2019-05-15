// register the grid component
Vue.component('datagrid', {
  template: '#dataGridTemplate',
  props: {
    items: Array,
    columns: Array,
    headers: Array,
    filter_key: String
  },
  data: function () {
    var sortOrders = {};
    this.columns.forEach(function (key) {
      sortOrders[key] = 1;
    })
    return {
      sortKey: '',
      sortOrders: sortOrders,
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filter_key = this.filter_key && this.filter_key.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var items = this.items
      if (filter_key) {
        items = items.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filter_key) > -1
          })
        })
      }
      if (sortKey) {
        items = items.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return items
    }
  },
  methods: {
    getTranslation: function (columnName) {
      return this.headers[this.columns.indexOf(columnName)]
    },

    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
  }
})

// Bootstrap root component
var vm = new Vue({
  el: '#vue', // div id used for rendering

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

      $.ajax({
        url: 'https://api.github.com/users/mralexgray/repos',
        type: "GET",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        processData: true,
        success: function (data) {
          console.log("Refresh data returned.")
          that.gridData = data
          that.isBusy = false
        },
        error: function (data) {
          console.log('error on posting ComputeOutlierValues');
          console.log(data);
        }
      });

    },
  }
})
