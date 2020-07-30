
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
                <form v-on:keyup="keylogin">
                    <h3>Sign In</h3>
                    <div class="form-group">
                        <label>Email address</label>
                        <input type="text" id="email" name="email"  class="form-control form-control-lg" v-model="input.email" placeholder="Email"/>
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" class="form-control form-control-lg" v-model="input.password" placeholder="Password" />
                    </div>
                    
                    <button type="button" v-on:click="login()" class="btn btn-dark btn-lg btn-block">Sign In</button>

                    <p class="forgot-password text-right">
                        <router-link :to="{name: 'Forgot-Password'}">Forgot Password?</router-link>
                    </p>

                    <GoogleSignIn/>
                    <br>
                    <base-alert type="danger" v-if="errormessage != ''">
                        <span><b> {{errormessage}}</b></span>
                    </base-alert>
                    
                </form>
            </card>
              
            </div>
        </div>
    </div> 
</template>

<script>
    import GoogleSignIn from '../components1/GoogleSignIn'
    import { BaseAlert } from '@/components';
    

    export default {
        name: 'Login',
        components: {
            GoogleSignIn,
            BaseAlert
        },

        data() {
            return {
                input: {
                    email: "",
                    password: ""
                },
                errormessage: "",
            }
        },
        methods: {
            async login() {
                this.errormessage="";
                
                if(this.input.email != "" && this.input.password != "") {
                    await this.$axios.post(this.$Login, {
                            EmailAddress: this.input.email,
                            Password: this.input.password,
                        })
                        .then(response => {
                        // JSON responses are automatically parsed.
                            console.log(response["data"].token)
                            this.$cookie.set('token',response["data"].token);
                            this.$cookie.set('permission',response["data"].permission);
                       
                            this.errormessage="";

                          
                            // this.$router.next({path:'/request'})
                                    
                           
                            // this.$router.push({ redirect: '/request' })
                            this.$router.go('/request')
                            // this.$router.push("/request");
                        })
                        .catch(e => {
                            console.log(e)
                            this.errormessage="Invalid Credentials";
                        })
                    }
                else {
                    console.log("A username and password must be present");
                    this.errormessage="Invalid Credentials";
                }
            },
          
            keylogin: function(e) {
                if (e.keyCode === 13) {
                    this.login();
                } 
            },
            beforeEnter: (to, from, next) => {
               
                next({path:'/request'})
                
            },
        },
      
    }
</script>
