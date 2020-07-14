
<template>
    <div>
      <base-button class="btn btn-success btn-lg float-right" type="info" @click.native="modals.classic = true">
        Create a Request
      </base-button>
  
    <!-- Here is the model -->
      <modal :show.sync="modals.classic" size="sm"
       body-classes="p-0">
 
      <!-- card -->
        <card type="secondary"
        header-classes="bg-transparent pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0 mb-0">
                <form>
                    <h3>Create a Request</h3>
                    <div class="form-row">
                        <base-input class="col-md-6" label="Option1" placeholder="Option1" v-model="input.option1"/>
                       <base-input class="col-md-4 dropdown-toggle" label="State" slot="title-container" type="secondary">
                            <select id="inputState" class="form-control " v-model="selected">
                            <option disabled value="">Choose a request</option>
                            <option class="font-weight-bold">VPN Access</option>
                            <option class="font-weight-bold">Email id Generation</option>
                            </select>
                    </base-input>
                        <base-input class="col-md-2" label="Option2" placeholder="Option2" v-model="input.option2"/>
                    </div>

                     <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Write a large text here ..." v-model="input.description"></textarea>
                    </div>
                </form>

        <!--footer-->
        <template slot="footer">

            <base-button block type="danger" class=" mb-3" @click.native="modals.classic = false">
                Close
            </base-button>

             <base-button block type="default" class=" mb-3" v-on:click="submitrequest()">
                Save
            </base-button>

             <base-alert type="success" dismissible v-if="successmessage != ''">
                <span><b> {{successmessage}}</b></span>
            </base-alert>

            <base-alert type="danger" dismissible v-if="errormessage != ''">
                <span><b> {{errormessage}}</b></span>
            </base-alert>

          </template>
         </card>
      </modal>
    </div>
</template>

<script>

  import {Modal} from '@/components';
 
  import { BaseAlert } from '@/components';

    export default {
      components :{
          Modal,
          // VModal,
          BaseAlert
      },
      name: 'CreateRequest',

      data(){
        return {
          modals: {
            classic: false,
          },
          successmessage: '',
          selected: '',
          errormessage: '',
          input : {
              request: '',
              option1: '',
              option2: '',
              description: '',
          }
        }
      },
      methods: {
        async submitrequest (){ 
            if(this.input.description != "" && this.selected != "") {
              await this.$axios.post(`http://127.0.0.1:1337/request`, {
                    Info: this.selected,
                    Description: this.input.description,
                    headers: {
                        'Authorization': `${this.$cookie.get('token')}`
                    }
                  })
                    .then(response => {
                    // JSON responses are automatically parsed.
                      console.log(response)
                      this.successmessage="Your request has been created"
                              
                  })
                    .catch(e => {
                      console.log(e)
                  })
            }
            else{
                this.errormessage="Please fill the form"
              }
          }  
       }
    }
</script>