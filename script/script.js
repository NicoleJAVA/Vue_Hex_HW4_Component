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

    onPageClicked(page){ 
      this.currentPage = page;
    }
  },

  computed: {
    currentData() {
      let begin = (this.currentPage - 1) * this.perPage;
      let end = this.currentPage * this.perPage;

      return this.jsonData.slice(begin, end);
    },

    pageStatus() {
      return {
        currentPage: this.currentPage,
        pageCount: Math.ceil(this.jsonData.length / this.perPage)
      }
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

app.component("page", {
  props: ['pageInfo'],
  methods: {
    onClick(pageNum) {
      this.$emit("emit-click", pageNum);
    }
  },

  template: 
  `<ul class="pagination" id="pageid">
    <li class="page-item" :disabled="pageInfo.currentPage === 1">
      <a class="page-link" href="#" @click.prevent="onClick(pageInfo.currentPage - 1)">Previous</a>
    </li>
    <li class="page-item" :active="pageInfo.currentPage === page"
        v-for="page in pageInfo.pageCount" :key="page">
        <a class="page-link" href="#" @click.prevent="onClick(page)">{{ page }}</a>
    </li>
    <li class="page-item" :disabled="pageInfo.currentPage === pageInfo.pageCount">
      <a class="page-link" href="#" @click.prevent="onClick(pageInfo.currentPage + 1)">Next</a>
    </li>
  </ul>
`
});

app.mount('#app');