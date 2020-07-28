<template>
<div class="vue-tempalte">
 <div class="card shadow mb-4">
						<div class="card-header py-3">
							<h6 class="m-0 font-weight-bold text-primary">Sent Requests</h6>
						</div>

						<div class="card-body">
							<div class="table-responsive">

                <div class="row"> 
                   
                  <CreateRequest @input="filterstatus" class="col-md-11" id="createrequest" />
                </div>
                
                      <br>
                      
                      <h6 class="m-0 font-weight-bold text-primary">Status</h6>
                      <multiselect
                        v-model="statusselected"
                        :multiple="true"
                        :options="statusoptions"
                        @input="filterstatus" >
                      </multiselect>
            
                      <br>
                  

                <table class="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
                  <col style="width:10%">
                  <col style="width:10%">
                  <col style="width:40%">
                  <col style="width:20%">
                  <col style="width:15%">

									<thead>
										<tr>
											<th>Sr.no</th>
											<th>Info</th>
                      <th>Description</th>
											<th>Status</th>
                     
										</tr>
									</thead>
									<tbody>
									
									<tr v-for="(todo,count) in section1Tabs" :key="todo.id">
                    <th>{{ (currentPage-1)*itemsforpage + count+1}}</th>
                    <th>{{ todo.info}}</th>
                    <th>{{ todo.description}}</th>
                    <th>{{ todo.status}}</th>
                    <th>

                  <button type="info" id="deleteicon" v-if="todo.status == 'Pending' && todo.isDeleted == '0'" v-on:click="deleterequest(todo.id)" class="btn btn-dark a-btn-slide-text tim-icons icon-trash-simple">    
                           
                  </button>
                   <base-alert v-if="todo.isDeleted == '1'" class="col-lg-6 col-md-12" id="delete">
                    <span id="deletetext">Deleted</span>
                  </base-alert>
                  </th>
                
                  </tr>
						
									</tbody>

								</table>

							</div>
						</div>
					</div>

     
         <base-alert type="danger" dismissible v-if="errormessage != ''">
            <span><b> {{errormessage}}</b></span>
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
  import CreateRequest from '../components1/CreateRequest'

export default {

    components : {
        BasePagination,
        BaseAlert,
        Multiselect,
        CreateRequest
    },

     name: 'Sent_Requests',
        data() {
            return {
                section1Tabs: "",
                errormessage: '',
                count: 1,
                perPage: 1,
                currentPage: 1,
                search: '',
                itemsforpage: '',
                statusselected: [],
                statusoptions: ['Pending', 'Declined', 'Level1Approve', 'Level2Approve']
            }
        },
        created () {
            this.fetchData()
        },
         methods: {
            async fetchData () {
                 await this.$axios.post(this.$SentRequests,{
                   PageId: this.currentPage,
                    StatusFilter: this.statusselected,
            
                   headers: {
                              'Authorization': `${this.$cookie.get('token')}`
                            }
                 })
                        .then(response => {
                        // JSON responses are automatically parsed.
                            // console.log(response["data"].requests)
                            this.itemsforpage= response["data"].itemsperpage;
                            this.perPage=response["data"].requests.fetchnumberpages;
                            this.section1Tabs=response["data"].requests.fetchrequests;
                        })
                        .catch(e => {
                            console.log(e)
                    })
            },
            async deleterequest(requestid){

                    console.log(requestid)
                    this.errormessage=""
                 await this.$axios.post(this.$DeleteRequest, {

                          headers: {
                              'Authorization': `${this.$cookie.get('token')}`
                            },

                            RequestId: requestid,
                        }).then(response => {
                        // JSON responses are automatically parsed.
                          console.log(response)
                            this.errormessage="This request has been deleted"
                            this.fetchData();
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

      filterstatus : function(){
        console.log(this.selected)
        return this.fetchData()
      },
    }
   
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">

</style>

<style type="css">

#createrequest {
  position: relative;
  left:80px;
}
#delete {

  position: relative;
  left:35px;
  padding: 10px;
}

#deletetext {

  position: relative;
  left:10px;
  padding: 10px;
}

#deleteicon {

  position: relative;
  left:80px;
  padding: 10px;
}

</style>