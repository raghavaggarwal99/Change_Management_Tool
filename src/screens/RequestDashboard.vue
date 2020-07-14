<template>
 <div class="vue-tempalte">    
  <section>
    <table class="table">
      <thead>
        <th> here are the reqiests</th>
      <tr v-for="todo in section1Tabs" :key="todo.id">
     
        <th>{{ todo.requestId }}</th>
        
        <button type="button" v-if="todo.userinfo[0].Feature == 'Level1Approve'" v-on:click="changerequeststatus('Level1Approve',  todo.requestId)" class="btn btn-dark btn-lg btn-block">Level 1 Approve</button>
        <button type="button" v-if="todo.userinfo[0].Feature  == 'Level1Decline'" v-on:click="changerequeststatus('Level1Decline' ,todo.requestId)" class="btn btn-dark btn-lg btn-block">Level 1 Decline </button>
         <button type="button" v-if="todo.userinfo[0].Feature == 'Level2Approve'" v-on:click="changerequeststatus('Level2Approve',todo.requestId)" class="btn btn-dark btn-lg btn-block">Level 2 Approve</button>
        <button type="button" v-if="todo.userinfo[0].Feature  == 'Level2Decline'" v-on:click="changerequeststatus('Level2Decline',todo.requestId)" class="btn btn-dark btn-lg btn-block">Level 2 Decline </button>
      </tr>
      </thead>
    </table>
  </section>
  </div>

</template>

<script>
 
export default {
     name: 'Dashboard',
        data() {
            return {
                section1Tabs: "",
            }
        },
        created () {
            this.fetchData()
        },
         methods: {
            async fetchData () {
                 await this.$axios.post(`http://127.0.0.1:1337/dashboard`, {
                   headers: {
                        'Authorization': `${this.$cookie.get('token')}`
                    }

                 })
                        .then(response => {
                            this.section1Tabs= (response["data"].users)
                            
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
                        })
                        .catch(e => {
                            console.log(e)
                    })
            }
        }
   
}

</script>