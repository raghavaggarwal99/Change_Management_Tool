<template>
    <div class="row">
             <div class="col-md-6 ml-auto mr-auto text-center">
              <div class="col-sm-12 ">
                  <br>
                  <br>
                  <br>
                  <br>
                  <br>
                 <card>
        <form>
            <h3>Reset Password</h3>

             <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" class="form-control form-control-lg" v-model="input.password" placeholder="Password" />
             </div>

             <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" name="password" class="form-control form-control-lg" v-model="input.password2" placeholder="Confirm Password" />
            </div>

            <button type="button" v-on:click="changepassword()" class="btn btn-dark btn-lg btn-block">Change password</button>
            <br>
             <div class=" alert-success" role="alert">
                <span role="alert">{{errormessage}}</span>
            </div>
            
        </form>
        </card>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                errormessage: '',
                input: {
                    password: '',
                    password2: '',
                }
            }
        },
         methods: {
            async changepassword () {
                if(this.input.password2 != "" && this.input.password != ""){
                    if(this.input.password2 == this.input.password){
                    await this.$axios.post(`http://127.0.0.1:1337/changepassword`,{
                            EmailAddress: this.$cookie.get('email'),
                            Password1: this.input.password,
                    })
                            .then(response => {
                            // JSON responses are automatically parsed.
                                console.log(response)
                                this.errormessage= "Your password has been changed"
                                this.$cookies.remove('email');
                                this.$cookies.remove('resetlink');
                                this.$router.push({ path: '/' })
                            })
                            .catch(e => {
                                console.log(e)
                                this.errormessage= "The passwords do not match"
                        })
                    }
                }
                else{
                    this.errormessage= "The passwords do not match"
                }
            },
        }
    }
</script>