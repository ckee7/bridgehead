const vue = new Vue({
    el: "bridgeApp",
    delimeteres: ["[[", "]]"], 
    data: {
        joblist: [],
    },
    beforeMount: function(){
        axios({
            url: "http://localhost:8000/bridgehead_App",
            method: "get"
        }).then(response => {
            this.joblist = response.data
        })
    }
})