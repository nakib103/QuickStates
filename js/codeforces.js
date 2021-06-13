class CodeforcesUser {
    constructor(handle){
        this.handle = handle;
        this.baseURL = "https://codeforces.com/api/"
    }

    setRankColor(elem){
        if(this.rank == "newbie"){ elem[0].style.color = 'gray';}
        if(this.rank == "pupil"){ elem[0].style.color = 'green';}
        if(this.rank == "specialist"){ elem[0].style.color = 'cyan';}
        if(this.rank == "expert"){ elem[0].style.color = 'blue';}
        if(this.rank == "candidate master"){ elem[0].style.color = 'violet';}
        if(this.rank == "master" || this.rank == "international master"){ elem[0].style.color = 'orange';}
        if(this.rank == "grandmaster" || this.rank == "international grandmaster"){ elem[0].style.color = 'red';}
        if(this.rank == "legendary grandmaster"){ elem[0].style.color = 'red';}
    }

    async refreshStats(){
        var response = await fetch(this.baseURL+"user.info?handles="+this.handle);
        if(response.status == 200){
            response.json().then(data => {
                this.updateStats(data);
            });
        }
        else{
            console.warn(response.status);
        }
    }

    updateStats(data){
        var stats = data['result'][0];
        this.rank = stats.rank;
        this.rating = stats.rating;
        this.contribution = stats.contribution;

        var rankElem = document.getElementById("codeforces-stats").getElementsByClassName("rank");
        rankElem[0].innerHTML = this.rank;

        var ratingElem = document.getElementById("codeforces-stats").getElementsByClassName("rating");
        ratingElem[0].innerHTML = this.rating;

        this.setRankColor(rankElem);
    }
}

var codeforcesUser = new CodeforcesUser('Nakib');
setInterval(() => {
    codeforcesUser.refreshStats();
}, 1000); 