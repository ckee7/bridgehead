Vue.component('job-block', {
    data: function() {
        return {

        }
    },
    props: ['job'],
    template: 
    `<li>
        <h4>Job Title: {{job.job_title}}</h4>
        <h4>Job Type: {{job.job_type}}</h4>
        <p>Job Description: {{job.job_description}}</p>
        <h5>Job I.D.: {{job.job_id}}</h5>
    </li>`
})

Vue.component('create-job-block', {
    data: function() {
        return {
            job: {
                job_title: "",
                job_type: null,
                job_description: "",
                candidate_applied: false,
                related_employer: null
            }
        }
    },
    // props: ['jobBullet'],
    template: 
    `
    <div>
        <p>Please enter a Job Title</p>
        <input type="text" v-model="job.job_title">
        <p>Please select a Job Type</p>
        <select v-model="job.job_type" id="job_type">
            <option v-bind="Health">Health</option>
            <option v-bind="Operations">Operations</option>
            <option v-bind="Marketing">Marketing</option>
            <option v-bind="Sales">Sales</option>
            <option v-bind="Tech">Tech</option>
        </select>
        <p>Please enter a Job Description</p>
        <input type="textfield" v-model="job.job_description">
        <button @click="createComponentJob">Create Job</button>
    </div>
    `,
    methods: {
        createComponentJob: function () {
            console.log("WE are creating a job, party time!")
            this.$emit("create-job-global", {
                job: this.job
            })
        }
    }
})

// Vue.component('the-component-name', {
//     template: `
//     <p>
//     Big STRING in Vue component!
//     </p>
//     `
// })

const vue = new Vue({
    el: "#app1",
    delimiters: ["[[", "]]"], 
    data: {
        joblist: [],
        testJob: {
            "job_id": "1a9829c7-37ba-4432-a61d-8fbb5a8494d4",
            "job_title": "Entry Level Python Job",
            "job_type": "HE",
            "job_description": "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
            "created_at": "2022-12-01T14:02:33.128483-05:00",
            "candidate_applied": false,
            "related_employer": 1
        },
    },
    methods: {
        getJobs: function() {
            axios({
                method: "GET",
                url: "http://localhost:8000/bridgehead_app/",
            }).then((response) => {
              console.log(response)
              this.joblist = response.data
            })
        },
        createJob: function(payload) { 
            console.log(payload)
            axios({
                method: "POST",
                url: "http://localhost:8000/bridgehead_app/",
                data: {}
            }).then((response) => {
              console.log(response)
              this.joblist = response.data
            })
        },
        updateJob: function() {
            axios({
                method: "PUT",
                url: "http://localhost:8000/bridgehead_app/",
            }).then((response) => {
              console.log(response)
              this.joblist = response.data
            })
        },
        deleteJob: function() {
            axios({
                method: "DELETE",
                url: "http://localhost:8000/bridgehead_app/",
            }).then((response) => {
              console.log(response)
              this.joblist = response.data
            })
        },
        listJobs: function() {
            axios({
                method: "GET",
                url: "http://localhost:8000/bridgehead_app/",
            }).then((response) => {
              console.log(response)
              this.joblist = response.data
            })
        },
    },
    computed: {

    },
    beforeMount: function(){
        this.getJobs()
    }
})