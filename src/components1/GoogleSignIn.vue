<template>
    <div class="signup-buttons">
      <div class="or-container">
          <div class="line-separator"></div>
              <div class="or-label">or</div>
                <div class="line-separator"></div>
                  </div>
            <div class="row">
                <div class="col-md-12"> <button class="btn btn-dark btn-lg btn-block" type="button" v-on:click="loginWithGoogle()"><img src="https://img.icons8.com/color/16/000000/google-logo.png"> SignIn Using Google</button> </div>
              </div> 
    </div>
</template>

<script>


export default {
  name: 'GoogleSignIn',
  methods: {
    loginWithGoogle () {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
           console.log(GoogleUser)
           this.$axios.post(this.$GoogleSignIn, {
                idToken: GoogleUser.getAuthResponse().id_token,
                })
                .then(response => {
                        // JSON responses are automatically parsed.
                    console.log(response["data"].token)
                    this.$cookie.set('token',response["data"].token);
                    this.errormessage="";
                    this.$router.push({ path: '/dashboard' })
                })
                .catch(e => {
                        console.log(e)
                        this.$router.push({ path: '/dashboard' })
                    })

        //   router.push('/home')
        })
        .catch(error => {
          console.log('error', error)
        })
    }
  }
}
</script>


<style type="text/css">
   .btn-google {
    color: #545454;
    background-color: #ffffff;
    box-shadow: 0 1px 2px 1px #ddd
}

.or-container {
    align-items: center;
    color: #ccc;
    display: flex;
    margin: 25px 0
}

.line-separator {
    background-color: #ccc;
    flex-grow: 5;
    height: 1px
}

.or-label {
    flex-grow: 1;
    margin: 0 15px;
    text-align: center
}
  </style>