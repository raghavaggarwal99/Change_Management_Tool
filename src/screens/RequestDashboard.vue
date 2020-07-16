<template>
    <div class="vue-tempalte">

        <div class="card shadow mb-4">
			<div class="card-header py-3">
				<h6 class="m-0 font-weight-bold text-primary">Dashboard Table</h6>
			</div>
			<div class="card-body">
				<div class="table-responsive">
                    <div class="row"> 
                        <!-- <card>
                            <input type="text" v-model="search" class="form-control col-lg-6 col-md-12 " placeholder="Search something..." @input="filteredsearch"/> 
                        </card> -->
                    </div>
                    <br>

            <table class="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
              <thead>
                  <tr>
                    <th>Sr.no</th>
                    <th>Request Info</th>
                    <th>Request Status</th>
                    <th>User Name</th>
                    <th>User Email Id</th>
                    <th>Approve</th>
                    <th>Decline</th>
                </tr>
              </thead>
				<tbody>		
					<tr v-for="(todo,count) in section2Tabs" :key="todo.id">
                    <th>{{ count}}</th>
                    <th>{{ todo.requestinfo[0].info}}</th>
                    <th>{{ todo.requestinfo[0].status}}</th>
                    <th>{{ userdetails[todo.requestinfo[0].userId][0].fullName }}</th>
                    <th>{{ userdetails[todo.requestinfo[0].userId][0].emailAddress }}</th>
                    <th><button v-if="section1Tabs[todo.requestId][0][0].Feature"   type="button" v-on:click="changerequeststatus(section1Tabs[todo.requestId][0][0].Feature, todo.requestId)" class="btn btn-dark" >Approve</button></th>
                    <th><button v-if="section1Tabs[todo.requestId][1][0].Feature"  type="button" v-on:click="changerequeststatus(section1Tabs[todo.requestId][1][0].Feature, todo.requestId)" class="btn btn-dark">Decline</button></th>
                </tr>
						</tbody>

					</table>
			</div>
		</div>
	</div>

   <base-alert type="success" v-if="successmessage != ''">
      <span><b> {{successmessage}}</b></span>
    </base-alert>

  <div class="row">
    <div class="col-lg-6 col-md-12 pull-right">
        <base-pagination :page-count="perPage" v-model="currentPage" @input="toPage"></base-pagination>
    </div>
  </div>


  </div>
</template>

<script>
  import BasePagination from '../components1/BasePagination'
  import { BaseAlert } from '@/components';
  import Multiselect from 'vue-multiselect'


export default {

  components : {
        BasePagination,
        BaseAlert,
        Multiselect,
    },
     name: 'Dashboard',

        data() {
            return {
                section1Tabs: "",
                section2Tabs: "",
                userdetails: "",
                count: 1,
                perPage: 1,
                currentPage: 1,
                successmessage: ""
            }
        },
        created () {
            this.fetchData()
        },
         methods: {
            async fetchData () {
                 await this.$axios.post(`http://127.0.0.1:1337/dashboard`, {
                    PageId: this.currentPage,
                    
                   headers: {
                        'Authorization': `${this.$cookie.get('token')}`
                    }

                 })
                .then(response => {
                    this.section1Tabs= (response["data"].users)
                    this.section2Tabs= (response["data"].requests)
                    this.userdetails= response["data"].userdetails
                    this.perPage=response["data"].totalPages;
                            
                })
                .catch(e => {
                    console.log(e)
                })
            },
            async changerequeststatus(status, requestId){
                    console.log(status)
                 await this.$axios.post(`http://127.0.0.1:1337/changerequeststatus`, {

                    headers: {
                        'Authorization': `${this.$cookie.get('token')}`
                    },
                            Status: status,
                            RequestId: requestId,

                        }).then(response => {
                            console.log(response)
                            this.successmessage="The request has been approved"
                            this.fetchData()
                        })
                        .catch(e => {
                            console.log(e)
                    })
            }
        },
      computed: {
       
        toPage: function () {
            return this.fetchData()
        },
    }
   
}

</script>