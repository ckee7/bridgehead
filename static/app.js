Vue.component('job-block', {
    data: function() {
        return {

        }
    },
    props: ['job', 'currentUser'],
    template: 
    `<li>
        <h3 class="headline"><u>Job Title: {{job.job_title}}</u></h3>
        <h4>Job Type: {{job.job_type}}</h4>
        <p>Job Description: {{job.job_description}}</p>
        <h5>Job I.D.: {{job.id}}</h5>
        <button v-on:click="jobApply(job)"  v-if="!job.candidate.includes(currentUser[0].id)">Apply</button>
        <!-- <p>{{job.candidate}}</p>
        <p>{{currentUser[0].id}}</p>
        <p>{{job.candidate.includes(currentUser[0].id)}}</p> -->
        <p class="response" v-if="job.candidate.includes(currentUser[0].id)">You have applied for this job!</p>
    </li>`,
    methods: {
        jobApply: function (localJobVar) {
            console.log("WE are applying for a job!")
            this.$emit("apply-job-global", {
                jobby: localJobVar
            }) 
        }
    }
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
            job: "",
            showApplicants: false
        }
    },
    props: ['singleJob', 'candidates'],
    template:
    `
    <div>
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
        <button @click="deleteComponentJob">Delete Job</button>
        <button @click="getApplicants" v-if="!showApplicants">Get Applicants</button>
        <button @click="getApplicants" v-if="showApplicants">Hide Applicants</button>
        <div v-if="showApplicants">
            <h4>Applicants:</h4>
            <ul v-for="candidate in candidates">
                <li>{{candidate.first_name}} {{candidate.last_name}}: {{candidate.email}}</li>
            </ul>
        </div>
    </div>
    `,
    methods: {
        editSingleJob: function () {
            console.log("We are UPDATING a job!")
            this.$emit("edit-single-job-global", {
                job: this.singleJob
            })
        },
        deleteComponentJob: function () {
            console.log("We are DELETING a job!")
            this.$emit("delete-job-global", {
                job: this.singleJob
            })
        },
        getApplicants: function () {
            console.log("WE have Applicants!")
            this.showApplicants = !this.showApplicants
            this.$emit("applicants-job-global", {
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
    props: ['job', 'candidates'],
    template: 
    `
    <div>
        <li>
            <h4>Job Title: {{job.job_title}}</h4>
            <h4>Job Type: {{job.job_type}}</h4>
            <h5>Recruiter: {{job.recruiter}}</h5>
            <h5>Job I.D.: {{job.id}}</h5>
            <p>Job Description: {{job.job_description}}</p>
            <button @click="editComponentJob">Detail Job View</button>
        </li>
            <p v-for="candidate in candidates">
                {{candidate}} 
            </p>
    </div>
    `,
    methods: {
        editComponentJob: function () {
            console.log("We are EDITING a job!")
            this.$emit("edit-job-global", {
                job: this.job
            })
        },
    }
})

// Vue.component('applicant-block', {
//     data: function() {
//         return {

//         }
//     },
//     props: ['job'],
//     template: 
//     `<li>
//         <h4>Applicant(s): </h4>
//         <p>{{job.first_name}}</p>
//         <p>{{job.last_name}}</p>
//         <p>{{job.username}}</p>
//         <p>{{job.email}}</p>
//     </li>`,
//     methods: {
   
//         }
    
// })

// NOT IN USE
// Vue.component('the-component-name', {
//     template: `
//     <p>
//     Big STRING in Vue component!
//     </p>
//     `
// })

const app = new Vue({
    el: "#app1",
    delimiters: ["[[", "]]"], 
    data: {
        showCreateJobBlock: false,
        showEditJobBlock: false, 
        currentSliceDisplay: true,
        jobList: [],
        searchJobsList: [],
        candidates: [],

        currentPage: 1,
        numberOfItemsPerPage: 3,
        jobsRemaining: 0,
        currentSlice: "",
        currentSliceIndex: 0,
        firstSlice: "",
        secondSlice: "",
        thirdSlice: "",

        thisAppliedJob: "",
        singleDetailJob: "",
        candy: "",
        updatedJob: "",
        inputText: "",
        currentSearch: "",
        currentUser: "",
        csrfToken: "",
        jobCount: 0,
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
                url: "http://localhost:8000/bridgehead_app/jobs/",
            }).then((response) => {
            //   console.log(response)
              this.jobList = response.data
              this.currentSlice = this.jobList.slice(0, this.numberOfItemsPerPage)
              this.jobsRemaining = Math.max(this.jobList.length - 3, 0)
              console.log("joblist length", this.jobList.length)
              console.log("jobremaining", this.jobsRemaining)
            })
        },
        toggleCreateJobBlock: function() {
            console.log("this.toggleCreateJobBlock")
            this.showCreateJobBlock = !this.showCreateJobBlock
        },
        createJob: function(payload) { 
            this.showCreateJobBlock = false
            console.log("payload", payload)
            console.log("payload.job", payload.job)
            console.log("payload.job.jobTitle", payload.job.jobTitle)
            axios({
                method: "POST",
                headers: {
                    "X-CSRFToken": this.csrfToken
                  },
                url: "http://localhost:8000/bridgehead_app/jobs/",
                // data: {result},
                data: {
                    "job_title": payload.job.jobTitle,
                    "job_type": payload.job.jobType,
                    "job_description": payload.job.jobDescription,
                    "recruiter": this.currentUser[0].id,
                    // "job_title": "Entry Level Python Job",
                    // "job_type": "HE",
                    // "job_description": "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
                    // "recruiter": 1
                },
            }).then((response) => {
            //   console.log(response)
            //   this.jobList = response.data
                this.getCurrentUser()
            })
        },
        updateJob: function(payload) {
            console.log("update payload", payload)
            axios({
                method: "PUT",
                headers: {
                    "X-CSRFToken": this.csrfToken
                  },
                url: `http://localhost:8000/bridgehead_app/jobs/${payload.job.id}/`,
                data: {
                    "job_title": payload.job.job_title,
                    "job_type": payload.job.job_type,
                    "job_description": payload.job.job_description,
                    "recruiter": payload.job.recruiter,
                },
            }).then((response) => {
            console.log("update job method", response)
              this.updatedJob = response.data
              this.getCurrentUser()
              this.showEditJobBlock = false
              this.currentSliceDisplay = true
            }).catch(error => {
                console.log('error.response: ', error.response)
            })
        },
        deleteJob: function(payload) {
            this.showEditJobBlock = false
            console.log("Deleting!", payload)
            axios({
                method: "DELETE",
                headers: {
                    "X-CSRFToken": this.csrfToken
                  },
                url: `http://localhost:8000/bridgehead_app/jobs/${payload.job.id}`,
            }).then((response) => {
            //   console.log(response)
            //   this.jobList = response.data
                 this.getCurrentUser()
                 this.currentSliceDisplay = true
            })
        },
        // listJobs: function() {
        //     axios({
        //         method: "GET",
        //         url: "http://localhost:8000/bridgehead_app/jobs/",
        //     }).then((response) => {
        //     //   console.log(response)
        //       this.jobList = response.data
        //     })
        // },
        getNextPage: function() {
            this.currentSliceIndex = this.currentSliceIndex + this.numberOfItemsPerPage
            let beginning = this.currentSliceIndex
            let end = beginning + this.numberOfItemsPerPage
            // this.currentPage++
            this.currentSlice = this.jobList.slice(beginning, end)
            this.numberOfItemsPerPage = this.currentSlice.length
            this.jobsRemaining -= this.currentSlice.length
            console.log("joblist length", this.jobList.length)
            console.log("jobremaining", this.jobsRemaining)
            console.log("currentSliceNEXT", this.currentSlice.length)
            // this.firstSlice = this.jobList.slice(0, 3) //indices 0,1,2
            // this.secondSlice = this.jobList.slice(3, 6)
            // this.thirdSlice = this.jobList.slice(6, 9)
        },
        getPreviousPage: function() {
            this.currentSliceIndex = this.currentSliceIndex - this.numberOfItemsPerPage
            let beginning = this.currentSliceIndex
            let end = beginning + this.numberOfItemsPerPage
            // this.numberOfItemsPerPage = this.currentSlice.length
            // this.currentPage++
            this.currentSlice = this.jobList.slice(beginning, end)
            this.jobsRemaining += this.currentSlice.length
            console.log("joblist length", this.jobList.length)
            console.log("jobremaining", this.jobsRemaining)
            console.log("currentSlicePREVIOUS", this.currentSlice.length)
            // this.firstSlice = this.jobList.slice(0, 3) //indices 0,1,2
            // this.secondSlice = this.jobList.slice(3, 6)
            // this.thirdSlice = this.jobList.slice(6, 9)
        }, 
        searchJobs: function() {
            this.currentSearch = this.inputText
            this.inputText = ""
            this.searchJobsList = []
            this.jobList = ""
            axios({
                method: "GET",
                url: "http://localhost:8000/bridgehead_app/jobs/search/",
                params: {
                    q: this.currentSearch
                },
            }).then((response) => {
            console.log(response.data)
              this.searchJobsList = response.data
              this.currentSlice = ""
            }).catch(error => {
                console.log('error.response: ', error.response)
            })
        },
        showDetailJobView: function(payload) {
            this.jobList = "" //may need to get rid of this
            this.currentSliceDisplay = false
            console.log("Showing Detail of Job")
            // console.log(payload.job)
            this.showEditJobBlock = true
            axios({
                method: "GET",
                headers: {
                    "X-CSRFToken": this.csrfToken
                  },
                url: `http://localhost:8000/bridgehead_app/jobs/${payload.job.id}`,
            }).then(response => {
              console.log(response.data)
              this.singleDetailJob = response.data
            }).catch(error => {
                console.log('error.response: ', error.response)
            })
        },
        jobApply: function(payload) {
            this.jobCount += 1
            // console.log("added 1 applicant")
            console.log("id of applicant", this.currentUser[0].id)
            console.log("jobby", payload.jobby)
            let workingCandidateList = payload.jobby.candidate
            // workingCandidateList.push() - not sure if this is needed
            workingCandidateList.push(this.currentUser[0].id)
            console.log("Candidate List", workingCandidateList)
            axios({
                method: "PATCH",
                headers: {
                    "X-CSRFToken": this.csrfToken
                },
                url: `http://localhost:8000/bridgehead_app/job-apply/${payload.jobby.id}/`,
                data: 
                    {
                        "id": payload.jobby.id, 
                        "candidate": workingCandidateList
                    }
                }).then(response => {
                    // get job with payload of payload.jobby.id from job list
                    let theIndex = this.jobList.indexOf(payload.jobby)
                    console.log(payload.jobby)
                    console.log("the index", theIndex)
                    // console.log("response", response)
                    // console.log("jobApply root response", response.data)
                }).catch(error => {
                    console.log('JobApply error.response: ', error.response)
                })
        },
        getCurrentUser: function() {
            axios({
                method: "GET",
                url: "http://localhost:8000/bridgehead_app/current-user/",
            }).then((response) => {
              console.log(response)
              this.currentUser = response.data
              console.log("THIS CURRENT USER", this.currentUser)
              console.log(this.currentUser[0].id)

              let isRecruiter = this.currentUser[0].recruiter
              console.log("USER IS RECRUTER", isRecruiter)
            if (isRecruiter) {
                this.jobList = this.currentUser[0].job_detail
                this.currentSlice = this.jobList.slice(0, this.numberOfItemsPerPage)
                this.jobsRemaining = Math.max(this.jobList.length - 3, 0) 
                console.log("joblist length", this.jobList.length)
                console.log("jobremaining", this.jobsRemaining)
            } else {
                this.getJobs()
            }
            }).catch(error => {
            console.log('error.response: ', error.response)
            })
        },
        getJobApplicants: function(payload) {
            console.log("Applicants", payload)
            axios({
                method: "GET",
                // headers: {
                //     "X-CSRFToken": this.csrfToken
                //   },
                url: `http://localhost:8000/bridgehead_app/recruiter-job/${payload.job.id}/`,
            }).then((response) => {
            console.log("Applicant response", response)
              this.candy = response.data.candidate
            }).catch(error => {
                console.log('error.response: ', error.response)
            })
        },
    },
    computed: {

    },
    beforeMount: function(){
        this.getJobs()
    },
    mounted: function() {
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
        this.getCurrentUser()
    }
})