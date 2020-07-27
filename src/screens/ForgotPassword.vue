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
                        <h3>Forgot Password</h3>

                        <div class="form-group">
                            <label>Email address</label>
                            <input type="email" v-model="input.email" class="form-control form-control-lg" />
                        </div>

                        <button type="button" v-on:click="resetpassword()" class="btn btn-dark btn-lg btn-block">Reset password</button>

                        <br>

                        <base-alert type="success" dismissible v-if="successmessage != ''">
                            <span><b> {{successmessage}} </b></span>
                        </base-alert>

                        <br>
                        <base-alert type="danger" dismissible v-if="errormessage != ''">
                            <span><b> {{errormessage}} </b></span>
                        </base-alert>

                    </form>
                </card>
            </div>
        </div>
    </div>
</template>

<script>
    import { BaseAlert } from '@/components';
    export default {

        components: {
            BaseAlert
        },

        props: ['msg'],
        data() {
            return {
                errormessage: '',
                successmessage: '',
                globalvalue: '',
                input: {
                    email: '',
                }
            }
        },
         methods: {
            async resetpassword () {
                if(this.input.email!=""){
                    await this.$axios.post(this.$ForgotPassword,{
                            emailAddress: this.input.email,
                    })
                            .then(response => {
                            // JSON responses are automatically parsed.
                                this.$cookie.set('resetlink',response["data"].token);
                                this.$cookie.set('email',this.input.email);
                                this.successmessage= "The email has been sent successfully"
                                this.errormessage= "";
                                
                                
                            })
                            .catch(e => {
                                console.log(e)

                                this.errormessage= "The email is not correct";
                                this.successmessage= ""
                              

                               
                        })
                }
                else{
                 this.errormessage= "The email is not correct";
                 this.successmessage= ""
                }
            },
        },
        
    }
</script>