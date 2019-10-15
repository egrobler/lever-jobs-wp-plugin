
class FilterDropdowns {
    constructor() {
        this.jobs = document.querySelectorAll('.job-listing');
        this.filters = {
            location: "",
            team: "",
            commitment: "",
        }
        this.bindFilterChangeHandler();
    }

    bindFilterChangeHandler() {
        document.querySelectorAll('select.filter').forEach( (filter) => {
            filter.addEventListener('change', (e) => {
                var offsetY = window.pageYOffset;
                
                this.filters[e.currentTarget.dataset.filter] = e.currentTarget.value;
                this.filterJobs();
                
                window.scrollTo({
                    top: offsetY,
                    behavior: 'smooth'
                })
            }, false)
        })
    }

    filterJobs() {
        // set show data value on all jobs to visible
        this.jobs.forEach( (job) => {
            job.dataset.show = "true";
        })
        
        // Now start filtering and setting the show data value
        Object.keys(this.filters).forEach( (filterTxt) => {
            this.jobs.forEach( (jobEl) => {
                let jobFilterTxt = (filterTxt === "location") ? "filterLocation" : ((filterTxt === "team") ? "filterTeam" : "filterCommitment");
                if (jobEl.dataset[jobFilterTxt] !== this.filters[filterTxt] && this.filters[filterTxt] !== "") {
                    jobEl.dataset.show = "false";
                }
            })
        })

        // Change display value
        var visibleJobs = this.jobs.length;

        this.jobs.forEach( (job) => {
            if (job.dataset.show == "false") {
                job.style.display = "none";
                visibleJobs -= 1;
            } else if (job.dataset.show == "true") {
                job.style.display = "block";
            }
        })

        if (visibleJobs === 0) {
            document.querySelector('.filter-results .no-results-message').classList.contains('hidden') &&
            document.querySelector('.filter-results .no-results-message').classList.remove('hidden');
        } else {
            !document.querySelector('.filter-results .no-results-message').classList.contains('hidden') &&
            document.querySelector('.filter-results .no-results-message').classList.add('hidden');
        }

        // Check if headings are empty
        document.querySelectorAll('.job-section').forEach( (section) => {
            let showHeading = false;
            Object.entries(section.children[2].children).forEach( (job) => {
                if (job[1].dataset.show == "true") {
                    showHeading = true;
                }
            })
            if (showHeading) {
                section.style.display = "block";
            } else {
                section.style.display = "none";
            }
        })

        
    }
}

window.onload = function() {
    new FilterDropdowns();
};
