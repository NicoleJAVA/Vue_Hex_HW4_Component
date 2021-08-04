const app = Vue.createApp({
  data() {
    return {
      jsonData:[],
      currentPage: 1,
      perPage: 20,
    }
  },

  methods: {
    getData() {
      const jsonUrl = 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json';
      fetch(jsonUrl, {method: 'get'})
        .then((response) => {
        return response.json();
      }).then((data) => {
        this.jsonData = data.result.records;
      })

    },
    
    pageBtn (page){
      let str = '';
      const total = page.pageTotal;
      
      if(page.hasPage) {
        str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) - 1}">Previous</a></li>`;
      } else {
        str += `<li class="page-item disabled"><span class="page-link">Previous</span></li>`;
      }
      
    
      for(let i = 1; i <= total; i++){
        if(Number(page.currentPage) === i) {
          str +=`<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        } else {
          str +=`<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        }
      };
    
      if(page.hasNext) {
        str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) + 1}">Next</a></li>`;
      } else {
        str += `<li class="page-item disabled"><span class="page-link">Next</span></li>`;
      }
    
      const pageid = document.getElementById('pageid');
      pageid.innerHTML = str;
    },

    switchPage(e){
      e.preventDefault();
      if(e.target.nodeName !== 'A') return;
      const page = e.target.dataset.page;
      this.currentPage = page;
    }
  },

  computed: {
    currentData() {
      let begin = (this.currentPage - 1) * this.perPage;
      let end = this.currentPage * this.perPage;

      return this.jsonData.slice(begin, end);
    }
  },

  created() {
    this.getData();
  }
});

app.component("card", {
  props:['item'],
  template: `<div class="col-md-6 py-2">
  <div class="card">
    <div class="card bg-dark text-white text-left">
      <img class="card-img-top img-cover" height="155px" :src="item.Picture1">
      <div class="card-img-overlay d-flex justify-content-between align-items-end p-0 px-3" style="background-color: rgba(0, 0, 0, .2)">
        <h5 class="card-img-title-lg">{{ item.Name }}</h5><h5 class="card-img-title-sm">{{ item.Zone }}</h5>
      </div>
    </div>
    <div class="card-body text-left">
        <p class="card-text"><i class="far fa-clock fa-clock-time"></i>&nbsp;{{ item.Opentime }}</p>
        <p class="card-text"><i class="fas fa-map-marker-alt fa-map-gps"></i>&nbsp;{{ item.Add }}</p>
        <p class="card-text"><i class="fas fa-mobile-alt fa-mobile"></i>&nbsp;{{ item.Tel }}</p>
        <div v-if="item.Ticketinfo">
        <p class="card-text"><i class="fas fa-tags text-warning"></i>&nbsp;{{ item.Ticketinfo }}</p>
      </div>
    </div>
  </div>
</div>`
});
app.mount('#app');