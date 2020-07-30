<template>
  <div class="row">
    <div class="col-md-8">
      <edit-profile-form :model="model">
      </edit-profile-form>
    </div>
    <div class="col-md-4">
      <user-card :user="user"></user-card>
    </div>
  </div>
</template>
<script>


  import EditProfileForm from '../components1/EditProfileForm';
  import UserCard from '../components1/UserCard'
  

  export default {
    components: {
      EditProfileForm,
      UserCard,
    },
    
    data() {
      return {
        model: {
          company: '',
          username: '',
          emailAddress: '',
          role: '',
          fullName: '',
          employeeId: '',
          PhoneNumber: ''

        },
        user: {
          fullName: '',
          title: '',
          description: ``,
        }
      }
    },
     created () {
            this.fetchData()
        
        },
         methods: {
            async fetchData () {
                 await this.$axios.post(this.$Profile,{
                   headers: {
                              'Authorization': `${this.$cookie.get('token')}`
                            }

                 })
                        .then(response => {
                        // JSON responses are automatically parsed.
                          // console.log(response["data"].user)

                          this.model.username=response["data"].user.fullName
                          this.model.fullName=response["data"].user.fullName
                          this.model.PhoneNumber=response["data"].user.phoneNumber
                          this.model.employeeId=response["data"].user.EmployeeId
                          this.user.fullName=response["data"].user.fullName
                          this.model.emailAddress=response["data"].user.emailAddress
                          this.user.title=response["data"].user.Role
                          this.model.role=response["data"].user.Role
                           
                        })
                        .catch(e => {
                            console.log(e)
                    })
            }
         }
  }
</script>
<style>
</style>

//Backend api hit with computed if lagade

//Color font according to black theme
//notification of delete/approve request- at center/modal/ jaha user ko dikhe
//Scroll bars in tables
//Global search in the top bar
//Admin access true/false ko yes/no- think from a user perspective
//Filters accordingly or and and
//Sent Requests sorted by time- central helper code basically code repeat nahi

//Level1 Approve/Level 2 Approve- Make it from a ui-perspective

//Dynamic columns from backend- not front end like in Admin Access- drop down vaala from backend

//Workflow on type of request- Dynamically

//System Architecture, so that it becomes easy and new things could be added easily according to new requirements

//Delegation- Assign the request to someone else, example sahil doesn't know a request whether can be approved or not. Logs entry accordingly

Problems: 
// Cache invalidation- 

//Variable naming- (To be focused on at my level)

//Off by one error

