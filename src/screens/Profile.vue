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
          description: `Welcome to your Profile`,
        }
      }
    },
     created () {
            this.fetchData()
        },
         methods: {
            async fetchData () {
                 await this.$axios.post(`http://127.0.0.1:1337/profile`,{
                   headers: {
                              'Authorization': `${this.$cookie.get('token')}`
                            }

                 })
                        .then(response => {
                        // JSON responses are automatically parsed.
                          console.log(response["data"].user)
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



//close button cross
//Create request padding
//COlor of drop down

//Create request button padding margin
//Filter padding margin
//Table alignment with sent request
// Filter drop down over lay not displace tgable
//Dashboard table visib;e when permission
//If dashboardf empty, no pending request empty state
//filter in dashboard table
//Description in request make it type TEXT 
//Logs decending order
//Timestamp change to mm hh format
//Request type in logs
//Alphabetic sort in access table
//EMployee code
//Company hata de profile page se
// Set time out for password successful changed then change route 
// Forgot passwored crendential incorrect red color
// CHANGE urls of backend apis and store it in variable throughout
//Dashboard api 2 baar hit after login
//Deleted margin
