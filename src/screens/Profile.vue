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
          company: 'Goals 101',
          username: '',
          firstName: 'Mike',
          lastName: 'Andrew',
          address: 'Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09',
          city: 'Melbourne',
          country: 'Australia',
          about: 'Lamborghini Mercy, Your chick she so thirsty, I\'m in that two seat Lambo.'
        },
        user: {
          fullName: '',
          title: 'Ceo/Co-Founder',
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
                          this.user.fullName=response["data"].user.fullName

                           
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
