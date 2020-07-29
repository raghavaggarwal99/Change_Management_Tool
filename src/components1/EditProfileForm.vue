<template>
  <card>
    <h5 slot="header" class="title">Profile</h5>
    <div class="row">
      <div class="col-md-5 pr-md-1">
        <base-input label="Employee Id"
                  placeholder="Employee Id"
                  v-model="model.employeeId"
                  disabled>
        </base-input>
      </div>
      <div class="col-md-3 px-md-1">
        <base-input label="Username"
                  placeholder="Username"
                  v-model="model.username"
                  disabled>
        </base-input>
      </div>
      <div class="col-md-4 pl-md-1">
        <base-input label="Email address"
                  type="email"
                  v-model="model.emailAddress"
                  placeholder="mike@email.com"
                  disabled>
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="Full Name"
                  v-model="model.fullName"
                  placeholder="Full Name"
                  disabled>
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input label="Role"
                  v-model="model.role"
                  placeholder="Role"
                  disabled>
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <base-input label="PhoneNumber"
                  v-model="model.PhoneNumber"
                  placeholder="Phone Number"
                  disabled>
        </base-input>
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-md-4 pr-md-1">
        <base-input label="City"
                  v-model="model.city"
                  placeholder="City">
        </base-input>
      </div>
      <div class="col-md-4 px-md-1">
        <base-input label="Country"
                  v-model="model.country"
                  placeholder="Country">
        </base-input>
      </div>
      <div class="col-md-4 pl-md-1">
        <base-input label="Postal Code"
                  placeholder="ZIP Code">
        </base-input>
      </div>
    </div> -->
    <!-- <div class="row">
      <div class="col-md-8">
        <base-input>
          <label>About Me</label>
          <textarea rows="4" cols="80"
                    class="form-control"
                    placeholder="Here can be your description"
                    v-model="model.about">

              </textarea>
        </base-input>
      </div>
    </div> -->
  </card>
</template>
<script>
  export default {
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        }
      }
    }
  }
</script>
<style>
</style>
