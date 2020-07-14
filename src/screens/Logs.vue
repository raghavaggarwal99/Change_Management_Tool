<template>
  <div class="vue-tempalte">
    <div class="card shadow mb-4">
		<div class="card-header py-3">
			<h6 class="m-0 font-weight-bold text-primary">Logs Table</h6>
		</div>
		<div class="card-body">
			<div class="table-responsive">
                <div class="row"> 
 
                <card>

                <!-- <input type="text" v-model="search" class="form-control col-lg-6 col-md-12 " placeholder="Search something..." @input="filteredsearch"/>  -->

                </card>
                </div>
                      <br>
                      <div class="col-lg-6 col-md-12">
                      <h6 class="m-0 font-weight-bold text-primary">Status</h6>
                      <multiselect
                        v-model="statusselected"
                        :multiple="true"
                        :options="statusoptions"
                        @input="filterstatus" >
                      </multiselect>
                    </div>

                <table class="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
			        <thead>
					    <tr>
							<th>Sr.no</th>

							<th>User Id</th>
                <th>Name</th>
                <th>Request Id</th>
							<th>Action</th>
                <th>TimeStamp</th>
						</tr>
					</thead>
					<tbody>
									
				    <tr v-for="(todo,count) in section1Tabs" :key="todo.id">
                        <th>{{ (currentPage-1)*itemsforpage + count+1}}</th>
                        <th>{{ todo.userId}}</th>
                        <th>{{userdetails[todo.userId][0].fullName}}</th>
                        <th>{{ todo.RequestId}}</th>
                        <th>{{ todo.Action}}</th>
                        <th>{{ todo.TimeStamp}}</th>
                    </tr>
						
					</tbody>

				</table>

			</div>
		</div>
		</div>

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

     name: 'Logs Table',
        data() {
            return {
                section1Tabs: "",
                userdetails: "",
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
                 await this.$axios.post(`http://127.0.0.1:1337/logs`,{
                   PageId: this.currentPage,
                    StatusFilter: this.statusselected,
            
                   headers: {
                              'Authorization': `${this.$cookie.get('token')}`
                            }
                 })
                        .then(response => {
                        // JSON responses are automatically parsed.
                            // console.log(response["data"].results.fetchnumberpages)
                            this.itemsforpage= response["data"].itemsperpage
                            this.perPage=(response["data"].results.fetchnumberpages);
                            this.section1Tabs=response["data"].results.fetchlogs;
                            this.userdetails=response["data"].results.fetchuserdetails;

                        })
                        .catch(e => {
                            console.log(e)
                    })
            },
        },
        computed: {
          toPage: function () {
            return this.fetchData()
          },
           filterstatus : function(){
    
            return this.fetchData()
          },
        }
   
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">