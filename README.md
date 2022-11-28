#Proposal:
Create a Recruiting website that has the ability to intake candidates and employers while seamlessly storing pertinent information for both parties to find a mutual match. The project should be a minimum viable product - with the ability to scale into companies, or work as a standalone website.  The following outline is an overview of the project plan and what the mvp should like in three weeks. 

##Project Name: Neptune Strike

##Project Overview: 
-	Recruiting and Hiring Website: Fill out a Form for employee and employer
-	Problem this Project will Solve: recruiting and hiring process for a company
-	Libraries / Frameworks:
o	Django
o	Vue
o	Rest Framework
o	Will need geo API
o	Bootstrap
o	Database… need help to pick one – I don’t think MySQL will work
o	It would be cool to link this with a CRM one day (I don’t know how, but that would help a ton)

##Features

###User Stories

Candidate – as a candidate, I want to be able to look for work in my area and filtered by my skill set 
-	The candidate will have the ability to upload a resume and will also be able to look at job postings by Type or Location – with account setup and login capabilities
Job Employer – as a employer, I would like to be able to see my candidates resumes 
-	The employer will be able to look at candidates’ resumes and see what candidate will fit best with the offered position – with account setup and login capabilities
Recruiting firm – as a recruiting firm, I would like to be able to mediate between the candidate and employer, also providing real-time information for both parties to be in sync with each other
-	Recruiting firm will be able to schedule meetings via Google or Calendly
-	Finally, recruiting firm, candidate and employer will have dashboards for all parties

##Pages:

-	Home
o	Employer – Login and Account Setup
o	Candidate – Login and Account Setup
-	Logged-In Page
o	Employer
	Candidates applied for position
o	Candidate
	Top Job Positions based on filter
##Data Model
o	Employer
	Company Name
	Company Address
	Company Phone
	Company POC
	Company signed and acknowledged Terms of Agreement
	Company Jobs
	Company Candidates
o	Candidate
	Name
	Address
	Phone
	Email
	Filtered jobs
##Schedule
-	Week of 28Nov
o	Home Page and database sketch and back-end setup
-	Week of 5Dec
o	Minimum Viable Product completed by EOW that will include:
	Ability of both candidate and employer to set up and login with account
	Minimum dashboards for both parties to view applicable information
	Ability to set-up virtual meetings
-	Week of 12Dec
o	Final Checks and completing all items

