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
        <h5>Job I.D.: {{job.id}}</h5>
    </li>`
})

Vue.component('create-job-block', {
    data: function() {
        return {
            job: {
                jobTitle: "",
                jobType: null,
                jobDescription: "",
                recruiter: 1
            }
        }
    },
    // props: ['jobBullet'],
    template: 
    `
    <div>
        <p>Please enter a Job Title</p>
        <input type="text" v-model="job.jobTitle" size="50">
        <p>Please select a Job Type</p>
        <select v-model="job.jobType" id="job_type">
            <option disabled value="">Please select one</option>
            <option value="HE">Health</option>
            <option value="OP">Operations</option>
            <option value="MA">Marketing</option>
            <option value="SA">Sales</option>
            <option value="TE">Tech</option>
        </select>
        <p>Please enter a Job Description</p>
        <textarea v-model="job.jobDescription" rows="7" cols="40"></textarea><br>
        <button @click="createComponentJob">Create Job</button>
    </div>
    `,
    methods: {
        createComponentJob: function () {
            console.log("WE are creating a job, party time!")
            this.$emit("create-job-global", {
                job: this.job
            }) 
            this.job = ""
            // this.job.jobDescription = ""
        }
    }
})

Vue.component('update-job-block', {
    data: function() {
        return {
            job: ""
        }
    },
    props: ['singleJob'],
    template:
    `
    <div>
        <h4>Update Job Here</h4>
        {{ singleJob }}
        <p>Please enter a Job Title</p>
        <input type="text" v-model="singleJob.job_title" size="50">
        <p>Please select a Job Type</p>
        <select v-model="singleJob.job_type" id="job_type">
            <option disabled value="">Please select one</option>
            <option value="HE">Health</option>
            <option value="OP">Operations</option>
            <option value="MA">Marketing</option>
            <option value="SA">Sales</option>
            <option value="TE">Tech</option>
        </select>
        <p>Please enter a Job Description</p>
        <textarea v-model="singleJob.job_description" rows="7" cols="40"></textarea><br>
        <button @click="editSingleJob">Edit & Save</button>
    </div>
    `,
    methods: {
        editSingleJob: function () {
            console.log("We are UPDATING a job!")
            this.$emit("edit-single-job-global", {
                job: this.singleJob
            })
        },
    }
})

Vue.component('list-jobs-block', {
    data: function() {
        return {

        }
    },
    props: ['job'],
    template: 
    `
    <div>
        <li>
            <h4>Job Title: {{job.job_title}}</h4>
            <h4>Job Type: {{job.job_type}}</h4>
            <h5>Recruiter: {{job.recruiter}}</h5>
            <h5>Job I.D.: {{job.id}}</h5>
            <p>Job Description: {{job.job_description}}</p>
            <button @click="editComponentJob">Edit Job</button>
            <button @click="deleteComponentJob">Delete Job</button>
        </li>
    </div>
    `,
    methods: {
        editComponentJob: function () {
            console.log("We are EDITING a job!")
            this.$emit("edit-job-global", {
                job: this.job
            })
        },
        deleteComponentJob: function () {
            console.log("We are DELETING a job!")
            this.$emit("delete-job-global", {
                job: this.job
            })
        },
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
        showCreateJobBlock: false,
        showEditJobBlock: false, 
        joblist: [],
        searchJobsList: [],
        singleDetailJob: "",
        updatedJob: "",
        inputText: "",
        currentSearch: "",
        currentUser: "",
        csrfToken: "",
        testJob: {
            "job_title": "Entry Level Python Job",
            "job_type": "HE",
            "job_description": "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
            "recruiter": 1
        },
    },
    methods: {
        getJobs: function() {
            axios({
                method: "GET",
                url: "http://localhost:8000/bridgehead_app/",
            }).then((response) => {
            //   console.log(response)
              this.joblist = response.data
            })
        },
        toggleCreateJobBlock: function() {
            console.log("this.toggleCreateJobBlock")
            this.showCreateJobBlock = !this.showCreateJobBlock
        },
        createJob: function(payload) { 
            console.log("payload", payload)
            console.log("payload.job", payload.job)
            console.log("payload.job.jobTitle", payload.job.jobTitle)
            axios({
                method: "POST",
                headers: {
                    "X-CSRFToken": this.csrfToken
                  },
                url: "http://localhost:8000/bridgehead_app/",
                // data: {result},
                data: {
                    "job_title": payload.job.jobTitle,
                    "job_type": payload.job.jobType,
                    "job_description": payload.job.jobDescription,
                    "recruiter": payload.job.recruiter,
                    // "job_title": "Entry Level Python Job",
                    // "job_type": "HE",
                    // "job_description": "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
                    // "recruiter": 1
                },
            }).then((response) => {
            //   console.log(response)
            //   this.joblist = response.data
                this.getJobs()
            })
        },
        updateJob: function(payload) {
            console.log("update payload", payload)
            axios({
                method: "PUT",
                headers: {
                    "X-CSRFToken": this.csrfToken
                  },
                url: `http://localhost:8000/bridgehead_app/${payload.job.id}/`,
                data: {
                    "job_title": payload.job.job_title,
                    "job_type": payload.job.job_type,
                    "job_description": payload.job.job_description,
                    "recruiter": payload.job.recruiter,
                },
            }).then((response) => {
            console.log("update job method", response)
              this.updatedJob = response.data
            }).catch(error => {
                console.log('error.response: ', error.response)
                console.log('error.response.data: ', error.response.data)
            })
        },
        deleteJob: function(payload) {
            console.log(payload)
            axios({
                method: "DELETE",
                headers: {
                    "X-CSRFToken": this.csrfToken
                  },
                url: `http://localhost:8000/bridgehead_app/${payload.job.id}`,
            }).then((response) => {
            //   console.log(response)
            //   this.joblist = response.data
                this.getJobs()
            })
        },
        listJobs: function() {
            axios({
                method: "GET",
                url: "http://localhost:8000/bridgehead_app/",
            }).then((response) => {
            //   console.log(response)
              this.joblist = response.data
            })
        },
        searchJobs: function() {
            this.currentSearch = this.inputText
            this.inputText = ""
            this.searchJobsList = []
            axios({
                method: "GET",
                url: "http://localhost:8000/bridgehead_app/search/?q=bunbun",
                params: {
                    // how do i find this out?
                },
            }).then((response) => {
            //   console.log(response)
              this.searchJobsList = response.data
            }).catch(error => {
                console.log('error.response: ', error.response)
                console.log('error.response.data: ', error.response.data)
            })
        },
        showDetailJobView: function(payload) {
            console.log("Showing Detail of Job")
            // console.log(payload.job)
            this.showEditJobBlock = true
            axios({
                method: "GET",
                headers: {
                    "X-CSRFToken": this.csrfToken
                  },
                url: `http://localhost:8000/bridgehead_app/${payload.job.id}`,
            }).then(response => {
              console.log(response.data)
              this.singleDetailJob = response.data
            }).catch(error => {
                console.log('error.response: ', error.response)
                console.log('error.response.data: ', error.response.data)
            })
        }
    },
    computed: {

    },
    beforeMount: function(){
        this.getJobs()
    },
    mounted: function() {
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
    }
})