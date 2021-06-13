class UVAUser {
    constructor(id){
        this.id = id;
        this.baseURL = "https://uhunt.onlinejudge.org/api/"
    }

    async refreshStats(){
        var response = await fetch(this.baseURL+"ranklist/"+this.id+"/0/0");
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
        var stats = data[0];
        this.standing = stats.rank;
        this.solved = stats.ac;

        var standingElem = document.getElementById("uva-stats").getElementsByClassName("standing");
        standingElem[0].innerHTML = this.standing;

        var solvedElem = document.getElementById("uva-stats").getElementsByClassName("solved");
        solvedElem[0].innerHTML = this.solved;
    }
}

var uvaUser = new UVAUser(65203);
setInterval(() => {
    uvaUser.refreshStats();
}, 1000); 