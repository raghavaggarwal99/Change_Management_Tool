<template>
    <div>
        Logging out..
        </div>
</template>

<script>
export default {
     name: 'SignOut',
        created () {
            this.fetchData()
        },
         methods: {
            async fetchData () {
                 await this.$axios.post(this.$SignOut,{
                 })
                        .then(response => {
                        // JSON responses are automatically parsed.
                            console.log(response)
                            this.$cookies.remove("token");
                            this.$cookies.remove('resetlink');
                            this.$router.push({ path: '/',  name: 'Login', })
                        })
                        .catch(e => {
                            console.log(e)
                    })
            },
        }
   
}

</script>