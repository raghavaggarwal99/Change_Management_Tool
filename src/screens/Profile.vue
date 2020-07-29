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


//Deleted base alert ek baar dikhana hai

//Filter drop down over lay not displace 
//Dashboard mein ask filter and kese and kon kon se, and "no request vaala "
//Dashboard api 2 baar hit after login- VO computed ke karann hora hai.


