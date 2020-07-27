<template>
    <div class="vue-tempalte">

        <div class="card shadow mb-4">
			<div class="card-header py-3">
				<h6 class="m-0 font-weight-bold text-primary">Access Table</h6>
			</div>
			<div class="card-body">
				<div class="table-responsive">
                   
                    <br>

                  
                    <h6 class="m-0 font-weight-bold text-primary">Access</h6>
                      <multiselect
                        v-model="accessselected"
                        :multiple="true"
                        :options="accessoptions"
                        @input="filteraccess" >
                      </multiselect>
                   <br>
            

                    <table class="table table-bordered table-hover" id="dataTable" width="50%" cellspacing="0">
						<thead>
						    <tr>
								<th>Sr.no</th>
								<th>Name</th>
                                <th>Email Id</th>
                                <th>Phone Number</th>
                                <th>Position</th>
                                <th>VPN Access</th>
                                <th>Email id Generation</th>
								<th>Laptop Available</th>
							</tr>
						</thead>
						<tbody>		
						    <tr v-for="(todo,count) in section1Tabs" :key="todo.id">
                                <th>{{ (currentPage-1)*10 + count+1}}</th>
                                <th>{{ todo[0].fullName}}</th>
                                <th>{{ todo[0].emailAddress}}</th>
                                <th>{{ todo[0].phoneNumber}}</th>
                                <th>{{ todo[0].Role}}</th>
                                <th>{{ todo.includes('VPN Access')}}</th>
                                <th>{{ todo.includes('Email id Generation')}}</th>
                                <th>{{ todo.includes('New Laptop')}}</th>
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

     name: 'Admin Access',
        data() {
            return {
                section1Tabs: "",
                section2Tabs: "",
                count: 1,
                perPage: 1,
                currentPage: 1,
                accessselected: [],
                accessoptions: ['VPN Access', 'Email id Generation', 'New Laptop']
            }
        },
        created () {
            this.fetchData()
        },
         methods: {
            async fetchData () {
                 await this.$axios.post(this.$Access, {
                    PageId: this.currentPage,
                    accessfilter: this.accessselected,

                   headers: {
                        'Authorization': `${this.$cookie.get('token')}`
                    }

                 })
                        .then(response => {
                            console.log(response["data"].userdetails[0])

                            this.perPage=Math.floor(response["data"].number/10) +1 ;

                            this.section1Tabs= (response["data"].userdetails[0])
                            
                        })
                        .catch(e => {
                            console.log(e)
                    })
            },
        },
        computed: {
        filteraccess : function(){
            console.log(this.selected)
            return this.fetchData()
        },
        toPage: function () {
            return this.fetchData()
        },
    }
   
}

</script>